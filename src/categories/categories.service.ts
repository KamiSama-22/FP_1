
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(
        `Category dengan ID ${id} tidak ditemukan`,
      );
    }

    return category;
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  
  async update(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    category.name = data.name;

    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);
  }

}
