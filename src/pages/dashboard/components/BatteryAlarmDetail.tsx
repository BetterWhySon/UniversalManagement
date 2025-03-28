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
  const [showPopup, setShowPopup] = useState(false);
  const [alarmFilter, setAlarmFilter] = useState<'전체알람' | '이상알람' | '관리알람'>('전체알람');

  const data = useMemo(() => [
    { status: '사용중', id: '48라1187', soc: '44%', voltage: '4.22v', current: '12.5A', batteryTemp: '28°C', systemTemp: '32°C', alarmType: '위험', alarmContent: '고온', occurrenceTime: '24.09.02 14:28', confirmed: '미확인' },
    { status: '충전중', id: '32거9469', soc: '72%', voltage: '4.18v', current: '15.2A', batteryTemp: '26°C', systemTemp: '29°C', alarmType: '경고', alarmContent: '과전류', occurrenceTime: '24.09.01 19:11', confirmed: '확인' },
    { status: '오프라인', id: '28도8823', soc: '28%', voltage: '3.89v', current: '0.0A', batteryTemp: '22°C', systemTemp: '25°C', alarmType: '경고', alarmContent: '전압편차', occurrenceTime: '24.09.03 08:32', confirmed: '미확인' },
    { status: '사용대기', id: '65마2231', soc: '95%', voltage: '4.12v', current: '0.2A', batteryTemp: '24°C', systemTemp: '27°C', alarmType: '위험', alarmContent: '시스템 과열', occurrenceTime: '24.09.04 10:15', confirmed: '확인' },
    { status: '충전중', id: '41거7712', soc: '38%', voltage: '4.05v', current: '18.4A', batteryTemp: '29°C', systemTemp: '33°C', alarmType: '경고', alarmContent: '충전 이상', occurrenceTime: '24.09.05 16:42', confirmed: '미확인' },
    { status: '사용중', id: '57다5591', soc: '52%', voltage: '4.08v', current: '10.7A', batteryTemp: '31°C', systemTemp: '35°C', alarmType: '위험', alarmContent: '과방전', occurrenceTime: '24.09.06 09:17', confirmed: '미확인' },
    { status: '사용대기', id: '19나3344', soc: '87%', voltage: '4.15v', current: '0.3A', batteryTemp: '25°C', systemTemp: '28°C', alarmType: '관리', alarmContent: '점검 필요', occurrenceTime: '24.09.04 13:25', confirmed: '확인' },
    { status: '오프라인', id: '33하7281', soc: '15%', voltage: '3.75v', current: '0.0A', batteryTemp: '23°C', systemTemp: '26°C', alarmType: '관리', alarmContent: '배터리 교체', occurrenceTime: '24.09.07 11:05', confirmed: '미확인' },
    { status: '사용중', id: '71가8234', soc: '63%', voltage: '4.16v', current: '11.8A', batteryTemp: '27°C', systemTemp: '31°C', alarmType: '위험', alarmContent: '과전류', occurrenceTime: '24.09.08 15:42', confirmed: '미확인' },
    { status: '충전중', id: '25다6147', soc: '55%', voltage: '4.10v', current: '16.7A', batteryTemp: '30°C', systemTemp: '34°C', alarmType: '경고', alarmContent: '온도 상승', occurrenceTime: '24.09.09 08:55', confirmed: '확인' },
    { status: '사용대기', id: '59마4521', soc: '92%', voltage: '4.20v', current: '0.1A', batteryTemp: '24°C', systemTemp: '27°C', alarmType: '관리', alarmContent: '정기 점검', occurrenceTime: '24.09.10 11:30', confirmed: '미확인' },
    { status: '오프라인', id: '83버9172', soc: '8%', voltage: '3.65v', current: '0.0A', batteryTemp: '21°C', systemTemp: '24°C', alarmType: '위험', alarmContent: '저전압', occurrenceTime: '24.09.11 14:15', confirmed: '미확인' },
    { status: '사용중', id: '37라5829', soc: '41%', voltage: '4.02v', current: '13.2A', batteryTemp: '29°C', systemTemp: '33°C', alarmType: '경고', alarmContent: '전류 불안정', occurrenceTime: '24.09.12 09:20', confirmed: '확인' },
    { status: '충전중', id: '62하1458', soc: '67%', voltage: '4.14v', current: '17.5A', batteryTemp: '28°C', systemTemp: '32°C', alarmType: '위험', alarmContent: '과충전', occurrenceTime: '24.09.13 16:35', confirmed: '미확인' },
    { status: '사용대기', id: '94거3672', soc: '88%', voltage: '4.17v', current: '0.2A', batteryTemp: '25°C', systemTemp: '28°C', alarmType: '관리', alarmContent: '소프트웨어 업데이트', occurrenceTime: '24.09.14 10:45', confirmed: '확인' },
    { status: '오프라인', id: '15마7823', soc: '22%', voltage: '3.82v', current: '0.0A', batteryTemp: '22°C', systemTemp: '25°C', alarmType: '위험', alarmContent: '통신 오류', occurrenceTime: '24.09.15 13:50', confirmed: '미확인' },
    { status: '사용중', id: '76다4291', soc: '58%', voltage: '4.11v', current: '11.2A', batteryTemp: '30°C', systemTemp: '34°C', alarmType: '경고', alarmContent: '방전 이상', occurrenceTime: '24.09.16 08:25', confirmed: '확인' },
    { status: '충전중', id: '23나8156', soc: '34%', voltage: '3.98v', current: '16.1A', batteryTemp: '27°C', systemTemp: '31°C', alarmType: '위험', alarmContent: '셀 불균형', occurrenceTime: '24.09.17 15:10', confirmed: '미확인' },
    { status: '사용대기', id: '51하6374', soc: '96%', voltage: '4.21v', current: '0.3A', batteryTemp: '23°C', systemTemp: '26°C', alarmType: '관리', alarmContent: '센서 캘리브레이션', occurrenceTime: '24.09.18 11:40', confirmed: '확인' },
    { status: '오프라인', id: '89가1547', soc: '12%', voltage: '3.71v', current: '0.0A', batteryTemp: '21°C', systemTemp: '24°C', alarmType: '위험', alarmContent: '시스템 셧다운', occurrenceTime: '24.09.19 14:05', confirmed: '미확인' }
  ], []);

  const columns: Column[] = useMemo(() => [
    { name: '상태정보', dataIndex: 'status', align: TEXT_ALIGN.CENTER },
    { name: '기기명', dataIndex: 'id', align: TEXT_ALIGN.CENTER },
    { name: 'SOC', dataIndex: 'soc', align: TEXT_ALIGN.CENTER },
    { name: '전압', dataIndex: 'voltage', align: TEXT_ALIGN.CENTER },
    { name: '전류', dataIndex: 'current', align: TEXT_ALIGN.CENTER },
    { name: '배터리 온도', dataIndex: 'batteryTemp', align: TEXT_ALIGN.CENTER },
    { name: '시스템 온도', dataIndex: 'systemTemp', align: TEXT_ALIGN.CENTER },
    { name: '알람구분', dataIndex: 'alarmType', align: TEXT_ALIGN.CENTER },
    { name: '알람내용', dataIndex: 'alarmContent', align: TEXT_ALIGN.CENTER },
    { name: '발생시점', dataIndex: 'occurrenceTime', align: TEXT_ALIGN.CENTER },
    { name: '확인여부', dataIndex: 'confirmed', align: TEXT_ALIGN.CENTER },
  ], []);

  const sortedData = useMemo(() => {
    if (!sortConfig?.key || !sortConfig?.order) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];

      // 숫자 단위가 포함된 컬럼들 (SOC, 전압, 전류, 온도)
      if (['soc', 'voltage', 'current', 'batteryTemp', 'systemTemp'].includes(sortConfig.key)) {
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

      // 문자열 컬럼들 (상태정보, 기기명, 알람구분, 알람내용, 확인여부)
      return sortConfig.order === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    if (alarmFilter === '전체알람') return sortedData;
    if (alarmFilter === '이상알람') return sortedData.filter(item => ['경고', '위험'].includes(item.alarmType));
    if (alarmFilter === '관리알람') return sortedData.filter(item => item.alarmType === '관리');
    return sortedData;
  }, [sortedData, alarmFilter]);

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

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const getColumnWidth = (column: Column, isPopup: boolean): string => {
    if (!isPopup) {  // 대시보드에서의 열 너비 설정
      switch (column.dataIndex) {
        case 'status':
          return '55px';
        case 'id':
          return '70px';
        case 'soc':
          return '40px';
        case 'voltage':
        case 'current':
          return '50px';
        case 'batteryTemp':
        case 'systemTemp':
          return '70px';
        case 'alarmType':
          return '45px';
        case 'alarmContent':
          return '65px';
        case 'occurrenceTime':
          return '85px';
        case 'confirmed':
          return '55px';
        default:
          return '50px';
      }
    }

    // 팝업에서의 열 너비 설정
    switch (column.dataIndex) {
      case 'status':
        return '130px';
      case 'id':
        return '150px';
      case 'soc':
        return '100px';
      case 'voltage':
      case 'current':
        return '120px';
      case 'batteryTemp':
      case 'systemTemp':
        return '130px';
      case 'alarmType':
        return '120px';
      case 'alarmContent':
        return '180px';
      case 'occurrenceTime':
        return '150px';
      case 'confirmed':
        return '120px';
      default:
        return '120px';
    }
  };

  return (
    <div className="bg-[#2B313B] p-2 rounded-lg h-full flex flex-col relative">
      <div className="flex items-center justify-between py-1 px-3 mb-1">
        <h3 
          className={`text-white text-lg ${!showPopup ? 'cursor-pointer hover:text-blue-400' : ''} border-b border-white/20 border-b-[0.5px] inline-block`}
          onClick={() => !showPopup && setShowPopup(true)}
        >
          알람된 배터리 실시간 상태정보
        </h3>
        <select 
          className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={alarmFilter}
          onChange={(e) => setAlarmFilter(e.target.value as any)}
        >
          <option value="전체알람">전체알람</option>
          <option value="이상알람">이상알람</option>
          <option value="관리알람">관리알람</option>
        </select>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="w-full text-[12px] font-light relative table-fixed">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-700">
              {columns.map((column) => (
                <th 
                  key={column.dataIndex} 
                  className="py-2 px-0.5 text-center text-white cursor-pointer hover:bg-gray-600 whitespace-nowrap"
                  style={{ width: getColumnWidth(column, false) }}
                  onClick={() => handleSort(column.dataIndex)}
                >
                  <div className="flex items-center justify-center gap-0">
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
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-600 text-white">
                {columns.map((column) => (
                  <td 
                    key={column.dataIndex} 
                    className={`py-2 px-0.5 text-${column.align} whitespace-nowrap ${column.dataIndex === 'id' ? 'cursor-pointer hover:text-blue-400 underline' : ''} ${
                      column.dataIndex === 'status' ? (
                        item.status === '사용대기' ? 'text-[#FFD03B]' : 
                        item.status === '방전 중' ? 'text-[#6CFF31]' : 
                        item.status === '사용중' ? 'text-[#6CFF31]' : 
                        item.status === '충전중' ? 'text-[#8AA8DA]' : 
                        item.status === '오프라인' ? 'text-[#A1A1A1]' : 
                        ''
                      ) : column.dataIndex === 'alarmType' ? (
                        item.alarmType === '경고' ? 'text-[#F4B183]' : 
                        item.alarmType === '위험' ? 'text-[#FF3535]' : 
                        item.alarmType === '관리' ? 'text-[#FFE699]' : 
                        ''
                      ) : ''
                    } ${column.dataIndex === 'confirmed' ? (item.confirmed === '미확인' ? 'text-red-400' : 'text-green-400') : ''}`}
                    style={{ width: getColumnWidth(column, false) }}
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

      {showPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
          onClick={handleClosePopup}
        >
          <div 
            className="bg-hw-dark-1 rounded-lg w-[90%] h-[85vh] overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 px-[24px] lg:px-[45px] pt-4 lg:pt-5 pb-4">
              <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-6'>
                <h1 className='w-full text-hw-white-1 text-[24px] font-normal leading-4 lg:text-2xl lg:leading-none'>
                  알람된 배터리 실시간 상태정보
                </h1>
              </div>
            </div>
            <div className="flex-grow overflow-auto px-[24px] lg:px-[45px] pb-[80px]">
              <table className="w-full text-[16px] font-light relative">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gray-700">
                    {columns.map((column) => (
                      <th 
                        key={column.dataIndex} 
                        className="py-2.5 px-8 text-center text-white cursor-pointer hover:bg-gray-600 whitespace-nowrap"
                        style={{ width: getColumnWidth(column, true) }}
                        onClick={() => handleSort(column.dataIndex)}
                      >
                        <div className="flex items-center justify-center gap-1 text-[16px]">
                          {column.name}
                          {sortConfig?.key === column.dataIndex && (
                            <span className="text-xs ml-1">
                              {sortConfig.order === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-600 text-white">
                      {columns.map((column) => (
                        <td 
                          key={column.dataIndex} 
                          className={`py-2.5 px-8 text-${column.align} whitespace-nowrap ${column.dataIndex === 'id' ? 'cursor-pointer hover:text-blue-400 underline' : ''} ${
                            column.dataIndex === 'status' ? (
                              item.status === '사용대기' ? 'text-[#FFD03B]' : 
                              item.status === '방전 중' ? 'text-[#6CFF31]' : 
                              item.status === '사용중' ? 'text-[#6CFF31]' : 
                              item.status === '충전중' ? 'text-[#8AA8DA]' : 
                              item.status === '오프라인' ? 'text-[#A1A1A1]' : 
                              ''
                            ) : column.dataIndex === 'alarmType' ? (
                              item.alarmType === '경고' ? 'text-[#F4B183]' : 
                              item.alarmType === '위험' ? 'text-[#FF3535]' : 
                              item.alarmType === '관리' ? 'text-[#FFE699]' : 
                              ''
                            ) : ''
                          } ${column.dataIndex === 'confirmed' ? (item.confirmed === '미확인' ? 'text-red-400' : 'text-green-400') : ''}`}
                          style={{ width: getColumnWidth(column, true) }}
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
            <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-hw-dark-1 flex items-center justify-end px-5 border-t border-gray-700/50">
              <button 
                onClick={handleClosePopup}
                className="bg-gray-700 text-gray-300 px-7 py-2.5 rounded hover:bg-gray-600 transition-colors text-[16px]"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatteryAlarmDetail;