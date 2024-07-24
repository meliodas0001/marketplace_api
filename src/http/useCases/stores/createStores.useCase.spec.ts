import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { CreateStoresUseCase } from './createStores.useCase';
import { MockUserRepository } from '@test/mocks/userRepository.mock';
import { RoleRepositoryMock } from '@test/mocks/roleRepository.mock';

describe('createStores useCase', () => {
  let createStoresUseCase: CreateStoresUseCase;

  const user = {
    id: '1',
    name: 'johndoe',
    email: 'johndoe@email.com',
    password: 'password',
  };

  const stores = {
    id: '1',
    store_name: 'Testt',
    description: 'test',
    address: 'test',
    phone: 'test',
    ownerId: '1',
    users: [
      {
        id: '1',
        name: 'johndoe',
        email: 'johndoe@email.com',
      },
    ],
  };

  const createStore = {
    store_name: 'Testt',
    description: 'test',
    address: 'test',
    phone: 'test',
  };

  beforeEach(() => {
    createStoresUseCase = new CreateStoresUseCase(
      storeRepositoryMock,
      MockUserRepository,
      RoleRepositoryMock,
    );
  });

  it('should create a store', async () => {
    (MockUserRepository.findByEmail as jest.Mock).mockReturnValue(user);
    (storeRepositoryMock.findStoreByOwnerId as jest.Mock).mockReturnValue([]);
    (storeRepositoryMock.create as jest.Mock).mockReturnValue(stores);

    const store = await createStoresUseCase.execute(
      createStore,
      'johndoe@email.com',
    );

    await expect(store).toEqual(stores);
  });

  it('should return a store if store already exist', async () => {
    (MockUserRepository.findByEmail as jest.Mock).mockReturnValue(user);
    (storeRepositoryMock.findStoreByOwnerId as jest.Mock).mockReturnValue([
      stores,
    ]);
    (storeRepositoryMock.create as jest.Mock).mockReturnValue(stores);

    await expect(
      createStoresUseCase.execute(createStore, 'johndoe@email.com'),
    ).rejects.toThrow('Store already exists');
  });
});
