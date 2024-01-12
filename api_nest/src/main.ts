import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './SocketIoAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // Pasa la instancia del servidor HTTP y el adaptador de WebSockets al adaptador de sockets personalizado
  app.useWebSocketAdapter(new SocketIoAdapter(httpServer));

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
