import { ProductsEntity } from '@database/entities/products.entity';

export interface ICreateProductsPrice {
  price: number;
  currency: string;
  products: ProductsEntity;
}
