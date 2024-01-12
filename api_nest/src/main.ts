import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración específica de CORS
  app.enableCors({
    origin: 'https://www.esencia.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  // Configuración de WebSockets con el adaptador IoAdapter
  app.useWebSocketAdapter(new IoAdapter(app, {
    // Pasa la misma configuración CORS al adaptador de WebSockets
    cors: {
      origin: 'https://www.esencia.app',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  }));

  await app.listen(3000);
}

bootstrap();
