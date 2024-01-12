import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);

    server.use((socket, next) => {
      // Configura CORS aquí según tus necesidades
      const allowedOrigins = ['https://www.esencia.app'];
      const origin = socket.handshake.headers.origin;
      if (allowedOrigins.includes(origin)) {
        socket.request.headers.origin = origin;
      }

      return next();
    });

    return server;
  }
}
