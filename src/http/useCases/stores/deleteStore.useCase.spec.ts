import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { DeleteStoreUseCase } from './deleteStoreUseCase';

describe('delete store useCase', () => {
  let deleteStoreUseCase: DeleteStoreUseCase;

  beforeEach(() => {
    deleteStoreUseCase = new DeleteStoreUseCase(storeRepositoryMock);
  });

  it('should delete a store', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
      ownerId: '1',
    });
    (storeRepositoryMock.deleteStore as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(deleteStoreUseCase.execute('1', '1')).resolves.toBeUndefined();
  });

  it("should throw an error if store doesn't exist", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(deleteStoreUseCase.execute('1', '1')).rejects.toThrow(
      'Store not found',
    );
  });
});
