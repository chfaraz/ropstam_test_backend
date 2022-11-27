import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const car = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(car);
    return car;
  }

  async findAll() {
    return this.categoryRepository.find(
      
    );
   
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoryRepository.update({ id }, updateCategoryDto);
    if (result.affected !== 1) return { message: 'fail to update' }
    return this.categoryRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.categoryRepository.delete(id);
    if (result.affected !== 1) return { deleted: 0 }
    return { deleted: 1 }
  }
}
