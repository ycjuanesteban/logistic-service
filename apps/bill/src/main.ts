import { NestFactory } from '@nestjs/core';
import { BillModule } from './bill.module';

//Orm required
import "reflect-metadata";
import { UseSwagger } from './api/extensions/app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(BillModule);

  UseSwagger(app, "Bill");

  await app.listen(3000);
}
bootstrap();
