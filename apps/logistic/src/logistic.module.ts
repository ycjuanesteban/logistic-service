import { Module } from '@nestjs/common';
import { LogisticController } from './logistic.controller';
import { LogisticService } from './logistic.service';

@Module({
  imports: [],
  controllers: [LogisticController],
  providers: [LogisticService],
})
export class LogisticModule {}
