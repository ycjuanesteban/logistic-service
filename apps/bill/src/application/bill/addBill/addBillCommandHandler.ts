import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Bill, BillDetail, Product, User } from "apps/bill/src/domain";
import { In, Repository } from "typeorm";
import { AddBillCommand, ProductCommand } from "./addBillCommand";

@CommandHandler(AddBillCommand)
export class AddBillCommandHandler implements ICommandHandler<AddBillCommand, void> {

    constructor(
        @Inject('BILL_REPOSITORY') private billRepository: Repository<Bill>,
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
        @Inject('PRODUCT_REPOSITORY') private productRepository: Repository<Product>
    ) { }

    async execute(command: AddBillCommand): Promise<void> {
        let user = await this.getUser(command.UserId);

        if (user == null) {
            throw new NotFoundException("User not found");
        }

        let products = await this.getProducts(command.Products.map(x => x.ProductId));

        let simpleProducts = this.removeDuplicates(command.Products);

        if (products.length != simpleProducts.length) {
            throw new NotFoundException("One or more products not found");
        }

        let newBill = this.createBill(command);
        newBill.Details = this.createBillDetails(simpleProducts, products);
        newBill.User = user;

        await this.billRepository.save(newBill);
    }

    private createBill(command: AddBillCommand): Bill {
        let newBill = new Bill();
        newBill.Address = command.Address;
        newBill.Date = new Date();

        return newBill;
    }

    private createBillDetails(products: ProductCommand[], productsDb: Product[]): BillDetail[] {
        let details: BillDetail[] = [];

        products.forEach(currentProduct => {
            let detail = new BillDetail();
            detail.Cost = currentProduct.Cost;
            detail.Product = productsDb.find(x => x.Id == currentProduct.ProductId);
            detail.Quantity = currentProduct.Quantity;

            details.push(detail);
        });

        return details;
    }

    private removeDuplicates(products: ProductCommand[]) {
        let simpleProducts: ProductCommand[] = [];

        products.forEach(currentProduct => {
            let existCurrentProduct = simpleProducts.filter(x => x.ProductId == currentProduct.ProductId);

            if (existCurrentProduct.length == 0) {
                let detail = new ProductCommand();
                detail.Cost = currentProduct.Cost;
                detail.Quantity = currentProduct.Quantity;
                detail.ProductId = currentProduct.ProductId;

                simpleProducts.push(detail);
            }
            else {
                let index = simpleProducts.findIndex(x => x.ProductId == currentProduct.ProductId);
                simpleProducts[index].Quantity += currentProduct.Quantity;
                simpleProducts[index].Cost += currentProduct.Cost;
            }
        });

        return simpleProducts;
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