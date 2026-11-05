import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service.js';
import { ShipmentsController } from './shipments.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity.js';
import { Shipment } from './entities/shipment.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Order])],
  providers: [ShipmentsService],
  controllers: [ShipmentsController]
})
export class ShipmentsModule {}
