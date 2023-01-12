import { BillDetail, Product } from "../src/application/domain"
import { BillDetailEntity, ProductEntity } from "../src/data/models";

describe('BillDetails', () => {

  it('should fail because quantity is less than zero', async () => {
    //Act
    const t = () => {
      BillDetail.Create(-1, 1, Product.Create('Producto 01'));
    }

    //Assert
    expect(t).toThrow('Error with quantity');
  })

  it('should fail because cost is less than zero', async () => {
    //Act
    const t = () => {
      BillDetail.Create(1, -1, Product.Create('Producto 01'));
    }

    //Assert
    expect(t).toThrow('Error with cost');
  })

  it('should fail because product is null', async () => {
    //Act
    const t = () => {
      BillDetail.Create(1, 1, null);
    }

    //Assert
    expect(t).toThrow('Error with product');
  })

  it('should create an instance of BillDetail', async () => {
    //Act
    let billDetail = BillDetail.Create(1, 1, Product.Create('Producto 01'));

    //Assert
    expect(billDetail).toBeDefined();
    expect(billDetail.BillDetailCost).toBe(1);
    expect(billDetail.BillDetailQuantity).toBe(1);
  })

  it('should create BillDetail object', async () => {
    //Arrange
    let productEntity = new ProductEntity();
    productEntity.Id = 1;
    productEntity.Name = 'Product 01';

    let billDetailsEntity = new BillDetailEntity();
    billDetailsEntity.Cost = 1;
    billDetailsEntity.Id = 1;
    billDetailsEntity.Quantity = 1;
    billDetailsEntity.Product = productEntity;

    //Act
    let billDetail = BillDetail.ToDomain(billDetailsEntity);

    //Assert
    expect(billDetail).toBeDefined();
    expect(billDetail.BillDetailProduct).toBeDefined();
    expect(billDetail.BillDetailCost).toBe(1);
    expect(billDetail.BillDetailId).toBe(1);
    expect(billDetail.BillDetailQuantity).toBe(1);
  })

  it('should create a BillDetailEntity object', async () => {
    //Arrange
    let billDetail = BillDetail.Create(1, 1, Product.Create('Product 01', 1));

    //Act
    let billDetailEntity = BillDetail.ToEntity(billDetail);

    //Assert
    expect(billDetailEntity).toBeDefined();
    expect(billDetailEntity.Product).toBeDefined();
    expect(billDetailEntity.Cost).toBe(1);
    expect(billDetailEntity.Quantity).toBe(1);
  })

})