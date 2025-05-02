import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository } from './course.repository';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {

  constructor(private readonly repository: CourseRepository) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseDto> {
    if (!createCourseDto.name || !createCourseDto.description) {
      throw new BadRequestException("Informe nome e a descrição");
    }

    return this.repository.create(createCourseDto);
  }

  async findAll(): Promise<CourseDto[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<CourseDto> {
    return this.repository.findOne(id);
  }

  async patch(id: number, updateCourseDto: UpdateCourseDto): Promise<CourseDto> {
    let updateCourse = new UpdateCourseDto();
    
    if (updateCourseDto.name) {
      updateCourse.name = updateCourseDto.name;
    }
    if (updateCourseDto.description) {
      updateCourse.description = updateCourseDto.description;
    }

    return this.repository.update(id, updateCourse);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<CourseDto> {
    if (!updateCourseDto.name || !updateCourseDto.description) {
      throw new BadRequestException("Informe nome e a descrição");
    }
    return this.repository.update(id, updateCourseDto);
  }

  async remove(id: number) {
    await this.repository.remove(id);
  }
}
