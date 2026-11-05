import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto.js';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Get()
    findAll() {
        return this.paymentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreatePaymentDto) {
        return this.paymentsService.create(dto);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdatePaymentStatusDto,
    ) {
        return this.paymentsService.updateStatus(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentsService.remove(id);
    }
}