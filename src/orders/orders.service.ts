import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Order } from './entities/order.entity.js';
import { OrderItem } from './entities/order-item.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { Book } from '../books/entities/book-entity.js';

import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        private readonly dataSource: DataSource,
    ) {}

    async findAll() {
        return this.orderRepository.find({
            relations: {
                customer: true,
                orderItems: {
                    book: true,
                },
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }

    async findOne(id: string) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: {
                customer: true,
                orderItems: {
                    book: true,
                },
            },
        });

        if (!order) {
            throw new NotFoundException('Order tidak ditemukan');
        }

        return order;
    }

    async create(dto: CreateOrderDto) {
        return this.dataSource.transaction(async (manager) => {
            const customerRepository = manager.getRepository(Customer);
            const bookRepository = manager.getRepository(Book);
            const orderRepository = manager.getRepository(Order);
            const itemRepository = manager.getRepository(OrderItem);

            const customer = await customerRepository.findOneBy({
                id: dto.customerId,
            });

            if (!customer) {
                throw new NotFoundException('Customer tidak ditemukan');
            }

            const existingOrder = await orderRepository.findOneBy({
                orderNumber: dto.orderNumber,
            });

            if (existingOrder) {
                throw new ConflictException('Nomor order sudah digunakan');
            }

            const items: OrderItem[] = [];
            let totalCents = 0;

            for (const itemDto of dto.items) {
                const book = await bookRepository.findOneBy({
                    id: itemDto.bookId,
                });

                if (!book) {
                    throw new NotFoundException(
                        `Buku ${itemDto.bookId} tidak ditemukan`,
                    );
                }

                if (!book.isAvailable) {
                    throw new ConflictException(
                        `Buku ${book.title} tidak tersedia`,
                    );
                }

                const priceCents = Math.round(Number(book.price) * 100);
                const subtotalCents = priceCents * itemDto.quantity;

                totalCents += subtotalCents;

                const item = itemRepository.create({
                    book,
                    quantity: itemDto.quantity,
                    price: book.price,
                    subtotal: (subtotalCents / 100).toFixed(2),
                });

                items.push(item);
            }

            const order = orderRepository.create({
                customer,
                orderNumber: dto.orderNumber,
                status: 'pending',
                totalAmount: (totalCents / 100).toFixed(2),
                orderItems: items,
            });

            return orderRepository.save(order);
        });
    }

    async update(id: string, dto: UpdateOrderDto) {
        const order = await this.orderRepository.findOneBy({ id });

        if (!order) {
            throw new NotFoundException('Order tidak ditemukan');
        }

        order.status = dto.status;

        return this.orderRepository.save(order);
    }
}