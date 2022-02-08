import AppError from "../../../../shared/errors/AppErrors";
import Order from "../../infra/typeorm/entities/Order";
import OrderRepository from "../../infra/typeorm/repositories/OrderRepository";
import OrderProduct from "../../infra/typeorm/entities/OrderProduct";
import OrderProductRepository from "../../infra/typeorm/repositories/OrderProductRepository";

export default class FindOrder {
    public async execute(id: number): Promise<any> {
        const orderRepository = new OrderRepository();
        const orderProductRepository = new OrderProductRepository();

        const order = await orderRepository.findOne(id);

        //Caso o Id do pedido não for válido
        if (order === undefined) {
            throw new AppError("Pedido não encontrado");
        }

        //@ts-ignore
        const products = await orderProductRepository.findOrder(order.id);

        var listOrder: {
            pedido: Order,
            produtos: OrderProduct[]
        } = ({
            //@ts-ignore
            pedido: order,
            produtos: products
        });        

        return listOrder;
    }
}