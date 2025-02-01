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
import { StockModule } from './stock/stock.module';
import { Stock } from './stock/stock.entity';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const DATABASE_URL = process.env.DATABASE_URL;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Order, StatusUpdate, ChatMessage, Step, OrderData, Stock],
      synchronize: true,
    }),
    OrdersModule,
    StepsModule,
    OrderDataModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
