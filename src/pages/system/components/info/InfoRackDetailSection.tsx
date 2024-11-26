import { cn } from '@/helpers/class-name.helper';
import useSystemInfoRtRackStore from '@/api/systemInfoRtRackInfo';
import useSystemInfoRtStore from '@/api/systemInfoRt';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { websocketURL } from '@/api/URLs';

const RACK_DATA = [
  { title: 'Heart Count', value: 255, keyName: "rbms_heartcnt", },
  { title: `Fuse State\n(Pos)`, value: 255, keyName: "rbms_fusests_pos", },
  { title: `Fuse State\n(Neg)`, value: 255, keyName: "rbms_fusests_neg", },
  { title: `Relay Status\n(Pos)`, value: 255, keyName: "rbms_posrly_sts", },
  { title: `Relay Status\n(Pre Charge)`, value: 0, keyName: "rbms_prerly_sts", },
  { title: `Relay Status\n(Neg)`, value: 255, keyName: "rbms_negrly_sts", },

  { title: `Alarm\nID1`, value: '0x0000', keyName: "rbms_alarmid_1", },
  { title: `Alarm\nID2`, value: '0x0000', keyName: "rbms_alarmid_2", },
  { title: `Alarm\nID3`, value: '0x0000', keyName: "rbms_alarmid_3", },
  { title: 'HV - Batt', value: '0x0000', keyName: "rbms_hvd_bat", },
  { title: 'HV - PCS', value: '0.1.0', keyName: "rbms_hvd_pcs", },
  { title: 'GFD State', value: '0.1.0', keyName: "rbms_gfd_sts", },

  { title: `P-Protection\nID`, value: '0x0000', keyName: "rbms_pptcid_1", },
  { title: `Protection\nID1`, value: '0x0000', keyName: "rbms_ptcid_1", },
  { title: `Protection\nID2`, value: '0x0000', keyName: "rbms_ptcid_2", },
  { title: `Protection\nID3`, value: '0x0000', keyName: "rbms_ptcid_3", },
  { title: 'Version (MCU1)', value: '0.1.0', keyName: "rbms_fw1_ver", },
  { title: 'Version (MCU2)', value: '0.1.0', keyName: "rbms_fw2_ver", },

  // { title: 'Max Module Voltage No', value: 12, keyName: "rbms_cell_maxmoduleno", },
  // { title: 'Min Module Voltage No', value: 255, keyName: "rbms_cell_minmoduleno", },
  // { title: 'Max Cell Voltage No', value: 12, keyName: "rbms_cell_maxch", },
  // { title: 'Min Cell Voltage No', value: 1, keyName: "rbms_cell_minch", },
  // { title: `IR (Pos)`, value: '10.000kΩ', keyName: "rbms_isores_pos", },
  // { title: `IR (Neg)`, value: '10.000kΩ', keyName: "rbms_isores_neg", },
  // { title: `Max Module Temp No`, value: 1, keyName: "rbms_temp_maxmoduleno", },
  // { title: `Min Module Temp No`, value: 15, keyName: "rbms_temp_minmoduleno", },
  // { title: `Max Cell Temp No`, value: 1, keyName: "rbms_temp_maxch", },
  // { title: `Min Cell Temp No`, value: 6, keyName: "rbms_temp_minch",},
  // { title: 'Idle State', value: 0, keyName: "rbms_idle_sts", },
  // { title: 'Power Switch', value: 'Off', keyName: "rbms_igk_rtn", },

  { title: 'Max Pack \nVoltage No', value: '-', keyName: "max_voltage_pack_no", },
  { title: 'Max Module \nVoltage No', value: '-', keyName: "max_voltage_module_no", },
  { title: 'Max Cell \nVoltage No', value: '-', keyName: "rbms_cell_maxch", },
  { title: 'Min Pack \nVoltage No', value: '-', keyName: "min_voltage_pack_no", },
  { title: `Min Module \nVoltage No`, value: '-', keyName: "min_voltage_module_no", },
  { title: `Min Cell \nVoltage No`, value: '-', keyName: "min_voltage_cell_no", },

  { title: `Max Pack \nTemp No`, value: '-', keyName: "max_temp_pack_no", },
  { title: `Max Module \nTemp No`, value: '-', keyName: "max_temp_module_no", },
  { title: `Max Cell \nTemp No`, value: '-', keyName: "rbms_temp_maxch", },
  { title: `Min Pack \nTemp No`, value: '-', keyName: "min_temp_pack_no", },
  { title: 'Min Module \nTemp No', value: '-', keyName: "min_temp_module_no", },
  { title: 'Min Cell \nTemp No', value: '-', keyName: "min_temp_cell_no", },

  { title: `IR (Pos)`, value: '10.000kΩ', keyName: "rbms_isores_pos", },
  { title: `IR (Neg)`, value: '10.000kΩ', keyName: "rbms_isores_neg", },
  { title: 'Idle State', value: 0, keyName: "rbms_idle_sts", },
  { title: 'Power Switch', value: 'Off', keyName: "rbms_igk_rtn", },
  { title: ``, value: 0, keyName: "", },
  { title: ``, value: 0, keyName: "", },
];
const PC_RACK_COLS_DATA: Record<string, Record<string, string | number>[]> = {
  col1: RACK_DATA.slice(0, 6),
  col2: RACK_DATA.slice(6, 12),
  col3: RACK_DATA.slice(12, 18),
  col4: RACK_DATA.slice(18, 24),
  col5: RACK_DATA.slice(24, 30),
  col6: RACK_DATA.slice(30),
};
const MOBILE_RACK_COLS_DATA: Record<string, Record<string, string | number>[]> = {
  col1: RACK_DATA.slice(0, 5),
  col2: RACK_DATA.slice(5, 10),
  col3: RACK_DATA.slice(10, 15),
  col4: RACK_DATA.slice(15, 20),
  col5: RACK_DATA.slice(20, 25),
  col6: RACK_DATA.slice(25, 30),
  col7: RACK_DATA.slice(30),
};

export default function InfoRackDetailSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { systemInfoRtRackDetailAlarm, systemInfoRtRackDetail, connectReck, disconnectReck } = useSystemInfoRtRackStore();
  const { disconnectBms } = useSystemInfoRtStore();
  const { t: trans } = useTranslation('translation');

  useEffect(() => {

  }, []);

  useEffect(() => {
    console.log(location);
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate('/login');
      return;
    }
    // SystemInfoRtStore disconnect
    disconnectBms();
    const parts = location.pathname.split('/');
    const data = [token, parts[2], parts.pop()]  //토큰, BMS_ID(30), rack(1)

    const url = websocketURL + 'system_info_rt/?query_string=' + data;
    connectReck(url);

    return () => {
      disconnectReck();
    };
  }, [location]);

  function getDotStyle(type: number) {
    switch (type) { //Normal = 0. Alarm = 1, Protection = 2, Permanant Protection (P-Protection) = 3
      case 0:
        return 'hw-green-2';
      case 1:
        return 'hw-orange-2';
      case 2:
        return 'hw-orange-1';
      case 3:
        return 'hw-red-1';
      default:
        return 'hw-gray-7';
    }
  }

  //Normal = 0. Alarm = 1, Protection = 2, Permanant Protection (P-Protection) = 3
  return (
    <section className='w-full flex flex-col 2sm:flex-row gap-8 2sm:gap-[20px] px-0 sm:px-[18px] lg:p-0'>
      <div className='w-full 2sm:w-[calc(100%-264px)] mt-2 2sm:mt-0'>
        <p className='text-[18px] font-normal leading-[18px] mb-[16px] text-hw-white-1 px-[18px] sm:px-0'>
          Rack Detail
        </p>
        {/* PC RACK DETAIL TABLE */}
        <div className='hidden sm:flex transition-all w-full overflow-y-auto h-[620px] rounded-none sm:rounded-[8px] bg-hw-dark-2 p-[24px] pr-5 divide-x-[1px] divide-hw-gray-7'>
          {Object.keys(PC_RACK_COLS_DATA).map((colName, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'inline-flex flex-col items-center justify-between gap-0 py-[16px] px-[24px]',
                  index === 0 && '!pl-0',
                  index === Object.keys(PC_RACK_COLS_DATA).length - 1 && '!pr-0',
                )}>
                {PC_RACK_COLS_DATA[colName].map((item, index) => {
                  return (
                    <div key={index} className='w-[212px] h-[48px] flex items-center'>
                      <p className='flex-1 flex whitespace-pre-wrap font-light text-[16px] leading-[22px] text-hw-white-2'>
                        {item.title}
                      </p>
                      {item.title &&
                        <span className='w-[96px] h-[34px] bg-hw-dark-1 rounded-[8px] flex items-center justify-center text-[18px] font-normal'>
                          {systemInfoRtRackDetail && (item.keyName === 'rbms_isores_neg' || item.keyName === 'rbms_isores_pos') ? // IR (Neg), IR (Pos) 소수점 자릿수
                            systemInfoRtRackDetail[item.keyName].toFixed(1) + "kΩ" // 소숫점 1자리
                            :
                            item.keyName === 'rbms_gfd_sts' ? // GFD State 이면
                              systemInfoRtRackDetail?.[item.keyName] == 0 ? trans('normal') : trans('abnormal')
                              :
                              systemInfoRtRackDetail?.[item.keyName] !== null ?
                                item.keyName === "rbms_hvd_bat" || item.keyName === "rbms_hvd_pcs" ? systemInfoRtRackDetail?.[item.keyName] + "V" : // HV - Batt , HV - PCS 는 단위 V 추가 
                                  systemInfoRtRackDetail?.[item.keyName] // 나머지는 일반 출력
                                : '-'}
                        </span>
                      }
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* MOBILE RACK DETAIL TABLE */}
        <div className='flex sm:hidden transition-all w-full overflow-y-auto min-h-[367px] rounded-none bg-hw-dark-2 py-6 px-[50px] divide-x-[1px] divide-hw-gray-7'>
          {Object.keys(MOBILE_RACK_COLS_DATA).map((colName, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'inline-flex flex-col items-center justify-between gap-6 py-0 px-[50px]',
                  index === 0 && '!pl-0',
                  index === Object.keys(MOBILE_RACK_COLS_DATA).length - 1 && '!pr-0',
                )}>
                {MOBILE_RACK_COLS_DATA[colName].map((item,index) => {
                  return (
                    <div key={index} className='w-[275px] h-[48px] flex gap-2 items-center'>
                      <p className='w-[179px] flex-1 flex whitespace-pre-wrap font-light text-[18px] leading-[22px] text-hw-white-2'>
                        {item.title}
                      </p>
                      <span className='w-[96px] h-[34px] bg-hw-dark-1 rounded-[8px] flex items-center justify-center text-[18px] font-normal'>
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className='min-w-[244px]'>
        <p className='text-[18px] font-normal leading-[18px] mb-[16px] px-[18px] sm:px-0 text-hw-white-1'>Protection</p>
        <div className='w-full h-fit sm:h-[620px] rounded-none sm:rounded-lg bg-hw-dark-2 pb-[6px] overflow-y-auto flex flex-col divide-y-[1px] divide-hw-gray-7'>
          {systemInfoRtRackDetailAlarm && systemInfoRtRackDetailAlarm.map((protectItem, index) => (
            <div
              key={`${protectItem.alarm_item}-${index}`}
              className='w-full h-[44px] sm:h-[42px] p-[18px] pt-6 sm:p-[12px] sm:pt-[18px] flex items-center'>
              <span className={cn('mr-[10px] rounded-full h-[12px] w-[12px] flex-shrink-0', `bg-${getDotStyle(protectItem.level)}`)}></span>
              <span className='text-[14px] leading-[14px] font-light'>{protectItem.alarm_item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
