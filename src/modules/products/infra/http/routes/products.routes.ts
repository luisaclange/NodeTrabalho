import { Router } from "express";
import ProductsController from "../controllers/ProductsController";

const routes = Router();

routes.post("/", ProductsController.create);

routes.get("/", ProductsController.list);

routes.get("/:id", ProductsController.find);

routes.put("/:id", ProductsController.update);

routes.delete("/:id", ProductsController.delete);

export default routes;