// src/steps/steps.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StepsService } from './steps.service';
import { Step } from './step.entity';

class CreateStepDto {
  stepName: string;
  stepDesc: string;
  stepNumber: string;
}

class UpdateStepDto {
  stepName: string;
  stepDesc: string;
  stepNumber: string;
}

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  // CREATE
  @Post()
  async createStep(@Body() dto: CreateStepDto): Promise<Step> {
    return this.stepsService.create(dto.stepName, dto.stepDesc, dto.stepNumber);
  }

  // READ (all)
  @Get()
  async getAllSteps(): Promise<Step[]> {
    return this.stepsService.findAll();
  }

  // READ (one)
  @Get(':id')
  async getOneStep(@Param('id') id: string): Promise<Step> {
    return this.stepsService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  async updateStep(
    @Param('id') id: string,
    @Body() dto: UpdateStepDto,
  ): Promise<Step> {
    return this.stepsService.update(
      id,
      dto.stepName,
      dto.stepDesc,
      dto.stepNumber,
    );
  }

  // DELETE
  @Delete(':id')
  async deleteStep(@Param('id') id: string): Promise<{ message: string }> {
    await this.stepsService.remove(id);
    return { message: `Step ${id} deleted successfully.` };
  }
}
