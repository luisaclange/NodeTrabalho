import { Request, Response } from "express";

import CreateClientService from "../../../services/client services/CreateClientService";
import ListClients from "../../../services/client services/ListClients";
import FindClient from "../../../services/client services/FindClient";
import UpdateClient from "../../../services/client services/UpdateClient";
import DeleteClient from "../../../services/client services/DeleteClient";

class ClientsController {

    //Criar um novo cliente
    async create(request: Request, response: Response) {
        const data = request.body;
        const createClientService = new CreateClientService();
        const client = await createClientService.execute(data);
        return response.json(client);
    }

    //Listar todos os clientes
    async list(request: Request, response: Response) {
        const listClients = new ListClients;
        const client = await listClients.execute();
        return response.json(client);
    }

    //Buscar um cliente pelo ID
    async find(request: Request, response: Response) {
        const {id} = request.params;
        const id_n = Number(id);
        const findClient = new FindClient;
        const client = await findClient.execute(id_n);
        return response.json(client);
    }

    //Atualizar um cliente
    async update(request: Request, response: Response) {
        const {id} = request.params;
        const data = request.body;
        const id_n = Number(id);
        const updateClient = new UpdateClient;
        const client = await updateClient.execute(data, id_n);
        return response.json(client);
    }

    //Deletar um cliente
    async delete(request: Request, response: Response) {
        const {id} = request.params;
        const id_n = Number(id);
        const deleteClient = new DeleteClient;
        const client = await deleteClient.execute(id_n);
        return response.json(client);
    }
    
}

export default new ClientsController();

