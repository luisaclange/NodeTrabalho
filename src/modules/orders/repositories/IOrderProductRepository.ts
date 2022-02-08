import IOrderProductDTO from "../dtos/IOrderProductDTO";
import OrderProduct from "../infra/typeorm/entities/OrderProduct";

export default interface IOrderProductRepository {
    create(data: IOrderProductDTO): Promise<OrderProduct>;
}