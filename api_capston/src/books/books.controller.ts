import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { createBookDto } from './dto/create-books.dto.js';

@Controller('books')//dekorator
export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    //menampilkan data
        @Get()
        findall()  {
            return this.booksService.findall();
        }
    //menambahkan data
        @Post()
        simpandata(@Body() createBookDto: createBookDto) {
            return this.booksService.simpandata(createBookDto);
        }

    //mengupdate data
        @Put(':id')
        updatedata(
            @Param(`id`)id:string,
            @Body() createBookDto: createBookDto){

            return this.booksService.updatedata(parseInt(id), createBookDto);
        }
}
