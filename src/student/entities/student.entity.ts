import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    DeletedAt,
    BelongsToMany
} from "sequelize-typescript";
import Course from "src/course/entities/course.entity";
import StudentCourse from "./student-course.entity";

@Table({
    tableName: "tb_students",
    modelName: "Student",
    timestamps: true
})
export default class Student extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.DATE)
    declare birthdate: Date;

    @CreatedAt
    declare createdAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsToMany(() => Course, () => StudentCourse)
    declare courses?: Course[];
}
