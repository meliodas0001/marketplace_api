import { IStoreRepository } from '@domains/repositories/IStoreRepository';

export const storeRepositoryMock: IStoreRepository = {
  create: jest.fn(),
  findStoreById: jest.fn(),
  findStoreByOwnerId: jest.fn(),
};
