/* eslint-disable @typescript-eslint/no-unused-vars */
import { fastifyHelmet } from 'fastify-helmet';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

function setupSwagger(app: NestFastifyApplication) {
    const config = new DocumentBuilder()
        .setTitle('MVP-Factory Take-Home-Task')
        .setDescription('The vendor-machine API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}

const contentSecurityPolicy = {
    directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
    },
};
// eslint-disable-next-line max-lines-per-function
async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
    const globalPrefix = 'api';
    await app.register(fastifyCookie);
    await app.register(fastifyCsrf);
    await app.register(fastifyCors, {
        origin: ['http://localhost:4200', 'https://vendor-crud-app.vercel.app/'],
        credentials: true,
    });
    await app.register(fastifyHelmet, {
        contentSecurityPolicy,
    });
    app.setGlobalPrefix(globalPrefix);
    setupSwagger(app);

    const port = process.env.PORT || 3333;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
