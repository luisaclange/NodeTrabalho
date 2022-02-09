import IOrderDTO from "../../dtos/IOrderDTO";
import IOrderProductDTO from "../../dtos/IOrderProductDTO";
import Order from "../../infra/typeorm/entities/Order";
import OrderProduct from "../../infra/typeorm/entities/OrderProduct";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import AppError from "../../../../shared/errors/AppErrors";
import ProductRepository from "../../../products/infra/typeorm/repositories/ProductRepository";
import Product from "../../../products/infra/typeorm/entities/Product";
import ClientRepository from "../../../clients/infra/typeorm/repositories/ClientRepository";
import FindProduct from "../../../products/services/product services/FindProduct";
import FindClient from "../../../clients/services/client services/FindClient";

export default class CreateOrderService {
    public async execute(data: IOrderDTO): Promise<Order> {
        const orderRepository = new OrderRepository();
        const serviceFindProduct = new FindProduct();
        const serviceFindClient = new FindClient();

        //ID não pode ser enviado no cadastro
        if (data.id) {
            throw new AppError("ID não deve ser enviado no cadastro");
        }

        //Status não deve ser informado no cadastro
        if (data.status) {
            throw new AppError("Status não deve ser enviado no cadastro. Posteriormente será modificado na atualização do pedido.");
        }

        //Deve ter pelo menos um produto a ser comprado
        if (data.pedido_produtos.length === 0) {
            throw new AppError("O pedido deve possuir pelo menos um produto a ser comprado");
        }

        //Verificar se o cliente id existe
        serviceFindClient.execute(data.cliente_id);

        //Verificação se os ids dos produtos informados são validos e soma do valor
        var valor: number = 0;
        for (var i = 0; i < data.pedido_produtos.length; i++) {
            const produto = await serviceFindProduct.execute(data.pedido_produtos[i].produto_id);
            valor += produto?.preco * data.pedido_produtos[i].quantidade;
        }

        // //Criar novo pedido
        data.valor = valor;
        data.status = "Em aberto";
        const order = orderRepository.create(data);


        return order;
    }
}
