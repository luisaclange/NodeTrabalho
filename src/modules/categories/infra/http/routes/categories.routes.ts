import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController";

const routes = Router();

routes.post("/", CategoriesController.create);

routes.get("/", CategoriesController.list);

routes.get("/:id", CategoriesController.find);

routes.put("/:id", CategoriesController.update);

routes.delete("/:id", CategoriesController.delete);

export default routes;