import { IoAdapter } from '@nestjs/platform-socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);

    server.use((socket, next) => {
      // Configurar CORS aquí
      socket.request.headers.origin = socket.request.headers.referer;
      // Otros ajustes CORS si es necesario

      return next();
    });

    // Verificar si la propiedad 'engine' está presente antes de usarla
    if (server.server && server.server.engine) {
      server.server.engine.on('connection', (socket) => {
        // Configurar CORS aquí también si es necesario
      });
    }

    return server;
  }
}
