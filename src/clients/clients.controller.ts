import { Controller, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {

    constructor(
        private readonly clientsService: ClientsService,
    ) {}

    @Post('emit-id/:id')
    emitId(@Param('id') id: string) {
        this.clientsService.emitId(id);
    }

    @Put('close') 
    close() {
        this.clientsService.close();
    }
}
