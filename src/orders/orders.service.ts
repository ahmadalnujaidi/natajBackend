// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(
    productName: string,
    quantity: number,
    weight: number,
    length: number,
    designPhoto?: Buffer,
  ): Promise<Order> {
    const newOrder = this.orderRepository.create({
      productName,
      quantity,
      weight,
      length,
      designPhoto: designPhoto || null,
    });
    return this.orderRepository.save(newOrder);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
