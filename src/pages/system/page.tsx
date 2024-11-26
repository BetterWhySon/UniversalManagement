import { ReactNode, useMemo, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

import './style.scss';
import { cn } from '@/helpers/class-name.helper';
import { Dot } from '@/components/icons';
import { transDotColor } from '@/components/ui/TransDotColor';

import useSidebarDepthData from '@/components/sidebar/data/SidebarDepthData';
import useSystemInfoRtStore from '@/api/systemInfoRt'

import { SYSTEM_TABS } from '@/enums/system-tabs';
import MessageTab from './components/MessageTab';
import DownloadTab from './components/DownloadTab';
import InfoTab from './components/InfoTab';
import InfoRackCellDetail from './components/info/InfoRackCellDetail';
import GraphTab from './components/GraphTab';
import DiagnosisTab from './components/DiagnosisTab';
import Diagnosis2Tab from './components/Diagnosis2Tab';
import StatisticsTab from './components/StatisticsTab';
import DownloadRawTab from './components/DownloadRawTab';
import DownloadLogTab from './components/DownloadLogTab';
import DownloadLGWInfoTab from './components/DownloadLGWInfoTab';
import useLoginStore from '@/api/loginStore';

export default function SystemPage() {
  const location = useLocation();
  const pathname = useMemo(() => location.pathname, [location.pathname]);
  const pathParts = pathname.split('/');
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<SYSTEM_TABS>(SYSTEM_TABS.INFO);
  const [currentTabList, setCurrentTabList] = useState<SYSTEM_TABS[]>();
  const { t: trans } = useTranslation('translation');
  const { trans_status } = useSystemInfoRtStore();
  const { isAdminUser, isLevel1, isLevel2 } = useLoginStore();
  
  const tabContent: Record<string, ReactNode> = {
    [SYSTEM_TABS.INFO]: <InfoTab />,
    [SYSTEM_TABS.GRAPH]: <GraphTab />,
    [SYSTEM_TABS.MESSAGE]: <MessageTab />,
    [SYSTEM_TABS.DOWNLOAD]: <DownloadTab />,
    [SYSTEM_TABS.DOWNLOAD_RAW]: <DownloadRawTab />,
    [SYSTEM_TABS.DOWNLOAD_LOG]: <DownloadLogTab />,
    [SYSTEM_TABS.DOWNLOAD_LGW_INFO]: <DownloadLGWInfoTab />,
    [SYSTEM_TABS.DIAGNOSIS1]: <DiagnosisTab />,
    [SYSTEM_TABS.DIAGNOSIS2]: <Diagnosis2Tab />,
    [SYSTEM_TABS.STATISTICS]: <StatisticsTab />,
  };
  const systemContent: SYSTEM_TABS[] = [
    SYSTEM_TABS.INFO,
    SYSTEM_TABS.MESSAGE,
    SYSTEM_TABS.GRAPH,
    SYSTEM_TABS.DOWNLOAD_RAW,
    SYSTEM_TABS.DOWNLOAD_LOG,
    SYSTEM_TABS.DOWNLOAD_LGW_INFO
  ]  
  const systemContentLV2: SYSTEM_TABS[] = [ // 사용자 등급이 LV2면 SYSTEM_TABS.DOWNLOAD_LGW_INFO 없음
    SYSTEM_TABS.INFO,
    SYSTEM_TABS.MESSAGE,
    SYSTEM_TABS.GRAPH,
    SYSTEM_TABS.DOWNLOAD_RAW,
    SYSTEM_TABS.DOWNLOAD_LOG,    
  ]
  const systemContentLV1: SYSTEM_TABS[] = [ // 사용자 등급이 LV1면 INFO, MESSAGE 만 표출
    SYSTEM_TABS.INFO,
    SYSTEM_TABS.MESSAGE,    
  ]
  const rackContent: SYSTEM_TABS[] = [
    SYSTEM_TABS.INFO,
    SYSTEM_TABS.MESSAGE,
    SYSTEM_TABS.GRAPH,
    SYSTEM_TABS.DIAGNOSIS1,
    SYSTEM_TABS.DIAGNOSIS2,
    SYSTEM_TABS.STATISTICS
  ]
  const rackContentLV1: SYSTEM_TABS[] = [ // 사용자 등급이 LV1면 INFO, MESSAGE 만 표출
    SYSTEM_TABS.INFO,
    SYSTEM_TABS.MESSAGE,    
  ]

  // const systemContent: SYSTEM_TABS[] = [
  //   trans(SYSTEM_TABS.INFO),
  //   trans(SYSTEM_TABS.MESSAGE),
  //   trans(SYSTEM_TABS.GRAPH),
  //   trans(SYSTEM_TABS.DOWNLOAD)
  // ]
  // const rackContent: SYSTEM_TABS[] = [
  //   trans(SYSTEM_TABS.INFO),
  //   trans(SYSTEM_TABS.MESSAGE),
  //   trans(SYSTEM_TABS.GRAPH),
  //   trans(SYSTEM_TABS.DIAGNOSIS1),
  //   trans(SYSTEM_TABS.DIAGNOSIS2),
  //   trans(SYSTEM_TABS.STATISTICS)    
  // ]

  const { sidebarDepthData } = useSidebarDepthData();


  useEffect(() => {
    // storeIsAdminUser, storeIsLevel1, storeIsLevel2
    if( isAdminUser == true ) {
      setCurrentTabList(location.pathname.includes('/rack') ? rackContent : systemContent);
    } else if(isLevel2 == true) {
      setCurrentTabList(location.pathname.includes('/rack') ? rackContent : systemContentLV2);  // 사용자 등급이 LV2면 SYSTEM_TABS.DOWNLOAD_LGW_INFO 없음
    } else if(isLevel1 == true) {
      setCurrentTabList(location.pathname.includes('/rack') ? rackContentLV1 : systemContentLV1);  // 사용자 등급이 LV1면 SYSTEM_TABS.DOWNLOAD_LGW_INFO 없음
    }
  }, [location.pathname]);

  useEffect(() => {
    if (currentTabList && currentTabList.includes(currentTab) == false) {
      setCurrentTab(SYSTEM_TABS.INFO)
    }
  }, [currentTabList]);

  return (
    <main className='wrapper'>
      <div className={cn('p-0 lg:pt-[40px] lg:pl-[55px] lg:pr-[56px] md:pb-[72px] transition-all')}>
        {/* breadcrumbs */}
        <span className='pl-[18px] mt-5 lg:mr-0 lg:mt-0 lg:ml-0 transition-all inline-flex w-full relative mb-5 lg:mb-6'>
          <Link
            to={`/system/${pathParts[2]}`}
            className={cn(
              'block text-[16px] leading-4 lg:text-[20px] lg:leading-5 font-normal',
              (location.pathname.includes('/cell') || location.pathname.includes('/rack')) &&
              'text-hw-white-2 font-[250]',
            )}>
            {/* {trans('systemName')} {sidebarDepthData?.MENU} */}
            {sidebarDepthData?.MENU} 
          </Link>
          {location.pathname.includes('/rack') && (
            <Link
              to={`/system/${pathParts[2]}/rack/${pathParts[4]}`}
              className={cn(
                'block text-[16px] leading-4 lg:text-[20px] lg:leading-5',
                location.pathname.includes('/cell') && 'text-hw-white-2 font-[250]',
              )}>
              <span className='text-hw-white-2 mx-2'>/</span>
              <span>Rack #{`${pathParts[4]}`.padStart(2, '0')}</span>
            </Link>
          )}
          {location.pathname.includes('/cell') && (
            <span className='text-[16px] leading-4 lg:text-[20px] lg:leading-5'>
              <span className='text-hw-white-2 mx-2'>/</span>
              <span>Cell</span>
            </span>
          )}
          {currentTab === SYSTEM_TABS.INFO &&
            location.pathname.includes('/rack') &&
            !location.pathname.includes('/cell') && (
              <button
                onClick={() => navigate(location.pathname + '/cell')}
                className='block lg:hidden absolute right-[18px] top-[50%] -translate-y-[50%] ml-auto bg-hw-orange-1 h-[36px] w-[115px] text-[16px] font-light rounded-[8px]'>
                Cell Info.
              </button>
            )}
              
          {
            <Dot className='absolute top-1/2 right-full ml-2.5 -translate-y-1/2' color={transDotColor(trans_status).color} />
          }
        </span>

        {/* page content */}
        {!location.pathname.includes('/cell') ? (
          <>
            <div className='min-w-[375px] lg:min-w-max flex items-center mb-0 lg:mb-4'>
              <Swiper slidesPerView={'auto'} spaceBetween={1} freeMode modules={[FreeMode]} className='mySwiper w-full'>
                {currentTabList?.map((tab) => (
                  <SwiperSlide key={tab} className='!w-fit'>
                    <div
                      onClick={() => {
                        setCurrentTab(tab)
                      }}
                      className={cn(
                        'px-2 pt-2 pb-3 lg:px-6 h-9 w-[112px] text-center lg:py-[11px] text-[16px] leading-4 lg:text-[18px] lg:h-10 lg:w-fit lg:leading-[18px] border-b-[2px] cursor-pointer select-none border-transparent',
                        currentTab === tab
                          ? 'text-hw-orange-1 border-hw-orange-1 font-light lg:font-normal'
                          : 'text-hw-white-3 font-light',
                      )}>
                      {/* {tab.charAt(0) + tab.slice(1).toLocaleLowerCase()} */}
                      {trans(tab)}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {currentTab === SYSTEM_TABS.INFO && location.pathname.includes('/rack') && (
                <button
                  onClick={() => navigate(location.pathname + '/cell')}
                  className='hidden lg:block ml-auto bg-hw-orange-1 h-[36px] w-[115px] text-[16px] font-light rounded-[8px]'>
                  Cell Info.
                </button>
              )}
            </div>
            {tabContent[currentTab]}
          </>
        ) : (
          <InfoRackCellDetail />
        )}
      </div>
    </main>
  );
}
