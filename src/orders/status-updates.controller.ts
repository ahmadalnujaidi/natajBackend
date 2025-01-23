// src/orders/status-updates.controller.ts
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
import { StatusUpdatesService } from './status-updates.service';
import { memoryStorage } from 'multer';
import { StatusUpdate } from './status-update.entity';

class CreateStatusUpdateDto {
  status: string;
  location?: string;
  notes?: string;
}

@Controller('orders/:orderId/status-updates')
export class StatusUpdatesController {
  constructor(private readonly statusUpdatesService: StatusUpdatesService) {}

  @Get()
  async getStatusUpdates(
    @Param('orderId') orderId: string,
  ): Promise<StatusUpdate[]> {
    return this.statusUpdatesService.findAll(orderId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async createStatusUpdate(
    @Param('orderId') orderId: string,
    @Body() body: CreateStatusUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<StatusUpdate> {
    const imageBuffer = file?.buffer;
    return this.statusUpdatesService.createStatusUpdate(
      orderId,
      body.status,
      body.location,
      body.notes,
      imageBuffer,
    );
  }
}
