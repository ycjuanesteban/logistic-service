import { Controller, Get } from '@nestjs/common';
import { LogisticService } from './logistic.service';

@Controller()
export class LogisticController {
  constructor(private readonly logisticService: LogisticService) {}

  @Get()
  getHello(): string {
    return this.logisticService.getHello();
  }
}
