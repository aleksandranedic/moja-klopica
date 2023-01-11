import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'src/auth/secrets';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  @InjectRepository(Client)
  private readonly repository: Repository<Client>;

  constructor(private usersService: UsersService) {}

  async create(createClientDto: CreateUserDto): Promise<boolean> {
    const hashedPass: string = await hash(createClientDto.password);
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
    try {
      const confirmationToken: string =
        await this.usersService.sendConfimarionMail(client);
      client.ConfirmationToken = confirmationToken;
      await this.repository.save(client);
      return true;
    } catch (err) {
      return false; //problem sa slanjem maila
    }
  }

  findAll() {
    return `This action returns all client`;
  }

  async findOne(id: number): Promise<Client> {
    const user: Client = await this.usersService.findOneById(id);
    if (!user || !(user instanceof Client)) {
      throw new BadRequestException("Client doesn't exist!");
    }
    if (!user.Verified) {
      throw new UnauthorizedException('Client is not verified!');
    }
    return user;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
