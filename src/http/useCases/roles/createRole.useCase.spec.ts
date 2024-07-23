import { RoleRepositoryMock } from '@test/mocks/roleRepository.mock';
import { CreateRoleUseCase } from './createRole.useCase';
import { MockUserRepository } from '@test/mocks/userRepository.mock';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { RoleEnum } from '@domains/enums/RoleEnum';

describe('createRole useCase', () => {
  let createRoleUseCase: CreateRoleUseCase;

  const role = {
    role: RoleEnum.Admin,
    storeId: '1',
  };

  const returnRole = {
    id: '1',
    role: 'Admin',
    storeId: '1',
    userId: '1',
  };

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

  const returnedRoleWithUser = {
    id: '1',
    role: 'Admin',
    storeId: '1',
    userId: '1',
    user: { id: '1', name: 'johndoe', email: 'johndoe@email.com' },
  };

  beforeEach(() => {
    createRoleUseCase = new CreateRoleUseCase(
      RoleRepositoryMock,
      MockUserRepository,
      storeRepositoryMock,
    );
  });

  (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
    stores,
  );

  it('should create a role', async () => {
    (MockUserRepository.findByEmail as jest.Mock).mockResolvedValueOnce(user);
    (RoleRepositoryMock.findRoleByUserId as jest.Mock).mockResolvedValueOnce(
      [],
    );
    (RoleRepositoryMock.create as jest.Mock).mockResolvedValueOnce(returnRole);

    const createRole = await createRoleUseCase.execute(
      role,
      'johndoe@email.com',
    );

    expect(createRole).toEqual(returnedRoleWithUser);
  });

  it('should return a error if store not exist', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      null,
    );

    await expect(
      createRoleUseCase.execute(role, 'johndoe@email.com'),
    ).rejects.toThrow('Store not found');
  });

  it('should return a error if user role already exist', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      stores,
    );
    (MockUserRepository.findByEmail as jest.Mock).mockResolvedValueOnce(user);
    (RoleRepositoryMock.findRoleByUserId as jest.Mock).mockResolvedValueOnce([
      returnRole,
    ]);

    await expect(
      createRoleUseCase.execute(role, 'johndoe@email.com'),
    ).rejects.toThrow('User role already exist');
  });
});
