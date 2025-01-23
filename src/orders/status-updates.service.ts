// src/orders/status-updates.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusUpdate } from './status-update.entity';
import { Order } from './order.entity';

@Injectable()
export class StatusUpdatesService {
  constructor(
    @InjectRepository(StatusUpdate)
    private readonly statusUpdateRepository: Repository<StatusUpdate>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createStatusUpdate(
    orderId: string,
    status: string,
    location?: string,
    notes?: string,
    imageBuffer?: Buffer,
  ): Promise<StatusUpdate> {
    // Ensure the order exists
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new Error('Order not found');
    }

    // Create the new status update
    const newStatusUpdate = this.statusUpdateRepository.create({
      order: { id: orderId } as Order, // minimal reference
      status,
      location,
      notes,
      image: imageBuffer || null,
    });

    // Optional: update the order’s currentStatus
    order.currentStatus = status;
    await this.orderRepository.save(order);

    // Save the status update
    return this.statusUpdateRepository.save(newStatusUpdate);
  }

  async findAll(orderId: string): Promise<StatusUpdate[]> {
    return this.statusUpdateRepository.find({
      where: { order: { id: orderId } },
      order: { timestamp: 'ASC' },
    });
  }
}
