import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';
import useChargingStore from '@/api/chargingStore';
import ChargingDetailPage from '@/pages/dashboard/pages/ChargingDetailPage';
import BatteryInfoModal from './subComponents/BatteryInfoModal';

interface ChargingStatus {
    deviceId: string;
    status: string;
    condition: 'Bad' | 'Normal' | 'Good';
    soc: string;
    temperature: string;
    voltage: string;
    current: string;
    chargingTime: string;
    remainingTime: string;
    chargingType: '급속충전' | '완속충전';
}

const ChargingDetail: React.FC = () => {
    const navigate = useNavigate();
    const selectedStatus = useChargingStore((state) => state.selectedStatus);
    const selectedChargingType = useChargingStore((state) => state.selectedChargingType);
    const setSelectedStatusStore = useChargingStore((state) => state.setSelectedStatus);
    const setSelectedChargingType = useChargingStore((state) => state.setSelectedChargingType);
    const [sortConfig, setSortConfig] = useState<{ key: string; order: 'asc' | 'desc' }>();
    const [showPopup, setShowPopup] = useState(false);
    const [showBatteryInfo, setShowBatteryInfo] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string>('');

    const handleTitleClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleCloseBatteryInfo = () => {
        setShowBatteryInfo(false);
    };

    const handleDeviceClick = (deviceId: string) => {
        setSelectedDevice(deviceId);
        setShowBatteryInfo(true);
    };

    const handleResetFilters = () => {
        setSelectedStatusStore(null);
        setSelectedChargingType(null);
    };

    const handleSort = (key: string) => {
        setSortConfig(prevConfig => ({
            key,
            order: prevConfig?.key === key && prevConfig?.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const chargingData: ChargingStatus[] = [
        {
            deviceId: '배터리1호',
            status: '충전중',
            condition: 'Bad',
            soc: '35%',
            temperature: '38 °C',
            voltage: '4.31V',
            current: '55.2Ah',
            chargingTime: '18분',
            remainingTime: '48분',
            chargingType: '급속충전'
        },
        {
            deviceId: '배터리2호',
            status: '충전중',
            condition: 'Normal',
            soc: '48%',
            temperature: '31 °C',
            voltage: '4.21V',
            current: '8.1Ah',
            chargingTime: '2시간 14분',
            remainingTime: '4시간 22분',
            chargingType: '완속충전'
        },
        {
            deviceId: '배터리3호',
            status: '충전중',
            condition: 'Good',
            soc: '62%',
            temperature: '29 °C',
            voltage: '4.18V',
            current: '6.8Ah',
            chargingTime: '3시간 47분',
            remainingTime: '2시간 29분',
            chargingType: '완속충전'
        },
        {
            deviceId: '배터리4호',
            status: '충전중',
            condition: 'Normal',
            soc: '28%',
            temperature: '37 °C',
            voltage: '4.25V',
            current: '7.2Ah',
            chargingTime: '55분',
            remainingTime: '6시간 22분',
            chargingType: '완속충전'
        },
        {
            deviceId: '배터리5호',
            status: '충전완료',
            condition: 'Normal',
            soc: '88%',
            temperature: '42 °C',
            voltage: '4.32V',
            current: '-',
            chargingTime: '8시간 22분',
            remainingTime: '42분',
            chargingType: '급속충전'
        },
        {
            deviceId: '배터리6호',
            status: '충전완료',
            condition: 'Normal',
            soc: '89%',
            temperature: '26 °C',
            voltage: '4.31V',
            current: '-',
            chargingTime: '7시간 58분',
            remainingTime: '48분',
            chargingType: '급속충전'
        }
    ];

    // 선택된 필터에 따라 데이터 필터링
    let filteredData = chargingData;

    // 상태 필터 적용 (첫 번째 차트)
    if (selectedStatus) {
        filteredData = chargingData.filter(item => item.status === selectedStatus);
    }

    // 충전 타입 필터 적용 (두 번째 차트)
    if (selectedChargingType) {
        filteredData = chargingData.filter(item => {
            if (item.current === '-') return false;
            const currentValue = parseFloat(item.current.replace('Ah', ''));
            return selectedChargingType === '급속충전' ? currentValue >= 50 : currentValue < 50;
        });
    }

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'Bad':
                return 'text-[#FF6969]';
            case 'Good':
                return 'text-[#8AA8DA]';
            default:
                return 'text-[#A9D18E]';
        }
    };

    const getStatusColor = (status: string) => {
        return status === '충전완료' ? 'text-[#BBF7D0]' : 'text-[#93C5FD]';
    };

    const convertTimeToMinutes = (time: string): string => {
        const hours = time.match(/(\d+)시간/);
        const minutes = time.match(/(\d+)분/);
        let totalMinutes = 0;
        
        if (hours) totalMinutes += parseInt(hours[1]) * 60;
        if (minutes) totalMinutes += parseInt(minutes[1]);
        
        return `${totalMinutes}분`;
    };

    const sortedData = useMemo(() => {
        if (!sortConfig?.key || !sortConfig?.order) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key as keyof typeof a];
            const bValue = b[sortConfig.key as keyof typeof b];

            // SOC, 온도, 전압, 전류 등 숫자 단위가 포함된 컬럼들
            if (['soc', 'temperature', 'voltage', 'current'].includes(sortConfig.key)) {
                const aNum = parseFloat(String(aValue).replace(/[^0-9.-]/g, ''));
                const bNum = parseFloat(String(bValue).replace(/[^0-9.-]/g, ''));
                return sortConfig.order === 'asc' ? aNum - bNum : bNum - aNum;
            }

            // 시간 관련 컬럼들
            if (['chargingTime', 'remainingTime'].includes(sortConfig.key)) {
                const aMinutes = parseInt(aValue.replace('분', ''));
                const bMinutes = parseInt(bValue.replace('분', ''));
                return sortConfig.order === 'asc' ? aMinutes - bMinutes : bMinutes - aMinutes;
            }

            // 문자열 컬럼들
            return sortConfig.order === 'asc'
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
    }, [filteredData, sortConfig]);

    return (
        <div className="bg-[#2B313B] p-2 rounded-lg h-full flex flex-col relative">
            <div className="flex items-center gap-2 py-1 px-3 mb-1">
                <h3 
                    className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white/20 border-b-[0.5px] inline-block"
                    onClick={handleTitleClick}
                >
                    충전 현황 세부
                </h3>
                <button
                    onClick={handleResetFilters}
                    className="px-2 py-0.5 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                >
                    전체보기
                </button>
            </div>
            <div className="flex-grow overflow-auto">
                <table className="w-full text-[12px] font-light relative">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-gray-700">
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('condition')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    스트레스
                                    {sortConfig?.key === 'condition' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('deviceId')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    기기명
                                    {sortConfig?.key === 'deviceId' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    충전진행
                                    {sortConfig?.key === 'status' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('soc')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    SOC
                                    {sortConfig?.key === 'soc' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('temperature')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    온도
                                    {sortConfig?.key === 'temperature' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('voltage')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    전압
                                    {sortConfig?.key === 'voltage' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('current')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    충전전류
                                    {sortConfig?.key === 'current' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('chargingTime')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    진행시간
                                    {sortConfig?.key === 'chargingTime' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('remainingTime')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    잔여시간
                                    {sortConfig?.key === 'remainingTime' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="py-2 px-1.5 text-center text-white cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSort('remainingTime')}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    경과시간
                                    {sortConfig?.key === 'remainingTime' && (
                                        <span className="text-xs">
                                            {sortConfig.order === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-700 hover:bg-gray-600 text-white"
                            >
                                <td className={`py-2 px-1.5 text-center ${getConditionColor(item.condition)}`}>{item.condition}</td>
                                <td 
                                    className="py-2 px-1.5 text-center cursor-pointer hover:text-blue-400 underline"
                                    onClick={() => handleDeviceClick(item.deviceId)}
                                >
                                    {item.deviceId}
                                </td>
                                <td className={`py-2 px-1.5 text-center ${getStatusColor(item.status)}`}>{item.status}</td>
                                <td className="py-2 px-1.5 text-center">{item.soc}</td>
                                <td className="py-2 px-1.5 text-center">{item.temperature}</td>
                                <td className="py-2 px-1.5 text-center">{item.voltage}</td>
                                <td className="py-2 px-1.5 text-center">{item.current}</td>
                                <td className="py-2 px-1.5 text-center">{convertTimeToMinutes(item.chargingTime)}</td>
                                <td className="py-2 px-1.5 text-center">{convertTimeToMinutes(item.remainingTime)}</td>
                                <td className="py-2 px-1.5 text-center">{convertTimeToMinutes(item.remainingTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleClosePopup}
                >
                    <div 
                        className="bg-gray-800 rounded-lg w-[90%] h-[90vh] overflow-hidden relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-[90vh] overflow-auto">
                            <ChargingDetailPage />
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <button 
                                onClick={handleClosePopup}
                                className="bg-gray-700 text-gray-300 px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showBatteryInfo && (
                <BatteryInfoModal 
                    deviceId={selectedDevice}
                    onClose={handleCloseBatteryInfo}
                />
            )}
        </div>
    );
};

export default ChargingDetail; 