import Product from "../../infra/typeorm/entities/Product";
import ProductRepository from "../../infra/typeorm/repositories/ProductRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class DeleteProduct {
    public async execute(id: number): Promise<Product[]> {
        const productRepository = new ProductRepository();

        //Para excluir, deve existir um ID prévio
        if (await productRepository.findOne(id) === undefined) {
            throw new AppError("O ID informado não existe");
        }

        const product = await productRepository.delete(id);
        return product;
    }
}