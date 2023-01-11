import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'src/auth/secrets';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { GetUserDto } from 'src/users/dto/get-user.dto';
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
      throw new BadRequestException('Uneti email je već registrovan.');
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

  async findAll() {
    const clients = await this.findAllClients();
    return this.usersService.createGetUsersDto(clients);
  }

  private async findAllClients(): Promise<Client[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Client> {
    const user: Client = await this.usersService.findOneById(id);
    if (!user || !(user instanceof Client)) {
      throw new NotFoundException(`Klijent koji ima id ${id} ne postoji.`);
    }
    if (!user.Verified) {
      throw new UnauthorizedException(`Klijent nije verifikovan.`);
    }
    return user;
  }

  async findOneDto(id: number): Promise<GetUserDto> {
    const client: Client = await this.findOne(id);
    return this.usersService.createGetUserDto(client);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
