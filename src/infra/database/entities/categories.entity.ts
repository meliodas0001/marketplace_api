import { Column, PrimaryColumn, Entity, Unique, ManyToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProductsEntity } from './products.entity';

@Entity('categories')
@Unique(['name', 'id'])
export class CategoriesEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => ProductsEntity)
  products: ProductsEntity[];

  constructor() {
    this.id = uuid();
  }
}
