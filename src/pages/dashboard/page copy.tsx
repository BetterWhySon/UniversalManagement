import { Dot, QuestionCircle, Refresh } from '@/components/icons';
import { cn } from '@/helpers/class-name.helper';
import DashboardCaption from './components/caption';
import CardInformationSection from './components/card';
import ChartList from './components/chart/chart-list';
import MapArea from './components/map';
import './style.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode } from 'swiper/modules';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocketStore from '@/api/socketStore';
import useLoginStore from '@/api/loginStore';
import { websocketURL } from '@/api/URLs';

const BADGE_DATA = [
  {
    title: '인천',
    className:
      'w-[78px] xs:w-[100px] 2sm:w-[150px] transition-all h-[36px] rounded-lg border border-hw-gray-0.5 outline-none text-[16px] leading-5 font-light text-hw-orange-1',
  },
  {
    title: '강릉',
    className:
      'w-[78px] xs:w-[100px] 2sm:w-[150px] transition-all h-[36px] rounded-lg border border-hw-gray-0.5 outline-none text-[16px] leading-5 font-light text-hw-orange-1',
  },
  {
    title: '군산',
    className:
      'w-[78px] xs:w-[100px] 2sm:w-[150px] transition-all h-[36px] rounded-lg border border-hw-gray-0.5 outline-none text-[16px] leading-5 font-light text-hw-orange-1',
  },
  {
    title: '포항',
    className:
      'w-[78px] xs:w-[100px] 2sm:w-[150px] transition-all h-[36px] rounded-lg border border-hw-gray-0.5 outline-none text-[16px] leading-5 font-light text-hw-orange-1',
  },
  {
    title: '부산',
    className:
      'w-[78px] xs:w-[100px] 2sm:w-[150px] transition-all h-[36px] rounded-lg bg-[#FFDAC2]  border border-hw-orange-1 outline-none text-[16px] leading-5 font-light text-hw-orange-1',
  },
  {
    title: '포항',
    className:
      'w-[78px] xs:w-[100px] 2sm:w-[150px] transition-all h-[36px] rounded-lg border border-hw-gray-0.5 outline-none text-[16px] leading-5 font-light text-hw-orange-1',
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { connect, disconnect, setNavigateCB } = useWebSocketStore();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      setTimeout(() => {
        navigate('/login');
      }, 1);
      return;
    }

    setNavigateCB(() => navigate('/login'));
    const url = websocketURL + 'dashboard/?token=' + token;
    connect(url);

    return () => {
      disconnect(false);
    };

  }, []);

  return (
    <main className='home__wrapper'>
      <div className={cn('px-0 pb-0 lg:pb-[26px] lg:pl-[56px] lg:pr-[63px] transition-all')}>
        <DashboardCaption />
        <ChartList />
        <div className='bg-hw-dark-2 mt-5 rounded-lg relative overflow-x-auto hidden lg:flex pb-3'>
          <MapArea />
          <CardInformationSection overflow='hidden' margin='0' />
        </div>

        {/* MOBILE MAP & CARDS*/}
        <div className='bg-hw-dark-2 mt-8 sm:mt-5 flex lg:hidden flex-col w-full pb-[50px]'>
          <div className='pt-4 px-[18px] pb-6 flex items-start justify-between'>
            <div className='flex gap-4'>
              <span className='text-[18px] font-light leading-[22px] text-hw-white-2'>부산</span>
              <span className='text-[32px] font-bold leading-8 text-hw-white-1'>123</span>
            </div>
            <button
              className={cn(
                'flex items-center justify-center py-3 px-5 h-10 rounded-full gap-1  text-hw-gray-8 border border-hw-white-1 border-solid bg-[rgba(254,254,254,0.6)] active:bg-[rgba(254,254,254,0.8)]',
              )}>
              <Refresh /> <span className='text-[14px] font-light leading-[14px]'>전체보기</span>
            </button>
          </div>
          <div className='w-full mb-6'>
            <div className='w-full'>
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={8}
                freeMode
                modules={[FreeMode]}
                className={cn('mySwiper !px-[18px]')}>
                {BADGE_DATA.map((item, index) => (
                  <SwiperSlide key={index} className={cn('!w-fit')}>
                    <button className={item.className}>{item.title}</button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className='w-full'>
            <CardInformationSection margin='0 18px 0' padding='0px 0px' showTooltip={false} />
            <div className='w-full relative pr-5 mt-[10px] flex justify-end '>
              <span className={cn('group pr-[10px]')}>
                <QuestionCircle />
                <div className='opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute z-20 bottom-[calc(100%+16px)] right-5'>
                  <div className='flex flex-col text-xs leading-none py-2 px-3 font-light min-w-0 w-36 gap-3 bg-hw-gray-10 rounded-lg'>
                    <span className='flex items-center gap-3 leading-none'>
                      <Dot color='blue-1' /> 전송중
                    </span>
                    <span className='flex items-center gap-3'>
                      <Dot color='orange-2' />
                      캐시데이터 전송중
                    </span>
                    <span className='flex items-center gap-3'>
                      <Dot color='gray-1' /> 미전송중
                    </span>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
