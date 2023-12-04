import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/Users.entity';
import { Repository } from 'typeorm';
import { UserDto } from './models/UserDto';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getAllEntries(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async postEntry(userData: UserDto): Promise<{ message: string }> {
    const newUser = this.usersRepository.create({
      username: userData.username,
      email: userData.email,
    });
    try {
      await this.usersRepository.save(newUser);
      return { message: 'User created' };
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.message.includes('ER_DUP_ENTRY')
      ) {
        return { message: 'Username/email already taken' };
      } else {
        return { message: err };
      }
    }
  }

  async patchEntry(user: UserDto): Promise<{ message: string }> {
    const userToUpdate = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    userToUpdate.email = user.email;
    userToUpdate.username = user.username;
    try {
      await this.usersRepository.save(userToUpdate);
      return { message: 'Username/email changed' };
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.message.includes('ER_DUP_ENTRY')
      ) {
        return { message: 'Username/email already taken' };
      } else {
        return { message: err };
      }
    }
  }
}
