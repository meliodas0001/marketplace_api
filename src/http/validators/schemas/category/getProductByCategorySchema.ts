import { IGetProductByCategory } from '@domains/dtos/products/IGetProductsByCategory';
import * as Joi from 'joi';

export const getProductByCategorySchema = Joi.object<IGetProductByCategory>({
  categoryName: Joi.string().required(),
  page: Joi.number().required(),
  pageSize: Joi.number().required(),
  storeId: Joi.string().required(),
});
