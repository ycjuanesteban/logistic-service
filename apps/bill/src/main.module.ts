import { Module } from '@nestjs/common';
import { BillModule } from './bill.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvVars: false,
      envFilePath: [
        `${process.cwd()}/apps/bill/src/.env`
      ]
    }),
    BillModule
  ]
})
export class MainModule { }
