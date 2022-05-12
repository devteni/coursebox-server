import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsString } from 'class-validator';

export class LoginAdminDto extends PartialType(CreateAdminDto) {
  @IsString()
  username?: string;

  @IsString()
  password?: string;
}
