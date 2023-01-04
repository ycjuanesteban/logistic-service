import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CheckoutFactoryService } from "../factories/checkout.factory.service";
import { BillService } from "../services/bill.service";
import { LogisticService } from "../services/logistic.service";
import { AddCheckoutCommand } from "./checkoutCommand";

@CommandHandler(AddCheckoutCommand)
export class CheckoutCommandHandler implements ICommandHandler<AddCheckoutCommand> {

  constructor(
    private billService: BillService,
    private logisticService: LogisticService,
    private checkoutFactory: CheckoutFactoryService
  ) { }

  async execute(command: AddCheckoutCommand): Promise<any> {
    let dto = this.checkoutFactory.createCheckoutDto(command);

    await this.billService.addNewBill(dto);
    await this.logisticService.addNewBill(dto);
  }

}