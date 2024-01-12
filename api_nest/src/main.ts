import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );




   app.useWebSocketAdapter(new IoAdapter(app)); 

  await app.listen(3000);


  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
