export class ProductCommand {
  ProductId: number;
  Quantity: number;
  Cost: number;
}

export class AddShippingCommand {
  UserId: number;
  Address: string;
  Products: ProductCommand[];

  constructor() {
    this.Products = [];
  }
}
