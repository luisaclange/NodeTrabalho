import Client from "../../infra/typeorm/entities/Client";
import ClientRepository from "../../infra/typeorm/repositories/ClientRepository";
import IClientDTO from "../../dtos/IClientDTO";
import AppError from "../../../../shared/errors/AppErrors";
import FindClient from "./FindClient";

export default class UpdateClient {
    public async execute(data: IClientDTO, id: number): Promise<Client|undefined> {
        const clientRepository = new ClientRepository();
        const serviceFindClient = new FindClient();

        //ID não pode ser enviado no json
        if (data.id) {
            throw new AppError("ID deve ser informado somente na url");
        }

        //Para atualizar, deve existir um ID prévio
        serviceFindClient.execute(id);

        //Atualiza
        const client = await clientRepository.update(data, id);
        return client;
    }
}