import { FilterDropdownType } from '@/types/dropdown-filter.type';

export const SITE_FILTERS = {
  name: '사이트',     // name 필드를 key로 활용중, 변경하지 마시요
  selected: '전체',
  values: [] as any,
};

export const SHIP_FILTERS = {
  name: '선박',     // name 필드를 key로 활용중, 변경하지 마시요
  selected: '전체',
  values: [] as any,
};

export const BMS_FILTERS = {
  name: 'BMS',     // name 필드를 key로 활용중, 변경하지 마시요
  selected: '전체',
  values: [] as any,
};

export const DROPDOWN_FILTERS: FilterDropdownType[] = [
  {
    title: 'site',
    filter: SITE_FILTERS,
    callback_Site: Function,
    callback_Ship: Function,
    callback_BMS: Function,
    callback: Function,
    // callback_specNumber: Function,
    // callback_BMSModel: Function,
  },
  {
    title: 'ship',
    filter: SHIP_FILTERS,
    callback_Site: Function,
    callback_Ship: Function,
    callback_BMS: Function,
    callback: Function,
    // callback_specNumber: Function,
    // callback_BMSModel: Function,
  },
  {
    title: 'ess',
    filter: BMS_FILTERS,
    callback_Site: Function,
    callback_Ship: Function,
    callback_BMS: Function,
    callback: Function,
    // callback_specNumber: Function,
    // callback_BMSModel: Function,
  },
];
