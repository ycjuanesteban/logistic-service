import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Bill, BillDetail, Product, User } from 'apps/bill/src/domain';
import { In, Repository } from 'typeorm';
import { BillFactoryService } from '../../factories/bill.factory.service';
import { AddBillCommand, ProductCommand } from './addBillCommand';

@CommandHandler(AddBillCommand)
export class AddBillCommandHandler
  implements ICommandHandler<AddBillCommand, void>
{
  constructor(
    @Inject('BILL_REPOSITORY') private billRepository: Repository<Bill>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    private billFactoryService: BillFactoryService,
  ) {}

  async execute(command: AddBillCommand): Promise<void> {
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

    const newBill = this.billFactoryService.createBill(command);
    newBill.Details = this.billFactoryService.createBillDetails(
      simpleProducts,
      products,
    );
    newBill.User = user;

    await this.billRepository.save(newBill);
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
