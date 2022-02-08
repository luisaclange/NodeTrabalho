import { Router } from "express";
import ClientsController from "../controllers/ClientsController";

const routes = Router();

routes.post("/", ClientsController.create);

routes.get("/", ClientsController.list);

routes.get("/:id", ClientsController.find);

routes.put("/:id", ClientsController.update);

routes.delete("/:id", ClientsController.delete);

export default routes;
