import { UseSwagger } from '@app/shared/api/extensions/app.swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

//Orm required
import "reflect-metadata";
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  UseSwagger(app, "Bill");

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
