import React, { useMemo, useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';

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

const ChargingDetailTable: React.FC = () => {
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleDetail | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const tooltipText = '집합건물 내 충전기를 이용 중인 차량(충전 커넥터 체결된 차량)을 의미하며 해당 차량의 충전 상태 정보를 제공';

    const handleMouseMove = (event: React.MouseEvent) => {
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const data = useMemo(() => [
        { id: '17도5374', chargerType: '충전중', status: 'Bad', soc: '35%', temp: '62°C', voltage: '4.31V', current: '55.2 Ah', chargingTime: '18분', totalChargingTime: '48분' },
        { id: '79루2801', chargerType: '충전중', status: 'Normal', soc: '48%', temp: '31°C', voltage: '4.21V', current: '8.1 Ah', chargingTime: '2시간 14분', totalChargingTime: '4시간 22분' },
        { id: '62카1619', chargerType: '충전완료', status: 'Good', soc: '62%', temp: '29°C', voltage: '4.18V', current: '-', chargingTime: '3시간 47분', totalChargingTime: '2시간 29분' },
        { id: '36바7539', chargerType: '충전완료', status: 'Normal', soc: '28%', temp: '37°C', voltage: '4.25V', current: '-', chargingTime: '55분', totalChargingTime: '6시간 22분' },
        { id: '67호1145', chargerType: '충전완료', status: 'Normal', soc: '88%', temp: '42°C', voltage: '4.32V', current: '-', chargingTime: '8시간 22분', totalChargingTime: '42분' },
        { id: '81수6017', chargerType: '충전완료', status: 'Normal', soc: '89%', temp: '26°C', voltage: '4.31V', current: '-', chargingTime: '7시간 58분', totalChargingTime: '48분' },
    ], []);

    const columns: Column[] = useMemo(() => [
        { name: '차량번호', dataIndex: 'id', align: TEXT_ALIGN.CENTER },
        { name: '충전진행', dataIndex: 'chargerType', align: TEXT_ALIGN.CENTER },
        { name: '상태정보', dataIndex: 'status', align: TEXT_ALIGN.CENTER },
        { name: 'SOC', dataIndex: 'soc', align: TEXT_ALIGN.CENTER },
        { name: '온도', dataIndex: 'temp', align: TEXT_ALIGN.CENTER },
        { name: '전압', dataIndex: 'voltage', align: TEXT_ALIGN.CENTER },
        { name: '충전전류', dataIndex: 'current', align: TEXT_ALIGN.CENTER },
        { name: '충전시간', dataIndex: 'chargingTime', align: TEXT_ALIGN.CENTER },
        { name: '전체충전시간', dataIndex: 'totalChargingTime', align: TEXT_ALIGN.CENTER },
    ], []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Good': return 'text-green-500';
            case 'Normal': return 'text-yellow-500';
            case 'Bad': return 'text-red-500';
            default: return '';
        }
    };

    const handleRowClick = (item: any) => {
        setSelectedVehicle({
            unitNumber: '202동 1002호',
            owner: '김영식',
            contact: '010-4827-7782',
            chargingStatus: item.chargerType,
            vehicleType: 'EV6',
            vehicleNumber: item.id,
            batteryStatus: item.status,
            batteryHealth: item.soc
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
                충전 현황 세부
            </h3>

            {showTooltip && (
                <div 
                    className="fixed bg-white text-gray-500 px-4 py-2.5 rounded text-sm pointer-events-none max-w-[300px] leading-5"
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
                                    <td key={column.dataIndex} className={`py-2 px-1.5 text-${column.align} ${column.dataIndex === 'status' ? getStatusColor(item.status) : ''}`}>
                                        {item[column.dataIndex as keyof typeof item]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedVehicle && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-hw-dark-2 p-4 rounded-lg border border-white w-[400px]">
                        <h2 className="text-white text-xl mb-4 flex items-center">
                            <span className="mr-2">🚙</span> 차량정보
                        </h2>
                        <div className="grid grid-cols-2 gap-2 text-white">
                            <div className="bg-gray-700 p-2 rounded">
                                <div className="text-gray-400 text-sm">동/호수</div>
                                <div>{selectedVehicle.unitNumber}</div>
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <div className="text-gray-400 text-sm">차주</div>
                                <div>{selectedVehicle.owner}</div>
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <div className="text-gray-400 text-sm">연락처</div>
                                <div>{selectedVehicle.contact}</div>
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <div className="text-gray-400 text-sm">차량 상태정보</div>
                                <div>{selectedVehicle.chargingStatus}</div>
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <div className="text-gray-400 text-sm">차종</div>
                                <div>{selectedVehicle.vehicleType}</div>
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <div className="text-gray-400 text-sm">차량번호</div>
                                <div>{selectedVehicle.vehicleNumber}</div>
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <div className="text-gray-400 text-sm">배터리 상태정보</div>
                                <div>{selectedVehicle.batteryStatus}</div>
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <div className="text-gray-400 text-sm">배터리 안전지수</div>
                                <div>{selectedVehicle.batteryHealth}</div>
                            </div>
                        </div>
                        <button onClick={closePopup} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChargingDetailTable;