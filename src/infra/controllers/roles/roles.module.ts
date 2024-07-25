import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { RolesController } from './roles.controller';
import { UpdateRoleUseCase } from '@useCases/roles/updateRole.useCase';

@Module({
  providers: [UpdateRoleUseCase],
  controllers: [RolesController],
  imports: [DatabaseModule],
})
export class RolesModule {}
