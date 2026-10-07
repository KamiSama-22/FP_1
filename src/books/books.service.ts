import { Injectable } from '@nestjs/common';
import { Book } from './entitas/book-entity.js';
import { createbookdto } from './dto/create-book.dto.js';
import { error } from 'console';

@Injectable()
export class BooksService {
    private books: Book[] = [
        {
            id: 1,
            title: 'bulan',
            author: 'tereliye',
            isbn: '84-7-285-72003-5',
            publishedyear: 2015,
            isavailable: true
        },
        {
            id: 2,
            title: 'matahari',
            author: 'tereliye',
            isbn: '19010-0-06-27222-3',
            publishedyear: 2016,
            isavailable: false
        }
    ];

    findall(): Book[]{
        return this.books;
    }

    simpandata(createbookdto: createbookdto): Book{
        const newbook: Book = {
            id: this.books.length + 1,
            title: createbookdto.title,
            author: createbookdto.author,
            isbn: createbookdto.isbn,
            publishedyear: createbookdto.publishedyear,
            isavailable: true
        };
        this.books.push(newbook)

        return newbook;
    };

    updatedata(id: number, updatebookdto: createbookdto): Book{
        const bookIndex = this.books.findIndex(Book => Book.id === id);
        if(bookIndex === -1) {
            throw new Error(`buku dengan id ${id} tidak ditemukan`);
        }

        const updatedbook: Book = {
            ...this.books[bookIndex],
            title: updatebookdto.title,
            author: updatebookdto.author,
            isbn: updatebookdto.isbn,
            publishedyear: updatebookdto.publishedyear
        };
        this.books[bookIndex] = updatedbook;
        return updatedbook;
    }

    hapusdata(id: number): string {
        const bookIndex = this.books.findIndex(Book => Book.id === id);
        if (bookIndex === -1) {
            throw new Error(`buku dengan id ${id} tidak ditemukan`);
        }
        this.books.splice(bookIndex, 1);
        return `Buku dengan id ${id} berhasil dihapus`;
    }

}