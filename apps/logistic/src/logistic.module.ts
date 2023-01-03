import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LogisticController } from './api/controllers/logistic.controller';
import { commandsHandlers } from './application/extensions/providers.cqrs';
import { factoriesServices } from './application/extensions/services';
import { databaseProviders, repositoryProviders } from './data';

@Module({
  imports: [
    CqrsModule
  ],
  controllers: [
    LogisticController
  ],
  providers: [
    ...databaseProviders,
    ...repositoryProviders,
    ...commandsHandlers,
    ...factoriesServices
  ],
})
export class LogisticModule { }
