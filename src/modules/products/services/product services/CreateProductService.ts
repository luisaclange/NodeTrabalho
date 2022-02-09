import IProductDTO from "../../dtos/IProductDTO";
import Product from "../../infra/typeorm/entities/Product";
import ProductRepository from "../../infra/typeorm/repositories/ProductRepository";
import AppError from "../../../../shared/errors/AppErrors";
import FindCategory from "../../../categories/services/category services/FindCategory";

export default class CreateProductService {
    public async execute(data: IProductDTO): Promise<Product> {
        const productRepository = new ProductRepository();
        const serviceFindCategory = new FindCategory()

        //ID não pode ser enviado no cadastro
        if (data.id) {
            throw new AppError("ID não deve ser enviado no cadastro");
        }

        //O id da categoria deve ser válido
        serviceFindCategory.execute(data.categoria_id);

        const product = await productRepository.create(data);
        return product;
    }
}
