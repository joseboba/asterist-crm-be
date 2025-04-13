import { Controller, Get, Param, Post, Put } from '@nestjs/common';
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

    @Get(':id')
    getClient(@Param('id') id: string) {
        return this.clientsService.getClient(id);
    }

    @Get()
    getClients() {
        return this.clientsService.getClients();
    }

    @Post('call/:id')
    callClient(@Param('id') id: string) {
        this.clientsService.callClient(id);
    }
}
