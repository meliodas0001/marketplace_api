import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import configTypeorm from './infra/database/typeorm';

import { UsersModule } from './infra/controllers/users/users.module';
import { RolesModule } from './infra/controllers/roles/roles.module';
import { DataSource } from 'typeorm';
import { StoresModule } from './infra/controllers/stores/stores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configTypeorm),
    UsersModule,
    RolesModule,
    StoresModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
