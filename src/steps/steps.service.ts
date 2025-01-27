// src/steps/steps.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Step } from './step.entity';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepo: Repository<Step>,
  ) {}

  // CREATE
  async create(stepName: string, stepDesc: string): Promise<Step> {
    const step = this.stepRepo.create({ stepName, stepDesc });
    return this.stepRepo.save(step);
  }

  // READ (all)
  async findAll(): Promise<Step[]> {
    return this.stepRepo.find();
  }

  // READ (one)
  async findOne(id: string): Promise<Step> {
    return this.stepRepo.findOneBy({ id });
  }

  // UPDATE
  async update(id: string, stepName: string, stepDesc: string): Promise<Step> {
    const step = await this.stepRepo.findOneBy({ id });
    if (!step) {
      throw new Error(`Step with ID ${id} not found.`);
    }
    step.stepName = stepName;
    step.stepDesc = stepDesc;
    return this.stepRepo.save(step);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    await this.stepRepo.delete(id);
  }
}
