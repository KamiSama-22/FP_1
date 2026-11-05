import { Body, Controller, Post } from '@nestjs/common';
import { registerdto } from './dto/register.dto.js';
import { logindto } from './dto/login.dto.js';
import { forgotpassworddto } from './dto/forgotpassword.dto.js';
import { resetpassworddto } from './dto/resetpassword.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    // register
    @Post('register')
    register(@Body() registerdto: registerdto) {
        return this.authService.register(registerdto);
    }

    // login
    @Post('login')
    login(@Body() logindto: logindto) {
        return this.authService.login(logindto);
    }

    // forgot password
    @Post('forgotpassword')
    forgotPassword(@Body() forgotpassworddto: forgotpassworddto) {
        return this.authService.forgotPassword(forgotpassworddto);
    }

    // reset password
    @Post('resetpassword')
    resetPassword(@Body() resetpassworddto: resetpassworddto) {
        return this.authService.resetPassword(resetpassworddto);
    }

}
