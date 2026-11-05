import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Author } from './entities/author.entity.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
    ) {}

    async findAll() {
        return this.authorRepository.find();
    }

    async findOne(id: string) {
        const author = await this.authorRepository.findOneBy({ id });

        if (!author) {
            throw new NotFoundException('Penulis tidak ditemukan');
        }

        return author;
    }

    async create(dto: CreateAuthorDto) {
        const existing = await this.authorRepository.findOneBy({
            name: dto.name,
        });

        if (existing) {
            throw new ConflictException('Nama penulis sudah terdaftar');
        }

        const author = this.authorRepository.create(dto);
        return this.authorRepository.save(author);
    }

    async update(id: string, dto: UpdateAuthorDto) {
        const author = await this.findOne(id);

        if (dto.name) {
            const existing = await this.authorRepository.findOneBy({
                name: dto.name,
                id: Not(id),
            });

            if (existing) {
                throw new ConflictException('Nama penulis sudah terdaftar');
            }
        }

        Object.assign(author, dto);
        return this.authorRepository.save(author);
    }

    async remove(id: string) {
        const author = await this.findOne(id);
        await this.authorRepository.remove(author);

        return { message: 'Penulis berhasil dihapus' };
    }
}