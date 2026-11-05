import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { Category } from '../../categories/entities/category.entity.js';
import { Publisher } from '../../publishers/entities/publisher.entitiy.js';
import { Author } from '../../authors/entities/author.entity.js';
import { OrderItem } from '../../orders/entities/order-item.entity.js';

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 65 })
    title: string;

    @Column({ type: 'varchar' })
    isbn: string;

    @Column({ type: 'int', default: 0 })
    publishedYear: number;

    @Column({type: 'decimal', precision: 12, scale: 2, default: 0,})
    price: string;

    @Column({ type: 'boolean', default: true })
    isAvailable: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

        
    @ManyToOne(() => Category, (category) => category.books, {
    nullable: true,
    })
    @JoinColumn({ name: 'category_id' })
    category!: Category | null;

    @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    nullable: true,
    })
    @JoinColumn({ name: 'publisher_id' })
    publisher!: Publisher | null;
    
    @ManyToMany(() => Author, (author) => author.books)
    @JoinTable({
        name: 'book_authors',
        joinColumn: {
            name: 'book_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'author_id',
            referencedColumnName: 'id',
        },
    })
    authors!: Author[];

    @OneToMany(() => OrderItem, (item) => item.book)
    orderItems!: Relation<OrderItem[]>;

}
