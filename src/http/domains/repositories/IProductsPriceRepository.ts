import { ProductsPriceEntity } from '@database/entities/productsPrice.entity';
import { ICreateProductsPrice } from '@domains/dtos/productsPrice/ICreateProductsPrice';
import { IUpdateProductsPrice } from '@domains/dtos/productsPrice/IUpdateProductsPrice';

export abstract class IProductsPriceRepository {
  abstract create(
    productsPrice: ICreateProductsPrice,
  ): Promise<ProductsPriceEntity>;
  abstract update(
    productsPrice: IUpdateProductsPrice,
  ): Promise<ProductsPriceEntity>;
  abstract delete(id: string): Promise<void>;
}
