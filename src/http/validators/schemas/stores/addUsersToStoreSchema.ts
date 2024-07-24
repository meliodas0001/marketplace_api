import * as Joi from 'joi';
import { IAddUsersToStore } from '@domains/dtos/store/IAddUsersToStore';

export const AddUsersToStoreSchema = Joi.object<IAddUsersToStore>({
  storeId: Joi.string().uuid().required(),
  usersIds: Joi.array().items(Joi.string().uuid()).required(),
});
