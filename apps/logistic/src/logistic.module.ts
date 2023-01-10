import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ShippingController } from './api/controllers/shipping.controller';
import { commandsHandlers } from './application/extensions/providers.cqrs';
import { factoriesServices } from './application/extensions/services';
import { databaseProviders, repositoryProviders } from './data';

@Module({
  imports: [
    CqrsModule
  ],
  controllers: [
    ShippingController
  ],
  providers: [
    ...databaseProviders,
    ...repositoryProviders,
    ...commandsHandlers,
    ...factoriesServices
  ],
})
export class LogisticModule { }
