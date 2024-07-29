import { ProductsEntity } from '@database/entities/products.entity';
import { IProductsRepository } from '@domains/repositories/IProductsRepository';

export const productsRepositoryMock: IProductsRepository = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findProductByName: jest.fn(),
  findProductById: jest.fn(),
  findAllStoreProducts: jest.fn(),
  findProductByCategory: jest.fn(),
};
