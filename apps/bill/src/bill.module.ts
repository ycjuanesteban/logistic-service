import { Module } from '@nestjs/common';
import { BillController } from './api/controllers/bill.controller';
import { BillService } from './application/bill.service';

@Module({
  imports: [],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
