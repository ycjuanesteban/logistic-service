export class ProductCommand {
  constructor(
    public readonly ProductId: number,
    public readonly Quantity: number,
    public readonly Cost: number
  ) { }
}

export class AddShippingCommand {
  constructor(
    public readonly UserId: number,
    public readonly Address: string,
    public readonly Products: ProductCommand[]
  ) { }
}
