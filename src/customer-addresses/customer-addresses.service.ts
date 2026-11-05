import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerAddress } from './entities/customer-address.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';

import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';

@Injectable()
export class CustomerAddressesService {
    constructor(
        @InjectRepository(CustomerAddress)
        private readonly addressRepository: Repository<CustomerAddress>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async findAll() {
        return this.addressRepository.find({
            relations: { customer: true },
        });
    }

    async findOne(id: string) {
        const address = await this.addressRepository.findOne({
            where: { id },
            relations: { customer: true },
        });

        if (!address) {
            throw new NotFoundException('Alamat tidak ditemukan');
        }

        return address;
    }

    async create(dto: CreateCustomerAddressDto) {
        const customer = await this.customerRepository.findOneBy({
            id: dto.customerId,
        });

        if (!customer) {
            throw new NotFoundException('Customer tidak ditemukan');
        }

        const address = this.addressRepository.create({
            customer,
            recipientName: dto.recipientName,
            phone: dto.phone,
            address: dto.address,
            city: dto.city,
            postalCode: dto.postalCode,
        });

        return this.addressRepository.save(address);
    }

    async update(id: string, dto: UpdateCustomerAddressDto) {
        const address = await this.findOne(id);

        if (dto.customerId) {
            const customer = await this.customerRepository.findOneBy({
                id: dto.customerId,
            });

            if (!customer) {
                throw new NotFoundException('Customer tidak ditemukan');
            }

            address.customer = customer;
        }

        Object.assign(address, {
            recipientName: dto.recipientName,
            phone: dto.phone,
            address: dto.address,
            city: dto.city,
            postalCode: dto.postalCode,
        });

        return this.addressRepository.save(address);
    }

    async remove(id: string) {
        const address = await this.findOne(id);
        return this.addressRepository.remove(address);
    }
}