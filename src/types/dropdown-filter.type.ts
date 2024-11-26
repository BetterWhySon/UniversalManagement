import { Filter } from '@/components/icons';

export type Filter = {
  name: string;
  selected: string;
  values: string[];
};

export type FilterDropdownType = {
  title: string;
  filter: Filter;
  callback_Site: Function;
  callback_Ship: Function;
  callback_BMS: Function;
  callback: Function;
  // callback_specNumber: Function;
  // callback_BMSModel: Function;
};
