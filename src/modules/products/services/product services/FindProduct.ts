import Product from "../../infra/typeorm/entities/Product";
import ProductRepository from "../../infra/typeorm/repositories/ProductRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class FindProduct {
    public async execute(id: number): Promise<Product> {
        const productRepository = new ProductRepository();
        const product = await productRepository.findOne(id);
        
        //Caso o id informado não existe
        if (product === undefined) {
            throw new AppError("O ID informado não existe");
        }

        return product;
    }
}