"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketIoAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.use((socket, next) => {
            socket.request.headers.origin = socket.request.headers.referer;
            return next();
        });
        if (server.server && server.server.engine) {
            server.server.engine.on('connection', (socket) => {
            });
        }
        return server;
    }
}
exports.SocketIoAdapter = SocketIoAdapter;
//# sourceMappingURL=SocketIoAdapter.js.map