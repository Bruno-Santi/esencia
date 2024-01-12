import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);

    // Configuración CORS para los sockets
    server.use((socket, next) => {
      const allowedOrigins = ['https://www.esencia.app'];

      const origin = socket.handshake.headers.origin;
      if (allowedOrigins.includes(origin)) {
        // Permitir el origen si está en la lista de permitidos
        socket.handshake.headers.origin = origin;
        return next();
      }

      // Rechazar la conexión si el origen no está permitido
      return next(new Error('Not allowed by CORS'));
    });

    return server;
  }
}
