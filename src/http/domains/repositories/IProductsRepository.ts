import { ProductsEntity } from '@database/entities/products.entity';
import { ICreateProduct } from '@domains/dtos/products/ICreateProducts';
import { IUpdateProducts } from '@domains/dtos/products/IUpdateProducts';

export abstract class IProductsRepository {
  abstract create(product: ICreateProduct): Promise<ProductsEntity>;
  abstract update(product: IUpdateProducts): Promise<ProductsEntity>;
  abstract delete(id: string): Promise<void>;
  abstract findProductByName(name: string): Promise<ProductsEntity>;
}
