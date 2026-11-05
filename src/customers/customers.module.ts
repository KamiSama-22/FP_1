import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service.js';
import { CustomersController } from './customers.controller.js';
import { Customer } from './entities/customer.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddress } from '../customer-addresses/entities/customer-address.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddress, Customer])],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
