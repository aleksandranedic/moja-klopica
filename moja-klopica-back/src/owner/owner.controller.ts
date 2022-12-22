import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Role } from 'src/shared/decorators/role.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Role('Admin')
  @Post()
  async create(@Body() createOwner: CreateUserDto) {
    return await this.ownerService.create(createOwner);
  }

  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownerService.remove(+id);
  }
}
