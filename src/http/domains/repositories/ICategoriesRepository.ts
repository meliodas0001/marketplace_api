import { CategoriesEntity } from '@database/entities/categories.entity';

export abstract class ICategoriesRepository {
  abstract create(name: string, storeId: string): Promise<CategoriesEntity>;
  abstract listCategories(storeId: string): Promise<CategoriesEntity[]>;
  abstract findCategoryByName(
    name: string,
    storeId: string,
  ): Promise<CategoriesEntity>;
  abstract updateCategoryName(
    nameSearch: string,
    name: string,
    storeId: string,
  ): Promise<CategoriesEntity>;
  abstract deleteCategory(name: string, storeId: string): Promise<void>;
  abstract findCategoriesByIds(ids: string[]): Promise<CategoriesEntity[]>;
}
