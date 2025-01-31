// src/orders/global-order-data.controller.ts
import { Controller, Get } from '@nestjs/common';
import { OrderDataService } from './order-data.service';
import { OrderData } from './order-data.entity';

@Controller('order-data')
export class GlobalOrderDataController {
  constructor(private readonly orderDataService: OrderDataService) {}

  // GET /order-data
  @Get()
  async findAll(): Promise<OrderData[]> {
    return this.orderDataService.findAllGlobal();
  }
}
