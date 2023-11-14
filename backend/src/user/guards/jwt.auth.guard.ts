import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(context: ExecutionContext) {
//     try {
//       const req = context.switchToHttp().getRequest();
//       const authHeader = req.headers.authorization;

//       const bearer = authHeader.split(' ')[0];
//       const token = authHeader.split(' ')[1];

//       if (bearer === 'Bearer' && token) {
//         req.user = this.jwtService.verify(token);

//         return true;
//       }
//     } catch (e) {
//       throw new UnauthorizedException();
//     }
//   }
// }

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
