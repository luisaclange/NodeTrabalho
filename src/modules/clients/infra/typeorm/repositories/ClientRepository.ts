import IClientDTO from "../../../dtos/IClientDTO";
import IClientRepository from "../../../repositories/IClientRepository";
import { getRepository, Repository } from "typeorm";
import Client from "../entities/Client";

export default class ClientRepository implements
IClientRepository {
private ormRepository: Repository<Client>;

    //Construtor
    constructor() {
        this.ormRepository = getRepository(Client);
    }

    //Criar cliente
    async create(data: IClientDTO): Promise<Client> {
        const client = this.ormRepository.create(data);
        return this.ormRepository.save(client);
    }

    //Listar clientes
    async find(): Promise<Client[]> {
        return this.ormRepository.find();
    }

    //Buscar um cliente pelo ID
    async findOne(id: number): Promise<Client|undefined> {
        return this.ormRepository.findOne(id);
    }

    //Buscar um cliente pelo CPF
    async findCPF(cpf: string): Promise<Client|undefined> {
        const list = await this.ormRepository.find();
        var client = undefined;
        (await list).forEach((c: Client) => {
            if (c.cpf == cpf) {
                client = this.ormRepository.findOne(c.id);
            }
        })
        return client;
    }

    //Atualizar um cliente
    async update(data: IClientDTO,id: number): Promise<Client> {
        await this.ormRepository.delete(id);
        data.id = id;
        const client = await this.ormRepository.create(data);
        return this.ormRepository.save(client);
    }

    //Deletar um cliente pelo ID
    async delete(id: number): Promise<Client[]> {
        await this.ormRepository.delete(id);
        return this.ormRepository.find();
    }
}
