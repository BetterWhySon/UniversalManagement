import React from 'react';
import DiagPieChart from '@/components/charts/DiagPieGraph';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/path';

const ChargingSummary: React.FC = () => {
  const navigate = useNavigate();

  const chargingStatusData = [
    { name: '충전중', value: 2, itemStyle: { color: '#60A5FA' } },
    { name: '충전완료', value: 4, itemStyle: { color: '#4ADE80' } }
  ];

  const chargingTypeData = [
    { name: '완속충전', value: 1, itemStyle: { color: '#FBBF24' } },
    { name: '급속충전', value: 5, itemStyle: { color: '#F87171' } }
  ];

  const handleBadClick = () => {
    navigate(PATH.DASHBOARD.CHARGING_SUMMARY);
  };

  return (
    <div className="bg-hw-dark-2 p-3 rounded-lg border border-white h-full flex flex-col">
      <h3 className="text-white text-lg mb-3">충전 현황 요약</h3>
      <div className="flex-grow flex items-center">
        <div className="w-3/4 flex justify-center space-x-8 mb-2">
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 mb-2">
              <DiagPieChart datas={chargingStatusData} />
            </div>
            <div className="flex text-[11px] justify-center">
              {chargingStatusData.map((item, index) => (
                <div key={index} className="flex items-center mx-2">
                  <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.itemStyle.color }}></span>
                  <span className="text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 mb-2">
              <DiagPieChart datas={chargingTypeData} />
            </div>
            <div className="flex text-[11px] justify-center">
              {chargingTypeData.map((item, index) => (
                <div key={index} className="flex items-center mx-2">
                  <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.itemStyle.color }}></span>
                  <span className="text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/4 flex flex-col justify-center items-center space-y-6">
          <div className="w-24 h-9 border border-blue-500 rounded flex items-center justify-between px-2">
            <span className="text-blue-500">Good</span>
            <span className="text-white">1</span>
          </div>
          <div className="w-24 h-9 border border-green-500 rounded flex items-center justify-between px-2">
            <span className="text-green-500">Normal</span>
            <span className="text-white">4</span>
          </div>
          <div 
            className="w-24 h-9 border border-red-500 rounded flex items-center justify-between px-2 cursor-pointer hover:bg-red-900 transition-colors"
            onClick={handleBadClick}
          >
            <span className="text-red-500">Bad</span>
            <span className="text-white">1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingSummary;