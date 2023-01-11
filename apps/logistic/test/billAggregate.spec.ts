import {
  BillAggregate,
  BillDetail,
  Product,
  Shipping,
  User
} from "../src/application/domain";
import {
  BillDetailEntity,
  BillEntity,
  ProductEntity,
  ShippingEntity,
  UserEntity
} from "../src/data/models";

describe('BillAggregate', () => {

  it('should fail because address is empty', async () => {
    //Act
    const t = () => {
      BillAggregate.Create("");
    }

    //Assert
    expect(t).toThrow('Address is required');
  });

  it('should create a basic BillAggregate', async () => {
    //Act
    let bill = BillAggregate.Create('Bill address test');

    //Assert
    expect(bill).toBeDefined();
    expect(bill.BillAddress).toBe('Bill address test');
  });

  it('should add an user', async () => {
    //Act 
    let user = User.Create('Juan');
    let bill = BillAggregate.Create('Bill address test');
    bill.BillUser = user;

    //Assert
    expect(bill.BillUser).toBeDefined();
    expect(bill.BillUser.UserName).toBe('Juan');

  });

  it('should add a shipping', async () => {
    //Act 
    let shipping = Shipping.Create(1)
    let bill = BillAggregate.Create('Bill address test');
    bill.BillShipping = shipping;

    //Assert
    expect(bill.BillShipping).toBeDefined();
    expect(bill.BillShipping.ShippingId).toBe(1);

  });

  it('should add a bill details', async () => {
    //Act 
    let billDetail = BillDetail.Create(1, 1, Product.Create('juan'));
    let bill = BillAggregate.Create('Bill address test');
    bill.BillDetails = billDetail;

    //Assert
    expect(bill.BillDetail).toBeDefined();
    expect(bill.BillDetail[0].BillDetailQuantity).toBe(1);
    expect(bill.BillDetail[0].BillDetailCost).toBe(1);
    expect(bill.BillDetail[0].BillDetailProduct.ProductName).toBe('juan');

  });

  it('should create a BillEntity object', async () => {

    //Arrange
    let currentDate = new Date();

    let product = new ProductEntity();
    product.Id = 1;
    product.Name = 'product 01';

    let detail = new BillDetailEntity();
    detail.Cost = 1;
    detail.Id = 1;
    detail.Quantity = 1;
    detail.Product = product;

    let user = new UserEntity();
    user.Id = 1;
    user.Name = 'Juan';

    let shipping = new ShippingEntity();
    shipping.Id = 1;

    let entity = new BillEntity();
    entity.Address = 'Address test';
    entity.Date = currentDate;
    entity.Details = [detail];
    entity.Shipping = shipping;
    entity.User = user;

    //Act
    let bill = BillAggregate.ToDomain(entity);

    //Assert
    expect(bill).toBeDefined();
    expect(bill.BillAddress).toBe('Address test')
    expect(bill.BillDate).toStrictEqual(currentDate);

    expect(bill.BillDetail).toBeDefined();
    expect(bill.BillUser).toBeDefined();
    expect(bill.BillShipping).toBeDefined();
  })

  it('should create a BillAggregate object', async () => {
    //Arange
    let currentDate = new Date();

    let detail = BillDetail.Create(1, 1, Product.Create('producto 01', 1));
    let shipping = Shipping.Create();
    let user = User.Create('Juan', 1);

    let bill = BillAggregate.Create('Address', null, currentDate);
    bill.BillDetails = detail;
    bill.BillShipping = shipping;
    bill.BillUser = user;

    //Act
    let entity = BillAggregate.ToEntity(bill);

    //Assert
    expect(entity).toBeDefined();
    expect(entity.Address).toBe('Address');
    expect(entity.Date).toStrictEqual(currentDate);

    expect(entity.Details).toBeDefined();
    expect(entity.Details).toHaveLength(1);
    expect(entity.User).toBeDefined();
    expect(entity.Shipping).toBeDefined();
  })

})