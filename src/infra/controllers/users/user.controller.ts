import { Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/http/useCases/users/createUser.useCase';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(): Promise<void> {
    await this.createUserUseCase.execute({
      email: 'teste',
      name: 'teste',
      password: 'teste',
    });
  }
}
