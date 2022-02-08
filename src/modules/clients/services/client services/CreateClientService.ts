import IClientDTO from "../../dtos/IClientDTO";
import Client from "../../infra/typeorm/entities/Client";
import ClientRepository from "../../infra/typeorm/repositories/ClientRepository";
import AppError from "../../../../shared/errors/AppErrors";

export default class CreateClientService {
    public async execute(data: IClientDTO): Promise<Client> {
        const clientRepository = new ClientRepository();

        //ID não pode ser enviado no cadastro
        if (data.id) {
            throw new AppError("ID não deve ser enviado no cadastro");
        }

        //O cliente cadastrado não pode ter um mesmo cpf já cadastrado
        if (await clientRepository.findCPF(data.cpf) !== undefined) {
            throw new AppError("O CPF informado já foi cadastrado");
        }

        const client = await clientRepository.create(data);
        return client;
    }
}
