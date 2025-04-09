import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsGateway } from './clients.gateway';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

@Module({
  providers: [ClientsGateway, ClientsService],
  controllers: [ClientsController],
  imports: [TypeOrmModule.forFeature([UserEntity])], // Add your entities here
})
export class ClientsModule {}
