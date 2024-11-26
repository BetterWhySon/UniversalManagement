import React, { useMemo, useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import VehicleDetailPopup from '@/components/popup/VehicleDetailPopup';

interface Column {
  name: string;
  dataIndex: string;
  align: TEXT_ALIGN;
}

interface VehicleDetail {
  unitNumber: string;
  owner: string;
  contact: string;
  chargingStatus: string;
  vehicleType: string;
  vehicleNumber: string;
  batteryStatus: string;
  batteryHealth: string;
}

const BatteryDetailTable: React.FC = () => {
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleDetail | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const tooltipText = '상단의 진행 중인 배터리 이상 알람에 대한 세부 목록으로, 해당 차량의 상태 정보를 제공';

    const handleMouseMove = (event: React.MouseEvent) => {
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const data = useMemo(() => [
        { id: '81수6017', batteryStatus: 'Normal', soc: '0.44', temp: '28°C', voltage: '4.22v', current: '48kWh', level: '알람1', alarmContent: '고온', occurrenceTime: '24.09.02 14:28:55', status: '외부이동' },
        { id: '54모1707', batteryStatus: 'Bad', soc: '0.72', temp: '26°C', voltage: '4.18v', current: '76kWh', level: '알람1', alarmContent: '과전류', occurrenceTime: '24.09.01 19:11:08', status: '외부이동' },
        { id: '36바7539', batteryStatus: 'Bad', soc: '0.28', temp: '32°C', voltage: '4.19v', current: '28kWh', level: '알람1', alarmContent: '전압편차', occurrenceTime: '24.09.03 08:32:47', status: '주차중' },
    ], []);

    const columns: Column[] = useMemo(() => [
        { name: '차량번호', dataIndex: 'id', align: TEXT_ALIGN.CENTER },
        { name: '배터리상태', dataIndex: 'batteryStatus', align: TEXT_ALIGN.CENTER },
        { name: 'SOC', dataIndex: 'soc', align: TEXT_ALIGN.CENTER },
        { name: '온도', dataIndex: 'temp', align: TEXT_ALIGN.CENTER },
        { name: '전압', dataIndex: 'voltage', align: TEXT_ALIGN.CENTER },
        { name: '에너지', dataIndex: 'current', align: TEXT_ALIGN.CENTER },
        { name: 'level', dataIndex: 'level', align: TEXT_ALIGN.CENTER },
        { name: '알람내용', dataIndex: 'alarmContent', align: TEXT_ALIGN.CENTER },
        { name: '발생시점', dataIndex: 'occurrenceTime', align: TEXT_ALIGN.CENTER },
        { name: '상태정보', dataIndex: 'status', align: TEXT_ALIGN.CENTER },
    ], []);

    const handleRowClick = (item: any) => {
        setSelectedVehicle({
            unitNumber: '202동 1002호',
            owner: '김영식',
            contact: '010-4827-7782',
            chargingStatus: '주차중',
            vehicleType: 'EV6',
            vehicleNumber: item.id,
            batteryStatus: 'C+',
            batteryHealth: '88점'
        });
    };

    const closePopup = () => {
        setSelectedVehicle(null);
    };

    return (
        <div className="bg-hw-dark-2 p-2 rounded-lg border border-white h-full flex flex-col relative">
            <h3 
                className="text-white text-lg mb-4 text-left cursor-help"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                배터리 이상알람 세부
            </h3>
            <div className="flex-grow overflow-auto">
                <table className="w-full text-[15px] font-light">
                    <thead>
                        <tr className="bg-gray-700">
                            {columns.map((column) => (
                                <th key={column.dataIndex} className="py-2 px-1.5 text-center">{column.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="border-b border-gray-700 cursor-pointer hover:bg-gray-600" onClick={() => handleRowClick(item)}>
                                {columns.map((column) => (
                                    <td key={column.dataIndex} className={`py-2 px-1.5 text-${column.align}`}>
                                        {item[column.dataIndex as keyof typeof item]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedVehicle && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1100]">
                    <VehicleDetailPopup vehicle={selectedVehicle} onClose={closePopup} />
                </div>
            )}

            {showTooltip && (
                <div 
                    className="fixed bg-white text-gray-500 px-4 py-2.5 rounded text-sm pointer-events-none max-w-[300px] leading-5 whitespace-pre-line"
                    style={{
                        left: `${tooltipPosition.x + 10}px`,
                        top: `${tooltipPosition.y - 40}px`,
                        zIndex: 1000,
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))',
                    }}
                >
                    {tooltipText}
                </div>
            )}
        </div>
    );
};

export default BatteryDetailTable;
