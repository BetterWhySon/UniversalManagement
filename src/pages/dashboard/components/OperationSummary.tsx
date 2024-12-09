import React, { useState } from 'react';
import DiagRingChart from '@/components/charts/DiagRingGraph';
import LineChart from '@/components/charts/LineChart';
import OperationModal from './subComponents/OperationModal';
import GroupDischargeStatus from './GroupDischargeStatus';

const OperationSummary: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showGroupView, setShowGroupView] = useState(false);

  if (showGroupView) {
    return <GroupDischargeStatus onSwitchView={() => setShowGroupView(false)} />;
  }

  const totalVehicles = {
    value: 200,
    label: '관리대수'
  };

  const activeVehicles = {
    value: 182,
    label: '실시간 사용대수'
  };

  const weeklyData = {
    labels: ['22', '23', '24', '25', '26', '27', '28'],
    data: [176, 166, 168, 172, 179, 188, 182]
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-white h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white inline-block"
          onClick={() => setIsModalOpen(true)}
        >
          운영 현황
        </h3>
        <button 
          className="bg-blue-700 text-white px-4 py-1 rounded"
          onClick={() => setShowGroupView(true)}
        >
          그룹별
        </button>
      </div>
      
      <div className="flex h-[calc(100%-2rem)]">
        {/* 왼쪽: 두 개의 파이 차트 */}
        <div className="flex-[1.2] flex items-center justify-around">
          <div className="flex flex-col items-center">
            <div className="w-36 h-36">
              <DiagRingChart 
                value={100} 
                color="#94A3B8"
                label={totalVehicles.value.toString()}
              />
            </div>
            <span className="text-white mt-2">{totalVehicles.label}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-36 h-36">
              <DiagRingChart 
                value={91} 
                color="#86EFAC"
                label={activeVehicles.value.toString()}
              />
            </div>
            <span className="text-white mt-2">{activeVehicles.label}</span>
          </div>
        </div>

        {/* 오른쪽: 라인 그래프 */}
        <div className="flex-[0.8] relative">
          <div className="text-gray-400 text-sm ml-8 absolute">※ 최근 1주일 사용대수</div>
          <div className="h-full">
            <LineChart 
              labels={weeklyData.labels}
              data={weeklyData.data}
            />
          </div>
        </div>
      </div>

      <OperationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default OperationSummary; 