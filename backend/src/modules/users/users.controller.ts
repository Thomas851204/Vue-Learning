import {
  Controller,
  Post,
  Body,
  Put,
  UsePipes,
  ValidationPipe,
  Headers,
  Get,
  Res,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './models/UserDto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('getAll')
  async getAll() {
    return await this.userService.getAllEntries();
  }

  @Post('postUser')
  async postUser(@Body() userData: UserDto): Promise<boolean> {
    const postResp = await this.userService.postEntry(userData);
    return postResp;
  }
}
