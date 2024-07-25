import { RoleRepositoryMock } from '@test/mocks/roleRepository.mock';
import { UpdateRoleUseCase } from './updateRole.useCase';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';

describe('update role use case', () => {
  let updateRoleUseCase: UpdateRoleUseCase;

  beforeEach(() => {
    updateRoleUseCase = new UpdateRoleUseCase(
      RoleRepositoryMock,
      storeRepositoryMock,
    );
  });

  it('should update a role', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
      ownerId: '1',
    });
    (RoleRepositoryMock.findRoleByUserId as jest.Mock).mockResolvedValueOnce({
      id: '1',
      role: 'Admin',
    });
    (RoleRepositoryMock.updateRole as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(
      updateRoleUseCase.execute('1', '1', 'User', '2'),
    ).resolves.toBeUndefined();
  });

  it("should throw an error if the store doesn't exist", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(
      updateRoleUseCase.execute('1', '1', 'User', '2'),
    ).rejects.toThrow('Store not found');
  });

  it("should throw an error if the role doesn't exist", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
      ownerId: '1',
    });
    (RoleRepositoryMock.findRoleByUserId as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(
      updateRoleUseCase.execute('1', '1', 'User', '2'),
    ).rejects.toThrow('Role not found');
  });

  it('should throw an error if the user is trying to add admin without being the owner', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
      ownerId: '2',
    });

    (RoleRepositoryMock.findRoleByUserId as jest.Mock).mockResolvedValueOnce({
      id: '1',
      role: 'Admin',
    });

    await expect(
      updateRoleUseCase.execute('1', '1', 'Admin', '2'),
    ).rejects.toThrow('User not authorized');
  });
});
