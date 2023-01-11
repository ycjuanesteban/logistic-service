import { ShippingEntity } from "../../data/models";

export class Shipping {
  private Id: number;

  private constructor(
    id?: number
  ) {
    if (id !== null && id !== undefined) {
      this.Id = id;
    }
  }

  get ShippingId(): number {
    return this.Id;
  }

  public static Create(
    id?: number
  ): Shipping {
    return new Shipping(id);
  }

  public static toDomain(entity: ShippingEntity): Shipping {
    return Shipping.Create(entity.Id);
  }

  public static toEntity(domain: Shipping): ShippingEntity {
    let shippingEntity = new ShippingEntity();
    shippingEntity.Id = domain.ShippingId;

    return shippingEntity;
  }

}