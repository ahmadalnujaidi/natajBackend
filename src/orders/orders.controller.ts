// src/orders/orders.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrdersService } from './orders.service';
import { memoryStorage } from 'multer';
import { Order } from './order.entity';

class CreateOrderDto {
  productName: string;
  quantity: number;
  weight: number;
  length: number;
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('designPhoto', {
      storage: memoryStorage(),
    }),
  )
  async createOrder(
    @Body() body: CreateOrderDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Order> {
    const { productName, quantity, weight, length } = body;
    const designPhoto = file?.buffer; // if no file is uploaded, this is undefined

    return this.ordersService.createOrder(
      productName,
      +quantity,
      +weight,
      +length,
      designPhoto,
    );
  }
}
