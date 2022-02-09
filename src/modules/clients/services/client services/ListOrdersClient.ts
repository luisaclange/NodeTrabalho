import AppError from "../../../../shared/errors/AppErrors";
import ClientRepository from "../../../clients/infra/typeorm/repositories/ClientRepository";
import Order from "../../../orders/infra/typeorm/entities/Order";
import OrderRepository from "../../../orders/infra/typeorm/repositories/OrderRepository";
import FindClient from "./FindClient";

export default class ListOrdersClient {
    public async execute(id: number): Promise<Order[]> {
        const orderRepository = new OrderRepository();
        const clientsRepository = new ClientRepository();
        const serviceFindClient = new FindClient();

        //Caso o Id do cliente não for válido
        serviceFindClient.execute(id);

        const order = await orderRepository.findClientOne(id);

        //Caso o cliente não possui pedidos
        if (order.length === undefined) {
            throw new AppError("O cliente informado não possui pedidos");
        };

        return order;
    }
}