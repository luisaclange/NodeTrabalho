import ICategoryDTO from "../dtos/ICategoryDTO";
import Category from "../infra/typeorm/entities/Category";

export default interface ICategoryRepository {
    create(data: ICategoryDTO): Promise<Category>;
    find(): Promise<Category[]>;
    findOne(id: number): Promise<Category|undefined>;
    update(data: ICategoryDTO, id: number): Promise<Category>;
    delete(id: number): Promise<Category[]>;
}