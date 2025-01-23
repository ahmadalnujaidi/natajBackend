// src/orders/status-update.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('status_updates')
export class StatusUpdate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // e.g. "Order Received", "Production Started", "Quality Check", "Shipped", "Delivered"
  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  notes: string;

  // Store a single image as bytea (could be a quality check photo, etc.)
  @Column({ type: 'bytea', nullable: true })
  image: Buffer | null;

  // Relationship: Many status updates belong to one order
  @ManyToOne(() => Order, (order) => order.statusUpdates, {
    onDelete: 'CASCADE',
  })
  order: Order;
}
