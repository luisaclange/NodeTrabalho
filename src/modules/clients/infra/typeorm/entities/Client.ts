import Order from "../../../../orders/infra/typeorm/entities/Order";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";


@Entity("clientes")
export default class Client {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    data_nascimento: string;

    @Column()
    cpf: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /**
    * Uma cliente pode ter muitos pedidos
    */
     @OneToMany(() => Order, (order) => order.cliente)
     pedidos: Order[];
}