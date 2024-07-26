import { CategoriesEntity } from '@database/entities/categories.entity';

export interface ICreateProduct {
  name: string;
  description: string;
  category: CategoriesEntity;
}

export interface ICreateProductDTO {
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  storeId: string;
}
