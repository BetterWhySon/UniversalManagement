import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';
import useChargingStore from '@/api/chargingStore';

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
}

const ChargingDetail: React.FC = () => {
    const navigate = useNavigate();
    const selectedStatus = useChargingStore((state) => state.selectedStatus);
    const selectedChargingType = useChargingStore((state) => state.selectedChargingType);

    const handleTitleClick = () => {
        navigate(PATH.DASHBOARD.CHARGING_DETAIL);
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
            remainingTime: '48분'
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
            remainingTime: '4시간 22분'
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
            remainingTime: '2시간 29분'
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
            remainingTime: '6시간 22분'
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
            remainingTime: '42분'
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
            remainingTime: '48분'
        }
    ];

    const filteredData = chargingData.filter(item => {
        const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
        
        if (!selectedChargingType) return matchesStatus;

        const current = parseFloat(item.current);
        if (isNaN(current)) return matchesStatus;

        if (selectedChargingType === '급속충전') {
            return matchesStatus && current >= 50;
        } else {
            return matchesStatus && current < 50;
        }
    });

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'Bad':
                return 'text-red-500';
            case 'Good':
                return 'text-blue-500';
            default:
                return 'text-green-500';
        }
    };

    const getStatusColor = (status: string) => {
        return status === '충전완료' ? 'text-gray-400' : 'text-white';
    };

    return (
        <div className="bg-[#2B313B] p-2 rounded-lg h-full flex flex-col relative">
            <div className="flex items-center gap-2 py-1 px-3 mb-1">
                <h3 
                    className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white inline-block"
                    onClick={handleTitleClick}
                >
                    충전 현황 세부
                </h3>
            </div>
            <div className="flex-grow overflow-auto">
                <table className="w-full text-[14px] font-light">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="py-2 px-1.5 text-center text-white">기기명</th>
                            <th className="py-2 px-1.5 text-center text-white">충전진행</th>
                            <th className="py-2 px-1.5 text-center text-white">상태정보</th>
                            <th className="py-2 px-1.5 text-center text-white">SOC</th>
                            <th className="py-2 px-1.5 text-center text-white">온도</th>
                            <th className="py-2 px-1.5 text-center text-white">전압</th>
                            <th className="py-2 px-1.5 text-center text-white">충전전류</th>
                            <th className="py-2 px-1.5 text-center text-white">충전진행시간</th>
                            <th className="py-2 px-1.5 text-center text-white">충전 완료후 경과시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-700 hover:bg-gray-600 text-white"
                            >
                                <td className="py-2 px-1.5 text-center">{item.deviceId}</td>
                                <td className="py-2 px-1.5 text-center">{item.status}</td>
                                <td className={`py-2 px-1.5 text-center ${getConditionColor(item.condition)}`}>{item.condition}</td>
                                <td className="py-2 px-1.5 text-center">{item.soc}</td>
                                <td className="py-2 px-1.5 text-center">{item.temperature}</td>
                                <td className="py-2 px-1.5 text-center">{item.voltage}</td>
                                <td className="py-2 px-1.5 text-center">{item.current}</td>
                                <td className="py-2 px-1.5 text-center">{item.chargingTime}</td>
                                <td className="py-2 px-1.5 text-center">{item.remainingTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChargingDetail; 