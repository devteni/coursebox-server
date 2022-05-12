import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto, CreateCourseMaterial } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { AddDownloadDto } from './dto/add-download-dto';

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    // return await this.prisma.course.create({
    //   data
    // })
  }

  async findLecturerCourses(userId: number) {
    return await this.prisma.course.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async findStudentCourses(deptId: number) {
    return await this.prisma.course.findMany({
      where: {
        departmentId: deptId,
      },
    });
  }

  async uploadCourseMaterial(payload: CreateCourseMaterial) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('aws_public_bucket_name'),
        Body: payload.file.buffer,
        ContentType: payload.file.mimetype,
        ContentDisposition: `attachment; filename=${payload.file.originalname}`,
        Key: `${uuid()}-${payload.file.originalname}`,
      })
      .promise();
    const courseMaterial = await this.prisma.courseMaterial.create({
      data: {
        title: payload.title,
        description: payload.description,
        courseId: payload.courseId,
      },
    });
    const file = await this.prisma.file.create({
      data: {
        fileName: uploadResult.Key,
        url: uploadResult.Location,
      },
    });
    const updatedCourseMaterial = await this.prisma.courseMaterial.update({
      where: {
        id: courseMaterial.id,
      },
      data: {
        file: { connect: { id: file.id } },
      },
    });
    await this.prisma.file.update({
      where: {
        id: file.id,
      },
      data: {
        courseMaterialId: updatedCourseMaterial.id,
      },
    });
    // console.log('na here', courseMaterial.fileId);
    return updatedCourseMaterial;
  }

  async fetchCourseMaterials(payload) {
    const courseMaterials = await this.prisma.courseMaterial.findMany({
      where: {
        courseId: payload.courseId,
      },
      select: {
        title: true,
        description: true,
        courseId: true,
        file: true,
      },
    });

    return courseMaterials;
  }

  async addDownload(payload: AddDownloadDto) {
    const existingDownload = await this.prisma.fileDownload.findFirst({
      where: {
        fileId: payload.fileId.toString(),
        studentId: payload.studentId.toString(),
      },
    });
    if (existingDownload) {
      return false;
    } else {
      await this.prisma.fileDownload.create({
        data: {
          fileId: payload.fileId.toString(),
          studentId: payload.studentId.toString(),
        },
      });
      return true;
    }
  }

  async fetchDownloadCount(fileId: string) {
    return await this.prisma.fileDownload.count({
      where: {
        fileId: fileId,
      },
    });
  }
}
