import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/entities/book-entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { OrderItem } from './entities/order-item.entity.js';
import { Order } from './entities/order.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Customer, Book,]),],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
