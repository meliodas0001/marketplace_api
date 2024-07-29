import { IStoreRepository } from '@domains/repositories/IStoreRepository';

export const storeRepositoryMock: IStoreRepository = {
  create: jest.fn(),
  findStoreById: jest.fn(),
  findStoreByOwnerId: jest.fn(),
  findStoreUsers: jest.fn(),
  findStoresByUserId: jest.fn(),
  addUsersToStore: jest.fn(),
  updateStore: jest.fn(),
  deleteStore: jest.fn(),
  deleteUserFromStore: jest.fn(),
  findUserByStore: jest.fn(),
  findStoreByName: jest.fn(),
};
