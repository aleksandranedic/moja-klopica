import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

import { SkipAuth } from 'src/shared/decorators/skip-auth.decorator';
import { LoggedUserInfo } from 'src/users/dto/logged-user.dto';
import { AuthService } from './auth.service';
import { ConfirmationToken, CredentialsDto, JwtToken } from './auth.types';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 201,
    type: JwtToken,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBody({
    type: CredentialsDto,
  })
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Get info about logged user' })
  @ApiResponse({
    status: 200,
    type: LoggedUserInfo,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Verify account' })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 404,
    description: "User with confirmation key ### doesn't exist",
  })
  @ApiQuery({
    type: ConfirmationToken,
  })
  @SkipAuth()
  @Get('confirm')
  async confirmEmail(@Query() { token }) {
    return await this.authService.confirmMail(token);
  }
}
