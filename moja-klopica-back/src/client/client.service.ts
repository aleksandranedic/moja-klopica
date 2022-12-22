import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { salt } from 'src/auth/secrets';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  @InjectRepository(Client)
  private readonly repository: Repository<Client>;

  constructor(private usersService: UsersService) {}

  async create(createClientDto: CreateUserDto) {
    const hashedPass: string = await bcrypt.hash(
      createClientDto.password,
      salt,
    );
    const user: User | null = await this.usersService.findOne(
      createClientDto.email,
    );
    if (user) {
      throw new BadRequestException('Email already registered');
    }
    const client: Client = new Client(
      createClientDto.name,
      createClientDto.surname,
      createClientDto.phoneNumber,
      createClientDto.email,
      hashedPass,
    );
    return await this.repository.save(client);
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
