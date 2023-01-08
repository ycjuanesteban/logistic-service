import { BaseController } from '@app/shared/api/controllers/base.controller';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddBillDto } from '../../application/dtos/addBillDto';
import { BillFactoryService } from '../../application/factories/bill.factory.service';

@ApiTags('Bill')
@Controller('/api/v1/bill')
export class BillController extends BaseController {
  constructor(
    commandBus: CommandBus,
    private billFactoryService: BillFactoryService
  ) {
    super(commandBus)
  }

  @Post()
  @ApiResponse({ status: 201, description: "Created" })
  createBill(@Body() request: AddBillDto): any {
    let localRequest = this.billFactoryService.createBillCommand(request);
    return this.commandBus.execute(localRequest);
  }
}
