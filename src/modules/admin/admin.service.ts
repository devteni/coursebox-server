import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { PrismaService } from 'src/prisma.service';
import { createLecturerDto } from './dto/create-lecturer.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { randomNumber } from 'src/utils/randomNumber';
import { Prisma } from '@prisma/client';
import { createCourseDto } from './dto/create-course.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateAdminDto) {
    return this.prisma.admin.create({ data });
  }

  login(payload: LoginAdminDto) {
    const user = this.prisma.admin.findFirst({
      where: {
        username: payload.username,
      },
    });
    if (user) return true;
    return false;
  }

  async createLecturer(payload: createLecturerDto) {
    const uniqueNumber = randomNumber(12);
    const school = await this.prisma.school.findFirst({
      where: {
        schoolName: payload.school,
      },
    });
    const dept = await this.prisma.department.findFirst({
      where: {
        DepartmentName: payload.department,
      },
    });
    const salt = await bcrypt.genSalt(10);
    const password = payload.password;
    const hashedPass = await bcrypt.hash(password, salt);
    return await this.prisma.user.create({
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: hashedPass,
        email: payload.email,
        departmentId: dept.id,
        schoolId: school.id,
        role: payload.role,
        uniqueNumber: uniqueNumber,
      },
    });
  }

  async createCourse(payload: createCourseDto) {
    let isLecturer = false;
    const lecturer = await this.prisma.user.findFirst({
      where: {
        id: payload.userId,
      },
    });
    if (lecturer.role === 'LECTURER') {
      isLecturer = true;
    } else {
      isLecturer;
    }
    if (isLecturer) {
      const school = await this.prisma.school.findFirst({
        where: {
          schoolName: payload.school,
        },
      });
      const dept = await this.prisma.department.findFirst({
        where: {
          DepartmentName: payload.department,
        },
      });
      return await this.prisma.course.create({
        data: {
          userId: lecturer.id,
          courseCode: payload.courseCode.toUpperCase(),
          courseName: payload.courseName.toLowerCase(),
          courseDesc: payload.courseDesc,
          schoolId: school.id,
          departmentId: dept.id,
        },
      });
    } else {
      throw new BadRequestException();
    }
  }
}
