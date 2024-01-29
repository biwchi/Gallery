import { AppQueryDto } from './app-query.dto';

export class AppResponseDto<T> {
  constructor(itemCount: number, results: T, appQuery?: AppQueryDto) {
    this.count = itemCount;

    if (appQuery) {
      const lastPage = Math.ceil(itemCount / appQuery.limit);
      const currentPage = Math.floor(appQuery.offset / appQuery.limit) + 1;

      this.next = currentPage < lastPage;
      this.previous = currentPage > 1;
    } else {
      this.next = false;
      this.previous = false;
    }

    this.result = results;
  }

  /**
   * Count of all items from response
   * @example '10'
   */
  count: number;

  /**
   * Is response has next page
   * @example true
   */
  next: boolean;

  /**
   * Is response has previous page
   * @example false
   */
  previous: boolean;

  /**
   * Response result
   */
  result: T;
}
