import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('login')
  login(@Body() loginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  @Post('create-lecturer')
  async createLecturer(@Body() createDto) {
    return await this.adminService.createLecturer(createDto);
  }

  @Post('create-course')
  async createCourse(@Body() createCourseDto) {
    return await this.adminService.createCourse(createCourseDto);
  }
}
