import { categoriesRepositoryMock } from '@test/mocks/categoriesRepository.mock';
import { DeleteCategoryUseCase } from './deleteCategory.useCase';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';

describe('delete category use case', () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase;

  beforeEach(() => {
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoriesRepositoryMock,
      storeRepositoryMock,
    );
  });

  it('should delete a category', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
    });
    (
      categoriesRepositoryMock.findCategoryByName as jest.Mock
    ).mockResolvedValueOnce({ id: '1' });
    (
      categoriesRepositoryMock.deleteCategory as jest.Mock
    ).mockResolvedValueOnce(undefined);

    await expect(
      deleteCategoryUseCase.execute('category', '1'),
    ).resolves.toBeUndefined();
  });

  it("should throw an error if store doesn't exist", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(
      deleteCategoryUseCase.execute('category', '1'),
    ).rejects.toThrow('Store not found');
  });

  it("should throw an error if category doesn't exist", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
    });

    (
      categoriesRepositoryMock.findCategoryByName as jest.Mock
    ).mockResolvedValueOnce(undefined);

    await expect(
      deleteCategoryUseCase.execute('category', '1'),
    ).rejects.toThrow('Category not found');
  });
});
