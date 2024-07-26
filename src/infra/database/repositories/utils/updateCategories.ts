import { CategoriesEntity } from '@database/entities/categories.entity';

export function updateCategories(
  currentCategories: CategoriesEntity[],
  newCategories: CategoriesEntity[],
): CategoriesEntity[] {
  const map = new Map<string, CategoriesEntity>();

  currentCategories.forEach((item) => map.set(item.id, item));
  newCategories.forEach((item) => map.set(item.id, item));

  return Array.from(map.values());
}
