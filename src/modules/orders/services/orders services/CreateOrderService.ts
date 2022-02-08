import IOrderDTO from "../../dtos/IOrderDTO";
import IOrderProductDTO from "../../dtos/IOrderProductDTO";
import Order from "../../infra/typeorm/entities/Order";
import OrderProduct from "../../infra/typeorm/entities/OrderProduct";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import AppError from "../../../../shared/errors/AppErrors";
import OrderProductRepository from "../../infra/typeorm/repositories/OrderProductRepository";
import ProductRepository from "../../../products/infra/typeorm/repositories/ProductRepository";
import Product from "../../../products/infra/typeorm/entities/Product";
import ClientRepository from "../../../clients/infra/typeorm/repositories/ClientRepository";

export default class CreateOrderService {
    public async execute(data: IOrderDTO): Promise<any> {
        const orderRepository = new OrderRepository();
        const orderProductRepository = new OrderProductRepository();
        const productRepository = new ProductRepository();
        const clientRepository = new ClientRepository();

        //ID não pode ser enviado no cadastro
        if (data.id) {
            throw new AppError("ID não deve ser enviado no cadastro");
        }

        //Status não deve ser informado no cadastro
        if (data.status) {
            throw new AppError("Status não deve ser enviado no cadastro. Posteriormente será modificado na atualização do pedido.");
        }

        //Deve ter pelo menos um produto a ser comprado
        if (data.pedido_produto.length == 0) {
            throw new AppError("O pedido deve possuir pelo menos um produto a ser comprado");
        }

        //Verificar se o cliente id existe
        if (await clientRepository.findOne(data.cliente_id) === undefined) {
            throw new AppError("O cliente informado não existe");
        }

        //Verificação que os ids dos produtos informados são validos e soma do valor
        var valor: number;
        valor = 0;
        for (var i=0; i<data.pedido_produto.length; i++) {
            if (await productRepository.findOne(data.pedido_produto[i].produto_id) === undefined) {
                throw new AppError("Produto de id "+data.pedido_produto[i].produto_id+" não foi encontrado");
            } else {
                const produto = await productRepository.findOne(data.pedido_produto[i].produto_id);
                //@ts-ignore              
                valor += produto?.preco * data.pedido_produto[i].quantidade;
            }
        }

        //Criar novo pedido
        data.valor = valor;
        data.status = "Em aberto";
        const order = await orderRepository.create(data);

        //Criar array
        var list: Array<OrderProduct> = ([]);

        //Adicionar cada produto
        for (var i=0; i<data.pedido_produto.length; i++) {
            const orderProduct = await orderProductRepository.create({
                "pedido_id": order.id,
                "produto_id": data.pedido_produto[i].produto_id,
                "quantidade": data.pedido_produto[i].quantidade
            });
            list.push(orderProduct);
        };

        var listOrder: {
            pedido: Order,
            produtos: OrderProduct[]
        } = ({
            pedido: order,
            produtos: list
        });

        return listOrder;
    }
}
