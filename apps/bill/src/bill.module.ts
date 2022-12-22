import { Module } from '@nestjs/common';
import { BillController } from './api/controllers/bill.controller';
import { BillService } from './application/bill.service';
import UseMySQL from './data/extensions/orm.extension';
import { databaseProviders } from './data/providers/database.provider';

@Module({
  imports: [
    ...UseMySQL
  ],
  controllers: [
    BillController
  ],
  providers: [
    BillService
    //...databaseProviders
  ],
})
export class BillModule { }
