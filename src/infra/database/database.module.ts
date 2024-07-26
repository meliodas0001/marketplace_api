import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserEntity } from './entities/user.entity';
import { RolesEntity } from './entities/roles.entity';
import { StoreEntity } from './entities/store.entity';

import { IUserRepository } from '@domains/repositories/IUserRepository';
import { IRoleRepository } from '@domains/repositories/IRoleRepository';
import { IStoreRepository } from '@domains/repositories/IStoreRepository';
import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';
import { IProductsPriceRepository } from '@domains/repositories/IProductsPriceRepository';
import { IProductsRepository } from '@domains/repositories/IProductsRepository';

import { UserRepository } from '@repositories/user.repository';
import { RoleRepository } from '@repositories/role.repository';
import { StoreRepository } from '@repositories/store.repository';
import { CategoriesRepository } from '@repositories/categories.repository';
import { CategoriesEntity } from '@entities/categories.entity';
import { ProductsEntity } from '@entities/products.entity';
import { ProductsRepository } from '@repositories/products.repository';
import { ProductsPriceEntity } from '@entities/productsPrice.entity';
import { ProductsPriceRepository } from '@repositories/productsPrice.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RolesEntity,
      StoreEntity,
      CategoriesEntity,
      ProductsEntity,
      ProductsPriceEntity,
    ]),
  ],
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
    {
      provide: ICategoriesRepository,
      useClass: CategoriesRepository,
    },
    {
      provide: IProductsRepository,
      useClass: ProductsRepository,
    },
    {
      provide: IProductsPriceRepository,
      useClass: ProductsPriceRepository,
    },
  ],
  exports: [
    IUserRepository,
    IRoleRepository,
    IStoreRepository,
    ICategoriesRepository,
    IProductsRepository,
    IProductsPriceRepository,
  ],
})
export class DatabaseModule {}
