import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IUserRepository } from '@domains/repositories/IUserRepository';

import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { MockUserRepository } from '@test/mocks/userRepository.mock';

import { FindAllStoresUseCase } from './findAllStores.useCase';

describe('find all user stores', () => {
  let storeRepository: IStoreRepository;
  let userRepository: IUserRepository;
  let findAllStoresUseCase: FindAllStoresUseCase;

  const storeObj = {
    id: '1',
    store_name: 'Test',
    description: 'test',
    address: 'test',
    phone: 'test',
    ownerId: '1',
  };

  beforeEach(() => {
    storeRepository = storeRepositoryMock;
    userRepository = MockUserRepository;
    findAllStoresUseCase = new FindAllStoresUseCase(
      storeRepository,
      userRepository,
    );

    jest.clearAllMocks();
  });

  it("should return user's stores", async () => {
    (userRepository.findById as jest.Mock).mockResolvedValueOnce({ id: '1' });
    (storeRepository.findStoresByUserId as jest.Mock).mockResolvedValueOnce([
      storeObj,
    ]);

    await expect(findAllStoresUseCase.execute('1')).resolves.toEqual([
      storeObj,
    ]);
  });

  it("should return a error if user doesn't exist", async () => {
    (userRepository.findById as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(findAllStoresUseCase.execute('1')).rejects.toThrow(
      'User not found',
    );
  });
});
