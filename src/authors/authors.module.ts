import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service.js';
import { AuthorsController } from './authors.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService],
  controllers: [AuthorsController]
})
export class AuthorsModule {}
