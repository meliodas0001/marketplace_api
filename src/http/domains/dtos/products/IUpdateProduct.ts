import { CategoriesEntity } from '@database/entities/categories.entity';

export interface IUpdateProduct {
  id: string;
  name?: string;
  description?: string;
  categories?: CategoriesEntity[];
}
