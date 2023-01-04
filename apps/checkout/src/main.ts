import { UseSwagger } from '@app/shared/api/extensions/app.swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

//Orm required
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  UseSwagger(app, "Checkout");

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3002);
}
bootstrap();
