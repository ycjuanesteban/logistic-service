import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Bill,
  BillDetail,
  Product,
  Shipping,
  User,
} from 'apps/logistic/src/domain';
import { In, Repository } from 'typeorm';
import { AddShippingCommand, ProductCommand } from './addShippingOrderCommand';

@CommandHandler(AddShippingCommand)
export class AddShippingCommandHandler
  implements ICommandHandler<AddShippingCommand, void>
{
  constructor(
    @Inject('BILL_REPOSITORY') private billRepository: Repository<Bill>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async execute(command: AddShippingCommand): Promise<void> {
    const user = await this.getUser(command.UserId);

    if (user == null) {
      throw new NotFoundException('User not found');
    }

    const products = await this.getProducts(
      command.Products.map((x) => x.ProductId),
    );

    const simpleProducts = this.removeDuplicates(command.Products);

    if (products.length != simpleProducts.length) {
      throw new NotFoundException('One or more products not found');
    }

    const newBill = this.createBill(command);
    newBill.Details = this.createBillDetails(simpleProducts, products);
    newBill.User = user;
    newBill.Shipping = new Shipping();

    await this.billRepository.save(newBill);
  }

  private createBill(command: AddShippingCommand): Bill {
    const newBill = new Bill();
    newBill.Address = command.Address;
    newBill.Date = new Date();

    return newBill;
  }

  private createBillDetails(
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

  private removeDuplicates(products: ProductCommand[]) {
    const simpleProducts: ProductCommand[] = [];

    products.forEach((currentProduct) => {
      const existCurrentProduct = simpleProducts.filter(
        (x) => x.ProductId == currentProduct.ProductId,
      );

      if (existCurrentProduct.length == 0) {
        const detail = new ProductCommand();
        detail.Cost = currentProduct.Cost;
        detail.Quantity = currentProduct.Quantity;
        detail.ProductId = currentProduct.ProductId;

        simpleProducts.push(detail);
      } else {
        const index = simpleProducts.findIndex(
          (x) => x.ProductId == currentProduct.ProductId,
        );
        simpleProducts[index].Quantity += currentProduct.Quantity;
        simpleProducts[index].Cost += currentProduct.Cost;
      }
    });

    return simpleProducts;
  }

  private async getUser(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        Id: userId,
      },
    });
  }

  private async getProducts(productsId: number[]): Promise<Product[]> {
    return await this.productRepository.findBy({
      Id: In(productsId),
    });
  }
}
