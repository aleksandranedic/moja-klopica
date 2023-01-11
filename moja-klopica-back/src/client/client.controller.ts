import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipAuth } from 'src/shared/decorators/skip-auth.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { GetUserDto } from 'src/users/dto/get-user.dto';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiBearerAuth()
@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Register client' })
  @ApiResponse({
    status: 201,
    description:
      'Korisnik je uspešno registrovan. Da biste se ulogovali, verifikujte nalog putem primljenog emaila.',
  })
  @ApiResponse({
    status: 400,
    description: 'Uneti email je već registrovan.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Greška sa slanjem verifikacionog linka. Probajte ponovo kasnije.',
  })
  @SkipAuth()
  @Post()
  async create(@Res() res, @Body() createClientDto: CreateUserDto) {
    const success: boolean = await this.clientService.create(createClientDto);
    if (success) {
      res.status(HttpStatus.CREATED).json({
        message:
          'Korisnik je uspešno registrovan. Da biste se ulogovali, verifikujte nalog putem primljenog emaila.',
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:
          'Greška sa slanjem verifikacionog linka. Probajte ponovo kasnije.',
      });
    }
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: 200,
    type: GetUserDto,
    isArray: true,
  })
  @Get()
  async findAll() {
    return await this.clientService.findAll();
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get client with id' })
  @ApiResponse({
    status: 200,
    type: GetUserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Klijent koji ima id # ne postoji.',
  })
  @ApiResponse({
    status: 401,
    description: 'Klijent nije verifikovan.',
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.findOneDto(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
