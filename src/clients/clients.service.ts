import { Injectable } from '@nestjs/common';
import { ClientsGateway } from './clients.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/uset.dto';
import * as moment from 'moment';
const { call, close } = require('./off-call');



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

  async getClient(phone: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { phone } });
    return user 
    ? {
      ...user,
      birthdate: moment(user.birthdate).format('hh:mm:ss DD/MM/yyyy'),
    } 
    : null;
  }

  async getClients(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async callClient(phone: string): Promise<void> {
    call(phone, {});
  }
}
