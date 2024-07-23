import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { DatabaseModule } from '@database/database.module';
import { CreateStoresUseCase } from '@useCases/stores/createStores.useCase';
import { FindStoreUsersUseCase } from '@useCases/stores/findStoreUsers.useCase';

@Module({
  controllers: [StoresController],
  providers: [CreateStoresUseCase, FindStoreUsersUseCase],
  imports: [DatabaseModule],
})
export class StoresModule {}
