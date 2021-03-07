import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudenInput } from './lesson.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  getAllStudents() {
    return this.studentService.getAllStudents();
  }
  @Query((returns) => StudentType)
  getStudent(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }
  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudenInput: CreateStudenInput,
  ) {
    return this.studentService.createStudent(createStudenInput);
  }
}
//Old way not use Input as DTO
/**
 * @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
*/
