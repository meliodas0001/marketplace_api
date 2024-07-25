import { IDeleteCategory } from '@domains/dtos/categories/IDeleteCategory';
import * as Joi from 'joi';

export const DeleteCategorySchema = Joi.object<IDeleteCategory>({
  name: Joi.string().required(),
  storeId: Joi.string().uuid().required(),
});
