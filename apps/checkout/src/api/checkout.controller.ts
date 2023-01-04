import { BaseController } from "@app/shared/api/controllers/base.controller";
import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CheckoutDto } from "../application/dtos/checkoutDto";
import { CheckoutFactoryService } from "../application/factories/checkout.factory.service";

@ApiTags('Checkout')
@Controller('Checkout')
export class CheckoutController extends BaseController {
  constructor(
    commandBus: CommandBus,
    private checkoutFactoryService: CheckoutFactoryService
  ) {
    super(commandBus)
  }

  @Post()
  @ApiResponse({ status: 201, description: "Created" })
  createCheckout(@Body() request: CheckoutDto): any {
    let localRequest = this.checkoutFactoryService.createCheckoutCommand(request);
    return this.commandBus.execute(localRequest);
  }
}