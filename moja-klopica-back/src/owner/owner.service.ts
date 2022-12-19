import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwner } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  @InjectRepository(Owner)
  private readonly repository: Repository<Owner>;

  async create(createOwnerDto: CreateOwner) {
    const owner: Owner = new Owner(
      createOwnerDto.name,
      createOwnerDto.surname,
      createOwnerDto.phoneNumber,
      createOwnerDto.email,
      createOwnerDto.password,
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
