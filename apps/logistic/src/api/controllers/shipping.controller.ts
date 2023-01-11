import { BaseController } from '@app/shared/api/controllers/base.controller';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddShippingDto } from '../../application/dtos/addShippingDto';
import {
  AddShippingCommand,
  ProductCommand
} from '../../application/logistic/addShippingOrder/addShippingOrderCommand';

@ApiTags('Shipping')
@Controller({ path: 'shipping', version: '1' })
export class ShippingController extends BaseController {
  constructor(
    protected commandBus: CommandBus
  ) {
    super(commandBus);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  createShipping(@Body() request: AddShippingDto): any {
    let products = [];

    request.Products.forEach(currentProduct => {
      products.push(new ProductCommand(currentProduct.ProductId, currentProduct.Quantity, currentProduct.Cost));
    });

    return this.commandBus.execute(new AddShippingCommand(
      request.UserId,
      request.Address,
      products
    ));
  }
}
