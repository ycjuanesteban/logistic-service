import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Bill, BillDetail, User } from "apps/bill/src/domain";
import { Repository } from "typeorm";
import { AddBillCommand, Product } from "./addBillCommand";

@CommandHandler(AddBillCommand)
export class AddBillHandler implements ICommandHandler<AddBillCommand> {

    constructor(
        @InjectRepository(Bill)
        private readonly billRepository: Repository<Bill>
    ) { }

    async execute(command: AddBillCommand): Promise<any> {
        let newBill = this.createBill(command);
        newBill.Details = this.createBillDetails(command.Products);
        newBill.User = this.createUser(command.UserId);

        await this.billRepository.insert(newBill);
    }

    private createBill(command: AddBillCommand): Bill {
        let newBill = new Bill();
        newBill.Address = command.Address;
        newBill.Date = new Date();

        return newBill;
    }

    private createBillDetails(products: Product[]): BillDetail[] {
        let details: BillDetail[];
        for (let index = 0; index < products.length; index++) {
            const product = products[index];

            let detail = new BillDetail();
            detail.Cost = product.Cost;
            detail.ProductId = product.ProductId;
            detail.Quantity = product.Quantity;

            details.push(detail);
        }

        return details;
    }

    private createUser(userId: number): User {
        let user = new User();
        user.Id = userId;
        user.Name = 'Juan';
        return user;
    }
}