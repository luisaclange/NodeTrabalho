import Order from "../../infra/typeorm/entities/Order";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import AppError from "../../../../shared/errors/AppErrors";
import OrderProduct from "../../infra/typeorm/entities/OrderProduct";

export default class DeleteOrder {
    public async execute(id: number): Promise<Order[]> {
        const orderRepository = new OrderRepository();

        //Caso o Id do pedido não for válido
        if (await orderRepository.findOne(id) === undefined) {
            throw new AppError("Pedido não encontrado");
        }

        //Deletar pedido
        const order = await orderRepository.delete(id);
        
        
        return order;
    }
}