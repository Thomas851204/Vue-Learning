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

  async postEntry(userData: UserDto): Promise<number> {
    const newUser = this.usersRepository.create({
      username: userData.username,
      email: userData.email,
    });
    try {
      await this.usersRepository.save(newUser);
      return 1;
    } catch (err) {
      return -1;
    }
  }

  async patchEntry(user: UserDto): Promise<boolean> {
    const userToUpdate = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    userToUpdate.email = user.email;
    userToUpdate.username = user.username;
    await this.usersRepository.save(userToUpdate);
    return true;
  }
}
