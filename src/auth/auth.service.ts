
import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

import { registerdto } from './dto/register.dto.js';
import { logindto } from './dto/login.dto.js';
import { forgotpassworddto } from './dto/forgotpassword.dto.js';
import { resetpassworddto } from './dto/resetpassword.dto.js';

import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly userservice: UserService,
    ) {}

    
    async register(registerdto: registerdto) {
        if (registerdto.password !== registerdto.confirmPassword) {
            throw new BadRequestException(
                'Password dan confirm password tidak sama',
            );
        }

        const existinguser = await this.userservice.findByEmail(
            registerdto.email,
        );

        if (existinguser) {
            throw new ConflictException('Email sudah digunakan');
        }

        const hashedPassword = await bcrypt.hash(
            registerdto.password,
            10,
        );

        const user = await this.userservice.create({
            name: registerdto.nama,
            email: registerdto.email,
            password: hashedPassword,
        });

        return {
            message: 'Registrasi berhasil',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }


    async login(logindto: logindto) {
        const user = await this.userservice.findByEmail(
            logindto.email,
        );

        if (
            !user ||
            !(await bcrypt.compare(logindto.password, user.password))
        ) {
            throw new UnauthorizedException(
                'Email atau password salah',
            );
        }

        return {
            message: 'Login berhasil',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }

    private resetTokens: {
        email: string;
        token: string;
    }[] = [];

    async forgotPassword(forgotpassworddto: forgotpassworddto) {
        const user = await this.userservice.findByEmail(
            forgotpassworddto.email,
        );

        if (!user) {
            throw new UnauthorizedException(
                'Email tidak ditemukan',
            );
        }

        const token = randomUUID();

        this.resetTokens.push({
            email: user.email,
            token,
        });

        return {
            message: 'Token reset password berhasil dibuat',
            token,
        };
    }

    
    async resetPassword(resetpassworddto: resetpassworddto) {
        if (
            resetpassworddto.newPassword !==
            resetpassworddto.confirmPassword
        ) {
            throw new BadRequestException(
                'Password dan confirm password tidak sama',
            );
        }

        const tokenData = this.resetTokens.find(
            (item) => item.token === resetpassworddto.token,
        );

        if (!tokenData) {
            throw new UnauthorizedException('Token tidak valid');
        }

        const user = await this.userservice.findByEmail(
            tokenData.email,
        );

        if (!user) {
            throw new UnauthorizedException('User tidak ditemukan');
        }

        const hashedPassword = await bcrypt.hash(
            resetpassworddto.newPassword,
            10,
        );

        await this.userservice.updatepassword(
            user.id,
            hashedPassword,
        );

        this.resetTokens = this.resetTokens.filter(
            (item) => item.token !== resetpassworddto.token,
        );

        return {
            message: 'Password berhasil direset',
        };
    }

}
