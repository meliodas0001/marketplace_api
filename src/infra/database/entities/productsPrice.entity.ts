import { Column, Entity, JoinColumn, PrimaryColumn, OneToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProductsEntity } from './products.entity';

@Entity('products_price')
export class ProductsPriceEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @OneToOne(() => ProductsEntity, (products) => products.productsPrice)
  @JoinColumn({ name: 'products_id' })
  products: ProductsEntity;

  constructor() {
    this.id = uuid();
  }
}
