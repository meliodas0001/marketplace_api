import { IProductsPriceRepository } from '@domains/repositories/IProductsPriceRepository';

export const productsPriceRepositoryMock: IProductsPriceRepository = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
