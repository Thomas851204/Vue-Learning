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

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('getAll')
  async getAll() {
    return await this.userService.getAllEntries();
  }

  @Post('postUser')
  async postUser(@Body() userData: UserDto): Promise<number> {
    const postResp = await this.userService.postEntry(userData);
    console.log(postResp);
    return postResp;
  }

  @Patch('patch')
  async patchUser(@Body() patchUserData: UserDto): Promise<boolean> {
    const patchResp = await this.userService.patchEntry(patchUserData);
    console.log(patchResp);
    return patchResp;
  }
}
