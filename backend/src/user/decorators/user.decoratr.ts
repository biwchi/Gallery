import { UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { JwtService } from '@nestjs/jwt';
import { UserRequestData } from 'src/global/types';

export const ExtractUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContextHost) => {
    const jwtService = new JwtService();
    const req = ctx.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) return false;

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer === 'Bearer' && token) {
      try {
        req.user = jwtService.verify(token) as UserRequestData;

        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  },
);
