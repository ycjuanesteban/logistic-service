import { Test, TestingModule } from '@nestjs/testing';
import { LogisticController } from './logistic.controller';
import { LogisticService } from './logistic.service';

describe('LogisticController', () => {
  let logisticController: LogisticController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogisticController],
      providers: [LogisticService],
    }).compile();

    logisticController = app.get<LogisticController>(LogisticController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(logisticController.getHello()).toBe('Hello World!');
    });
  });
});
