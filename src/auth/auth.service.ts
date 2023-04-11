import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    let isMatch = false;
    if (user) {
      isMatch = await bcrypt.compare(pass, user.password);
    }

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
