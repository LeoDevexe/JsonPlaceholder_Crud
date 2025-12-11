import { SortDirection } from '@shared/enums';

export class SortCriteria {
  constructor(
    public readonly field: string,
    public readonly direction: SortDirection
  ) {
    if (!field || field.trim() === '') {
      throw new Error('Sort field cannot be empty');
    }
  }

  static create(field: string, direction: SortDirection): SortCriteria {
    return new SortCriteria(field, direction);
  }

  isAscending(): boolean {
    return this.direction === SortDirection.ASC;
  }

  isDescending(): boolean {
    return this.direction === SortDirection.DESC;
  }
}

