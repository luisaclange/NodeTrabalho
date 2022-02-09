import Category from "../../infra/typeorm/entities/Category";
import CategoryRepository from "../../infra/typeorm/repositories/CategoryRepository";
import AppError from "../../../../shared/errors/AppErrors";
import FindCategory from "./FindCategory";

export default class DeleteCategory {
    public async execute(id: number): Promise<Category[]> {
        const categoryRepository = new CategoryRepository();
        const serviceFindCategory = new FindCategory();

        //Para excluir, deve existir um ID prévio
        serviceFindCategory.execute(id);

        const category = await categoryRepository.delete(id);
        return category;
    }
}