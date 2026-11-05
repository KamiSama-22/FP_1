import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Controller('books')
export class BooksController {

    constructor(private readonly bookservice: BooksService) {}

    // menampilkan data
    @Get()
    findAll(@Query() query: any ){
        return this.bookservice.findall()
    }

    // menampilkan data berdasarkan ID
    @Get(':id')
    show(@Param('id') id: string) {
        return this.bookservice.findone(id)
    }

    // menyimpan data
    @Post()
    simpanData(@Body() createbookdto: CreateBookDto) {
        return this.bookservice.simpandata(createbookdto);
    }

    // mengupdate data
    @Put(':id')
    updateData(
        @Param(`id`) id: string,
        @Body() createbookdto: CreateBookDto
    ) {
        return this.bookservice.updatedata(id, createbookdto);
    }

    // menghapus data
    @Delete(':id')
    hapusdata(@Param('id') id: string) {
        return this.bookservice.hapusdata(id);
    }
    
}
