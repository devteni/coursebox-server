import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/modules/users/enums/role.enum';

export class createLecturerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  uniqueNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  password: string;
  department: string;

  @IsString()
  role: Role;

  @IsString()
  school: string;
}
