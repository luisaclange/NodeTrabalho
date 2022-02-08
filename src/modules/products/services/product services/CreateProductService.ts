import IProductDTO from "../../dtos/IProductDTO";
import Product from "../../infra/typeorm/entities/Product";
import ProductRepository from "../../infra/typeorm/repositories/ProductRepository";
import AppError from "../../../../shared/errors/AppErrors";
import CategoryRepository from "../../../categories/infra/typeorm/repositories/CategoryRepository";

export default class CreateProductService {
    public async execute(data: IProductDTO): Promise<Product> {
        const productRepository = new ProductRepository();
        const categoryRepository = new CategoryRepository();

        //ID não pode ser enviado no cadastro
        if (data.id) {
            throw new AppError("ID não deve ser enviado no cadastro");
        }

        //O id da categoria deve ser válido
        if (await categoryRepository.findOne(data.categoria_id) === undefined) {
            throw new AppError("Não foi encontrado o ID da categoria");
        }

        const product = await productRepository.create(data);
        return product;
    }
}
