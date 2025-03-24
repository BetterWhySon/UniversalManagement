import React, { useState } from 'react';
import DiagPieChart from '@/components/charts/DiagPieGraph';
import ChargingStatusPage from '@/pages/dashboard/pages/ChargingStatusPage';
import { TEXT_ALIGN } from '@/enums/table';
import useChargingStore from '@/api/chargingStore';

interface ChargingData {
  status: 'good' | 'normal' | 'bad';
  id: string;
  soc: string;
  voltage: string;
  current: string;
  chargingType: string;
  chargingStatus: string;
  startTime: string;
  endTime: string;
}

const ChargingSummary: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<'good' | 'normal' | 'bad' | null>(null);
    const setSelectedStatusStore = useChargingStore((state) => state.setSelectedStatus);
    const setSelectedChargingType = useChargingStore((state) => state.setSelectedChargingType);

    const chargingStatusData = [
        { name: '충전중', value: 2, itemStyle: { color: '#93C5FD' } },
        { name: '충전완료', value: 4, itemStyle: { color: '#BBF7D0' } }
    ];

    const chargingTypeData = [
        { name: '완속충전', value: 1, itemStyle: { color: '#93C5FD' } },
        { name: '급속충전', value: 5, itemStyle: { color: '#F4B183' } }
    ];

    const mockData: ChargingData[] = [
        { status: 'good', id: 'CH001', soc: '85%', voltage: '48.2V', current: '10.5A', chargingType: '급속충전', chargingStatus: '충전중', startTime: '2024.04.01 09:30', endTime: '2024.04.01 10:30' },
        { status: 'good', id: 'CH002', soc: '92%', voltage: '49.1V', current: '9.8A', chargingType: '급속충전', chargingStatus: '충전완료', startTime: '2024.04.01 08:15', endTime: '2024.04.01 09:15' },
        { status: 'normal', id: 'CH003', soc: '75%', voltage: '47.5V', current: '11.2A', chargingType: '완속충전', chargingStatus: '충전중', startTime: '2024.04.01 10:00', endTime: '2024.04.01 11:00' },
        { status: 'normal', id: 'CH004', soc: '68%', voltage: '46.8V', current: '10.1A', chargingType: '급속충전', chargingStatus: '충전완료', startTime: '2024.04.01 07:45', endTime: '2024.04.01 08:45' },
        { status: 'normal', id: 'CH005', soc: '82%', voltage: '48.0V', current: '9.5A', chargingType: '급속충전', chargingStatus: '충전완료', startTime: '2024.04.01 11:30', endTime: '2024.04.01 12:30' },
        { status: 'bad', id: 'CH006', soc: '45%', voltage: '44.2V', current: '7.2A', chargingType: '급속충전', chargingStatus: '충전중', startTime: '2024.04.01 12:00', endTime: '2024.04.01 13:00' }
    ];

    const columns = [
        { name: '기기ID', dataIndex: 'id', align: TEXT_ALIGN.CENTER },
        { name: 'SOC', dataIndex: 'soc', align: TEXT_ALIGN.CENTER },
        { name: '전압', dataIndex: 'voltage', align: TEXT_ALIGN.CENTER },
        { name: '전류', dataIndex: 'current', align: TEXT_ALIGN.CENTER },
        { name: '충전타입', dataIndex: 'chargingType', align: TEXT_ALIGN.CENTER },
        { name: '충전상태', dataIndex: 'chargingStatus', align: TEXT_ALIGN.CENTER },
        { name: '시작시간', dataIndex: 'startTime', align: TEXT_ALIGN.CENTER },
        { name: '종료시간', dataIndex: 'endTime', align: TEXT_ALIGN.CENTER }
    ];

    const handleStatusClick = (status: 'good' | 'normal' | 'bad') => {
        setSelectedStatus(status);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedStatus(null);
    };

    const handlePieClick = (status: string) => {
        setSelectedStatusStore(status);
    };

    const handleChargingTypeClick = (type: string) => {
        setSelectedChargingType(type);
    };

    const filteredData = mockData.filter(item => item.status === selectedStatus);

    return (
        <div className="bg-[#2B313B] p-2 rounded-lg h-full flex flex-col relative">
            <h3 className="text-white text-lg mb-3">충전 현황 요약</h3>
            <div className="flex-grow flex items-center">
                <div className="w-3/4 flex justify-start pl-8 space-x-4 mb-2">
                    <div className="flex flex-col items-center">
                        <div className="w-44 h-44 mb-1 rounded-full">
                            <DiagPieChart 
                                datas={chargingStatusData} 
                                radius={['35%', '85%']} 
                                labelColor="#404040"
                                onClick={(params) => {
                                    handlePieClick(params.name);
                                }}
                            />
                        </div>
                        <div className="flex text-base justify-center">
                            {chargingStatusData.map((item, index) => (
                                <div key={index} className="flex items-center mx-2">
                                    <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.itemStyle.color }}></span>
                                    <span className="text-gray-300">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-44 h-44 mb-1 rounded-full">
                            <DiagPieChart 
                                datas={chargingTypeData} 
                                radius={['35%', '85%']} 
                                labelColor="#404040"
                                onClick={(params) => {
                                    handleChargingTypeClick(params.name);
                                }}
                            />
                        </div>
                        <div className="flex text-base justify-center">
                            {chargingTypeData.map((item, index) => (
                                <div key={index} className="flex items-center mx-2">
                                    <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.itemStyle.color }}></span>
                                    <span className="text-gray-300">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/4 flex flex-col justify-center items-start space-y-4 -mt-4 -ml-4">
                    <div 
                        className="w-32 h-11 border rounded flex items-center justify-between px-3 cursor-pointer hover:bg-blue-900 transition-colors"
                        onClick={() => handleStatusClick('good')}
                        style={{ borderColor: '#8AA8DA' }}
                    >
                        <span style={{ color: '#8AA8DA' }} className="text-xl">Good</span>
                        <span className="text-white text-xl">1</span>
                    </div>
                    <div 
                        className="w-32 h-11 border rounded flex items-center justify-between px-3 cursor-pointer hover:bg-green-900 transition-colors"
                        onClick={() => handleStatusClick('normal')}
                        style={{ borderColor: '#A9D18E' }}
                    >
                        <span style={{ color: '#A9D18E' }} className="text-xl">Normal</span>
                        <span className="text-white text-xl">4</span>
                    </div>
                    <div
                        className="w-32 h-11 border rounded flex items-center justify-between px-3 cursor-pointer hover:bg-red-900 transition-colors"
                        onClick={() => handleStatusClick('bad')}
                        style={{ borderColor: '#FF6969' }}
                    >
                        <span style={{ color: '#FF6969' }} className="text-xl">Bad</span>
                        <span className="text-white text-xl">1</span>
                    </div>
                </div>
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
                            <ChargingStatusPage status={selectedStatus || 'bad'} />
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
        </div>
    );
};

export default ChargingSummary;