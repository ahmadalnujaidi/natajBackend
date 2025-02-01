// src/order-data/order-data.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderData } from './order-data.entity';
import { OrderDataController } from './order-data.controller';
import { OrderDataService } from './order-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderData])],
  controllers: [OrderDataController],
  providers: [OrderDataService],
})
export class OrderDataModule {}
