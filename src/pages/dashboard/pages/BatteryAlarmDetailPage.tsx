import React, { useMemo, useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import BatteryInfoModal from '../components/subComponents/BatteryInfoModal';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';

interface BatteryAlarmData {
  id: number;
  batteryStatus: string;
  soc: string;
  temp: string;
  voltage: string;
  energy: string;
  level: string;
  alarmContent: string;
  occurrenceTime: string;
  status: string;
}

const pagination = {
  total: 0,
  pageSize: 13,
};

const BatteryAlarmDetailPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [showBatteryInfo, setShowBatteryInfo] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string>('');

  const data = useMemo(() => [
    { id: 1, batteryStatus: '좋음', soc: '44%', temp: '28°C', voltage: '4.22v', energy: '48kWh', level: '알람1', alarmContent: '고온', occurrenceTime: '24.09.02. 14:28:55', status: '방전중' },
    { id: 2, batteryStatus: '보통', soc: '72%', temp: '26°C', voltage: '4.18v', energy: '76kWh', level: '알람1', alarmContent: '과전류', occurrenceTime: '24.09.01 19:11:08', status: '충전중' },
    { id: 3, batteryStatus: '보통', soc: '28%', temp: '32°C', voltage: '4.19v', energy: '28kWh', level: '알람1', alarmContent: '전압편차', occurrenceTime: '24.09.03 08:32:47', status: '오프라인' },
    { id: 4, batteryStatus: '보통', soc: '72%', temp: '26°C', voltage: '4.18v', energy: '76kWh', level: '알람1', alarmContent: '과전류', occurrenceTime: '24.09.01 19:11:08', status: '충전중' },
    { id: 5, batteryStatus: '보통', soc: '28%', temp: '32°C', voltage: '4.19v', energy: '28kWh', level: '알람1', alarmContent: '전압편차', occurrenceTime: '24.09.03 08:32:47', status: '오프라인' },
  ], []);

  const columns = useMemo(() => [
    { 
      name: '기기명', 
      dataIndex: 'id', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '150px',
    },
    { 
      name: '배터리상태', 
      dataIndex: 'batteryStatus', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '130px',
    },
    { 
      name: 'SOC', 
      dataIndex: 'soc', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '100px',
    },
    { 
      name: '온도', 
      dataIndex: 'temp', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '100px',
    },
    { 
      name: '전압', 
      dataIndex: 'voltage', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '100px',
    },
    { 
      name: '에너지', 
      dataIndex: 'energy', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '100px',
    },
    { 
      name: 'level', 
      dataIndex: 'level', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '100px',
    },
    { 
      name: '알람내용', 
      dataIndex: 'alarmContent', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '130px',
    },
    { 
      name: '발생시점', 
      dataIndex: 'occurrenceTime', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '150px',
    },
    { 
      name: '상태정보', 
      dataIndex: 'status', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '130px',
    },
  ], []);

  const handleDeviceClick = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setShowBatteryInfo(true);
  };

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            배터리 알람 세부
          </h1>
        </div>
      </div>

      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        {/* PC DATA TABLE */}
        <div className='w-full hidden xs:block'>
          <TableData<BatteryAlarmData>
            data={data}
            columns={columns}
            isPagination
            pagination={pagination}
            paginationMarginTop='32px'
            emptyMessage={trans('데이터가 없습니다.')}
          />
        </div>

        {/* MOBILE DATA TABLE */}
        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 구현 */}
        </div>
      </div>

      {showBatteryInfo && (
        <BatteryInfoModal 
          deviceId={selectedDevice}
          onClose={() => setShowBatteryInfo(false)}
        />
      )}
    </div>
  );
};

export default BatteryAlarmDetailPage; 