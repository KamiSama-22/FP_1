
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service.js';
import { createuserdto } from './dto/create-user.dto.js';

@Controller('users')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  // Menampilkan semua user
  @Get()
  findall() {
    return this.userservice.findAll();
  }

  // Mencari user berdasarkan UUID
  @Get(':id')
  findone(@Param('id') id: string) {
    return this.userservice.findOne(id);
  }

  // Menyimpan user baru
  @Post()
  newdata(@Body() createuserdto: createuserdto) {
    return this.userservice.create(createuserdto);
  }

  // Mengupdate nama dan email
  @Put(':id')
  updatedata(
    @Param('id') id: string,
    @Body() createuserdto: createuserdto,
  ) {
    return this.userservice.updateuser(id, createuserdto);
  }

  // Menghapus user
  @Delete(':id')
  hapusdata(@Param('id') id: string) {
    return this.userservice.hapusdata(id);
  }
}
