import {
    Controller,
    Get,
    Post,
    Put,
    Param,
    Body,
} from '@nestjs/common';

import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
    ) {}

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.ordersService.create(dto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateOrderDto,
    ) {
        return this.ordersService.update(id, dto);
    }
}