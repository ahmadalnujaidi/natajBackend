import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/order.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusUpdate } from './orders/status-update.entity';
import { ChatMessage } from './orders/chat-message.entity';
import { StepsModule } from './steps/steps.module';
import { Step } from './steps/step.entity';
import { OrderData } from './order-data/order-data.entity';
import { OrderDataModule } from './order-data/order-data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://b2bdb_6chi_user:cKyARII4iCKyFc6Vbe5QuluWHYRhqvGQ@dpg-cu8h6lggph6c73cpk0s0-a.frankfurt-postgres.render.com/b2bdb_6chi',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Order, StatusUpdate, ChatMessage, Step, OrderData],
      synchronize: true,
    }),
    OrdersModule,
    StepsModule,
    OrderDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
