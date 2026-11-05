import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

import { Customer } from './entities/customer.entity.js';
import { CreateCustomerDto } from './dto/create-cust.dto.js';
import { UpdateCustomerDto } from './dto/update-cust.dto.js';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async findAll() {
        return this.customerRepository.find();
    }

    async findOne(id: string) {
        const customer = await this.customerRepository.findOneBy({ id });

        if (!customer) {
            throw new NotFoundException('Pelanggan tidak ditemukan');
        }

        return customer;
    }

    async create(dto: CreateCustomerDto) {
        const existing = await this.customerRepository.findOneBy({
            email: dto.email,
        });

        if (existing) {
            throw new ConflictException('Email sudah terdaftar');
        }

        const customer = this.customerRepository.create(dto);
        return this.customerRepository.save(customer);
    }

    async update(id: string, dto: UpdateCustomerDto) {
        const customer = await this.findOne(id);

        if (dto.email) {
            const existing = await this.customerRepository.findOneBy({
                email: dto.email,
                id: Not(id),
            });

            if (existing) {
                throw new ConflictException('Email sudah terdaftar');
            }
        }

        Object.assign(customer, dto);
        return this.customerRepository.save(customer);
    }

    async remove(id: string) {
        const customer = await this.findOne(id);
        await this.customerRepository.softRemove(customer);

        return { message: 'Pelanggan berhasil dihapus' };
    }
}