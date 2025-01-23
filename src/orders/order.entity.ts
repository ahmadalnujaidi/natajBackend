// src/orders/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StatusUpdate } from './status-update.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  placedDate: Date;

  @Column('int')
  quantity: number;

  @Column('float')
  weight: number;

  @Column('float')
  length: number;

  // e.g. "Received", "Production", "Quality Check", "Shipped", "Delivered", etc.
  @Column({ default: 'Received' })
  currentStatus: string;

  // We'll store the design photo in a bytea column
  @Column({ type: 'bytea', nullable: true })
  designPhoto: Buffer | null;

  // Relationship: One Order has many StatusUpdates
  @OneToMany(() => StatusUpdate, (statusUpdate) => statusUpdate.order, {
    cascade: true,
  })
  statusUpdates: StatusUpdate[];
}
