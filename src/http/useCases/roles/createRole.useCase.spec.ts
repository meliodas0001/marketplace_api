import { RoleRepositoryMock } from '@test/mocks/roleRepository.mock';
import { CreateRoleUseCase } from './createRole.useCase';
import { MockUserRepository } from '@test/mocks/userRepository.mock';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { RoleEnum } from '@domains/enums/RoleEnum';

describe('createRole useCase', () => {
  const createRoleUseCase = new CreateRoleUseCase(
    RoleRepositoryMock,
    MockUserRepository,
    storeRepositoryMock,
  );

  it('should create a role', async () => {
    const role = {
      role: RoleEnum.Admin,
      storeId: 'store_null',
    };

    expect(await createRoleUseCase.execute(role, 'role_null')).toEqual({
      id: 'mocked_id',
      role: 'Admin',
      storeId: 'store_null',
      user: {
        id: 'null',
        email: 'sla',
        name: 'new_user',
        role: [],
      },
    });
  });

  it('should throw an error if the store does not exist', async () => {
    const role = {
      role: RoleEnum.Admin,
      storeId: 'null',
    };

    await expect(createRoleUseCase.execute(role, 'role_null')).rejects.toThrow(
      'Store not found',
    );
  });

  it('should throw an error if the role already exists', async () => {
    const role = {
      role: RoleEnum.Admin,
      storeId: 'mocked_id',
    };

    await expect(
      createRoleUseCase.execute(role, 'return_user'),
    ).rejects.toThrow('User role already exist');
  });
});
