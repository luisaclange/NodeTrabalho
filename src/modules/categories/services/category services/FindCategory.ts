import Category from "../../infra/typeorm/entities/Category";
import CategoryRepository from "../../infra/typeorm/repositories/CategoryRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class FindCategory {
    public async execute(id: number): Promise<Category | undefined> {
        const categoryRepository = new CategoryRepository();
        const category = await categoryRepository.findOne(id);

        //Caso o id informado não existe
        if (category === undefined) {
            throw new AppError("O ID informado não existe");
        }

        return category;
    }
}