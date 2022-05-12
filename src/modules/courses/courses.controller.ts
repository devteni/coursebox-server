import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../users/decorator/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(Role.LECTURER)
  @Post('/new')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Roles(Role.LECTURER)
  @Get('lecturer/:userId')
  async findLecturerCourses(@Param('userId', ParseIntPipe) userId: number) {
    return await this.coursesService.findLecturerCourses(userId);
  }

  @Roles(Role.STUDENT)
  @Get('student/:deptId')
  async findStudentCourses(@Param('deptId', ParseIntPipe) deptId: number) {
    return await this.coursesService.findStudentCourses(deptId);
  }

  @Roles(Role.LECTURER)
  @UseInterceptors(FileInterceptor('courseMaterial', multerOptions))
  @Post('upload')
  async uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File) {
    const body = await req.body;
    body.file = file;
    body.courseId = parseInt(body.courseId);
    console.log(body);
    // perform the magic here
    return await this.coursesService.uploadCourseMaterial(body);
  }

  @Get('/:id')
  async fetchCourseMaterials(@Param('id', ParseIntPipe) id: number) {
    return await this.coursesService.fetchCourseMaterials(id);
  }

  @Roles(Role.STUDENT)
  @Post('student/downloads')
  async addDownload(@Body() payload: any) {
    return await this.coursesService.addDownload(payload);
  }

  @Roles(Role.LECTURER)
  @Get('student/downloads/:fileId')
  async fetchDownloadCount(@Param('fileId') fileId: string) {
    return await this.coursesService.fetchDownloadCount(fileId);
  }
}
