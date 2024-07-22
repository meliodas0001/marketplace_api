import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';

import { CreateUserUseCase } from '@useCases/users/createUser.useCase';
import { LoginUseCase } from '@useCases/users/login.useCase';

@Module({
  controllers: [UserController],
  providers: [CreateUserUseCase, LoginUseCase],
  imports: [DatabaseModule, JwtModule],
})
export class UsersModule {}
