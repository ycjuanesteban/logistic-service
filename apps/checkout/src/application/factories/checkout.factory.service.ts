import { Injectable } from '@nestjs/common';
import { AddCheckoutCommand } from '../checkout/checkoutCommand';
import { CheckoutDto } from '../dtos/checkoutDto';

@Injectable()
export class CheckoutFactoryService {
  createCheckoutDto(command: AddCheckoutCommand): CheckoutDto {
    const newCheckout = new CheckoutDto();
    newCheckout.Address = command.Address;
    newCheckout.UserId = command.UserId;
    newCheckout.Products = [...command.Products];

    return newCheckout;
  }

  createCheckoutCommand(command: CheckoutDto): AddCheckoutCommand {
    const newCheckout = new AddCheckoutCommand();
    newCheckout.Address = command.Address;
    newCheckout.UserId = command.UserId;
    newCheckout.Products = [...command.Products];

    return newCheckout;
  }
}
