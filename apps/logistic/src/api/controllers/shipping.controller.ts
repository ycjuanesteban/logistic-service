import { BaseController } from '@app/shared/api/controllers/base.controller';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddShippingDto } from '../../application/dtos/addShippingDto';
import { ShippingFactoryService } from '../../application/factories/shippingFactoryService';

@ApiTags('Shipping')
@Controller({ path: 'shipping', version: '1' })
export class ShippingController extends BaseController {

  constructor(
    protected commandBus: CommandBus,
    private shippingFactoryService: ShippingFactoryService
  ) {
    super(commandBus)
  }

  @Post()
  @ApiResponse({ status: 201, description: "Created" })
  createShipping(@Body() request: AddShippingDto): any {
    let localRequest = this.shippingFactoryService.createShippingCommand(request);
    return this.commandBus.execute(localRequest);
  }

}
