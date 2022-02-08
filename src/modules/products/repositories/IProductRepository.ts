import IProductDTO from "../dtos/IProductDTO";
import Product from "../infra/typeorm/entities/Product";

export default interface IProductRepository {
    create(data: IProductDTO): Promise<Product>;
    find(): Promise<Product[]>;
    findOne(id: number): Promise<Product|undefined>;
    update(data: IProductDTO, id: number): Promise<Product>;
    delete(id: number): Promise<Product[]>;
}