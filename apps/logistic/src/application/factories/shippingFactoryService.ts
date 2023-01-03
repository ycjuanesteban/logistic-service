import { Injectable } from "@nestjs/common";
import { AddShippingDto } from "../dtos/addShippingDto";
import { AddShippingCommand } from "../logistic/addShippingOrder/addShippingOrderCommand";

@Injectable()
export class ShippingFactoryService {
    createShippingCommand(shippingDto: AddShippingDto): AddShippingCommand {
        var newShipping = new AddShippingCommand();
        newShipping.Address = shippingDto.Address;
        newShipping.UserId = shippingDto.UserId;
        newShipping.Products = [...shippingDto.Products];

        return newShipping;
    }
}