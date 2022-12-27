import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddBillDto } from '../../application/dtos/AddBillDto';
import { BillFactoryService } from '../../application/factories/bill.factory.service';

@ApiTags('Bill')
@Controller('Bill')
export class BillController {
  constructor(
    private commandBus: CommandBus,
    private billFactoryService: BillFactoryService
  ) { }

  @Post()
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404 })
  createBill(@Body() request: AddBillDto): any {
    let localRequest = this.billFactoryService.createBillCommand(request);
    return this.commandBus.execute(localRequest);
  }
}
