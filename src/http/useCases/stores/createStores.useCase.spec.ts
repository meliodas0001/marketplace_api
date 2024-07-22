import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { CreateStoresUseCase } from './createStores.useCase';
import { MockUserRepository } from '@test/mocks/userRepository.mock';

describe('createStores useCase', () => {
  const createStoresUseCase = new CreateStoresUseCase(
    storeRepositoryMock,
    MockUserRepository,
  );

  it('should create a store', async () => {
    const store = {
      store_name: 'mocked_store_name',
      description: 'mocked_store_description',
      address: 'mocked_store_address',
      ownerId: 'mocked_owner_id',
      phone: 'mocked_store_phone',
    };

    expect(await createStoresUseCase.execute(store, 'store_null')).toEqual({
      id: 'mocked_id',
      store_name: 'mocked_store_name',
      description: 'mocked_store_description',
      address: 'mocked_store_address',
      ownerId: 'mocked_owner_id',
      phone: 'mocked_store_phone',
      users: [
        {
          id: 'mocked_user_id',
          name: 'mocked_user_name',
          email: 'mocked_user_email',
        },
      ],
    });
  });

  it('should not create a store if it already exists', async () => {
    const store = {
      store_name: 'mocked_store_name',
      description: 'mocked_store_description',
      address: 'mocked_store_address',
      ownerId: 'mocked_owner_id',
      phone: 'mocked_store_phone',
    };

    expect(createStoresUseCase.execute(store, 'return_user')).rejects.toThrow(
      'Store already exists',
    );
  });
});
