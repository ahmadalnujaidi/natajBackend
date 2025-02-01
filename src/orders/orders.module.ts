// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { StatusUpdate } from './status-update.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { StatusUpdatesController } from './status-updates.controller';
import { StatusUpdatesService } from './status-updates.service';
import { ChatMessage } from './chat-message.entity';
import { ChatMessagesController } from './chat-messages.controller';
import { ChatMessagesService } from './chat-messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, StatusUpdate, ChatMessage])],
  controllers: [
    OrdersController,
    StatusUpdatesController,
    ChatMessagesController,
  ],
  providers: [OrdersService, StatusUpdatesService, ChatMessagesService],
})
export class OrdersModule {}
