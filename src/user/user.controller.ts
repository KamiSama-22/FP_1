import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service.js';
import { createuserdto } from './dto/create-user.dto.js';

@Controller('User')
export class UserController {

    constructor(private readonly userservice: UserService) {}

    // menampilkan user
    @Get()
    findall(@Query() query: any) {
        return this.userservice.findall();
    }

    // menyimpan data
    @Post()
    newdata(@Body() createuserdto: createuserdto) {
        return this.userservice.newuser(createuserdto);
    }

    // mengupdate data
    @Put(':id')
    updatedata(
        @Param('id') id: string, 
        @Body() createuserdto: createuserdto) {
        return this.userservice.updateuser(parseInt(id), createuserdto);
    }

    // menghapus data
    @Delete(':id')
    hapusdata(@Param('id') id: string) {
        return this.userservice.hapusdata(parseInt(id));
    }

}