import Client from "../../infra/typeorm/entities/Client";
import ClientRepository from "../../infra/typeorm/repositories/ClientRepository";
import IClientDTO from "../../dtos/IClientDTO";
import AppError from "../../../../shared/errors/AppErrors";

export default class UpdateClient {
    public async execute(data: IClientDTO, id: number): Promise<Client|undefined> {
        const clientRepository = new ClientRepository();

        //ID não pode ser enviado no json
        if (data.id) {
            throw new AppError("ID deve ser informado somente na url");
        }

        //Para atualizar, deve existir um ID prévio
        if (await clientRepository.findOne(id) === undefined) {
            throw new AppError("O ID informado não existe");
        }

        //Atualiza
        const client = await clientRepository.update(data, id);
        return client;
    }
}