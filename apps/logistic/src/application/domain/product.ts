import { ProductEntity } from "../../data/models";

export class Product {
  private Id: number;
  private Name: string;

  private constructor(
    name: string,
    id?: number
  ) {
    this.Name = name;

    if (id !== null && id !== undefined) {
      this.Id = id;
    }
  }

  get ProductId(): number {
    return this.Id;
  }

  get ProductName(): string {
    return this.Name;
  }

  public static Create(
    name: string,
    id?: number
  ): Product {
    if (name === "") {
      throw new Error('name is required');
    }

    return new Product(name, id);
  }

  public static ToDomain(entity: ProductEntity): Product {
    return Product.Create(entity.Name, entity.Id);
  }

  public static ToEntity(domain: Product): ProductEntity {
    let product = new ProductEntity();

    product.Id = domain.ProductId;
    product.Name = domain.ProductName;

    return product;
  }
}