import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserEntity } from './entity/user.entity';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ClientsGateway {

  @WebSocketServer()
  public server: Server;

  constructor() {}

  handleEmitId(user: UserEntity) {
    this.server.emit('on-id-message', user);
  }

  emitClose() {
    this.server.emit('close', {});
  }

}
