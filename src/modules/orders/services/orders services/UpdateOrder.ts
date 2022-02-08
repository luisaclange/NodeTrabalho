import Order from "../../infra/typeorm/entities/Order";
import OrderProduct from "../../infra/typeorm/entities/OrderProduct";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import IOrderDTO from "../../dtos/IOrderDTO";
import OrderProductRepository from "../../infra/typeorm/repositories/OrderProductRepository";
import ProductRepository from "../../../products/infra/typeorm/repositories/ProductRepository";
import AppError from "../../../../shared/errors/AppErrors";
import ClientRepository from "../../../clients/infra/typeorm/repositories/ClientRepository";

export default class UpdateOrder {
    public async execute(data: IOrderDTO, id: number): Promise<any> {
        const orderRepository = new OrderRepository();
        const orderProductRepository = new OrderProductRepository();
        const productRepository = new ProductRepository();
        const clientRepository = new ClientRepository();

        //Caso o Id do pedido não for válido
        var verification: boolean = false;
        const orderBefore = await orderRepository.findOne(id);
        if (orderBefore === undefined) {
            throw new AppError("Pedido não encontrado");
        } else {
            verification = (orderBefore.status === "Finalizado" ? true : false); //Verificação status
        }

        //Caso o Id do pedido não for válido
        if (await clientRepository.findOne(data.cliente_id) === undefined) {
            throw new AppError("Cliente não encontrado");
        }

        //Verificação se os ids dos produtos informados são validos, soma do valor e se os produtos possuem estoque suficiente
        var valor: number;
        valor = 0;
        for (var i = 0; i < data.pedido_produto.length; i++) {
            const produto = await productRepository.findOne(data.pedido_produto[i].produto_id);
            if (produto === undefined) {
                throw new AppError("Produto de id " + data.pedido_produto[i].produto_id + " não foi encontrado");
            } else {
                //@ts-ignore              
                valor += produto?.preco * data.pedido_produto[i].quantidade;
                if (data.status === "Finalizado" && data.pedido_produto[i].quantidade > produto?.quantidade_estoque) {
                    throw new AppError("O produto " + produto?.nome + " não possui estoque suficiente: " + produto?.quantidade_estoque)
                }
            }
        }

        //Atribuir esse valor
        data.valor = valor;

        //Criar array
        var list: Array<OrderProduct> = ([]);

        //Atualizar os produtos
        const produtosAntes = await orderProductRepository.findOrder(id);
        produtosAntes.forEach(p => {
            orderProductRepository.delete(id, p.produto_id);
        })
        for (var i = 0; i < data.pedido_produto.length; i++) {
            const orderProduct = await orderProductRepository.create({
                "pedido_id": id,
                "produto_id": data.pedido_produto[i].produto_id,
                "quantidade": data.pedido_produto[i].quantidade
            });
            list.push(orderProduct);
        };

        //Atualizar pedido
        const order = await orderRepository.update(data, id);
        var listOrder: {
            pedido: Order,
            produtos: OrderProduct[]
        } = ({
            pedido: order,
            produtos: list
        });

        //Atualizar estoque
        if (data.status === "Finalizado" && verification === false) {
            data.pedido_produto.forEach(async p => {
                const product = await productRepository.findOne(p?.produto_id);
                //@ts-ignore
                product?.quantidade_estoque -= p.quantidade;
                await productRepository.update({
                    //@ts-ignore
                    nome: product?.nome,
                    //@ts-ignore
                    preco: product?.preco,
                    //@ts-ignore
                    quantidade_estoque: product?.quantidade_estoque,
                    //@ts-ignore
                    categoria_id: product?.categoria_id
                }, p?.produto_id);
            });
        }

        return listOrder;
    }
}