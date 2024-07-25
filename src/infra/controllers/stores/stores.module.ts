import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { DatabaseModule } from '@database/database.module';

import { CreateStoresUseCase } from '@useCases/stores/createStores.useCase';
import { FindStoreUsersUseCase } from '@useCases/stores/findStoreUsers.useCase';
import { FindAllStoresUseCase } from '@useCases/stores/findAllStores.useCase';
import { AddUsersToStoreUseCase } from '@useCases/stores/addUsersToStore.useCase';
import { UpdateStoreUseCase } from '@useCases/stores/updateStore.useCase';
import { DeleteStoreUseCase } from '@useCases/stores/deleteStoreUseCase';
import { RemoveUserStoreUseCase } from '@useCases/stores/removeUserStore.useCase';

@Module({
  controllers: [StoresController],
  providers: [
    CreateStoresUseCase,
    FindStoreUsersUseCase,
    FindAllStoresUseCase,
    AddUsersToStoreUseCase,
    UpdateStoreUseCase,
    DeleteStoreUseCase,
    RemoveUserStoreUseCase,
  ],
  imports: [DatabaseModule],
})
export class StoresModule {}
