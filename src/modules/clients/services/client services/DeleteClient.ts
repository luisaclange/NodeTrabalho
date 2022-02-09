import Client from "../../infra/typeorm/entities/Client";
import ClientRepository from "../../infra/typeorm/repositories/ClientRepository";
import FindClient from "./FindClient";

export default class DeleteClient {
    public async execute(id: number): Promise<Client[]> {
        const clientRepository = new ClientRepository();
        const serviceFindClient = new FindClient();

        //Para excluir, deve existir um ID prévio
        serviceFindClient.execute(id);

        //Excluir cliente
        const client = await clientRepository.delete(id);

        return client;
    }
}