import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppQueryDto } from '../dto/app-query.dto';

@Injectable()
export class AppQueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const query = new AppQueryDto();

    const mergedQuery = { ...query, ...request.query };

    request.query = mergedQuery;

    return next.handle();
  }
}
