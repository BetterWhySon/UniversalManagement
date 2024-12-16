import React, { useMemo, useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import BatteryInfoModal from './subComponents/BatteryInfoModal';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';

interface Column {
  name: string;
  dataIndex: string;
  align: TEXT_ALIGN;
}

const BatteryAlarmDetail: React.FC = () => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<{ key: string; order: 'asc' | 'desc' }>();
  const [showBatteryInfo, setShowBatteryInfo] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string>('');

  const data = useMemo(() => [
    { id: '48라1187', batteryStatus: '좋음', soc: '44%', temp: '28°C', voltage: '4.22v', energy: '48kWh', level: '알람1', alarmContent: '고온', occurrenceTime: '24.09.02. 14:28:55', status: '방전중' },
    { id: '32거9469', batteryStatus: '보통', soc: '72%', temp: '26°C', voltage: '4.18v', energy: '76kWh', level: '알람1', alarmContent: '과전류', occurrenceTime: '24.09.01 19:11:08', status: '충전중' },
    { id: '28도8823', batteryStatus: '보통', soc: '28%', temp: '32°C', voltage: '4.19v', energy: '28kWh', level: '알람1', alarmContent: '전압편차', occurrenceTime: '24.09.03 08:32:47', status: '오프라인' },
    { id: '32거9469', batteryStatus: '보통', soc: '72%', temp: '26°C', voltage: '4.18v', energy: '76kWh', level: '알람1', alarmContent: '과전류', occurrenceTime: '24.09.01 19:11:08', status: '충전중' },
    { id: '28도8823', batteryStatus: '보통', soc: '28%', temp: '32°C', voltage: '4.19v', energy: '28kWh', level: '알람1', alarmContent: '전압편차', occurrenceTime: '24.09.03 08:32:47', status: '오프라인' },
  ], []);

  const columns: Column[] = useMemo(() => [
    { name: '기기명', dataIndex: 'id', align: TEXT_ALIGN.CENTER },
    { name: '배터리상태', dataIndex: 'batteryStatus', align: TEXT_ALIGN.CENTER },
    { name: 'SOC', dataIndex: 'soc', align: TEXT_ALIGN.CENTER },
    { name: '온도', dataIndex: 'temp', align: TEXT_ALIGN.CENTER },
    { name: '전압', dataIndex: 'voltage', align: TEXT_ALIGN.CENTER },
    { name: '에너지', dataIndex: 'energy', align: TEXT_ALIGN.CENTER },
    { name: 'level', dataIndex: 'level', align: TEXT_ALIGN.CENTER },
    { name: '알람내용', dataIndex: 'alarmContent', align: TEXT_ALIGN.CENTER },
    { name: '발생시점', dataIndex: 'occurrenceTime', align: TEXT_ALIGN.CENTER },
    { name: '상태정보', dataIndex: 'status', align: TEXT_ALIGN.CENTER },
  ], []);

  const sortedData = useMemo(() => {
    if (!sortConfig?.key || !sortConfig?.order) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];

      // 숫자 단위가 포함된 컬럼들 (SOC, 온도, 전압, 에너지)
      if (['soc', 'temp', 'voltage', 'energy'].includes(sortConfig.key)) {
        const aNum = parseFloat(String(aValue).replace(/[^0-9.-]/g, ''));
        const bNum = parseFloat(String(bValue).replace(/[^0-9.-]/g, ''));
        return sortConfig.order === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // 날짜 컬럼 (발생시점)
      if (sortConfig.key === 'occurrenceTime') {
        const aDate = new Date(aValue.replace(/\./g, '-'));
        const bDate = new Date(bValue.replace(/\./g, '-'));
        return sortConfig.order === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
      }

      // 문자열 컬럼들 (기기명, 배터리상태, level, 알람내용, 상태정보)
      return sortConfig.order === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(prevConfig => ({
      key,
      order: prevConfig?.key === key && prevConfig?.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDeviceClick = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setShowBatteryInfo(true);
  };

  const handleReset = () => {
    setSortConfig(undefined);
  };

  const handleTitleClick = () => {
    navigate(PATH.DASHBOARD.BATTERY_ALARM_DETAIL);
  };

  return (
    <div className="bg-slate-800 p-2 rounded-lg border border-white h-full flex flex-col relative">
      <div className="flex items-center gap-2 py-1 px-3 mb-1">
        <h3 
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white inline-block"
          onClick={handleTitleClick}
        >
          배터리 알람 세부
        </h3>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="w-full text-[14px] font-light">
          <thead>
            <tr className="bg-gray-700">
              {columns.map((column) => (
                <th 
                  key={column.dataIndex} 
                  className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                  onClick={() => handleSort(column.dataIndex)}
                >
                  <div className="flex items-center justify-center gap-1">
                    {column.name}
                    {sortConfig?.key === column.dataIndex && (
                      <span className="text-xs">
                        {sortConfig.order === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-600 text-white">
                {columns.map((column) => (
                  <td 
                    key={column.dataIndex} 
                    className={`py-2 px-1.5 text-${column.align} ${column.dataIndex === 'id' ? 'cursor-pointer hover:text-blue-400' : ''}`}
                    onClick={() => column.dataIndex === 'id' && handleDeviceClick(item.id)}
                  >
                    {item[column.dataIndex as keyof typeof item]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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

export default BatteryAlarmDetail;