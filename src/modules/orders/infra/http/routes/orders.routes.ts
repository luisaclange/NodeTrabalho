import { Router } from "express";
import OrdersController from "../controllers/OrdersController";

const routes = Router();

routes.post("/", OrdersController.create);

routes.get("/clientes/:id", OrdersController.findClient);

routes.get("/:id", OrdersController.findOrder);

routes.put("/:id", OrdersController.update);

routes.delete("/:id", OrdersController.delete);

routes.get("/", OrdersController.listOrders);

export default routes;