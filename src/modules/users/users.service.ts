import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { randomNumber } from 'src/utils/randomNumber';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwt: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: createUserDto.email,
        },
      });
      if (!existingUser) {
        const uniqueNumber = randomNumber(12);
        const school = await this.prisma.school.findFirst({
          where: {
            schoolName: createUserDto.school.toLowerCase(),
          },
        });
        const dept = await this.prisma.department.findFirst({
          where: {
            DepartmentName: createUserDto.department.toLowerCase(),
          },
        });
        const salt = await bcrypt.genSalt(10);
        const password = createUserDto.password;
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await this.prisma.user.create({
          data: {
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            password: hashedPass,
            email: createUserDto.email,
            departmentId: dept.id,
            schoolId: school.id,
            role: createUserDto.role ? createUserDto.role : 'STUDENT',
            uniqueNumber: uniqueNumber,
          },
        });
        const access_token = await this.generateAccessToken({
          sub: newUser.id,
        });
        newUser.access_token = access_token;
        return newUser;
      } else {
        throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findOneById(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async generateAccessToken(payload: any) {
    const secret = this.configService.get('jwt.secret');
    const expiresIn = this.configService.get('jwt.expiry');
    return this.jwt.sign(payload, { expiresIn, secret });
  }
}
