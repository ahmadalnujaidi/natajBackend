// src/orders/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { StatusUpdate } from './status-update.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderName: string;

  @Column()
  buyerName: string;

  // Auto-generated timestamp when the order is placed
  @CreateDateColumn()
  placedDate: Date;

  // Auto-updated timestamp if the order record changes
  @UpdateDateColumn()
  updatedDate: Date;

  @Column('int')
  quantity: number;

  @Column()
  amount: number;

  // e.g. "Received", "Production", "Quality Check", "Shipped", "Delivered", etc.
  @Column({ default: 'Received' })
  currentStatus: string;

  @Column()
  deadline: string;

  // Relationship: One Order -> Many StatusUpdates
  @OneToMany(() => StatusUpdate, (statusUpdate) => statusUpdate.order, {
    cascade: true,
  })
  statusUpdates: StatusUpdate[];
}
