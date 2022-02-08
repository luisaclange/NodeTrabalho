import Category from "../../infra/typeorm/entities/Category";
import CategoryRepository from "../../infra/typeorm/repositories/CategoryRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class DeleteCategory {
    public async execute(id: number): Promise<Category[]> {
        const categoryRepository = new CategoryRepository();

        //Para excluir, deve existir um ID prévio
        if (await categoryRepository.findOne(id) === undefined) {
            throw new AppError("O ID informado não existe");
        }

        const category = await categoryRepository.delete(id);
        return category;
    }
}