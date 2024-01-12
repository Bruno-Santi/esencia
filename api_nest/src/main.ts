import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SocketIoAdapter } from './SocketIoAdapter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración específica de CORS para el servidor HTTP
  app.enableCors({
    origin: 'https://www.esencia.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
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

  const httpServer = await app.listen(3000);

  // Pasa la instancia del servidor HTTP al adaptador de WebSockets
  app.useWebSocketAdapter(new SocketIoAdapter(httpServer));
}

bootstrap();
