import { TEXT_ALIGN } from '@/enums/table';

export interface TableColumn<T> {
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
  className?: string;
  style?: React.CSSProperties;
  children?: TableColumn<T>[];
}
