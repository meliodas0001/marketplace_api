import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { CreateRoleUseCase } from '@useCases/roles/createRole.useCase';

import { RolesController } from './roles.controller';

@Module({
  providers: [CreateRoleUseCase],
  controllers: [RolesController],
  imports: [DatabaseModule],
})
export class RolesModule {}
