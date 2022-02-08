import Order from "../../infra/typeorm/entities/Order";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class ListOrders {
    public async execute(): Promise<Order[]> {
        const orderRepository = new OrderRepository();
        const order = await orderRepository.listOrders();

        //Caso não retorne nenhum pedido
        if (order.length == 0) {
            throw new AppError("Não há nenhum pedido cadastrado");
        }
        
        return order;
    }
}