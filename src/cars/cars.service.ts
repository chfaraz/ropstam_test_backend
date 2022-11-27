import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { FetchCarsListDTO } from './dto/fetch-cars.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) { }

  async create(createCarDto: CreateCarDto) {
    const car = this.carRepository.create(createCarDto);
    await this.carRepository.save(car);
    return car;
  }

  async findAll(payload: FetchCarsListDTO) {
    const [result, total] = await this.carRepository.findAndCount(
      {
        skip: payload.offset,
        take: payload.limit,
      }
    );
    return {
      data: result,
      count: total
    }
  }

  findOne(id: string) {
    return this.carRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const result = await this.carRepository.update({ id }, updateCarDto);
    if (result.affected !== 1) return { message: 'fail to update' }
    return this.carRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.carRepository.delete(id);
    if (result.affected !== 1) return { deleted: 0 }
    return { deleted: 1 }
  }
}
