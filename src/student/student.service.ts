import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from './student.repository';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
    constructor(private readonly repository: StudentRepository) {}
  
  async create(createStudentDto: CreateStudentDto): Promise<StudentDto> {
    if (!createStudentDto.name || !createStudentDto.birthdate || !createStudentDto.courses_ids) {
      throw new BadRequestException("Informe nome, data de nascimento e os cursos do aluno");
    }

    const birthdate = new Date(createStudentDto.birthdate);
    if (isNaN(birthdate.getTime())) {
      throw new BadRequestException("Informe uma data de nascimento válida");
    }
    
    return this.repository.create(createStudentDto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<StudentDto> {
    return this.repository.findOne(id);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<StudentDto> {
    if (!updateStudentDto.name || !updateStudentDto.birthdate || !updateStudentDto.courses_ids) {
      throw new BadRequestException("Informe nome, data de nascimento e os cursos do aluno");
    }

    const birthdate = new Date(updateStudentDto.birthdate);
    if (isNaN(birthdate.getTime())) {
      throw new BadRequestException("Informe uma data de nascimento válida");
    }

    return this.repository.update(id, updateStudentDto);
  }

  async patch(id: number, updateStudentDto: UpdateStudentDto): Promise<StudentDto> {
    let oldStudent = await this.findOne(id);
    let update = new UpdateStudentDto();
    update.name = oldStudent.name;
    update.birthdate = oldStudent.birthdate;

    if (updateStudentDto.name) {
      update.name = updateStudentDto.name;
    }

    if(updateStudentDto.birthdate) {
      const birthdate = new Date(updateStudentDto.birthdate);
      if (isNaN(birthdate.getTime())) {
        throw new BadRequestException("Informe uma data de nascimento válida");
      }

      update.birthdate = birthdate;
    }

    if(updateStudentDto.courses_ids) {
      update.courses_ids = updateStudentDto.courses_ids;
    }


    return this.repository.update(id, update);
  }


  async remove(id: number): Promise<void> {
    return this.repository.remove(id);
  }
}
