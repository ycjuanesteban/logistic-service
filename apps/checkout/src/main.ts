import { UseSwagger } from '@app/shared/app/extensions/app.swagger';
import {
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

//Orm required
import 'reflect-metadata';
import { AllExceptionsFilter } from '@app/shared/app/filters/allExceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost<any>)));

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  UseSwagger(app, 'Checkout');

  await app.listen(3000);
}
bootstrap();
