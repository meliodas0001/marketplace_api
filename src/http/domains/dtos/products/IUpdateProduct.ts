import { CategoriesEntity } from '@database/entities/categories.entity';

export interface IUpdateProduct {
  productId: string;
  name?: string;
  description?: string;
  categories?: CategoriesEntity[];
}
