import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/modules/users/enums/role.enum';

export class createCourseDto {
  @IsInt()
  userId: number;

  @IsString()
  courseName: string;

  @IsString()
  courseCode: string;

  @IsString()
  courseDesc: string;

  @IsString()
  department: string;

  @IsString()
  school: string;
}
