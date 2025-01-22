// src/orders/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column('int')
  quantity: number;

  @Column('float')
  weight: number;

  @Column('float')
  length: number;

  // We'll store the image in a binary column
  @Column({ type: 'bytea', nullable: true })
  designPhoto: Buffer | null;
}
