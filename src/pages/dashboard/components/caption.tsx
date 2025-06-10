import { cn } from '@/helpers/class-name.helper';
import { useTranslation } from 'react-i18next';

export default function DashboardCaption() {
  const { t: trans } = useTranslation('translation');
  
  return (
    <div className={cn('flex items-center justify-between pt-[26px] pb-5')}>
      <h1 className={cn('text-[32px] leading-[39px] font-bold text-hw-white-1')}>
        {trans('dashboard')}
      </h1>
    </div>
  );
} 