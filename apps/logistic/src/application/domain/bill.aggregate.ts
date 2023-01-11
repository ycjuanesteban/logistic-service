import { BillDetailEntity, BillEntity } from "../../data/models";
import { BillDetail } from "./billDetail";
import { Shipping } from "./shipping";
import { User } from "./user";

export class BillAggregate {
  private Id: number;
  private Date: Date;
  private Address: string;
  private Details: BillDetail[];
  private User: User;
  private Shipping: Shipping;

  constructor(
    address: string,
    id?: number,
    date?: Date
  ) {
    this.Address = address;
    this.Details = [];

    this.Date = date ?? new Date();

    if (id !== null || id !== undefined) {
      this.Id = id;
    }

  }

  public get BillId(): number {
    return this.Id;
  }

  public get BillDate(): Date {
    return this.Date;
  }

  public get BillAddress(): string {
    return this.Address;
  }

  public get BillUser(): User {
    return this.User;
  }

  public get BillShipping(): Shipping {
    return this.Shipping;
  }

  public get BillDetail(): BillDetail[] {
    return this.Details;
  }

  public set BillDetails(billDetail: BillDetail) {
    if (this.Details.length == 0) {
      this.Details.push(billDetail);
    }
    else {
      let indexDitail = this.Details.findIndex(x => x.BillDetailProduct.ProductId == billDetail.BillDetailProduct.ProductId);

      if (indexDitail == -1) {
        this.Details.push(billDetail);
      }
      else {
        this.Details[indexDitail].BillDetailQuantity += billDetail.BillDetailQuantity;
        this.Details[indexDitail].BillDetailCost += billDetail.BillDetailCost;
      }
    }
  }

  public set BillUser(user: User) {
    this.User = user;
  }

  public set BillShipping(shipping: Shipping) {
    this.Shipping = shipping;
  }

  public static Create(
    address: string,
    id?: number,
    date?: Date
  ): BillAggregate {

    if (address === "") {
      throw new Error('Address is required');
    }

    return new BillAggregate(address, id, date);
  }

  public static toDomain(entity: BillEntity): BillAggregate {
    let bill = BillAggregate.Create(
      entity.Address,
      entity.Id
    );

    entity.Details.forEach(currentDetail => {
      bill.BillDetails = BillDetail.toDomain(currentDetail);
    });

    bill.BillUser = User.toDomain(entity.User);
    bill.BillShipping = Shipping.toDomain(entity.Shipping);

    return bill;

  }

  public static toEntity(domain: BillAggregate): BillEntity {
    let bill = new BillEntity();

    let details: BillDetailEntity[] = [];
    domain.BillDetail.forEach(currentDetail => {
      details.push(BillDetail.toEntity(currentDetail));
    });

    bill.Address = domain.BillAddress;
    bill.Date = domain.BillDate;
    bill.Details = details;
    bill.Shipping = Shipping.toEntity(domain.BillShipping);
    bill.User = User.toEntity(domain.BillUser);

    return bill;
  }
}