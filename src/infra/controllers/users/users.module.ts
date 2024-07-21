import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/http/useCases/users/createUser.useCase';

@Module({
  controllers: [UserController],
  providers: [CreateUserUseCase],
  imports: [DatabaseModule],
})
export class UsersModule {}
