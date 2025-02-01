// src/order-data/order-data.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderData } from './order-data.entity';

@Injectable()
export class OrderDataService {
  constructor(
    @InjectRepository(OrderData)
    private readonly orderDataRepository: Repository<OrderData>,
  ) {}

  // Retrieve all OrderData entries
  findAll(): Promise<OrderData[]> {
    return this.orderDataRepository.find();
  }

  // (Optional) You could add create, update, delete methods here if needed.

  // CREATE new OrderData
  create(data: Partial<OrderData>): Promise<OrderData> {
    const newEntry = this.orderDataRepository.create(data);
    return this.orderDataRepository.save(newEntry);
  }
}
