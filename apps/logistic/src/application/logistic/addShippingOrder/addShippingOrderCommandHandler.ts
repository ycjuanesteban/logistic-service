import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Bill, BillDetail, Product, Shipping, User } from "apps/logistic/src/domain";
import { In, Repository } from "typeorm";
import { AddShippingCommand, ProductCommand } from "./addShippingOrderCommand";

@CommandHandler(AddShippingCommand)
export class AddShippingCommandHandler implements ICommandHandler<AddShippingCommand, void> {

  constructor(
    @Inject('BILL_REPOSITORY') private billRepository: Repository<Bill>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('PRODUCT_REPOSITORY') private productRepository: Repository<Product>
  ) { }

  async execute(command: AddShippingCommand): Promise<void> {
    let user = await this.getUser(command.UserId);

    if (user == null) {
      throw new NotFoundException("User not found");
    }

    let products = await this.getProducts(command.Products.map(x => x.ProductId));

    if (products.length != command.Products.length) {
      throw new NotFoundException("One or more products not found");
    }

    let newBill = this.createBill(command);
    newBill.Details = this.createBillDetails(command.Products, products);
    newBill.User = user;
    newBill.Shipping = new Shipping();

    await this.billRepository.save(newBill);
  }

  private createBill(command: AddShippingCommand): Bill {
    let newBill = new Bill();
    newBill.Address = command.Address;
    newBill.Date = new Date();

    return newBill;
  }

  private createBillDetails(products: ProductCommand[], productsDb: Product[]): BillDetail[] {
    let details: BillDetail[] = [];
    for (let index = 0; index < products.length; index++) {
      const currentProduct = products[index];

      let detail = new BillDetail();
      detail.Cost = currentProduct.Cost;
      detail.Product = productsDb.find(x => x.Id == currentProduct.ProductId);
      detail.Quantity = currentProduct.Quantity;

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

  private async getProducts(productsId: number[]): Promise<Product[]> {
    return await this.productRepository.findBy({
      Id: In(productsId)
    })
  }
}