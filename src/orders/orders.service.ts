// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(data: Partial<Order>): Promise<Order> {
    const newOrder = this.orderRepository.create(data);
    return this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    // Also load statusUpdates if you want them included
    return this.orderRepository.find({
      relations: ['statusUpdates'],
    });
  }

  async findOne(orderId: string): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['statusUpdates'],
    });
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new Error('Order not found');
    }
    order.currentStatus = status;
    return this.orderRepository.save(order);
  }
}
