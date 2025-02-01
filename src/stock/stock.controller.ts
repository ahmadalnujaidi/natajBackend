// src/stock/stock.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';

// Example DTO for creating or updating a stock record
class StockDto {
  name?: string;
  weight?: number;
  place?: string;
  quantity?: number;
}

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // CREATE
  @Post()
  async create(@Body() dto: StockDto): Promise<Stock> {
    return this.stockService.createStock(dto);
  }

  // READ all
  @Get()
  async findAll(): Promise<Stock[]> {
    return this.stockService.findAll();
  }

  // READ one
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Stock> {
    return this.stockService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: StockDto): Promise<Stock> {
    return this.stockService.updateStock(id, dto);
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.stockService.deleteStock(id);
    return { message: `Stock with ID ${id} deleted successfully.` };
  }
}
