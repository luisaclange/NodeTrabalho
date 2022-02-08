import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";

export default interface IOrderRepository {
    create(data: IOrderDTO): Promise<Order>;
    findClientOne(id: number): Promise<Order[]>;
    findOne(id: number): Promise<Order | undefined>;
    update(data: IOrderDTO, id: number): Promise<Order>;
    delete(id: number): Promise<Order[]>;
}