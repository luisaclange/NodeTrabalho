import { Request, Response } from "express";

import CreateCategoryService from "../../../services/category services/CreateCategoryService";
import ListCategory from "../../../services/category services/ListCategory";
import FindCategory from "../../../services/category services/FindCategory";
import UpdateCategory from "../../../services/category services/UpdateCategory";
import DeleteCategory from "../../../services/category services/DeleteCategory";

class CategoriesController {

    //Criar uma nova categoria
    async create(request: Request, response: Response) {
        const data = request.body;
        const createCategoryService = new CreateCategoryService();
        const category = await createCategoryService.execute(data);
        return response.json(category);
    }

    // Listar as categorias
    async list(request: Request, response: Response) {
        const listClients = new ListCategory;
        const category = await listClients.execute();
        return response.json(category);
    }

    //Procurar por uma categoria
    async find(request: Request, response: Response) {
        const {id} = request.params;
        const id_n = Number(id);
        const findCategory = new FindCategory;
        const category = await findCategory.execute(id_n);
        return response.json(category);
    }

    //Atualizar uma categoria
    async update(request: Request, response: Response) {
        const {id} = request.params;
        const data = request.body;
        const id_n = Number(id);
        const updateCategory = new UpdateCategory;
        const category = await updateCategory.execute(data, id_n);
        return response.json(category);
    }

    //Deletar uma categoria
    async delete(request: Request, response: Response) {
        const {id} = request.params;
        const id_n = Number(id);
        const deleteCategory = new DeleteCategory;
        const category = await deleteCategory.execute(id_n);
        return response.json(category);
    }
    
}

export default new CategoriesController();

