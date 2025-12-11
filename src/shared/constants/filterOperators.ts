import { FilterOperator } from '@shared/enums';

export const FILTER_OPERATORS = [
  { value: FilterOperator.CONTAINS, label: 'Contiene' },
  { value: FilterOperator.NOT_CONTAINS, label: 'No Contiene' },
  { value: FilterOperator.EQUALS, label: 'Igual' },
  { value: FilterOperator.NOT_EQUALS, label: 'No Igual' },
  { value: FilterOperator.STARTS_WITH, label: 'Empieza con' },
  { value: FilterOperator.ENDS_WITH, label: 'Termina con' },
];

