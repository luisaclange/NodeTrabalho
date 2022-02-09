import Order from "../../infra/typeorm/entities/Order";
import OrderProduct from "../../infra/typeorm/entities/OrderProduct";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import IOrderDTO from "../../dtos/IOrderDTO";
import ProductRepository from "../../../products/infra/typeorm/repositories/ProductRepository";
import AppError from "../../../../shared/errors/AppErrors";
import ClientRepository from "../../../clients/infra/typeorm/repositories/ClientRepository";
import FindProduct from "../../../products/services/product services/FindProduct";
import FindOrder from "./FindOrder";
import FindClient from "../../../clients/services/client services/FindClient";

export default class UpdateOrder {
    public async execute(data: IOrderDTO, id: number): Promise<Order | undefined> {
        const orderRepository = new OrderRepository();
        const productRepository = new ProductRepository();
        const serviceFindProduct = new FindProduct();
        const serviceFindOrder = new FindOrder();
        const serviceFindClient = new FindClient();

        // Caso o pedido não tenha sido encontrado
        serviceFindOrder.execute(id);

        //Deve ter pelo menos um produto a ser comprado
        if (data.pedido_produtos.length === 0) {
            throw new AppError("O pedido deve possuir pelo menos um produto a ser comprado");
        }

        //Verificar se o cliente id existe
        serviceFindClient.execute(data.cliente_id);

        //Variável para auxilio na verificação do status
        var verification: boolean = data.status === "Finalizado";

        //Verificação se os ids dos produtos informados são validos, soma do valor e se os produtos possuem estoque suficiente
        var valor: number = 0;
        for (var i = 0; i < data.pedido_produtos.length; i++) {
            const produto = await serviceFindProduct.execute(data.pedido_produtos[i].produto_id);
            valor += produto.preco * data.pedido_produtos[i].quantidade;
            if (data.status === "Finalizado" && data.pedido_produtos[i].quantidade > produto.quantidade_estoque) {
                throw new AppError("O produto " + produto?.nome + " não possui estoque suficiente: " + produto?.quantidade_estoque)
            }
        }

        //Atualizar pedido
        data.valor = valor;
        const order = await orderRepository.update(data, id);

        //Atualizar estoque
        if (data.status === "Finalizado" && verification === false) {
            data.pedido_produtos.forEach(async p => {
                const product = await serviceFindProduct.execute(p.produto_id);
                product.quantidade_estoque -= p.quantidade;
                await productRepository.update({
                    nome: product.nome,
                    preco: product.preco,
                    quantidade_estoque: product.quantidade_estoque,
                    categoria_id: product.categoria_id
                }, p.produto_id);
            });
        }

        return order;
    }
}