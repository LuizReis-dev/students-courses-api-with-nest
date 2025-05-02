import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { StudentDto } from "./dto/student.dto";
import Student from "./entities/student.entity";
import { UpdateStudentDto } from "./dto/update-student.dto";

@Injectable()
export class StudentRepository {
    async create(createStudentDto: CreateStudentDto): Promise<StudentDto> {
        const created = await Student.create({
            name: createStudentDto.name,
            birthdate: createStudentDto.birthdate
        });

        if (createStudentDto.courses_ids && createStudentDto.courses_ids.length > 0) {
            await created.$set("courses", createStudentDto.courses_ids.map(course => course));
        }

        return StudentDto.fromEntity(created);
    }

    async findOne(id: number): Promise<StudentDto> {
        const student = await Student.findByPk(id, {
            include: ["courses"]
        });

        if (!student) throw new NotFoundException("Aluno não encontrado");

        return StudentDto.fromEntity(student);
    }

    async findAll(): Promise<StudentDto[]> {
        const students = await Student.findAll();
        return students.map(StudentDto.fromEntity);
    }

    async update(id: number, updateStudentDto: UpdateStudentDto): Promise<StudentDto> {
        const existing = await Student.findByPk(id);
        if (!existing) throw new NotFoundException("Aluno não encontrado");

        await existing.update({
            name: updateStudentDto.name,
            birthdate: updateStudentDto.birthdate
        });

        if (updateStudentDto.courses_ids && updateStudentDto.courses_ids.length > 0) {
            await existing.$set("courses", updateStudentDto.courses_ids.map(course => course));
        }

        return StudentDto.fromEntity(existing);
    }

    async remove(id: number): Promise<void> {
        const existing = await Student.findByPk(id);
        if (!existing) throw new NotFoundException("Aluno não encontrado");

        existing.destroy();
    }
}