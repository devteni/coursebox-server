import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../users/guards/roles.guard';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [CoursesController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CoursesService,
    UsersService,
    PrismaService,
  ],
})
export class CoursesModule {}
