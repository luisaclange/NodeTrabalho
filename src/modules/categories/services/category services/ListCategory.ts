import Category from "../../infra/typeorm/entities/Category";
import CategoryRepository from "../../infra/typeorm/repositories/CategoryRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class ListCategorys {
    public async execute(): Promise<Category[]> {
        const categoryRepository = new CategoryRepository();
        const category = await categoryRepository.find();

        //Caso não retorne nenhuma categoria
        if (category.length === 0) {
            throw new AppError("Não há nenhuma categoria cadastrada");
        }

        return category;
    }
}