import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BillService } from '../../application/bill.service';
import { AddBillCommand } from '../../application/bill/addBill/addBillCommand';

@ApiTags('Bill')
@Controller('Bill')
export class BillController {
  constructor(
    private readonly billService: BillService,
    private commandBus: CommandBus
  ) { }

  @Get()
  getHello(): string {
    return this.billService.getHello();
  }

  @Post()
  @ApiResponse({ status: 204, description: 'The found record' })
  createBill(@Body() request: AddBillCommand): any {
    return this.commandBus.execute(request);
  }
}
