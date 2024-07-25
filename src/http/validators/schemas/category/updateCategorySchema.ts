import * as Joi from 'joi';
import { IUpdateCategory } from '@domains/dtos/categories/IUpdateCategory';

export const UpdateCategorySchema = Joi.object<IUpdateCategory>({
  name: Joi.string().required(),
  storeId: Joi.string().uuid().required(),
  updatedName: Joi.string().required(),
});
