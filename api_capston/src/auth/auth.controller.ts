import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from '../books/dto/create-auth.dto.js';

@Controller('auth')
export class AuthController {
        @Post()
        simpandata(@Body() createAuthDto: CreateAuthDto) {
            return this.authService.simpandata(createAuthDto);
        }
}
