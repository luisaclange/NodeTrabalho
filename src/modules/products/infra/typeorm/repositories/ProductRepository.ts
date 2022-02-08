import IProductDTO from "../../../dtos/IProductDTO";
import IProductRepository from "../../../repositories/IProductRepository";
import { getRepository, Repository } from "typeorm";
import Product from "../entities/Product";

export default class ProductRepository implements
IProductRepository {
private ormRepository: Repository<Product>;
    constructor() {
        this.ormRepository = getRepository(Product);
    }
    async create(data: IProductDTO): Promise<Product> {
        const product = this.ormRepository.create(data);
        return await this.ormRepository.save(product);
    }
    async find(): Promise<Product[]> {
        return await this.ormRepository.find();
    }

    async findOne(id: number): Promise<Product|undefined> {
        return await this.ormRepository.findOne(id);
    }

    async update(data: IProductDTO,id: number): Promise<Product> {
        await this.ormRepository.delete(id);
        data.id = id;
        const product = await this.ormRepository.create(data);
        return await this.ormRepository.save(product);
    }

    async delete(id: number): Promise<Product[]> {
        await this.ormRepository.delete(id);
        return await this.ormRepository.find();
    }
}
