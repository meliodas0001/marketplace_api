import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { IUserRepository } from '@domains/repositories/IUserRepository';

import { AddUsersToStoreUseCase } from './addUsersToStore.useCase';

import { MockUserRepository } from '@test/mocks/userRepository.mock';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { RoleRepositoryMock } from '@test/mocks/roleRepository.mock';

describe('Add Users to store use case', () => {
  let userRepository: IUserRepository;
  let storeRepository: IStoreRepository;
  let rolesRepository: IRoleRepository;
  let addUsersToStoreUseCase: AddUsersToStoreUseCase;

  beforeEach(() => {
    userRepository = MockUserRepository;
    storeRepository = storeRepositoryMock;
    rolesRepository = RoleRepositoryMock;

    addUsersToStoreUseCase = new AddUsersToStoreUseCase(
      userRepository,
      storeRepository,
      rolesRepository,
    );

    jest.clearAllMocks();
  });

  const addUsersObj = {
    storeId: '1',
    usersIds: ['1', '2'],
  };

  const findStoreUsersReturnValue = [
    {
      id: '1',
      users: [],
    },
    {
      id: '2',
      users: [],
    },
  ];

  const userFindByIdsReturnValue = [{ id: '1' }, { id: '2' }];

  it('should add users to store', async () => {
    (storeRepository.findStoreUsers as jest.Mock).mockResolvedValueOnce(
      findStoreUsersReturnValue,
    );

    (userRepository.findByIds as jest.Mock).mockResolvedValueOnce(
      userFindByIdsReturnValue,
    );

    await expect(
      addUsersToStoreUseCase.execute(addUsersObj.storeId, addUsersObj.usersIds),
    ).resolves.toBeUndefined();
  });

  it('should return a error if store not found', async () => {
    (storeRepository.findStoreUsers as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(
      addUsersToStoreUseCase.execute(addUsersObj.storeId, addUsersObj.usersIds),
    ).rejects.toThrow('Store not found');
  });

  it('should return a error if user already in store', async () => {
    (storeRepository.findStoreUsers as jest.Mock).mockResolvedValueOnce([
      {
        users: [
          {
            id: '1',
          },
        ],
      },
    ]);

    (userRepository.findByIds as jest.Mock).mockResolvedValueOnce(
      userFindByIdsReturnValue,
    );

    await expect(
      addUsersToStoreUseCase.execute(addUsersObj.storeId, ['1']),
    ).rejects.toThrow('User already in store, user id: 1');
  });

  it('should return a error if some users not found', async () => {
    (storeRepository.findStoreUsers as jest.Mock).mockResolvedValueOnce(
      findStoreUsersReturnValue,
    );

    (userRepository.findByIds as jest.Mock).mockResolvedValueOnce([
      userFindByIdsReturnValue,
    ]);

    await expect(
      addUsersToStoreUseCase.execute(addUsersObj.storeId, ['1']),
    ).rejects.toThrow('Some users not found');
  });
});
