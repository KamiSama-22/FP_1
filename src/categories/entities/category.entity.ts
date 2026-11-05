import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book-entity.js';

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    name!: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at!: Date;

        
    @OneToMany(() => Book, (book) => book.category)
    books!: Book[];

}
