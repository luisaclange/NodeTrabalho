import AppError from "../../../../shared/errors/AppErrors";
import Order from "../../infra/typeorm/entities/Order";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import OrderProduct from "../../infra/typeorm/entities/OrderProduct";

export default class FindOrder {
    public async execute(id: number): Promise<Order> {
        const orderRepository = new OrderRepository();

        const order = await orderRepository.findOne(id);

        //Caso o Id do pedido não for válido
        if (order === undefined) {
            throw new AppError("Pedido não encontrado");
        }        

        return order;
    }
}