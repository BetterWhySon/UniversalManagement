import dayjs, { Dayjs } from 'dayjs';
import { DATE_FORMAT } from '@/constants/time.constant';

export function formatDate(datetime: string | number | Dayjs, formatType?: DATE_FORMAT): string {
  return dayjs(datetime).isValid()
    ? dayjs(datetime).format(formatType ?? DATE_FORMAT.YYYY_MM_DD_HH_MM_SS)
    : datetime.toString();
}
