import { BillDetailEntity } from "../../data/models";
import { Product } from "./product";

export class BillDetail {
  private Id: number;
  private Quantity: number;
  private Cost: number;
  private Product: Product;

  private constructor(
    quantity: number,
    cost: number,
    product: Product,
    id?: number
  ) {
    this.Quantity = quantity;
    this.Cost = cost;
    this.Product = product;

    if (id !== null && id !== undefined) {
      this.Id = id;
    }
  }

  get BillDetailId(): number {
    return this.Id;
  }

  get BillDetailQuantity(): number {
    return this.Quantity;
  }

  get BillDetailCost(): number {
    return this.Cost;
  }

  get BillDetailProduct(): Product {
    return this.Product;
  }

  set BillDetailQuantity(quantity: number) {
    this.Quantity = quantity;
  }

  set BillDetailCost(cost: number) {
    this.Cost = cost;
  }

  public static Create(
    quantity: number,
    cost: number,
    product: Product,
    id?: number
  ): BillDetail {

    if (quantity <= 0) {
      throw new Error('Error with quantity');
    }

    if (cost <= 0) {
      throw new Error('Error with cost');
    }

    if (product === null) {
      throw new Error('Error with product');
    }

    return new BillDetail(quantity, cost, product, id);
  }

  public static toDomain(entity: BillDetailEntity): BillDetail {
    return BillDetail.Create(
      entity.Quantity,
      entity.Cost,
      Product.toDomain(entity.Product),
      entity.Id
    );
  }

  public static toEntity(domain: BillDetail): BillDetailEntity {
    let billDetail = new BillDetailEntity();

    billDetail.Cost = domain.BillDetailCost;
    billDetail.Id = domain.BillDetailId;
    billDetail.Product = Product.toEntity(domain.BillDetailProduct);
    billDetail.Quantity = domain.BillDetailQuantity;

    return billDetail;
  }
}