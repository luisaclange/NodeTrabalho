import IOrderDTO from "../../../dtos/IOrderDTO";
import IOrderRepository from "../../../repositories/IOrderRepository";
import { getRepository, Repository } from "typeorm";
import Order from "../entities/Order";

export default class OrderRepository implements
    IOrderRepository {
    private ormRepository: Repository<Order>;
    constructor() {
        this.ormRepository = getRepository(Order);
    }

    async create(data: IOrderDTO): Promise<Order> {
        const order = await this.ormRepository.create(data);
        return this.ormRepository.save(order);
    }

    async findClientOne(id: number): Promise<Order[]> {
        return this.ormRepository.find({cliente_id: id});
    }

    async listOrders(): Promise<Order[]> {
        return this.ormRepository.find();
    }

    async findOne(id: number): Promise<Order | undefined> {
        return this.ormRepository.findOne(id);
    }

    async update(data: IOrderDTO, id: number): Promise<Order> {
        await this.ormRepository.delete(id);
        data.id = id;
        const order = await this.ormRepository.create(data);
        return this.ormRepository.save(order);
    }

    async delete(id: number): Promise<Order[]> {
        await this.ormRepository.delete(id);
        return this.ormRepository.find();
    }
}
