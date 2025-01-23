// src/orders/orders.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

// Simple DTO for creating an order
class CreateOrderDto {
  orderName: string;
  quantity: number;
  weight: number;
  length: number;
  currentStatus?: string;
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':orderId')
  async findOne(@Param('orderId') orderId: string): Promise<Order> {
    return this.ordersService.findOne(orderId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('designPhoto', {
      storage: memoryStorage(),
    }),
  )
  async createOrder(
    @Body() dto: CreateOrderDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Order> {
    const {
      orderName,
      quantity,
      weight,
      length,
      currentStatus = 'Received',
    } = dto;

    const designPhoto = file?.buffer || null;

    return this.ordersService.createOrder({
      orderName,
      placedDate: new Date(),
      quantity: +quantity,
      weight: +weight,
      length: +length,
      currentStatus,
      designPhoto, // store the binary data
    });
  }
}
