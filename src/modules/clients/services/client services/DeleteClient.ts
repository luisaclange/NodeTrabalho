import Client from "../../infra/typeorm/entities/Client";
import ClientRepository from "../../infra/typeorm/repositories/ClientRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class DeleteClient {
    public async execute(id: number): Promise<Client[]> {
        const clientRepository = new ClientRepository();

        //Para excluir, deve existir um ID prévio
        if (await clientRepository.findOne(id) === undefined) {
            throw new AppError("O ID informado não existe");
        }

        const client = await clientRepository.delete(id);
        return client;
    }
}