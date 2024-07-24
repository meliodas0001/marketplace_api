import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';
import { UpdateStoreUseCase } from './updateStore.useCase';

describe('update store use case', () => {
  let storeRepository: IStoreRepository;
  let updateStoreUseCase: UpdateStoreUseCase;

  beforeEach(() => {
    storeRepository = storeRepositoryMock;
    updateStoreUseCase = new UpdateStoreUseCase(storeRepository);
  });

  it('should update a store', async () => {
    (storeRepository.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
    });
    (storeRepository.updateStore as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(
      updateStoreUseCase.execute({ storeId: '1', store_name: 'test' }),
    ).resolves.toBeUndefined();
  });

  it("should return a error if store doesn't exist", async () => {
    (storeRepository.findStoreById as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(
      updateStoreUseCase.execute({ storeId: '1', store_name: 'test' }),
    ).rejects.toThrow('Store not found');
  });
});
