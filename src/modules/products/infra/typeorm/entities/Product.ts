import Category from "../../../../categories/infra/typeorm/entities/Category";
import OrderProduct from "../../../../orders/infra/typeorm/entities/OrderProduct";
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


@Entity("produtos")
export default class Product {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    nome: string;

    @Column("float", { scale: 10, precision: 2 })
    preco: number;

    @Column()
    quantidade_estoque: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    categoria_id: number;
    
    //Um produto possui muitas categorias
    //Relação Produtos com Categorias
    @ManyToOne(() => Category, (category) => category.produtos)
    @JoinColumn({ name: "categoria_id" })
    categoria: Category;

    //Relação n:n com pedidos
    @OneToMany(() => OrderProduct, (order_product) => order_product.produto, {
      cascade: true,
    })
    pedido_produtos: OrderProduct[];
}