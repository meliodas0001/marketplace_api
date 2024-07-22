import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { DatabaseModule } from '@database/database.module';
import { CreateStoresUseCase } from '@useCases/stores/createStores.useCase';

@Module({
  controllers: [StoresController],
  providers: [CreateStoresUseCase],
  imports: [DatabaseModule],
})
export class StoresModule {}
