import Course from "../entities/course.entity";

export class CourseDto {
    declare id: number;
    declare name: string;
    declare description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static fromEntity(course: Course): CourseDto {
    return new CourseDto(course.id, course.name, course.description);
    }
}
