import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  import Product from "../../../../products/infra/typeorm/entities/Product";


@Entity("categorias")
export default class Category {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    descricao: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Uma categoria pode ter muitos produtos
    // Relação Categorias com Produtos
    @OneToMany(() => Product, (product) => product.categoria)
    produtos: Product[];
}