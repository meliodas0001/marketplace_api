import { categoriesRepositoryMock } from '@test/mocks/categoriesRepository.mock';
import { ListCategoriesUseCase } from './ListCategories.useCase';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';

describe('list categories use case', () => {
  let listCategoriesUseCase: ListCategoriesUseCase;

  beforeEach(() => {
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryMock,
      storeRepositoryMock,
    );
  });

  const categoriesList = {
    storeId: '1',
    id: '1',
    name: 'category',
  };

  it('should list categories', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce({
      id: '1',
    });
    (
      categoriesRepositoryMock.listCategories as jest.Mock
    ).mockResolvedValueOnce([categoriesList]);

    await expect(listCategoriesUseCase.execute('1')).resolves.toEqual([
      categoriesList,
    ]);
  });

  it("should throw an error if store doesn't exist", async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    await expect(listCategoriesUseCase.execute('1')).rejects.toThrow(
      'Store not found',
    );
  });
});
