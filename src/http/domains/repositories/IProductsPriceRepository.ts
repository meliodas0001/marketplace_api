export abstract class IProductsPriceRepository {
  abstract create(productsPrice: ICreateProductsPrice): Promise<void>;
  abstract update(productsPrice: ICreateProductsPrice): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
