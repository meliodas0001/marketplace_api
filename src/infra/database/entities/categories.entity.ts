import { Column, PrimaryColumn, Entity, Unique, ManyToMany } from "typeorm";
import { ProductsEntity } from "./products.entity";

@Entity("categories")
@Unique(["name", "id"])
export class CategoriesEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string

  @ManyToMany(() => ProductsEntity)
  products: ProductsEntity[]
}