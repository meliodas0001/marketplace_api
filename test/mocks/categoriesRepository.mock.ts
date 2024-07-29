import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';

export const categoriesRepositoryMock: ICategoriesRepository = {
  create: jest.fn(),
  listCategories: jest.fn(),
  findCategoryByName: jest.fn(),
  updateCategoryName: jest.fn(),
  deleteCategory: jest.fn(),
  findCategoriesByIds: jest.fn(),
};
