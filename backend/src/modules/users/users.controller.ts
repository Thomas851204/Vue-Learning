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
  Patch,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './models/UserDto';
import { response } from 'express';
import { QueryFailedError } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('getAll')
  async getAll() {
    return await this.userService.getAllEntries();
  }

  @Post('postUser')
  async postUser(
    @Body() userData: UserDto,
  ): Promise<number | { message: string }> {
    const postResp = await this.userService.postEntry(userData);
    return postResp;
  }

  @Patch('patch')
  async patchUser(
    @Body() patchUserData: UserDto,
  ): Promise<{ message: string }> {
    const patchResp = await this.userService.patchEntry(patchUserData);
    return patchResp;
  }
}
