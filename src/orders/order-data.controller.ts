// src/orders/order-data.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrderDataService } from './order-data.service';
import { OrderData } from './order-data.entity';

class CreateOrderDataDto {
  weight: number;
  temperature: number;
  speed: number;
  processTime: number;
  components: number;
  efficiency: number;
  quantity: number;
  delayPrediction: number;
  defectPrediction: string;
}

@Controller('orders/:orderId/data')
export class OrderDataController {
  constructor(private readonly orderDataService: OrderDataService) {}

  // CREATE a new record of orderData for a specific order
  @Post()
  async createOrderData(
    @Param('orderId') orderId: string,
    @Body() dto: CreateOrderDataDto,
  ): Promise<OrderData> {
    return this.orderDataService.create(orderId, dto);
  }

  // GET all orderData rows for a specific order
  @Get()
  async findAllByOrder(
    @Param('orderId') orderId: string,
  ): Promise<OrderData[]> {
    return this.orderDataService.findAllByOrder(orderId);
  }

  // GET a single orderData by its own ID
  @Get(':dataId')
  async findOne(@Param('dataId') dataId: string): Promise<OrderData> {
    return this.orderDataService.findOne(dataId);
  }

  // UPDATE a single orderData row
  @Patch(':dataId')
  async updateOrderData(
    @Param('dataId') dataId: string,
    @Body() dto: Partial<CreateOrderDataDto>,
  ): Promise<OrderData> {
    return this.orderDataService.update(dataId, dto);
  }

  // DELETE a single orderData row
  @Delete(':dataId')
  async deleteOrderData(
    @Param('dataId') dataId: string,
  ): Promise<{ message: string }> {
    await this.orderDataService.remove(dataId);
    return { message: `OrderData ${dataId} deleted successfully.` };
  }
}
