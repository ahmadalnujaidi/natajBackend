// src/orders/order-data.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_data')
export class OrderData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relationship to the Order entity
  @ManyToOne(() => Order, (order) => order.id, { onDelete: 'CASCADE' })
  order: Order;

  @Column('float')
  weight: number;

  @Column('float')
  temperature: number;

  @Column('float')
  speed: number;

  @Column('float', { name: 'process_time' })
  processTime: number;

  @Column('int')
  components: number;

  @Column('float')
  efficiency: number;

  @Column('int')
  quantity: number;

  @Column('float', { name: 'delay_prediction' })
  delayPrediction: number;

  @Column()
  defectPrediction: string;
}
