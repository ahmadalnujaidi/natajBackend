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
import { OrderDataController } from './order-data.controller';
import { OrderData } from './order-data.entity';
import { OrderDataService } from './order-data.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, StatusUpdate, ChatMessage, OrderData]),
  ],
  controllers: [
    OrdersController,
    StatusUpdatesController,
    ChatMessagesController,
    OrderDataController,
  ],
  providers: [
    OrdersService,
    StatusUpdatesService,
    ChatMessagesService,
    OrderDataService,
  ],
})
export class OrdersModule {}
