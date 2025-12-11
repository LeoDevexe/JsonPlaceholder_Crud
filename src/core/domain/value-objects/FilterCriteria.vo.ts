import { FilterOperator } from '@shared/enums';

export class FilterCriteria {
  constructor(
    public readonly field: string,
    public readonly operator: FilterOperator,
    public readonly value: string
  ) {
    if (!field || field.trim() === '') {
      throw new Error('Filter field cannot be empty');
    }
  }

  static create(field: string, operator: FilterOperator, value: string): FilterCriteria {
    return new FilterCriteria(field, operator, value);
  }

  matches(data: string): boolean {
    const normalizedValue = this.value.toLowerCase();
    const normalizedData = data.toLowerCase();

    switch (this.operator) {
      case FilterOperator.CONTAINS:
        return normalizedData.includes(normalizedValue);
      case FilterOperator.NOT_CONTAINS:
        return !normalizedData.includes(normalizedValue);
      case FilterOperator.EQUALS:
        return normalizedData === normalizedValue;
      case FilterOperator.NOT_EQUALS:
        return normalizedData !== normalizedValue;
      case FilterOperator.STARTS_WITH:
        return normalizedData.startsWith(normalizedValue);
      case FilterOperator.ENDS_WITH:
        return normalizedData.endsWith(normalizedValue);
      default:
        return false;
    }
  }
}

