import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { Order } from './order.entity.js';
import { Book } from '../../books/entities/book-entity.js';
import { Payment } from '../../payments/entities/payment.entity.js';

@Entity({ name: 'order_items' })
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Order, (order) => order.orderItems)
    @JoinColumn({ name: 'order_id' })
    order!: Relation<Order>;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'book_id' })
    book!: Relation<Book>;

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price!: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    subtotal!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @OneToOne(() => Payment, (payment) => payment.order)
    payment!: Relation<Payment | null>;
}