// src/steps/step.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('steps')
export class Step {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stepName: string;

  @Column()
  stepDesc: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
