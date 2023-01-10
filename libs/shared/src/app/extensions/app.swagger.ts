//Swagger
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const UseSwagger = (app: INestApplication, appName: string) => {
    const config = new DocumentBuilder()
        .setTitle(`${appName}-Service`)
        .setDescription(`${appName} Service`)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
}