import { getRepository, Repository } from "typeorm";
import IOrderProductDTO from "../../../dtos/IOrderProductDTO";
import IOrderProductRepository from "../../../repositories/IOrderProductRepository";
import OrderProduct from "../entities/OrderProduct";

export default class OrderProductRepository implements IOrderProductRepository {
    private ormRepository: Repository<OrderProduct>;
    constructor() {
        this.ormRepository = getRepository(OrderProduct);
    }

    async create(data: IOrderProductDTO): Promise<OrderProduct> {
        const orderProduct = await this.ormRepository.create(data);
        return this.ormRepository.save(orderProduct);
    }

    async findOrder(id: number): Promise<OrderProduct[]> {
        return this.ormRepository.find({pedido_id: id});
    }

    async delete(idpe: number, idpr: number): Promise<OrderProduct[]> {
        await this.ormRepository.delete({pedido_id: idpe, produto_id: idpr});
        return this.ormRepository.find({pedido_id: idpe});
    }
}