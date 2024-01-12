import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración específica de CORS
  app.enableCors({
    origin: 'https://www.esencia.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Permite el envío de cookies y encabezados de autenticación
  });

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

  await app.listen(3000);
  app.useWebSocketAdapter(new IoAdapter(app));
}

bootstrap();
