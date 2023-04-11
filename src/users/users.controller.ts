import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SubscribeUserDto } from './dto/subscribe-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() userData: SubscribeUserDto): Promise<UserEntity> {
    return this.usersService.register(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user) {
    if (user.role === UserRoleEnum.ADMIN) {
      return this.usersService.findAll();
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
