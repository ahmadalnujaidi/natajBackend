// src/order-data/order-data.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order_data')
export class OrderData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderID: string;

  @Column('float')
  Weight: number;

  @Column('float')
  Temperature: number;

  @Column('float')
  Speed: number;

  // Process Time had a space in your description; we'll call it processTime in code
  @Column('float')
  processTime: number;

  @Column('int')
  Components: number;

  @Column('float')
  Efficiency: number;

  @Column('int')
  Quantity: number;

  // Delay Prediction => delayPrediction
  @Column('float')
  delayPrediction: number;

  // Defect Prediction => defectPrediction
  @Column()
  defectPrediction: string;

  //   @Column()
  //   orderIdStr: string;
}
