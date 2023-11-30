import { ApiQuery } from '@nestjs/swagger';

export function ApiSortingQuery(values: string[]) {
  const allValues = values.map((param) => [param, `-${param}`]).flat();

  return ApiQuery({
    name: 'sorting',
    description: "Sorting value ('-' is ASC sorting)",
    required: false,
    enum: allValues,
  });
}
