import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [CourseModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
