import Order from "../../infra/typeorm/entities/Order";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import AppError from "../../../../shared/errors/AppErrors";
import OrderProductRepository from "../../infra/typeorm/repositories/OrderProductRepository";
import OrderProduct from "../../infra/typeorm/entities/OrderProduct";

export default class DeleteOrder {
    public async execute(id: number): Promise<Order[]> {
        const orderRepository = new OrderRepository();
        const orderProductsRepository = new OrderProductRepository();

        //Caso o Id do pedido não for válido
        if (await orderRepository.findOne(id) === undefined) {
            throw new AppError("Pedido não encontrado");
        }

        const orderProducts = await orderProductsRepository.findOrder(id);
        for (let i = 0; i < orderProducts.length; i++) {
            //@ts-ignore
            const deleta = await orderProductsRepository.delete(id, orderProducts[i].produto_id);
        }

        const order = await orderRepository.delete(id);
        return order;
    }
}