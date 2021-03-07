import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudenInput } from './lesson.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }
  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }
  async createStudent(createStudenInput: CreateStudenInput): Promise<Student> {
    const { firstName, lastName } = createStudenInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }
  async getManyStudents(studentsIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentsIds,
        },
      },
    });
  }
}
