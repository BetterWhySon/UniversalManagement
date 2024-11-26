import { TEXT_ALIGN } from '@/enums/table';

export type TableColumn<T> = {
  dataIndex: string;
  name: string;
  align?: TEXT_ALIGN;
  render?: (row: T, dataIndex: string) => JSX.Element;
  width?: string;
  fixedWidth?: string;
  mobileAlign?: TEXT_ALIGN;
  paddingInline: string;
  noPaddingBlock?: boolean;
};
