import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';

import { CustomerAddressesService } from './customer-addresses.service.js';

import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';

@Controller('customer-addresses')
export class CustomerAddressesController {
    constructor(
        private readonly customerAddressesService: CustomerAddressesService,
    ) {}

    @Get()
    findAll() {
        return this.customerAddressesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customerAddressesService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateCustomerAddressDto) {
        return this.customerAddressesService.create(dto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateCustomerAddressDto,
    ) {
        return this.customerAddressesService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customerAddressesService.remove(id);
    }
}