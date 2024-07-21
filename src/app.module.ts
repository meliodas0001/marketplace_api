import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configTypeorm from './infra/database/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot(configTypeorm)],
  controllers: [],
  providers: [],
})
export class AppModule {}
