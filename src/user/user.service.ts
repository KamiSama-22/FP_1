import { Injectable } from '@nestjs/common';
import { user } from './entitas/entity-user.js';
import { createuserdto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
    private users: user[] = [
        {
            id: 1,
            nama: 'mieayam',
            email: 'gakpedes@gmail.com',
            password: 'request_timeout'
        },
        {
            id: 2,
            nama: 'ayamgeprek',
            email: 'sambalijo@gmail.com',
            password: 'raisedpaycheck'
        }
    ];

    findall(): user[]{
        return this.users;
    }

    findbyemail(email: string): user | undefined {
        return this.users.find(user => user.email === email);
    }

    newuser(createuserdto: createuserdto): user{
        const newuser: user = {
            id: this.users.length + 1,
            nama: createuserdto.nama,
            email: createuserdto.email,
            password: createuserdto.password
        };
        this.users.push(newuser)

        return newuser;
    };

    updateuser(id: number, updateuserdto: createuserdto): user{
        const userindex = this.users.findIndex(user => user.id === id);
        if(userindex === -1) {
            throw new Error(`user dengan id ${id} tidak ditemukan`);
        }

        const updateduser: user = {
            ...this.users[userindex],
            nama: updateuserdto.nama,
            email: updateuserdto.email,
            password: updateuserdto.password
        };
        this.users[userindex] = updateduser;
        return updateduser;
    }

    hapusdata(id: number): string {
        const userindex = this.users.findIndex(user => user.id === id);
        if (userindex === -1) {
            throw new Error(`user dengan id ${id} tidak ditemukan`);
        }
        this.users.splice(userindex, 1);
        return ` buku dengan id ${id} berhasil dihapus`;
    }

    updatepassword(id: number, password: string): user {
        const userindex = this.users.findIndex(user => user.id === id);

        if (userindex === -1) {
            throw new Error(`user dengan id ${id} tidak ditemukan`);
        }

        const updateduser: user = {
            ...this.users[userindex],
            password: password
        };

        this.users[userindex] = updateduser;

        return updateduser;
    }
    
}