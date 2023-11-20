import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { AppResponseDto } from '../dto/app-response.dto';

export function ApiGenericResponse<Result extends Function>(result: Result) {
  return applyDecorators(
    ApiExtraModels(result),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(AppResponseDto) },
          {
            properties: {
              count: { type: 'number' },
              next: { type: 'boolean' },
              previous: { type: 'boolean' },
              result: {
                type: 'array',
                items: { $ref: getSchemaPath(result) },
              },
            },
          },
        ],
      },
    }),
  );
}
