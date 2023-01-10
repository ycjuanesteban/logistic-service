import { Injectable } from '@nestjs/common';
import { Bill, BillDetail, Product } from '../../domain';
import { AddBillCommand, ProductCommand } from '../bill/addBill/addBillCommand';
import { AddBillDto } from '../dtos/addBillDto';

@Injectable()
export class BillFactoryService {
  createBillCommand(billDto: AddBillDto): AddBillCommand {
    const newBill = new AddBillCommand();
    newBill.Address = billDto.Address;
    newBill.UserId = billDto.UserId;
    newBill.Products = [...billDto.Products];

    return newBill;
  }

  createBill(command: AddBillCommand): Bill {
    const newBill = new Bill();
    newBill.Address = command.Address;
    newBill.Date = new Date();

    return newBill;
  }

  createBillDetails(
    products: ProductCommand[],
    productsDb: Product[],
  ): BillDetail[] {
    const details: BillDetail[] = [];

    products.forEach((currentProduct) => {
      const detail = new BillDetail();
      detail.Cost = currentProduct.Cost;
      detail.Product = productsDb.find((x) => x.Id == currentProduct.ProductId);
      detail.Quantity = currentProduct.Quantity;

      details.push(detail);
    });

    return details;
  }
}
;

        return details;
    }

}