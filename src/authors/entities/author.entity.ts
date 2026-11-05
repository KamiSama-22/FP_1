import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book-entity.js';

@Entity({ name: 'authors' })
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 150 })
    name!: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at!: Date;

    @ManyToMany(() => Book, (book) => book.authors)
    books!: Book[];
}