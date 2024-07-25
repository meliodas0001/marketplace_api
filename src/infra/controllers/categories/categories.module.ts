import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [CategoriesController],
  imports: [DatabaseModule],
})
export class CategoriesModule {}
