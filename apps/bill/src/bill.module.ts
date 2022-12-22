import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BillController } from './api/controllers/bill.controller';
import { BillService } from './application/bill.service';
import { UseCqrs } from './application/extensions/providers.cqrs';
import UseMySQL from './data/extensions/orm.extension';
import { databaseProviders } from './data/providers/database.provider';

@Module({
  imports: [
    CqrsModule,
    ...UseMySQL
  ],
  controllers: [
    BillController
  ],
  providers: [
    BillService,
    ...databaseProviders,
    ...UseCqrs
  ],
})
export class BillModule { }
