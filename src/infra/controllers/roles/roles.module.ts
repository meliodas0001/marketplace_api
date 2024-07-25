import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { CreateRoleUseCase } from '@useCases/roles/createRole.useCase';

import { RolesController } from './roles.controller';
import { UpdateRoleUseCase } from '@useCases/roles/updateRole.useCase';

@Module({
  providers: [CreateRoleUseCase, UpdateRoleUseCase],
  controllers: [RolesController],
  imports: [DatabaseModule],
})
export class RolesModule {}
