import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscribeUserDto } from './dto/subscribe-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  register(userData: SubscribeUserDto): Promise<UserEntity> {
    const userExisting = this.findOneByEmail(userData.email);
    if (userExisting) {
      throw new ConflictException('Cette adresse email est déjà utilisée.');
    } else {
      const newUser = this.userRepository.create(userData);
      return this.userRepository.save(newUser);
    }
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
