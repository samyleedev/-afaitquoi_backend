import { PartialType } from '@nestjs/mapped-types';
import { SubscribeUserDto } from './subscribe-user.dto';

export class UpdateUserDto extends PartialType(SubscribeUserDto) {}
