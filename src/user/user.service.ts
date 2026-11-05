import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/users-entity.js';
import { createuserdto } from './dto/create-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
        throw new NotFoundException(
            `User dengan ID ${id} tidak ditemukan`,
        );
    }

        return user;
    }

    
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
    }


    async create(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    
    async updateuser(
        id: string,
        updateuserdto: createuserdto,
        ): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException(
            `User dengan ID ${id} tidak ditemukan`,
            );
        }

        user.name = updateuserdto.name;
        user.email = updateuserdto.email;

        return await this.userRepository.save(user);
    }


    
    async hapusdata(id: string): Promise<string> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException(
            `User dengan ID ${id} tidak ditemukan`,
            );
    }

    await this.userRepository.remove(user);

    return `User dengan ID ${id} berhasil dihapus`;
    }
    
    async updatepassword(
        id: string,
        hashedPassword: string,
        ): Promise<string> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException(
            `User dengan ID ${id} tidak ditemukan`,
            );
        }

        user.password = hashedPassword;

        await this.userRepository.save(user);

        return `Password user dengan ID ${id} berhasil diperbarui`;
    }
}
