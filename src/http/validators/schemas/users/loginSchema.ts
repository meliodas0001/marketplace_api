import * as Joi from 'joi';
import { ILoginDTO } from '@domains/dtos/users/ILoginDTO';

export const LoginSchema = Joi.object<ILoginDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
