import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity.js';
import { Publisher } from '../publishers/entities/publisher.entitiy.js';
import { Author } from '../authors/entities/author.entity.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(Publisher)
        private readonly publisherRepository: Repository<Publisher>,

        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) {}


    async findall(): Promise<Book[]> {
        return await this.bookRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findone(id: string): Promise<Book>{
        const book = await this.bookRepository.findOne({
            where: { id : id }
        })

        if(!book){
            throw new NotFoundException(`Buku ${id} tidak ditemukan`)
        }

        return book
    }

    
    async simpandata(dto: CreateBookDto) {
        const category = await this.categoryRepository.findOneBy({
            id: dto.categoryId,
        });

        if (!category) {
            throw new NotFoundException('Kategori tidak ditemukan');
        }

        const publisher = await this.publisherRepository.findOneBy({
            id: dto.publisherId,
        });

        if (!publisher) {
            throw new NotFoundException('Penerbit tidak ditemukan');
        }

        const authors = await this.authorRepository.findBy({
            id: In(dto.authorIds),
        });

        if (authors.length !== dto.authorIds.length) {
            throw new NotFoundException('Salah satu penulis tidak ditemukan');
        }

        const book = this.bookRepository.create({
        title: dto.title,
        isbn: dto.isbn,
        publishedYear: dto.publishedyear,
        price: String(dto.price),
        category,
        publisher,
        authors,
    });

        return this.bookRepository.save(book);
    }


    async updatedata(
        id: string,
        dto: UpdateBookDto,
    ): Promise<Book> {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: {
                authors: true,
            },
        });

        if (!book) {
            throw new NotFoundException(
                `Buku dengan id ${id} tidak ditemukan`,
            );
        }

        if (dto.categoryId) {
            const category = await this.categoryRepository.findOneBy({
                id: dto.categoryId,
            });

            if (!category) {
                throw new NotFoundException('Kategori tidak ditemukan');
            }

            book.category = category;
        }

        if (dto.publisherId) {
            const publisher = await this.publisherRepository.findOneBy({
                id: dto.publisherId,
            });

            if (!publisher) {
                throw new NotFoundException('Penerbit tidak ditemukan');
            }

            book.publisher = publisher;
        }

        if (dto.authorIds) {
            const authors = await this.authorRepository.findBy({
                id: In(dto.authorIds),
            });

            if (authors.length !== dto.authorIds.length) {
                throw new NotFoundException(
                    'Salah satu penulis tidak ditemukan',
                );
            }

            book.authors = authors;
        }

        if (dto.title !== undefined) book.title = dto.title;
        if (dto.isbn !== undefined) book.isbn = dto.isbn;

        if (dto.publishedyear !== undefined) {
            book.publishedYear = dto.publishedyear;
        }

        if (dto.price !== undefined) {
            book.price = String(dto.price);
        }

        return this.bookRepository.save(book);
    }

    async hapusdata(id: string): Promise<string> {
        const book = await this.bookRepository.findOneBy({ id });

        if (!book) {
            throw new NotFoundException(
                `Buku dengan id ${id} tidak ditemukan`,
            );
        }

        await this.bookRepository.softRemove(book);

        return `Buku dengan id ${id} berhasil dihapus`;
    }

}
