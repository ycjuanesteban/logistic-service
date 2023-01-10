import { Test } from '@nestjs/testing';
import {
  AddBillCommand,
  ProductCommand,
} from '../src/application/bill/addBill/addBillCommand';
import { BillFactoryService } from '../src/application/factories/bill.factory.service';
import { Product } from '../src/domain';

describe('BillFactoryService', () => {
  let billFactoryService: BillFactoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BillFactoryService],
    }).compile();

    billFactoryService = moduleRef.get<BillFactoryService>(BillFactoryService);
  });

  describe('Create all the correct objects', () => {
    it('should convert AddBillCommand to AddBillDto', async () => {
      //Arrange
      const product = new ProductCommand();
      product.Cost = 100;
      product.ProductId = 1;
      product.Quantity = 1;

      const addBillCommand = new AddBillCommand();
      addBillCommand.Address = 'Address';
      addBillCommand.Products = [product];
      addBillCommand.UserId = 1;

      //Act
      const addBillDto = billFactoryService.createBillCommand(addBillCommand);

      //Assert
      expect(addBillDto.Address).toBe('Address');
      expect(addBillDto.UserId).toBe(1);
      expect(addBillDto.Products).toBeDefined();

      expect(addBillDto.Products).toHaveLength(1);
      expect(addBillDto.Products[0].Cost).toBe(100);
      expect(addBillDto.Products[0].ProductId).toBe(1);
      expect(addBillDto.Products[0].Quantity).toBe(1);
    });

    it('should convert AddBillCommand to Bill', async () => {
      //Arrange
      const product = new ProductCommand();
      product.Cost = 100;
      product.ProductId = 1;
      product.Quantity = 1;

      const addBillCommand = new AddBillCommand();
      addBillCommand.Address = 'Address';
      addBillCommand.Products = [product];
      addBillCommand.UserId = 1;

      //Act
      const bill = billFactoryService.createBill(addBillCommand);

      //Asserts
      expect(bill).toBeDefined();
      expect(bill.Address).toBe('Address');
    });

    it('should convert ProductCommand[] & Product[] to BillDetail[]', async () => {
      //Arrange
      const productCommand = new ProductCommand();
      productCommand.Cost = 100;
      productCommand.ProductId = 1;
      productCommand.Quantity = 1;

      const product = new Product();
      product.Id = 1;
      product.Name = 'Product 1';

      const productsCommand = [productCommand];
      const products = [product];

      //Act
      const billDetail = billFactoryService.createBillDetails(
        productsCommand,
        products,
      );

      //Asserts
      expect(billDetail).toBeDefined();
      expect(billDetail[0].Cost).toBe(100);
      expect(billDetail[0].Quantity).toBe(1);
      expect(billDetail[0].Product).toBeDefined();
    });
  });
});
