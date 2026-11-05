import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';

import { AuthorsService } from './authors.service.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Controller('authors')
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {}

    @Get()
    findAll() {
        return this.authorsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authorsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateAuthorDto) {
        return this.authorsService.create(dto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateAuthorDto,
    ) {
        return this.authorsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authorsService.remove(id);
    }
}