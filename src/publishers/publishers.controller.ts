import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';

import { PublishersService } from './publishers.service.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';

@Controller('publishers')
export class PublishersController {
    constructor(
        private readonly publishersService: PublishersService,
    ) {}

    // GET /publishers
    @Get()
    findAll() {
        return this.publishersService.findAll();
    }

    // GET /publishers/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.publishersService.findOne(id);
    }

    // POST /publishers
    @Post()
    create(@Body() dto: CreatePublisherDto) {
        return this.publishersService.create(dto);
    }

    // PUT /publishers/:id
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: CreatePublisherDto,
    ) {
        return this.publishersService.update(id, dto);
    }

    // DELETE /publishers/:id
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.publishersService.remove(id);
    }
}