import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    DeletedAt,
} from "sequelize-typescript";

@Table({
    tableName: "tb_courses",
    modelName: "Course",
    timestamps: true
})
export default class Course extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare description: string;

    @CreatedAt
    declare createdAt: Date;

    @DeletedAt
    declare deletedAt: Date;

}
