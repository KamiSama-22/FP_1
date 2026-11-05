import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';

import { CustomersService } from './customers.service.js';
import { CreateCustomerDto } from './dto/create-cust.dto.js';
import { UpdateCustomerDto } from './dto/update-cust.dto.js';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Get()
    findAll() {
        return this.customersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customersService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateCustomerDto) {
        return this.customersService.create(dto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateCustomerDto,
    ) {
        return this.customersService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customersService.remove(id);
    }
}