import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  uniqueNumber: string;

  @IsString()
  password: string;

  @IsString()
  department: string;

  @IsString()
  school: string;

  @IsEnum(Role, { each: true })
  role: Role;
}
