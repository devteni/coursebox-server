import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const password = user.password;
    const isMatch = await bcrypt.compare(pass, password);

    if (!user) return null;
    if (!password) throw new UnauthorizedException();

    if (isMatch) return user;
  }

  async login(user: any) {
    const jwtPayload = { sub: user.id };
    const token = await this.generateAccessToken(jwtPayload);
    const loggedInUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        access_token: token,
      },
    });
    const school = await this.prisma.school.findFirst({
      where: {
        id: loggedInUser.schoolId,
      },
    });
    const dept = await this.prisma.department.findFirst({
      where: {
        id: loggedInUser.departmentId,
      },
    });
    return {
      ...loggedInUser,
      school: school.schoolName,
      department: dept.DepartmentName,
    };
  }

  async generateAccessToken(payload: any) {
    const secret = this.configService.get('jwt.secret');
    const expiresIn = this.configService.get('jwt.expiry');
    return this.jwt.sign(payload, { expiresIn, secret });
  }
}
