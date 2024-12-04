import React from 'react';

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
        <div className="h-full bg-slate-800 rounded-lg border border-white">
            <div className="flex items-center gap-2 p-3 border-b border-gray-600">
                <h3 className="text-white text-lg">충전 현황 세부</h3>
            </div>

            <div className="p-3 overflow-y-auto" style={{ height: 'calc(100% - 45px)' }}>
                <table className="w-full text-white text-sm">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="pb-2 text-left font-normal text-gray-400">기기명</th>
                            <th className="pb-2 text-left font-normal text-gray-400">충전전행</th>
                            <th className="pb-2 text-left font-normal text-gray-400">상태정보</th>
                            <th className="pb-2 text-left font-normal text-gray-400">SOC</th>
                            <th className="pb-2 text-left font-normal text-gray-400">온도</th>
                            <th className="pb-2 text-left font-normal text-gray-400">전압</th>
                            <th className="pb-2 text-left font-normal text-gray-400">충전전류</th>
                            <th className="pb-2 text-left font-normal text-gray-400">충전진행시간</th>
                            <th className="pb-2 text-left font-normal text-gray-400">충전 완료후 경과시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chargingData.map((item, index) => (
                            <tr
                                key={index}
                                className={`border-b border-gray-700 last:border-b-0 hover:bg-slate-700 cursor-pointer ${getStatusColor(item.status)}`}
                            >
                                <td className="py-2">{item.deviceId}</td>
                                <td className="py-2">{item.status}</td>
                                <td className={`py-2 ${getConditionColor(item.condition)}`}>{item.condition}</td>
                                <td className="py-2">{item.soc}</td>
                                <td className="py-2">{item.temperature}</td>
                                <td className="py-2">{item.voltage}</td>
                                <td className="py-2">{item.current}</td>
                                <td className="py-2">{item.chargingTime}</td>
                                <td className="py-2">{item.remainingTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChargingDetail; 