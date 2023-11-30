import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export type Sorting = {[x: string]: "ASC" | "DESC"}

const SortingParam = <T extends string[]>() =>
  createParamDecorator<T>((validSortParam, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sorting = req.query.sorting as string;

    if(!sorting) return null

    const validParams = validSortParam
      .map((param) => [param, `-${param}`])
      .flat();

    if (!validParams.includes(sorting)) {
      throw new BadRequestException(
        `Parameter '${sorting}' is invalid sort parameter`,
      );
    }

    const sortMethod = sorting.includes('-') ? 'ASC' : 'DESC';
    const sortParam = sorting.replace('-', '');

    return {
      [sortParam]: sortMethod
    }
  });

export const SortingQuery = SortingParam();
