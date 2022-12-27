import { Response } from "@app/shared";
import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Bill, BillDetail, User } from "apps/bill/src/domain";
import { Repository } from "typeorm";
import { AddBillCommand, Product } from "./addBillCommand";

@CommandHandler(AddBillCommand)
export class AddBillCommandHandler implements ICommandHandler<AddBillCommand, Response<boolean>> {

    constructor(
        @Inject('BILL_REPOSITORY') private billRepository: Repository<Bill>,
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>
    ) { }


    async execute(command: AddBillCommand): Promise<Response<boolean>> {
        let user = await this.getUser(command.UserId);

        if (user == null) {
            throw new NotFoundException("User not found");
        }

        let newBill = this.createBill(command);
        newBill.Details = this.createBillDetails(command.Products);
        newBill.User = user;

        await this.billRepository.save(newBill);

        return new Response<boolean>().setSuccess(true);
    }

    private createBill(command: AddBillCommand): Bill {
        let newBill = new Bill();
        newBill.Address = command.Address;
        newBill.Date = new Date();

        return newBill;
    }

    private createBillDetails(products: Product[]): BillDetail[] {
        let details: BillDetail[] = [];
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

    private async getUser(userId: number): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                Id: userId
            }
        })
    }
}