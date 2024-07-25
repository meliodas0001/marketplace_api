import { categoriesRepositoryMock } from '@test/mocks/categoriesRepository.mock';
import { CreateCategoryUseCase } from './CreateCategory.useCase';
import { storeRepositoryMock } from '@test/mocks/storeRepository.mock';

describe('Create category use case', () => {
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryMock,
      storeRepositoryMock,
    );
  });

  const createdCategory = { id: '1', name: 'category', storeId: '1' };

  it('should create a category', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValue({
      id: '1',
    });
    (
      categoriesRepositoryMock.findCategoryByName as jest.Mock
    ).mockResolvedValue(null);
    (categoriesRepositoryMock.create as jest.Mock).mockResolvedValue(
      createdCategory,
    );

    await expect(
      createCategoryUseCase.execute('category', '1'),
    ).resolves.toEqual(createdCategory);
  });

  it('should not create a category if store does not exist', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValue(null);

    await expect(
      createCategoryUseCase.execute('category', '1'),
    ).rejects.toThrow('Store not found');
  });

  it('should not create a category if it already exists', async () => {
    (storeRepositoryMock.findStoreById as jest.Mock).mockResolvedValue({
      id: '1',
    });
    (
      categoriesRepositoryMock.findCategoryByName as jest.Mock
    ).mockResolvedValue({ id: '1', name: 'category', storeId: '1' });

    await expect(
      createCategoryUseCase.execute('category', '1'),
    ).rejects.toThrow('Category already exists');
  });
});
