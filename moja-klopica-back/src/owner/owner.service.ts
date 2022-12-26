import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';
import { hash } from 'src/auth/secrets';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class OwnerService {
  @InjectRepository(Owner)
  private readonly repository: Repository<Owner>;

  constructor(private usersService: UsersService) {}

  async create(createOwnerDto: CreateUserDto): Promise<boolean> {
    const hashedPass: string = await hash(createOwnerDto.password);
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
    try {
      const confirmationToken: string =
        await this.usersService.sendConfimarionMail(owner);
      owner.ConfirmationToken = confirmationToken;
      await this.repository.save(owner);
      return true;
    } catch (err) {
      console.log(err);
      return false; //problem sa slanjem maila
    }
  }

  findAll() {
    return `This action returns all owner`;
  }

  async findOne(id: number): Promise<Owner> {
    const user: Owner = await this.usersService.findOneById(id);
    if (!user || !(user instanceof Owner)) {
      throw new BadRequestException("Owner doesn't exist!");
    }
    if (!user.Verified) {
      throw new UnauthorizedException('Owner is not verified!');
    }
    return user;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  async remove(id: number) {
    const owner = await this.findOne(id);
    if (!owner) {
      throw new BadRequestException("Owner doesn't exist!");
    }
    owner.Deleted = true;
    //izbrisi sve njegove restorane
    //sacuvaj izmenu
    this.repository.save(owner);
    return `This action removes a #${id} owner`;
  }
}
