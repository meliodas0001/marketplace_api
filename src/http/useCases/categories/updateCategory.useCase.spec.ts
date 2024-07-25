import { categoriesRepositoryMock } from '@test/mocks/categoriesRepository.mock';
import { UpdateCategoryUseCase } from './updateCategory.useCase';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';

describe('update category use case', () => {
  let updateCategoryUseCase: UpdateCategoryUseCase;

  const updateCategory = {
    name: 'category',
    storeId: '1',
  };

  beforeEach(() => {
    updateCategoryUseCase = new UpdateCategoryUseCase(
      categoriesRepositoryMock,
      storeRepositoryMock,
    );
  });

  it('should update a category', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
    });

    (
      categoriesRepositoryMock.findCategoryByName as jest.Mock
    ).mockResolvedValueOnce({ id: '1' });

    (
      categoriesRepositoryMock.updateCategoryName as jest.Mock
    ).mockResolvedValueOnce({ id: '1' });

    await expect(
      updateCategoryUseCase.execute(updateCategory),
    ).resolves.toEqual({ id: '1' });
  });

  it("should throw an error if store doesn't exist", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(updateCategoryUseCase.execute(updateCategory)).rejects.toThrow(
      'Store not found',
    );
  });

  it("should throw an error if category doesn't exist", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
    });

    (
      categoriesRepositoryMock.findCategoryByName as jest.Mock
    ).mockResolvedValueOnce(undefined);

    await expect(updateCategoryUseCase.execute(updateCategory)).rejects.toThrow(
      'Category not found',
    );
  });
});
