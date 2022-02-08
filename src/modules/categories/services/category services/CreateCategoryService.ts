import ICategoryDTO from "../../dtos/ICategoryDTO";
import Category from "../../infra/typeorm/entities/Category";
import CategoryRepository from "../../infra/typeorm/repositories/CategoryRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class CreateCategoryService {
    public async execute(data: ICategoryDTO): Promise<Category> {
        const categoryRepository = new CategoryRepository();

        //ID não pode ser enviado no cadastro
        if (data.id) {
            throw new AppError("ID não deve ser enviado no cadastro");
        }

        //Criar nova categoria
        const category = await categoryRepository.create(data);
        return category;
    }
}
