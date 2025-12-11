export class Pagination {
  constructor(
    public readonly page: number,
    public readonly limit: number
  ) {
    if (page < 1) {
      throw new Error('Page must be greater than 0');
    }
    if (limit < 1) {
      throw new Error('Limit must be greater than 0');
    }
  }

  get offset(): number {
    return (this.page - 1) * this.limit;
  }

  static create(page: number, limit: number): Pagination {
    return new Pagination(page, limit);
  }
}

