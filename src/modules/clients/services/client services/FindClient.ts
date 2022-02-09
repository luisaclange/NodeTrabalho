import Client from "../../infra/typeorm/entities/Client";
import ClientRepository from "../../infra/typeorm/repositories/ClientRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class FindClient {
    public async execute(id: number): Promise<Client> {
        const clientRepository = new ClientRepository();
        const client = await clientRepository.findOne(id);

        //Caso o id informado não existe
        if (client === undefined) {
            throw new AppError("O ID informado não existe");
        }

        return client;
    }
}