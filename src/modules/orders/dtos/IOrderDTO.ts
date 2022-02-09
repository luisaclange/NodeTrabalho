import IOrderProductDTO from "./IOrderProductDTO";

export default interface IOrderDTO {
    id?: number;
    data: string;
    status?: string;
    forma_pagamento: string;
    valor?: number;
    desconto: number;
    cliente_id: number;
    pedido_produtos: IOrderProductDTO[];
}