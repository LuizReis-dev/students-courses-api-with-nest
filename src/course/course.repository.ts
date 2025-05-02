import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import Course from "./entities/course.entity";
import { CourseDto } from "./dto/course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Injectable()
export class CourseRepository {

    async create(dto: CreateCourseDto): Promise<CourseDto> {
        const created = await Course.create({ name: dto.name, description: dto.description });
        return CourseDto.fromEntity(created);
    }

    async findAll(): Promise<CourseDto[]> {
        const list = await Course.findAll();
        return list.map(CourseDto.fromEntity);
    }

    async findOne(id: number): Promise<CourseDto> {
        const course = await Course.findByPk(id);
        if (!course) throw new NotFoundException("Curso não encontrado");
        return CourseDto.fromEntity(course);
    }

    async remove(id: number): Promise<void> {
        const found = await Course.findByPk(id);
        if (!found) throw new NotFoundException("Curso não encontrado");

        await found.destroy();
    }

    async update(id: number, updateCourseDto: UpdateCourseDto): Promise<CourseDto> {
        const found = await Course.findByPk(id);
        if (!found) throw new NotFoundException("Curso não encontrado");

        await found.update({name: updateCourseDto.name, description: updateCourseDto.description});
        return CourseDto.fromEntity(found);
    }

}
