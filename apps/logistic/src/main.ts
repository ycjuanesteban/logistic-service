import { NestFactory } from '@nestjs/core';
import { LogisticModule } from './logistic.module';

async function bootstrap() {
  const app = await NestFactory.create(LogisticModule);
  await app.listen(3000);
}
bootstrap();
