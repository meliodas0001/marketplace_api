import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserEntity } from './entities/user.entity';
import { RolesEntity } from './entities/roles.entity';
import { StoreEntity } from './entities/store.entity';

import { IUserRepository } from '@domains/repositories/IUserRepository';
import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';

import { UserRepository } from '@repositories/user.repository';
import { RoleRepository } from './repositories/role.repository';
import { StoreRepository } from './repositories/store.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity, StoreEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
    {
      provide: IStoreRepository,
      useClass: StoreRepository,
    },
  ],
  exports: [IUserRepository, IRoleRepository, IStoreRepository],
})
export class DatabaseModule {}
