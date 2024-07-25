import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { RemoveUserStoreUseCase } from './removeUserStore.useCase';
import { RoleRepositoryMock } from '@test/mocks/roleRepository.mock';

describe('remove user store use case', () => {
  let removeUserStoreUseCase: RemoveUserStoreUseCase;

  beforeEach(() => {
    removeUserStoreUseCase = new RemoveUserStoreUseCase(
      storeRepositoryMock,
      RoleRepositoryMock,
    );
  });

  it('should remove user from store', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
      ownerId: '2',
    });
    (storeRepositoryMock.findUserByStore as jest.Mock).mockResolvedValueOnce({
      id: '1',
    });
    (RoleRepositoryMock.deleteRole as jest.Mock).mockResolvedValueOnce(
      undefined,
    );
    (
      storeRepositoryMock.deleteUserFromStore as jest.Mock
    ).mockResolvedValueOnce(undefined);

    await expect(
      removeUserStoreUseCase.execute('1', '1'),
    ).resolves.toBeUndefined();
  });

  it("should throw an error if the store doesn't exist", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      null,
    );

    await expect(removeUserStoreUseCase.execute('1', '1')).rejects.toThrow(
      'Store not found',
    );
  });

  it('should throw an error if the user is the owner', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
      ownerId: '1',
    });

    await expect(removeUserStoreUseCase.execute('1', '1')).rejects.toThrow(
      "You can't remove the owner of the store",
    );
  });

  it("should throw an error if the user doesn't exist in the store", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
      ownerId: '2',
    });
    (storeRepositoryMock.findUserByStore as jest.Mock).mockResolvedValueOnce(
      null,
    );

    await expect(removeUserStoreUseCase.execute('1', '1')).rejects.toThrow(
      'User not found in store',
    );
  });
});
