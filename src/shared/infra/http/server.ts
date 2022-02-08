import "reflect-metadata";
import "express-async-errors";
import express from "express";
import "../typeorm/index.ts";
import routes from "./routes/index.routes";
import ErrorHandler from "./middlewares/ErrorHandler";

const app = express();

app.use(express.json());

app.use(routes);

// Utilize o ErrorHandler em um middleware do express
app.use(ErrorHandler);

app.listen(3333, () => {
    console.log("Servidor Iniciado");
})