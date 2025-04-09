import { Injectable } from '@nestjs/common';
import { ClientsGateway } from './clients.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {

  constructor(
    private readonly clientsGateway: ClientsGateway,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async emitId(phone: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { phone } });
    this.clientsGateway.handleEmitId(user!);
  }

  async close() {
    this.clientsGateway.emitClose();
  }
}
