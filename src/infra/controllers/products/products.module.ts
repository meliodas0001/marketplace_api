import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';

@Module({
  providers: [],
  controllers: [ProductsModule],
  imports: [DatabaseModule],
})
export class ProductsModule {}
