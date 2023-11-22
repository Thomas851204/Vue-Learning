import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/Users.entity';
import { Repository } from 'typeorm';
import { UserDto } from './models/UserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getAllEntries(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async postEntry(userData: UserDto): Promise<boolean> {
    const newUser = this.usersRepository.create({
      username: userData.username,
      email: userData.email,
    });
    try {
      await this.usersRepository.save(newUser);
      return true;
    } catch (err) {
      return err;
    }
  }
}
