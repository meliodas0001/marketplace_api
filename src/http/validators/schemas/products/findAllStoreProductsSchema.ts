import { IFindAllStoreProducts } from '@domains/dtos/products/IFindAllStoreProducts';
import * as Joi from 'joi';

export const FindAllStoreProductsSchema = Joi.object<IFindAllStoreProducts>({
  storeId: Joi.string().required(),
  page: Joi.number().required(),
  pageSize: Joi.number().required().min(1),
});
