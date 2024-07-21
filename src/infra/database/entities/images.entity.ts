import { Column, PrimaryColumn, ManyToOne, Entity } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProductsEntity } from './products.entity';

@Entity('images')
export class ImagesEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => ProductsEntity, (products) => products.images)
  products: ProductsEntity;

  constructor() {
    this.id = uuid();
  }
}
