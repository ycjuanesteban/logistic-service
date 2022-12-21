import { Controller, Get } from '@nestjs/common';
import { BillService } from './bill.service';

@Controller()
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  getHello(): string {
    return this.billService.getHello();
  }
}
