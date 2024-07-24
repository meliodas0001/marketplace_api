import { IStoreUpdate } from '@domains/dtos/store/IStoreUpdate';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';

export const storeRepositoryMock: IStoreRepository = {
  create: jest.fn(),
  findStoreById: jest.fn(),
  findStoreByOwnerId: jest.fn(),
  findStoreUsers: jest.fn(),
  findStoresByUserId: jest.fn(),
  addUsersToStore: jest.fn(),
  updateStore: jest.fn(),
};
