import { Injectable, UnauthorizedException } from '@nestjs/common';
import { registerdto } from './dto/register.dto.js';
import { UserService } from '../user/user.service.js';
import { logindto } from './dto/login.dto.js';
import { forgotpassworddto } from './dto/forgotpassword.dto.js';
import { randomUUID } from 'crypto';
import { resetpassworddto } from './dto/resetpassword.dto.js';

@Injectable()
export class AuthService {

    constructor(private readonly userservice: UserService) {}

    register(registerdto: registerdto) {

        if (registerdto.password !== registerdto.confirmPassword) {
            throw new Error('Password dan confirm password tidak sama');
        }

        const existinguser = this.userservice.findbyemail(registerdto.email);

        if (existinguser) {
            throw new Error('Email sudah digunakan');
        }

        return this.userservice.newuser({
            nama: registerdto.nama,
            email: registerdto.email,
            password: registerdto.password
        });
    }

    login(logindto: logindto) {
        const user = this.userservice.findbyemail(logindto.email);

        if (!user) {
            throw new UnauthorizedException('Email atau password salah');
        }

        if (user.password !== logindto.password) {
            throw new UnauthorizedException('Email atau password salah');
        }

        return {
            message: 'Login berhasil',
            user: {
                id: user.id,
                nama: user.nama,
                email: user.email,
            },
        };
    }

    private resetTokens: {
        email: string;
        token: string;
    }[] = [];

    forgotPassword(forgotpassworddto: forgotpassworddto) {
        const user = this.userservice.findbyemail(forgotpassworddto.email);

        if (!user) {
            throw new UnauthorizedException('Email tidak ditemukan');
        }

        const token = randomUUID();

        this.resetTokens.push({
            email: user.email,
            token: token,
        });

        return {
            message: 'Token reset password berhasil dibuat',
            token: token,
        };
    }

    resetPassword(resetpassworddto: resetpassworddto) {

        if (resetpassworddto.newPassword !== resetpassworddto.confirmPassword) {
            throw new Error('Password dan confirm password tidak sama');
        }

        const tokenData = this.resetTokens.find(
            item => item.token === resetpassworddto.token
        );

        if (!tokenData) {
            throw new UnauthorizedException('Token tidak valid');
        }

        const user = this.userservice.findbyemail(tokenData.email);

        if (!user) {
            throw new UnauthorizedException('User tidak ditemukan');
        }

        this.userservice.updatepassword(
            user.id,
            resetpassworddto.newPassword
        );

        this.resetTokens = this.resetTokens.filter(
            item => item.token !== resetpassworddto.token
        );

        return {
            message: 'Password berhasil direset'
        };
    }

}