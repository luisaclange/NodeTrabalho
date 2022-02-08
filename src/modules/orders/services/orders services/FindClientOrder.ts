import AppError from "../../../../shared/errors/AppErrors";
import ClientRepository from "../../../clients/infra/typeorm/repositories/ClientRepository";
import Order from "../../infra/typeorm/entities/Order";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import OrderProduct from "../../infra/typeorm/entities/OrderProduct";
import OrderProductRepository from "../../infra/typeorm/repositories/OrderProductRepository";

export default class FindClientOrder {
    public async execute(id: number): Promise<any> {
        const orderRepository = new OrderRepository();
        const clientsRepository = new ClientRepository();
        const orderProductRepository = new OrderProductRepository();

        //Caso o Id do cliente não for válido
        if (clientsRepository.findOne(id) === undefined) {
            throw new AppError("Cliente não encontrado");
        }

        const order = await orderRepository.findClientOne(id);

        //Caso o cliente não possui pedidos
        if (order.length === 0) {
            throw new AppError("O cliente informado não possui pedidos");
        }

        var listOrder: {
            pedido: Order,
            produtos: OrderProduct[]
        }[] = ([]);

        for (let i = 0; i < order.length; i++) {
            const products = orderProductRepository.findOrder(order[i].id);
            listOrder.push({
                pedido: order[i],
                //@ts-ignore
                produtos: products
            })
        }

        return listOrder;
    }
}