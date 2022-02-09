import Product from "../../infra/typeorm/entities/Product";
import ProductRepository from "../../infra/typeorm/repositories/ProductRepository";
import IProductDTO from "../../dtos/IProductDTO";
import AppError from "../../../../shared/errors/AppErrors";
import CategoryRepository from "../../../categories/infra/typeorm/repositories/CategoryRepository";
import FindProduct from "./FindProduct";
import FindCategory from "../../../categories/services/category services/FindCategory";

export default class UpdateProduct {
    public async execute(data: IProductDTO, id: number): Promise<Product|undefined> {
        const productRepository = new ProductRepository();
        const categoryRepository = new CategoryRepository();
        const serviceFindProduct = new FindProduct();
        const serviceFindCategory = new FindCategory();

        //O id informado nao é valido
        serviceFindProduct.execute(id);

        //ID não pode ser enviado no json
        if (data.id) {
            throw new AppError("ID deve ser informado somente na url");
        }

        //O id da categoria deve ser válido
        serviceFindCategory.execute(data.categoria_id);

        //Atualiza o produto
        const product = await productRepository.update(data, id);
        return product;
    }
}