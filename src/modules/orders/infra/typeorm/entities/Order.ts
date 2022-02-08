import Client from "../../../../clients/infra/typeorm/entities/Client";
import OrderProduct from "./OrderProduct";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";


@Entity("pedidos")
export default class Order {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    data: string;

    @Column()
    status: string;

    @Column()
    forma_pagamento: string;

    @Column("float", { scale: 10, precision: 2 })
    valor: number;

    @Column("float", { scale: 10, precision: 2 })
    desconto: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    cliente_id: number;
    /**
    * Muitos pedidos podem ter o mesmo cliente
    */

    @ManyToOne(() => Client, (client) => client.pedidos)
    @JoinColumn({ name: "cliente_id" })
    cliente: Client;

    @OneToMany(() => OrderProduct, (order_product) => order_product.pedido, {
      cascade: true,
    })
    pedido_produtos: OrderProduct[];
}