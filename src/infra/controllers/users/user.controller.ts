import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { CreateUserUseCase } from '@useCases/users/createUser.useCase';
import { LoginUseCase } from '@useCases/users/login.useCase';

import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';
import { ILoginDTO } from '@domains/dtos/users/ILoginDTO';

import { CreateUserSchema } from '@validators/schemas/users/createUserSchema';
import { LoginSchema } from '@validators/schemas/users/loginSchema';
import { ValidatorPipe } from '@validators/validatorPipe';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  @Post()
  async create(
    @Body(new ValidatorPipe(CreateUserSchema)) user: ICreateUserDTO,
    @Res() res: Response,
  ): Promise<void> {
    const createdUser = await this.createUserUseCase.execute(user);

    res.json({ user: createdUser }).send();
  }

  @Post('login')
  async login(
    @Body(new ValidatorPipe(LoginSchema)) user: ILoginDTO,
    @Res() res: Response,
  ): Promise<void> {
    const token = await this.loginUseCase.execute(user);

    res.json({ token }).send();
  }
}
