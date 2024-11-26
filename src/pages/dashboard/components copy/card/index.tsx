import { useEffect, useRef, useState } from 'react';
import { Dot } from '@/components/icons';
import CardItem from './item';
import { cn } from '@/helpers/class-name.helper';
import useWebSocketStore from '@/api/socketStore';
import useMapFilterStore from '@/api/mapFilterStore';
import { CardData } from '@/types/card.type';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import { useTranslation } from 'react-i18next';

type CardProps = {
  padding?: string;
  margin?: string;
  overflow?: string;
  showTooltip?: boolean;
};

export default function CardInformationSection({
  padding = '20px 0 0',
  margin = '0 0 0 57px',
  overflow = '',
  showTooltip = true,
}: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { sortedDataList } = useWebSocketStore();
  const [cardData, setCardData] = useState<CardData[]>([]);
  const { site, ship } = useMapFilterStore();
  const { t: trans, i18n } = useTranslation('translation');
  const currentLanguage = i18n.language;
  const [overlay, setOverlay] = useState({
    start: false,
    end: true,
  });

  // const { site, ship } = useMapFilterStore();

  const handleReachBeginning = () => {
    setOverlay((prev) => ({ ...prev, start: false }));
  };


  useEffect(() => {
    if (!sortedDataList) {
      return;
    }
    let _cardData: Array<CardData> = [];
    var nId: number = 0
    sortedDataList.map((item) => {
      item.shipList.map((sItem) => {
        if (sItem.shipName) {
          sItem.bmsList.map((bItem/*,bIndex*/) => {
            if (bItem.bmsName) {
              _cardData.push({
                name: item.siteName,
                name_foreign: item.siteName_foreign,
                id: nId,
                title: {
                  line1: item.siteName,
                  line2: sItem.shipName,
                  line3: bItem.alias,     //menu: site.shipList.map((ship) => ship.shipName),
                  line1_foreign: item.siteName_foreign,
                  line2_foreign: sItem.shipName_foreign,
                  line3_foreign: bItem.alias_foreign,
                  line3_id: bItem.bms_id
                },
                trans: bItem.bmsData ? bItem.bmsData.trans_status : -1,  // 전송중, 캐시데이터 전송중, 미전송중      /* bItem.bmsData가 null이면 -1로 입력 */
                battery: {
                  typeNum: bItem.bmsData ? bItem.bmsData.ems_mode : -1,  // Ready = 0 , Drive = 1 , Charge = 2
                  icon: "3",                // not us
                },
                percentage: bItem.bmsData ? bItem.bmsData.ems_soc : -1,
                parameters: [
                  {
                    id: 0,
                    label: 'voltage',
                    value: bItem.bmsData ? bItem.bmsData.ems_volt : -1,
                  },
                  {
                    id: 1,
                    label: 'current',
                    value: bItem.bmsData ? bItem.bmsData.ems_crnt : -1,
                  },
                  {
                    id: 2,
                    label: 'temperature',
                    value: bItem.bmsData ? bItem.bmsData.ems_temp_avg : -1,
                  },
                  {
                    id: 3,
                    label: 'availableRackNo',
                    value: bItem.bmsData ? bItem.bmsData.arack_cnt : -1,
                  },
                  {
                    id: 4,
                    label: 'accumulated',
                    value: bItem.bmsData ? bItem.bmsData.ems_acc_dischg_amount : -1
                  },
                  {
                    id: 5,
                    label: 'emsHeartcnt',
                    value: bItem.bmsData ? bItem.bmsData.ems_heartcnt : -1
                  },
                ],
                type: bItem.bmsData ? bItem.bmsData.ems_status_info : -1,
                action: {
                  icon: "1",
                  label: "123",
                },
                status: {
                  id: bItem.bmsData ? bItem.bmsData.status.id : -1,
                  item: bItem.bmsData ? bItem.bmsData.status.item : "NoData",
                },
                alarms: bItem.alarmData,
                rackAlarms: bItem.rack_alarmData
              })
              nId++
            }
          })
        }
      })
    })
    setCardData(_cardData);
  }, [sortedDataList]);


  useEffect(() => {
    if (!containerRef || !containerRef.current) {
      return;
    }
    containerRef.current.addEventListener('scroll', () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }
      const scrollRight = container.scrollLeft <= 0 ? 0 : container?.scrollLeft;
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
        setOverlay((prev) => ({ ...prev, end: false }));
      } else if (scrollRight === 0) {
        setOverlay((prev) => ({ ...prev, start: false }));
      } else {
        setOverlay({ start: true, end: true });
      }
    });
  }, []);

  const handleReachEnd = () => {
    setOverlay((prev) => ({ ...prev, end: false }));
  };

  const handleSliderMove = (swiper: SwiperType) => {
    if (!swiper.isBeginning && !swiper.isEnd) {
      setOverlay(() => ({ start: true, end: true }));
    }
  };
  return (
    <div style={{ margin, overflow }} className={cn(' relative flex flex-1 min-w-[314px]')}>
      <div
        className={cn(
          'absolute h-full z-10 w-10 sm:w-20 left-[-2px] rounded-r-lg',
          overlay.start ? 'visible' : 'invisible',
        )}
        style={{
          background: 'linear-gradient(90deg, rgb(43, 49, 59) 1.16%, rgba(43, 49, 59, 0) 48.6%)',
        }}
      />
      {/* PC CARDS */}
      <div
        style={{ padding }}
        className={cn('h-full hidden xs:flex items-center py-5 relative overflow-y-hidden gap-5 home__card-swiper mt-3')}>
        <Swiper
          slidesPerView='auto'
          spaceBetween={20}
          freeMode={true}
          onReachBeginning={handleReachBeginning}
          onReachEnd={handleReachEnd}
          onSliderMove={handleSliderMove}
          modules={[FreeMode]}
          className='mySwiper !px-[57px]  min-w-[1200px]'>
            
          {cardData.filter((data) => (site === '') || 
                                     (ship === '' && ( data.name === site || data.name_foreign === site )) || 
                                     ( ship === data.title.line2 || ship === data.title.line2_foreign ))
                                    
            .map((data) => {
              return (
                <SwiperSlide key={data.id} className='!w-fit'>
                  <CardItem data={data} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      {/* MOBILE CARDS */}
      <div
        style={{ padding }}
        className={cn('h-full flex xs:hidden items-center py-5 relative overflow-y-hidden gap-5 home__card-swiper')}>
        <Swiper
          slidesPerView='auto'
          spaceBetween={20}
          onReachBeginning={handleReachBeginning}
          onReachEnd={handleReachEnd}
          onSliderMove={handleSliderMove}
          centeredSlides={true}
          className='mySwiper !px-[57px]'>
          {cardData.map((data) => {
            return (
              <SwiperSlide key={data.id} className='!w-fit'>
                <CardItem data={data} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div
        className={cn(
          'absolute h-full z-10 w-10 sm:w-32 flex p-3 justify-end items-start right-[-3px] rounded-r-lg transition-all',
          overlay.end ? 'visible' : 'invisible',
        )}
        style={{
          background: 'linear-gradient(270deg, #2B313B 14.16%, rgba(43, 49, 59, 0.00) 48.6%)',
        }}
      />
      {showTooltip && (
        <div className={cn('absolute z-10 top-2 right-3')}>
          <div className='flex flex-row items-center gap-3'>
            <span className='flex items-center gap-3'>
              <Dot color='blue-1' /> {trans('transmitting')}
            </span>
            <span className='flex items-center gap-3'>
              <Dot color='orange-2' /> {trans('transmittingCacheData')}
            </span>
            <span className='flex items-center gap-3'>
              <Dot color='gray-1' /> {trans('notTransmitting')}
            </span>
          </div>
        </div>
        //   <span className={cn('hw-tooltip h-fit w-fit absolute z-10 top-3 right-3')}>
        //     <QuestionCircle />
        //     <div className='hw-tooltip-text hw-tooltip-right top-[calc(100%+6px)]'>
        //       <div className='flex flex-col text-xs leading-none py-2 px-3 font-light min-w-0 w-36 gap-3 bg-hw-gray-10 rounded-lg'>
        //         <span className='flex items-center gap-3 leading-none'>
        //           <Dot color='blue-1' /> {trans('transmitting')}
        //         </span>
        //         <span className='flex items-center gap-3'>
        //           <Dot color='orange-2' />
        //           {trans('transmittingCacheData')}
        //         </span>
        //         <span className='flex items-center gap-3'>
        //           <Dot color='gray-1' /> {trans('notTransmitting')}
        //         </span>
        //       </div>
        //     </div>
        //   </span>
      )}
    </div>
  );
}
