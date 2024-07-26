import { ProductsEntity } from '@database/entities/products.entity';
import { ICreateProduct } from '@domains/dtos/products/ICreateProducts';
import { IUpdateProduct } from '@domains/dtos/products/IUpdateProduct';

export abstract class IProductsRepository {
  abstract create(product: ICreateProduct): Promise<ProductsEntity>;
  abstract update(product: IUpdateProduct): Promise<ProductsEntity>;
  abstract delete(id: string): Promise<void>;
  abstract findProductByName(name: string): Promise<ProductsEntity>;
  abstract findProductById(id: string): Promise<ProductsEntity>;
}
