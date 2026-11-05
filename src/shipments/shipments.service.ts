import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shipment } from './entities/shipment.entity.js';
import { Order } from '../orders/entities/order.entity.js';

import { CreateShipmentDto } from './dto/create-shipment.dto.js';
import { UpdateShipmentDto } from './dto/update-shipment.dto.js';

@Injectable()
export class ShipmentsService {
    constructor(
        @InjectRepository(Shipment)
        private readonly shipmentRepository: Repository<Shipment>,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async findAll() {
        return this.shipmentRepository.find({
            relations: { order: true },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string) {
        const shipment = await this.shipmentRepository.findOne({
            where: { id },
            relations: { order: true },
        });

        if (!shipment) {
            throw new NotFoundException('Shipment tidak ditemukan');
        }

        return shipment;
    }

    async create(dto: CreateShipmentDto) {
        const order = await this.orderRepository.findOne({
            where: { id: dto.orderId },
            relations: { shipment: true },
        });

        if (!order) {
            throw new NotFoundException('Order tidak ditemukan');
        }

        if (order.shipment) {
            throw new ConflictException('Order sudah memiliki shipment');
        }

        const shipment = this.shipmentRepository.create({
            order,
            courier: dto.courier,
            trackingNumber: dto.trackingNumber,
            status: 'pending',
            shippedAt: null,
            deliveredAt: null,
        });

        return this.shipmentRepository.save(shipment);
    }

    async update(id: string, dto: UpdateShipmentDto) {
        const shipment = await this.findOne(id);

        if (dto.trackingNumber !== undefined) {
            shipment.trackingNumber = dto.trackingNumber;
        }

        shipment.status = dto.status;

        if (dto.status === 'shipped' && !shipment.shippedAt) {
            shipment.shippedAt = new Date();
        }

        if (dto.status === 'delivered') {
            shipment.deliveredAt = new Date();

            if (!shipment.shippedAt) {
                shipment.shippedAt = new Date();
            }
        }

        return this.shipmentRepository.save(shipment);
    }

    async remove(id: string) {
        const shipment = await this.findOne(id);

        return this.shipmentRepository.remove(shipment);
    }
}