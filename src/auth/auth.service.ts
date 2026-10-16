import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private users = [
        {
            id: 1,
            name: 'Irhash',
            email: 'irhash@gmail.com',
            password: '123456'
        },
        {
            id: 2,
            name: 'Budi',
            email: 'budi@gmail.com',
            password: '654321'
        }
    ];

    findall() {
        return this.users;
    }

    register(name: string, email: string, password: string) {
        const newUser = {
            id: this.users.length + 1,
            name: name,
            email: email,
            password: password
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, name: string, email: string, password: string) {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new Error(`User dengan id ${id} tidak ditemukan`);
        }

        const updatedUser = {
            ...this.users[userIndex],
            name: name,
            email: email,
            password: password
        };

        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    delete(id: number): string {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new Error(`User dengan id ${id} tidak ditemukan`);
        }

        this.users.splice(userIndex, 1);

        return `User dengan id ${id} berhasil dihapus`;
    }
}