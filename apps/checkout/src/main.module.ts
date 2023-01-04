import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CheckoutModule } from './checkout.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvVars: false,
      envFilePath: [
        `${process.cwd()}/apps/checkout/src/.env`
      ]
    }),
    CheckoutModule
  ]
})
export class MainModule { }
