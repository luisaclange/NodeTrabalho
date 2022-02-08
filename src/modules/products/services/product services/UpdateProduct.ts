import Product from "../../infra/typeorm/entities/Product";
import ProductRepository from "../../infra/typeorm/repositories/ProductRepository";
import IProductDTO from "../../dtos/IProductDTO";
import AppError from "../../../../shared/errors/AppErrors";
import CategoryRepository from "../../../categories/infra/typeorm/repositories/CategoryRepository";

export default class UpdateProduct {
    public async execute(data: IProductDTO, id: number): Promise<Product|undefined> {
        const productRepository = new ProductRepository();
        const categoryRepository = new CategoryRepository();

        //O id informado nao é valido
        if (await productRepository.findOne(id) === undefined) {
            throw new AppError("O ID informado não é válido");
        }

        //ID não pode ser enviado no json
        if (data.id) {
            throw new AppError("ID deve ser informado somente na url");
        }

        //O id da categoria deve ser válido
        if (await categoryRepository.findOne(data.categoria_id) === undefined) {
            throw new AppError("Não foi encontrado o ID da categoria");
        }

        //Atualiza o produto
        const product = await productRepository.update(data, id);
        return product;
    }
}