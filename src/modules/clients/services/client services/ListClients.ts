import Client from "../../infra/typeorm/entities/Client";
import ClientRepository from "../../infra/typeorm/repositories/ClientRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class ListClients {
    public async execute(): Promise<Client[]> {
        const clientRepository = new ClientRepository();
        const client = await clientRepository.find();

        //Caso não retorne nenhum cliente
        if (client.length == 0) {
            throw new AppError("Não há nenhum cliente cadastrado");
        }

        return client;
    }
}