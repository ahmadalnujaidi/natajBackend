// src/stock/stock.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  // Create a new stock record
  async createStock(data: Partial<Stock>): Promise<Stock> {
    const stock = this.stockRepository.create(data);
    return this.stockRepository.save(stock);
  }

  // Retrieve all stocks
  async findAll(): Promise<Stock[]> {
    return this.stockRepository.find();
  }

  // Retrieve one stock by ID
  async findOne(id: string): Promise<Stock> {
    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return stock;
  }

  // Update a stock record
  async updateStock(id: string, data: Partial<Stock>): Promise<Stock> {
    const stock = await this.findOne(id);

    // Update only the fields that were provided
    if (data.name !== undefined) {
      stock.name = data.name;
    }
    if (data.weight !== undefined) {
      stock.weight = data.weight;
    }
    if (data.place !== undefined) {
      stock.place = data.place;
    }
    if (data.quantity !== undefined) {
      stock.quantity = data.quantity;
    }

    return this.stockRepository.save(stock);
  }

  // Delete a stock record
  async deleteStock(id: string): Promise<void> {
    const result = await this.stockRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
  }
}
