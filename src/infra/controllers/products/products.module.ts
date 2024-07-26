import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { ProductsController } from './products.controller';

@Module({
  providers: [],
  controllers: [ProductsController],
  imports: [DatabaseModule],
})
export class ProductsModule {}
