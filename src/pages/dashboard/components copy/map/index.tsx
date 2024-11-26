import { cn } from '@/helpers/class-name.helper';
import { Refresh } from '@/components/icons';
import MapImg from '@/assets/images/map.svg';
import useWebSocketStore from '@/api/socketStore';
import { useEffect, useState } from 'react';
import { SITE_COLORS, getBGColor } from '@/constants/dashboard.constant';
import useMapFilterStore from '@/api/mapFilterStore';
import { useTranslation } from 'react-i18next';

interface IBadgeStyle {
  left: string;
  top: string;
  bg: string;
}

interface IBadge {
  id: string;
  text: string;
  value: number;
  styles: IBadgeStyle;
  menu: string[];
}

export default function MapArea() {
  const [sites, setSites] = useState<IBadge[]>([]);
  const { dataList } = useWebSocketStore();
  const { storeFilterShip } = useMapFilterStore();
  const { t: trans, i18n } = useTranslation('translation');
  const currentLanguage = i18n.language;

  useEffect(() => {
    if (!dataList) return;
    setSites(
      dataList.map((site, index) => {
        return {
          id: 'badge-' + index,
          text: currentLanguage == 'kr' ? site.siteName : site.siteName_foreign,
          value: site.shipList.reduce((accu, curr) => accu + (curr.shipName !== null ? 1 : 0), 0),
          menu: site.shipList.map((ship) => currentLanguage == 'kr' ? ship.shipName : ship.shipName_foreign ?? '') ,
          styles: {
            left: site.left + '%',
            top: site.top + '%',
            bg: getBGColor(SITE_COLORS[index]),
          },
        };
      }),
    );
  }, [dataList]);

  if (!dataList) {
    return <></>;
  }
  return (
    <div className={cn('flex relative gap-[5.62rem]')}>
      <button
        className={cn(
          'z-10 cursor-pointer text-hw-gray-8 text-sm leading-none font-light rounded-full',
          'flex items-center justify-center gap-1',
          'border border-hw-white-1 border-solid',
          'left-6 top-6 absolute',
          'bg-[rgba(254,254,254,0.6)] active:bg-[rgba(254,254,254,0.8)]',
          'px-3 py-2',
        )}
        onClick={function () { storeFilterShip("", ""); }}>
        <Refresh /> <span>{trans('viewAll')}</span>
      </button>
      <div className={cn('relative pl-[32.44px] mr-[60px] pb-5 w-full h-full')}>
        <img className={cn('w-full h-auto')} src={MapImg} alt='map' />
        {sites.map((item) => {
          const { bg, ...styles } = item.styles;
          return (
            <span
              onClick={function () {
                storeFilterShip(currentLanguage == 'kr' ? item.text : item.text /*site.siteName_foreign*/, "");
              }}
              key={item.id}
              className={cn('hw-map-badge hw-tooltip cursor-pointer', bg)}
              data-value={item.value}
              style={styles}>
              {item.text}
              {item.value > 0 && (
                <div
                  className={cn(
                    'hw-tooltip-text top-[100%] hw-tooltip-left',
                    'bg-hw-gray-7 text-xs font-light leading-none rounded-lg py-[10px] px-2 gap-5 flex flex-col text-hw-white-1',
                    'w-auto' // 고정 너비 제거
                  )}
                  style={{
                    minWidth: '50px', // 기본 최소 너비
                    width: currentLanguage == 'kr' ? 
                            `${Math.max(50, item.menu.reduce((acc, cur) => Math.max(acc, cur.length * 16 ), 0))}px` :
                            `${Math.max(50, item.menu.reduce((acc, cur) => Math.max(acc, cur.length * 9 ), 0))}px` // 텍스트 길이에 따라 동적으로 너비 설정
                  }}>
                  {item.menu.map((text, idx) => {
                    return (
                      <span
                        className='w-full text-start'
                        key={`${item.id}-${idx}`}
                        onClick={function (event) {
                          event.stopPropagation();
                          storeFilterShip(item.text, text);
                        }}>
                        {text}
                      </span>
                    );
                  })}
                </div>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
  
}
