// src/orders/chat-message.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sender: string; // e.g. "buyer" or "manufacturer"

  @Column()
  content: string; // The text of the message

  @CreateDateColumn()
  createdAt: Date; // Auto-set by the DB

  @ManyToOne(() => Order, (order) => order.id, {
    onDelete: 'CASCADE',
  })
  order: Order;
}
