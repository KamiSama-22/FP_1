import { Injectable } from '@nestjs/common';
import { Books } from './entitas/entity.js';
import { createBookDto } from './dto/create-books.dto.js';

@Injectable()
export class BooksService {
    private books: Books[] = [
        {
            id: 1,
            title: 'tentang dia',
            author: 'irhash',
            isbn: '978-0-74332-7356-5',
            publishedDate: 2026,
            isAvailable: true
        },
        {
            id: 2,
            title: 'tentang dia 2',
            author: 'irhash',
            isbn: '978-0-12345-6789-0',
            publishedDate: 2027,
            isAvailable: false
        }
    ];
    //logic untuk menampilkan semua data buku
    findall(): Books[] {
        return this.books;
    }
    
    //simpan data buku
    simpandata(createBookDto: createBookDto): Books {
        const newBook: Books = {
            id: this.books.length + 1,
            title: createBookDto.title,
            author: createBookDto.author,
            isbn: createBookDto.isbn,
            publishedDate: createBookDto.publishedyear,
            isAvailable: true
        };

        this.books.push(newBook)
        return newBook;
    }

        //update data
        updatedata(id: number, createBookDto: createBookDto): Books {
            const bookIndex = this.books.findIndex(book => book.id === id);
            if (bookIndex === -1) {
                throw new Error(`Book with id ${id} not found`);
            }

            const updatedBook: Books = {
                ...this.books[bookIndex],
                title: createBookDto.title,
                author: createBookDto.author,
                isbn: createBookDto.isbn,
                publishedDate: createBookDto.publishedyear,
            };
            this.books[bookIndex] = updatedBook;
            return updatedBook;
        }
        hapusdata(id: number): string {
            const bookIndex = this.books.findIndex(book => book.id === id);
            if (bookIndex === -1) {
                throw new Error(`Buku dengan id ${id} tidak ditemukan`);
            }
            this.books.splice(bookIndex, 1);
            return `buku dengan id ${id} berhasil dihapus`;
        }
    }

