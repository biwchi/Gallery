import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from '../dto/user/user.create.dto';
import { PasswordService } from './password.service';
import { DeleteDto } from 'src/utils/delete.dto';
import { UserUpdateDto } from '../dto/user/user.update.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly passwordService: PasswordService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findAll() {
    return await this.userRepository.find();
  }

  public async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  public async create(dto: UserCreateDto) {
    const isUserExist = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (isUserExist) throw new BadRequestException('User already exist');

    return await this.userRepository.save({
      ...dto,
      password: this.passwordService.encrypt(dto.password),
    });
  }

  public async update(id: number, dto: UserUpdateDto) {
    return await this.userRepository.update(id, dto);
  }

  public async delete(dto: DeleteDto) {
    await this.userRepository.delete(dto.ids);
  }
}
