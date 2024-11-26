import { Arrow, InfoDetailRefresh } from '@/components/icons';
import { cn } from '@/helpers/class-name.helper';
import { useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSystemDetailDataType from './data/SystemDetailDataType';
import useSystemInfoRtStore from '@/api/systemInfoRt';
import useSystemInfoStatusData from '@/api/systemInfoStatusData';

type InfoDetailProps = {
  openModal: () => void;
};

export default function InfoDetailSetion({ openModal }: InfoDetailProps) {
  const location = useLocation();
  const pathname = useMemo(() => location.pathname, [location.pathname]);
  const pathParts = pathname.split('/');
  const { detailDataTypes, storeCheck, storeUnCheck, storeReset } = useSystemDetailDataType();
  const { /*systemInfoRtBmsData,*/ systemInfoRtRackData } = useSystemInfoRtStore();
  const { systemInfoRtBmsData } = useSystemInfoStatusData();
  

  useEffect(() => {
  }, [systemInfoRtBmsData]);

  const resetChecked = () => {
    storeReset()
  };

  return (
    <section className='mt-8 sm:mt-6 px-[18px] lg:px-0'>
      <div className='flex items-end justify-between h-9 mb-4'>
        <span className='text-[18px] font-normal leading-[18px] text-hw-white-1'>System Detail</span>
        <div className='h-full flex gap-2'>
          <button onClick={resetChecked} className='h-full w-[40px] px-2 py-[6px] inline-flex items-center justify-center rounded-lg border border-[#E2E2E2]'>
            <InfoDetailRefresh />
          </button>
          <button
            onClick={openModal}
            className='h-full w-[86px] inline-flex items-center justify-center rounded-lg text-hw-orange-1 text-[1rem] font-light leading-5 border border-[#E2E2E2] py-2 px-6'>
            Filter
          </button>
        </div>
      </div>
      <div className='flex w-full h-fit rounded-lg bg-hw-dark-2 '>
        <ul className='w-[88px] lg:w-[164px] border-r border-[#A0A0A0] text-hw-white-2 text-[14px] leading-5 lg:leading-[18px] font-light'>
          {detailDataTypes.map((data: any, index: number) => (
            data.checked &&
            <li
              key={data.title}
              className={cn(
                'w-[88px] lg:w-[164px] h-[48px] overflow-hidden flex items-center px-3 lg:px-6 py-[17px]',
                index === 0 && 'h-10 lg:h-[48px]',
              )}>
              <p className=' line-clamp-1 text-ellipsis'>{data.title}</p>
            </li>
          ))}
        </ul>
        <div className='w-full flex overflow-x-auto'>
          {systemInfoRtRackData?.map((rack, index) => (
            <ul
              key={rack.rack_num}
              className={cn(
                'w-[92px] lg:w-[140px] text-[14px] leading-[18px] font-light text-hw-white-1',
                index % 2 === 0 && 'bg-[#363E4B]',
              )}>

              <li className='w-full h-10 lg:h-[48px] px-0 lg:pl-[24px] lg:pr-[8px] py-[12px]'>
                <Link
                  to={`/system/${pathParts[pathParts.length - 1]}/rack/${rack.rack_num}`}
                  className='w-full h-full flex items-center justify-center lg:justify-between  leading-[14px] lg:leading-[18px] text-hw-orange-1 font-normal'>
                  Rack #{rack.rack_num.toString().padStart(2, '0')/*숫자를 0x 2자리로 출력, 2자리 이상이면 0없이 그냥출력*/}
                  <div className='-rotate-90 hidden lg:block'>
                    <Arrow className='stroke-hw-orange-1' />
                  </div>
                </Link>
              </li>
              {/* TODO FIX rack.status 240520 최건호 수정 */}
              {detailDataTypes[1].checked && rack.status && // 해당 컬럼이 체크되어야 화면에 표출
                <li className={`w-full h-[48px] px-6 py-[17px] text-center leading-[14px] font-bold 
                  ${rack.status.id === 0 ? 'bg-hw-gray-1' :
                    rack.status.id === 1 ? 'bg-hw-blue-1' :
                    rack.status.id === 2 ? 'bg-hw-green-1' :
                      'bg-hw-gray-7' // 기본값이나 다른 조건을 위한 클래스
                  }`}>
                  {/* <li className='w-full h-[48px] px-6 py-[17px] text-center leading-[14px] font-bold bg-hw-green-1'> */}
                  {rack.status.item.charAt(0).toLocaleUpperCase() + rack.status.item.slice(1).toLocaleLowerCase()}
                  {/* {"ready".charAt(0).toLocaleUpperCase() + "ready".slice(1).toLocaleLowerCase()} */}
                </li>
              }
              {detailDataTypes[2].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className={`w-full h-[48px] px-6 py-[17px] text-center leading-[14px] font-bold 
                  ${rack.alarm_status.id === 0 ? 'bg-hw-green-1' :
                    rack.alarm_status.id === 1 ? 'bg-hw-orange-2' :
                    rack.alarm_status.id === 2 ? 'bg-hw-orange-1' :
                    rack.alarm_status.id === 3 ? 'bg-hw-red-1' :
                      'bg-hw-gray-7' // 기본값이나 다른 조건을 위한 클래스
                  }`}>
                  {/* <li className='w-full h-[48px] px-6 py-[17px] text-center leading-[14px] font-bold bg-hw-green-1'> */}
                  {rack.alarm_status.item.charAt(0).toLocaleUpperCase() + rack.alarm_status.item.slice(1).toLocaleLowerCase()}
                  {/* {"ready".charAt(0).toLocaleUpperCase() + "ready".slice(1).toLocaleLowerCase()} */}
                </li>
              }
              {detailDataTypes[3].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_volt.toFixed(1)}V
                </li>
              }
              {detailDataTypes[4].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_crnt.toFixed(3)}A
                </li>
              }
              {detailDataTypes[5].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_soc.toFixed(1)}%
                </li>
              }
              {detailDataTypes[6].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_soh.toFixed(1)}%
                </li>
              }
              {detailDataTypes[7].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_crntmax_chg.toFixed(1)}A
                </li>
              }
              {detailDataTypes[8].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_crntmax_dchg.toFixed(1)}A
                </li>
              }
              {detailDataTypes[9].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_cell_max.toFixed(3)}V
                </li>
              }
              {detailDataTypes[10].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_cell_min.toFixed(3)}V
                </li>
              }
              {detailDataTypes[11].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_cell_avg.toFixed(3)}V
                </li>
              }
              {detailDataTypes[12].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_temp_max}℃
                </li>
              }
              {detailDataTypes[13].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_temp_min}℃
                </li>
              }
              {detailDataTypes[14].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_temp_avg}℃
                </li>
              }
              {detailDataTypes[15].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_bal_sts == 1 ? "On" : "Off"}
                </li>
              }
              {detailDataTypes[16].checked &&  // 해당 컬럼이 체크되어야 화면에 표출
                <li className='w-full h-12 px-6 py-[17px] font-light text-right'>
                  {rack.rbms_fan_act_sts == 1 ? "On" : "Off"}
                </li>
              }
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
