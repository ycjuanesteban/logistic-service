import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BillController } from './api/controllers/bill.controller';
import { commandsHandlers } from './application/extensions/providers.cqrs';
import { factoriesServices } from './application/extensions/services';
import { databaseProviders, repositoryProviders } from './data';

@Module({
  imports: [CqrsModule],
  controllers: [BillController],
  providers: [
    ...databaseProviders,
    ...repositoryProviders,
    ...commandsHandlers,
    ...factoriesServices,
  ],
})
export class BillModule {}
