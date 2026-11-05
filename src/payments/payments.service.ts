import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './entities/payment.entity.js';
import { Order } from '../orders/entities/order.entity.js';

import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto.js';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async findAll() {
        return this.paymentRepository.find({
            relations: { order: true },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string) {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: { order: true },
        });

        if (!payment) {
            throw new NotFoundException('Payment tidak ditemukan');
        }

        return payment;
    }

    async create(dto: CreatePaymentDto) {
        const order = await this.orderRepository.findOne({
            where: { id: dto.orderId },
            relations: { payment: true },
        });

        if (!order) {
            throw new NotFoundException('Order tidak ditemukan');
        }

        if (order.payment) {
            throw new ConflictException('Order sudah memiliki payment');
        }

        const payment = this.paymentRepository.create({
            order,
            paymentMethod: dto.paymentMethod,
            amount: order.totalAmount,
            status: 'pending',
            paidAt: null,
        });

        return this.paymentRepository.save(payment);
    }

    async updateStatus(id: string, dto: UpdatePaymentStatusDto) {
        const payment = await this.findOne(id);

        payment.status = dto.status;
        payment.paidAt = dto.status === 'paid' ? new Date() : null;

        return this.paymentRepository.save(payment);
    }

    async remove(id: string) {
        const payment = await this.findOne(id);

        return this.paymentRepository.remove(payment);
    }
}