import { Test, TestingModule } from '@nestjs/testing';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

describe('BillController', () => {
  let billController: BillController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillController],
      providers: [BillService],
    }).compile();

    billController = app.get<BillController>(BillController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billController.getHello()).toBe('Hello World!');
    });
  });
});
