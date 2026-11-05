import { Module } from '@nestjs/common';
import { CustomerAddressesService } from './customer-addresses.service.js';
import { CustomerAddressesController } from './customer-addresses.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customers/entities/customer.entity.js';
import { CustomerAddress } from './entities/customer-address.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddress, Customer,]),],
  providers: [CustomerAddressesService],
  controllers: [CustomerAddressesController]
})
export class CustomerAddressesModule {}
