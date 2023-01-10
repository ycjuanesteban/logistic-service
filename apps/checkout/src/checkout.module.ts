import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { factoriesServices, services } from './application/extensions/services';
import { commandsHandlers } from './application/extensions/providers.cqrs';
import { CheckoutController } from './api/checkout.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [HttpModule, CqrsModule],
  controllers: [CheckoutController],
  providers: [...commandsHandlers, ...factoriesServices, ...services],
})
export class CheckoutModule {}
