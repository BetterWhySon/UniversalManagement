import { Dot, HorizontalLine } from '@/components/icons';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSystemInfoRtStore from '@/api/systemInfoRt';
import useSidebarDepthData from '@/components/sidebar/data/SidebarDepthData';
import useSystemInfoStatusData from '@/api/systemInfoStatusData';
import { BATTERY_TYPE } from '@/constants/dashboard.constant';
import { websocketURL } from '@/api/URLs';

// info 상단 영역
const INFO_STATUS_DATA = {
  status: 'Normal',
  lastDataTime: '23-08-22 15:12:31',
  list: [
    [
      {
        name: 'Mode',
        value: 'Charge',
      },
      {
        name: 'Charger',
        value: 'Off',
      },
    ],
    [
      {
        name: 'A. Ch Current',
        value: '600A',
      },
      {
        name: 'A.Dch Current',
        value: '600A',
      },
    ],
    // [
    //   {
    //     name: 'SOC',
    //     value: '89.5%',
    //   },
    //   {
    //     name: 'A. Rack Cnt',
    //     value: '3/6',
    //   },
    // ],
    // [
    //   {
    //     name: 'Voltage',
    //     value: '738.0V',
    //   },
    //   {
    //     name: 'Current',
    //     value: '120A',
    //   },
    // ],
    // [
    //   {
    //     name: 'Alarm Count',
    //     value: '3',
    //   },
    //   {
    //     name: 'Temperature',
    //     value: '25℃',
    //   },
    // ],
  ],
};

export default function InfoStatusSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { /*systemInfoRtBmsData,*/ systemInfoRtRackData, connectBms, disconnectBms } = useSystemInfoRtStore();
  const { sidebarDepthData, storeSidebarDepthData } = useSidebarDepthData();
  const { systemInfoRtBmsData } = useSystemInfoStatusData();

  useEffect(() => {
  }, []);

  useEffect(() => {
  }, [systemInfoRtBmsData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate('/login');
      return;
    }

    // const data = [token, sidebarDepthData?.MENU_ID]  //bms_id
    const data = [token, location.pathname.split('/').pop()]  //bms_id

    const url = websocketURL + 'system_info_rt/?query_string=' + data;
    connectBms(url);

    return () => {
      disconnectBms();
    };
  }, [sidebarDepthData]);

  function batteryType(status: number) {
    switch (status) {
      case 0:
        return BATTERY_TYPE.INIT;
      case 1:
        return BATTERY_TYPE.READY;
      case 2:
        return BATTERY_TYPE.DRIVE;
      case 3:
        return BATTERY_TYPE.CHARGE;
      case 4:
        return BATTERY_TYPE.CHARGE_RBLA;
      case 5:
        return BATTERY_TYPE.CONTACTO_RCONTROL;
      default:
        return BATTERY_TYPE.NODATA;
    }
  }

  const batteryStatus = (status: number, str: string) => {
    switch (status) {
      case 0:
        return (
          <div className='inline-flex items-center gap-1'>
            <Dot color='green-1' /> <span className='leading-[128.571%] px-1'>{str}</span>
          </div>
        );
      case 1:
        return (
          <div className='inline-flex items-center gap-1'>
            <Dot color='orange-4' /> <span className='leading-[128.571%] px-1'>{str}</span>
          </div>
        );
      case 2:
        return (
          <div className='inline-flex items-center gap-1'>
            <Dot color='red-1' /> <span className='leading-[128.571%] px-1'>{str}</span>
          </div>
        );
      default:
        return (
          <div className='inline-flex items-center gap-1'>
            <Dot color='gray-1' /> <span className='leading-[128.571%] px-1'>{str}</span>
          </div>
        )
    }
  };

  // mode: 0- ready , 1- drive, 2-charge
  // status: 0-초록, 1-노랑, 2-빨강
  return (
    <div className='w-full lg:rounded-lg bg-hw-dark-2 mb-6 py-6 px-[50px] lg:pt-[24px] lg:pb-[20px] lg:px-[53px] '>
      <div className='w-full flex flex-col-reverse gap-6 sm:gap-0 sm:flex-row items-center justify-between'>
        <div className='w-full sm:w-auto flex items-center justify-between'>
          <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>Status</span>
        </div>
        <div className='w-full sm:flex-1 flex items-center justify-start px-5'>
          <span className='flex items-center gap-2  text-[18px] font-normal leading-[18px] text-hw-white-1'>
            {systemInfoRtBmsData?.status.map((item, index) => (
              <span key={item.id || index}>{batteryStatus(item.id, item.item)}</span>
              // batteryStatus(item.id, item.item)
            ))}
          </span>
        </div>
        <div className='w-full sm:w-[320px] flex items-center justify-between text-[14px] leading-5 sm:leading-[18px] text-hw-white-2'>
          <span className='text-[14px] font-light'>Last Data Updated Time</span>
          <span className=''>{systemInfoRtBmsData?.timestamp}</span>
        </div>
      </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 overflow-hidden pb-[6px] gap-0 sm:gap-x-[106px]'>

        <div key={0} className='w-full flex items-center mt-6 sm:mt-[22px]'>
          <div className='w-full sm:w-fit sm:min-w-[205px] min-h-[58px]'>
            <div className='w-full mb-6 sm:mb-[14px] flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>Mode</span>
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{batteryType(Number(systemInfoRtBmsData?.mode))}</span>
            </div>
            <div className='w-full flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>EMS Heart Count</span>
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.ems_heartcnt == null ? "- " : systemInfoRtBmsData?.ems_heartcnt}</span>
            </div>
          </div>
          <div className='ml-[53px] hidden sm:block'>
            <HorizontalLine />
          </div>
          {/* {index < INFO_STATUS_DATA.list.length - 1 && (
            <div className='ml-[53px] hidden sm:block'>
              <HorizontalLine />
            </div>
          )} */}
        </div>
        <div key={1} className='w-full flex items-center mt-6 sm:mt-[22px]'>
          <div className='w-full sm:w-fit sm:min-w-[205px] min-h-[58px]'>
            <div className='w-full mb-6 sm:mb-[14px] flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>Max CHG Current</span>
              {/* <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.ach_current !== undefined && systemInfoRtBmsData?.ach_current !== null  ? systemInfoRtBmsData?.ach_current.toFixed(1) : "- "}A</span> */}
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.ach_current.toFixed(1) == null ? "- " : systemInfoRtBmsData?.ach_current.toFixed(1)}A</span>
            </div>
            <div className='w-full flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>Max DCHG Current</span>
              {/* <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.adch_current ? systemInfoRtBmsData?.adch_current.toFixed(1) : "- "}A</span> */}
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.adch_current.toFixed(1) == null ? "- " : systemInfoRtBmsData?.adch_current.toFixed(1)}A</span>
            </div>
          </div>
          <div className='ml-[53px] hidden sm:block'>
            <HorizontalLine />
          </div>
        </div>
        <div key={2} className='w-full flex items-center mt-6 sm:mt-[22px]'>
          <div className='w-full sm:w-fit sm:min-w-[205px] min-h-[58px]'>
            <div className='w-full mb-6 sm:mb-[14px] flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>SOC</span>
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.soc.toFixed(1) == null ? "- " : systemInfoRtBmsData?.soc.toFixed(1)}%</span>
            </div>
            <div className='w-full flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>Humidity</span>
              {/* <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.arack_cnt || "- "}/{systemInfoRtRackData?.length || " -"}</span> */}
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.ems_humi == null ? "- " : systemInfoRtBmsData?.ems_humi}%</span>
            </div>
          </div>
          <div className='ml-[53px] hidden sm:block'>
            <HorizontalLine />
          </div>
        </div>
        <div key={3} className='w-full flex items-center mt-6 sm:mt-[22px]'>
          <div className='w-full sm:w-fit sm:min-w-[205px] min-h-[58px]'>
            <div className='w-full mb-6 sm:mb-[14px] flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>Voltage</span>
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.voltage == null ? "- " : systemInfoRtBmsData?.voltage.toFixed(1)}V</span>
            </div>
            <div className='w-full flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>Current</span>
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.current.toFixed(1) == null ? "- " : systemInfoRtBmsData?.current.toFixed(1)}A</span>
            </div>
          </div>
          <div className='ml-[53px] hidden sm:block'>
            <HorizontalLine />
          </div>
        </div>
        <div key={4} className='w-full flex items-center mt-6 sm:mt-[22px]'>
          <div className='w-full sm:w-fit sm:min-w-[205px] min-h-[58px]'>
            <div className='w-full mb-6 sm:mb-[14px] flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>Alarm Count</span>
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.alarm_count == null ? "-" : systemInfoRtBmsData?.alarm_count}</span>
            </div>
            <div className='w-full flex items-center justify-between'>
              <span className='text-hw-white-2 text-[18px] font-light leading-[22px]'>Temperature</span>
              <span className='flex items-center gap-2 text-[18px] font-normal leading-[18px]'>{systemInfoRtBmsData?.temperature == null ? "- " : systemInfoRtBmsData?.temperature}℃</span>
            </div>
          </div>
          <div className='ml-[53px] hidden sm:block'>
            <HorizontalLine />
          </div>
        </div>
      </div>

    </div >

  );
}
