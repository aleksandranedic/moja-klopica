import { LoggedUserInfo } from 'src/users/dto/logged-user.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): LoggedUserInfo => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
