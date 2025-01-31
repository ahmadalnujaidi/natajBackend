// src/orders/order-data.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderData } from './order-data.entity';
import { Order } from './order.entity';

@Injectable()
export class OrderDataService {
  constructor(
    @InjectRepository(OrderData)
    private readonly orderDataRepo: Repository<OrderData>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  // CREATE
  async create(orderId: string, data: Partial<OrderData>): Promise<OrderData> {
    // Ensure the order exists
    const order = await this.orderRepo.findOneBy({ id: orderId });
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    const newOrderData = this.orderDataRepo.create({
      ...data,
      order: order, // Link to the existing order
    });
    return this.orderDataRepo.save(newOrderData);
  }

  // GET ALL for a specific order
  async findAllByOrder(orderId: string): Promise<OrderData[]> {
    return this.orderDataRepo.find({
      where: { order: { id: orderId } },
      order: { id: 'ASC' }, // or any other sorting
    });
  }

  async findAllGlobal(): Promise<OrderData[]> {
    return this.orderDataRepo.find();
  }

  // GET one by ID
  async findOne(id: string): Promise<OrderData> {
    return this.orderDataRepo.findOneBy({ id });
  }

  // UPDATE
  async update(id: string, data: Partial<OrderData>): Promise<OrderData> {
    const existing = await this.orderDataRepo.findOneBy({ id });
    if (!existing) {
      throw new Error(`OrderData with ID ${id} not found.`);
    }
    Object.assign(existing, data);
    return this.orderDataRepo.save(existing);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    await this.orderDataRepo.delete(id);
  }
}
