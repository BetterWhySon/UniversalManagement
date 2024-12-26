import { TEXT_ALIGN } from '@/enums/table';

export type TableColumn<T> = {
  name: string;
  dataIndex: string;
  align?: TEXT_ALIGN;
  paddingInline?: string;
  noPaddingBlock?: boolean;
  width?: string;
  fixedWidth?: string;
  fixed?: 'left' | 'right';
  title?: React.ReactNode;
  render?: (row: T, dataIndex: string) => React.ReactNode;
};
