import { Sequelize } from "sequelize-typescript";
import Course from "src/course/entities/course.entity";
import StudentCourse from "src/student/entities/student-course.entity";
import Student from "src/student/entities/student.entity";
const dotenv = require("dotenv");

dotenv.config();

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: Number(process.env.DB_PORT) || 5432,
                username: process.env.DB_USER || "postgres",
                password: process.env.DB_PASSWORD || "1234",
                database: process.env.DB_NAME || "postgres",
            });
            sequelize.addModels([Course, Student, StudentCourse]);
            await sequelize.sync();
            return sequelize;
        },
    },
];