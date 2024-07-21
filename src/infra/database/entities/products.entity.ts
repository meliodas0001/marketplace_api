import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ImagesEntity } from './images.entity';
import { ProductsPriceEntity } from './productsPrice.entity';
import { CategoriesEntity } from './categories.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => ImagesEntity, (images) => images.products)
  images: ImagesEntity[];

  @OneToOne(
    () => ProductsPriceEntity,
    (productsPrice) => productsPrice.products,
  )
  productsPrice: ProductsPriceEntity;

  @ManyToMany(() => CategoriesEntity)
  @JoinTable({
    name: 'products_categories',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: CategoriesEntity[];

  constructor() {
    this.id = uuid();
  }
}
