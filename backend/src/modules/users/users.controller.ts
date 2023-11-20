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

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('getAll')
  async getAll() {
    return await this.userService.getAllEntries();
  }
}
