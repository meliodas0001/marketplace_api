import { IDeleteProduct } from '@domains/dtos/products/IDeleteProduct';
import * as Joi from 'joi';

export const deleteProductSchema = Joi.object<IDeleteProduct>({
  productId: Joi.string().required(),
  storeId: Joi.string().required(),
});
