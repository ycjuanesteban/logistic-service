import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogisticModule } from './logistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvVars: false,
      envFilePath: [`${process.cwd()}/apps/logistic/src/.env`],
    }),
    LogisticModule,
  ],
})
export class MainModule {}
