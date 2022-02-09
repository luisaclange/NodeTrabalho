import Product from "../../infra/typeorm/entities/Product";
import ProductRepository from "../../infra/typeorm/repositories/ProductRepository";
import AppError from "../../../../shared/errors/AppErrors";
import FindProduct from "./FindProduct";

export default class DeleteProduct {
    public async execute(id: number): Promise<Product[]> {
        const productRepository = new ProductRepository();
        const serviceFindProduct = new FindProduct();

        //Para excluir, deve existir um ID prévio
        serviceFindProduct.execute(id);

        const product = await productRepository.delete(id);
        return product;
    }
}