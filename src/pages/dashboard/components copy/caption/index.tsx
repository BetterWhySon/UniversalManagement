import { Dot } from '@/components/icons';
import { cn } from '@/helpers/class-name.helper';
import useWebSocketStore from '@/api/socketStore';
import { SITE_COLORS } from '@/constants/dashboard.constant';
import { useTranslation } from 'react-i18next';

export default function DashboardCaption() {
  const { dataList } = useWebSocketStore();
  const { t: trans, i18n } = useTranslation('translation');
  const currentLanguage = i18n.language;

  if (!dataList) {
    return (
      <></>
    );
  }
  return (
    <div className={cn('flex gap-8 mt-5 mb-3 items-center justify-end')}>
      {dataList.map((item, index) => {
        return (
          <span key={item.siteName} className='flex items-center gap-[10px] font-light leading-none text-xs text-hw-white-2'>
            <Dot color={SITE_COLORS[index]} /> {currentLanguage == 'kr'? item.siteName : item.siteName_foreign}
          </span>
        );
      })}
    </div>
  );
}
