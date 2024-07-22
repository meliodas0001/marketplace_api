import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserEntity } from './entities/user.entity';
import { RolesEntity } from './entities/roles.entity';

import { IUserRepository } from '@domains/repositories/IUserRepository';
import { IRoleRepository } from '@domains/repositories/IRoleRepository';

import { UserRepository } from '@repositories/user.repository';
import { RoleRepository } from './repositories/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
  ],
  exports: [IUserRepository, IRoleRepository],
})
export class DatabaseModule {}
