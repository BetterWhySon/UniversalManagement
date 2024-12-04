import { TEXT_ALIGN } from '@/enums/table';

export interface TableColumn<T> {
  name: string;
  dataIndex: string;
  paddingInline?: string;
  align?: string;
  width?: string;
  fixedWidth?: string;
  noPaddingBlock?: boolean;
  render?: (row: T, dataIndex: string) => React.ReactNode;
  title?: React.ReactNode;
}
