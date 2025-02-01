// src/order-data/order-data.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderDataService } from './order-data.service';
import { OrderData } from './order-data.entity';

// Optional: a DTO to ensure correct data structure
class CreateOrderDataDto {
  orderID: string;
  Weight: number;
  Temperature: number;
  Speed: number;
  processTime: number;
  Components: number;
  Efficiency: number;
  Quantity: number;
  delayPrediction: number;
  defectPrediction: string;
  //   orderIdStr: string;
}

@Controller('order-data')
export class OrderDataController {
  constructor(private readonly orderDataService: OrderDataService) {}

  // GET /order-data (retrieve all)
  @Get()
  async getAllOrderData(): Promise<OrderData[]> {
    return this.orderDataService.findAll();
  }

  // POST /order-data (create new)
  @Post()
  async createOrderData(@Body() dto: CreateOrderDataDto): Promise<OrderData> {
    return this.orderDataService.create(dto);
  }
}
