import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { PaymentsController } from './payments.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity.js';
import { Payment } from './entities/payment.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order])],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
