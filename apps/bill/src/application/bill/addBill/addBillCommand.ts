export class ProductCommand {
  ProductId: number;
  Quantity: number;
  Cost: number;
}

export class AddBillCommand {
  UserId: number;
  Address: string;
  Products: ProductCommand[];

  constructor() {
    this.Products = [];
  }
}
