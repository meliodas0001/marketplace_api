import * as Joi from 'joi';

export interface IFindStoreUsersSchema {
  storeId: string;
}

export const findStoreUsersSchema = Joi.object<IFindStoreUsersSchema>({
  storeId: Joi.string().uuid().required(),
});
