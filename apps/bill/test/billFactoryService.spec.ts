import { Test } from '@nestjs/testing';
import {
  AddBillCommand,
  ProductCommand,
} from '../src/application/bill/addBill/addBillCommand';
import { BillFactoryService } from '../src/application/factories/bill.factory.service';

describe('BillFactoryService', () => {
  let billFactoryService: BillFactoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BillFactoryService],
    }).compile();

    billFactoryService = moduleRef.get<BillFactoryService>(BillFactoryService);
  });

  describe('findAll', () => {
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
    });
  });
});
