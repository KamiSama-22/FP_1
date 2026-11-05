import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { Publisher } from './entities/publisher.entitiy.js';

@Injectable()
export class PublishersService {
    constructor(
        @InjectRepository(Publisher)
        private readonly publisherRepository: Repository<Publisher>,
    ) {}

    // Menampilkan semua penerbit
    async findAll(): Promise<Publisher[]> {
        return await this.publisherRepository.find({
            order: { created_at: 'DESC' },
        });
    }

    // Mencari penerbit berdasarkan ID
    async findOne(id: string): Promise<Publisher> {
        const publisher = await this.publisherRepository.findOneBy({ id });

        if (!publisher) {
            throw new NotFoundException(
                `Penerbit dengan ID ${id} tidak ditemukan`,
            );
        }

        return publisher;
    }

    // Menambahkan penerbit
    async create(dto: CreatePublisherDto): Promise<Publisher> {
        const existingPublisher = await this.publisherRepository.findOneBy({
            name: dto.name,
        });

        if (existingPublisher) {
            throw new ConflictException('Nama penerbit sudah terdaftar');
        }

        const publisher = this.publisherRepository.create({
            name: dto.name,
        });

        return await this.publisherRepository.save(publisher);
    }

    // Mengubah data penerbit
    async update(
        id: string,
        dto: CreatePublisherDto,
    ): Promise<Publisher> {
        const publisher = await this.findOne(id);

        const existingPublisher = await this.publisherRepository.findOneBy({
            name: dto.name,
        });

        if (existingPublisher && existingPublisher.id !== id) {
            throw new ConflictException('Nama penerbit sudah digunakan');
        }

        publisher.name = dto.name;

        return await this.publisherRepository.save(publisher);
    }

    // Menghapus penerbit
    async remove(id: string): Promise<string> {
        const publisher = await this.findOne(id);

        await this.publisherRepository.remove(publisher);

        return `Penerbit ${publisher.name} berhasil dihapus`;
    }
}