import {
    Table,
    Model,
    Column,
    ForeignKey,
    DataType
} from "sequelize-typescript";
import Student from "./student.entity";
import Course from "src/course/entities/course.entity";

@Table({
    tableName: "tb_students_courses",
    timestamps: false
})
export default class StudentCourse extends Model {
    @ForeignKey(() => Student)
    @Column(DataType.INTEGER)
    declare studentId: number;

    @ForeignKey(() => Course)
    @Column(DataType.INTEGER)
    declare courseId: number;
}
