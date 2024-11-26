import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BatteryAlarmCard from './BatteryAlarmCard';

interface AlarmData {
  id: number;
  dong: string;
  ho: string;
  carNumber: string;
  name: string;
  phone: string;
  alarmContent: string;
  alarmTime: string;
  elapsedTime: string;
  measurementData: string;
  normalRange: string;
}

export default function BatteryAlarmPage() {
  const [alarmData, setAlarmData] = useState<AlarmData[]>([]);
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    const dummyData: AlarmData[] = [
        {
            id: 1,
            dong: '115동',
            ho: '1804호',
            carNumber: '81수6017',
            name: '김유나',
            phone: '010-8080-898X',
            alarmContent: '모듈온도 고온',
            alarmTime: '4시간 26분',
            measurementData: '62°C',
            normalRange: '18~60°C',
            elapsedTime: '4시간 26분'
        },
        {
            id: 2,
            dong: '103동',
            ho: '509호',
            carNumber: '54모1707',
            name: '류다빈',
            phone: '010-6060-676X',
            alarmContent: '과전류',
            alarmTime: '6시간 33분',
            measurementData: '365A',
            normalRange: '-333A ~ 333A',
            elapsedTime: '6시간 33분'
        },
        {
            id: 3,
            dong: '114동',
            ho: '509호',
            carNumber: '36바7539',
            name: '정윤아',
            phone: '010-8899-001X',
            alarmContent: '전압편차',
            alarmTime: '11시간 18분',
            measurementData: '0.234V',
            normalRange: '0~0.1V',
            elapsedTime: '11시간 18분'
        }
    ];
    setAlarmData(dummyData);
  }, []);

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-5 lg:pt-10 pb-2">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 w-full mb-2 md:mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            {trans('진행중인 배터리 이상알람')}
          </h1>
        </div>
      </div>

      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px] pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alarmData.map((alarm) => (
            <BatteryAlarmCard key={alarm.id} alarm={alarm} />
          ))}
        </div>
      </div>
    </div>
  );
}
