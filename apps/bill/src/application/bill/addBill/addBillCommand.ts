export class Product {
    ProductId: number;
    Quantity: number;
    Cost: number;
}

export class AddBillCommand {
    UserId: number;
    Address: string;
    Products: Product[];

    constructor() {
        this.Products = [];
    }
}