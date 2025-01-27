// src/orders/orders.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

// Simple DTO for creating an order
class CreateOrderDto {
  orderName: string;
  quantity: number;
  buyerName: string;
  deadline: string;
  amount: number;
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
  async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    const {
      orderName,
      quantity,
      buyerName,
      deadline,
      amount,
      currentStatus = 'Received',
    } = dto;

    return this.ordersService.createOrder({
      orderName,
      buyerName,
      deadline,
      amount,
      placedDate: new Date(),
      quantity: +quantity,
      currentStatus,
    });
  }
}
