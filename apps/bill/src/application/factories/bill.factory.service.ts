import { Injectable } from "@nestjs/common";
import { AddBillCommand } from "../bill/addBill/addBillCommand";
import { AddBillDto } from "../dtos/AddBillDto";

@Injectable()
export class BillFactoryService {
    createBillCommand(billDto: AddBillDto): AddBillCommand {
        var newBill = new AddBillCommand();
        newBill.Address = billDto.Address;
        newBill.UserId = billDto.UserId;
        newBill.Products = [...billDto.Products];

        return newBill;
    }
}