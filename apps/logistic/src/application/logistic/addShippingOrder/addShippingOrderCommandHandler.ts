import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BillEntity, ProductEntity, UserEntity } from "apps/logistic/src/data/models";
import { In, Repository } from "typeorm";
import { BillAggregate } from "../../domain/bill.aggregate";
import { BillDetail } from "../../domain/billDetail";
import { Product } from "../../domain/product";
import { Shipping } from "../../domain/shipping";
import { User } from "../../domain/user";
import { AddShippingCommand } from "./addShippingOrderCommand";

@CommandHandler(AddShippingCommand)
export class AddShippingCommandHandler implements ICommandHandler<AddShippingCommand, void> {

  constructor(
    @Inject('BILL_REPOSITORY') private billRepository: Repository<BillEntity>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
    @Inject('PRODUCT_REPOSITORY') private productRepository: Repository<ProductEntity>,
  ) { }

  async execute(command: AddShippingCommand): Promise<void> {

    let user = await this.getUser(command.UserId);

    if (user == null) {
      throw new NotFoundException("User not found");
    }

    let products = await this.getProducts(command.Products.map(x => x.ProductId));

    if (products.length != [...new Set(command.Products.map(x => x.ProductId))].length) {
      throw new NotFoundException("One or more products not found");
    }

    let details: BillDetail[] = [];
    command.Products.forEach(currentProduct => {
      let productFound = products.filter(x => x.Id == currentProduct.ProductId)[0];
      let product = Product.ToDomain(productFound);
      details.push(BillDetail.Create(currentProduct.Quantity, currentProduct.Cost, product));
    });

    let newBill = BillAggregate.Create(command.Address);
    newBill.BillUser = User.ToDomain(user);
    newBill.BillShipping = Shipping.Create();

    details.forEach((currentDetail: BillDetail) => {
      newBill.BillDetails = currentDetail;
    });

    await this.billRepository.save(BillAggregate.ToEntity(newBill));
  }

  private async getUser(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        Id: userId
      }
    })
  }

  private async getProducts(productsId: number[]): Promise<ProductEntity[]> {
    return await this.productRepository.findBy({
      Id: In(productsId)
    })
  }

}