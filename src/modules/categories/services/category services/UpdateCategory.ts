import Category from "../../infra/typeorm/entities/Category";
import CategoryRepository from "../../infra/typeorm/repositories/CategoryRepository";
import ICategoryDTO from "../../dtos/ICategoryDTO";
import AppError from "../../../../shared/errors/AppErrors";

export default class UpdateCategory {
    public async execute(data: ICategoryDTO, id: number): Promise<Category|undefined> {
        const categoryRepository = new CategoryRepository();

        //ID não pode ser enviado no json
        if (data.id) {
            throw new AppError("ID deve ser informado somente na url");
        }

        //Para atualizar, deve existir um ID prévio
        if (await categoryRepository.findOne(id) === undefined) {
            throw new AppError("O ID informado não existe");
        }

        //Atualiza a categoria
        const category = await categoryRepository.update(data, id);
        return category;
    }
}