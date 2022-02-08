import IClientDTO from "../dtos/IClientDTO";
import Client from "../infra/typeorm/entities/Client";

export default interface IClientRepository {
    create(data: IClientDTO): Promise<Client>;
    find(): Promise<Client[]>;
    findOne(id: number): Promise<Client|undefined>;
    update(data: IClientDTO, id: number): Promise<Client>;
    delete(id: number): Promise<Client[]>;
}