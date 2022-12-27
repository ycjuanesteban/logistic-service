import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

//Orm required
import "reflect-metadata";
import { UseSwagger } from './api/extensions/app.swagger';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  UseSwagger(app, "Bill");

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
