import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [BooksModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}