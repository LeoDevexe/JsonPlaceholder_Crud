import { FilterOperator } from '../enums/FilterOperator.enum';

export interface FilterCriteria {
  field: string;
  operator: FilterOperator;
  value: string;
}

