import { StoreEntity } from '@database/entities/store.entity';
import { UserEntity } from '@database/entities/user.entity';
import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';

export const storeRepositoryMock: IStoreRepository = {
  create: jest
    .fn()
    .mockImplementation((store: IStoreCreateDTO, user: UserEntity) => ({
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
    })),
  findStoreById: jest.fn().mockImplementation(async (id: string) => ({
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
  })),
  findStoreByOwnerId: jest.fn().mockImplementation(async (ownerId: string) => [
    {
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
    },
  ]),
};
