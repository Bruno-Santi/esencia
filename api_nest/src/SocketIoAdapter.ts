import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);

    server.use((socket, next) => {
      // Configura CORS aquí
      socket.request.headers.origin = socket.request.headers.referer;
      // Otros ajustes CORS si es necesario

      return next();
    });

    return server;
  }
}
