import { Inject, OnApplicationShutdown } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import WebSocket, { Server } from 'ws';
import { HocuspocuImpl } from 'src/fundamentals/hocuspocus/hocuspocus.module';
import { Hocuspocus } from '@hocuspocus/server';
import { Request } from 'express';

@WebSocketGateway({
  path: '/sync',
})
export class SyncGateway
  implements OnGatewayInit, OnGatewayConnection, OnApplicationShutdown
{
  @WebSocketServer() server: Server;

  constructor(@Inject(HocuspocuImpl) private hocuspocus: Hocuspocus) {
    // console.log(process.env.HOCUS_POCUS_SOCKET_PORT);
  }

  afterInit(server: Server) {
    server.on('connection', (socket: WebSocket, request: Request) => {
      // const query = url.parse(request.url, true).query;
      // const context = {
      //   user: {
      //     id: 1234,
      //     name: 'Jane',
      //   },
      // };
      this.hocuspocus.handleConnection(socket, request);
    });
  }

  handleConnection(client: any, ...args: any[]) {}

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: WebSocket): string {
    return 'Hello world!';
  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() data: unknown) {
    console.log('[SOCKET] events', data);
  }

  onApplicationShutdown(signal?: string) {
    this.hocuspocus.destroy();
  }
}
