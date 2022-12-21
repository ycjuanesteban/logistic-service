import { NestFactory } from '@nestjs/core';
import { BillModule } from './bill.module';

async function bootstrap() {
  const app = await NestFactory.create(BillModule);
  await app.listen(3000);
}
bootstrap();
