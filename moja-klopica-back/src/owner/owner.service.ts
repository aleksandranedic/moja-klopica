import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';
import * as bcrypt from 'bcrypt';
import { salt } from 'src/auth/secrets';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class OwnerService {
  @InjectRepository(Owner)
  private readonly repository: Repository<Owner>;

  constructor(private usersService: UsersService) {}

  async create(createOwnerDto: CreateUserDto) {
    const hashedPass: string = await bcrypt.hash(createOwnerDto.password, salt);
    const user: User | null = await this.usersService.findOne(
      createOwnerDto.email,
    );
    if (user) {
      throw new BadRequestException('Email already registered');
    }
    const owner: Owner = new Owner(
      createOwnerDto.name,
      createOwnerDto.surname,
      createOwnerDto.phoneNumber,
      createOwnerDto.email,
      hashedPass,
    );
    return await this.repository.save(owner);
  }

  findAll() {
    return `This action returns all owner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
