import { UseSwagger } from '@app/shared/app/extensions/app.swagger';
import { AllExceptionsFilter } from '@app/shared/app/filters/allExceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

//Orm required
import "reflect-metadata";
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  UseSwagger(app, "Bill");

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost<any>)));

  await app.listen(3000);
}
bootstrap();
