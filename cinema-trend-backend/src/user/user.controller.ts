import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUser(@Request() req) {
    return await this.userService.findOne(req.user.username);
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateUser(@Body() data: UpdateUserDto, @Request() req) {
    const userId = Number(req.user.sub);
    const { picture, ...userData } = data;

    let fileBuffer: Buffer | undefined;

    if (picture && picture !== '') {
      const base64Data = data.picture.replace(/^data:image\/\w+;base64,/, '');
      fileBuffer = Buffer.from(base64Data, 'base64');
    }

    return await this.userService.update(userData, userId, fileBuffer);
  }
}
