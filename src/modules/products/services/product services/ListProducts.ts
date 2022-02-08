import Product from "../../infra/typeorm/entities/Product";
import ProductRepository from "../../infra/typeorm/repositories/ProductRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class ListProducts {
    public async execute(): Promise<Product[]> {
        const productRepository = new ProductRepository();
        const product = await productRepository.find();

        //Caso não retorne nenhum produto
        if (product.length == 0) {
            throw new AppError("Não há nenhum produto cadastrado");
        }

        return product;
    }
}