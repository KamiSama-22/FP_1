import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { ShipmentsService } from './shipments.service.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';
import { UpdateShipmentDto } from './dto/update-shipment.dto.js';

@Controller('shipments')
export class ShipmentsController {
    constructor(private readonly shipmentsService: ShipmentsService) {}

    @Get()
    findAll() {
        return this.shipmentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.shipmentsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateShipmentDto) {
        return this.shipmentsService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateShipmentDto,
    ) {
        return this.shipmentsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.shipmentsService.remove(id);
    }
}