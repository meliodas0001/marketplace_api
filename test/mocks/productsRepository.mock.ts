import { IProductsRepository } from '@domains/repositories/IProductsRepository';

export const productsRepositoryMock: IProductsRepository = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findProductByName: jest.fn(),
};
