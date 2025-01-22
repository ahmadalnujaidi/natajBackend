import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/order.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://b2bdb_6chi_user:cKyARII4iCKyFc6Vbe5QuluWHYRhqvGQ@dpg-cu8h6lggph6c73cpk0s0-a.frankfurt-postgres.render.com/b2bdb_6chi',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Order],
      synchronize: true,
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
