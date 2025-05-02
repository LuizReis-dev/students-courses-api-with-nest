import { CourseDto } from "src/course/dto/course.dto";
import Student from "../entities/student.entity";

export class StudentDto {
    declare id: number;
    declare name: string;
    declare birthdate: Date;
    declare courses: CourseDto[];

    constructor(id: number, name: string, birthdate: Date) {
        this.id = id;
        this.name = name;
        this.birthdate = birthdate;
    }

    static fromEntity(student: Student): StudentDto {
        let dto = new StudentDto(student.id, student.name, student.birthdate);
        if(student.courses) {
            dto.courses = student.courses.map(CourseDto.fromEntity);
        }

        return dto;
    }
}