import React, { useState } from 'react';
import DiagRingChart from '@/components/charts/DiagRingGraph';
import LineChart from '@/components/charts/LineChart';
import OperationModal from './subComponents/OperationModal';
import GroupDischargeStatus from './GroupDischargeStatus';

const OperationSummary: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showGroupView, setShowGroupView] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);

  if (showGroupView) {
    return <GroupDischargeStatus onSwitchView={() => setShowGroupView(false)} />;
  }

  const totalVehicles = {
    value: selectedOption === 1 ? 1800 : 
          selectedOption === 2 ? 2.0 : 200,
    label: selectedOption === 1 ? '목표 방전시간' : 
          selectedOption === 2 ? '적정 방전량' : '전체대수',
    unit: selectedOption === 1 ? 'H' : 
          selectedOption === 2 ? '만KW' : ''
  };

  const activeVehicles = {
    value: selectedOption === 1 ? 258 : 
          selectedOption === 2 ? 0.4 : 182,
    label: selectedOption === 1 ? '방전시간 누계' : 
          selectedOption === 2 ? '실제 방전량 누계' : '실시간 사용대수',
    unit: selectedOption === 1 ? 'H' : 
          selectedOption === 2 ? '만KW' : ''
  };

  const weeklyData = {
    labels: ['22', '23', '24', '25', '26', '27', '28'],
    data: selectedOption === 1 ? [240, 245, 255, 250, 258, 252, 258] :
          selectedOption === 2 ? [0.35, 0.38, 0.42, 0.39, 0.4, 0.41, 0.4] :
          [176, 166, 168, 172, 179, 188, 182]
  };

  return (
    <div className="bg-slate-800 p-3 rounded-lg border border-white/20 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white/20 inline-block"
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
                color="#93C5FD"
                label={totalVehicles.value.toString()}
                unit={totalVehicles.unit}
              />
            </div>
            <span className="text-white mt-2">{totalVehicles.label}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-36 h-36">
              <DiagRingChart 
                value={91} 
                color="#BBF7D0"
                label={activeVehicles.value.toString()}
                unit={activeVehicles.unit}
              />
            </div>
            <span className="text-white mt-2">{activeVehicles.label}</span>
          </div>
        </div>

        {/* 오른쪽: 라인 그래프 */}
        <div className="flex-[0.8] relative">
          <div className="text-gray-400 text-sm ml-8 absolute">
            ※ 최근 1주일 {
              selectedOption === 1 ? '방전시간' : 
              selectedOption === 2 ? '방전에너지' : 
              '사용대수'
            }
          </div>
          <div className="h-full">
            <LineChart 
              labels={weeklyData.labels}
              data={weeklyData.data}
              yAxisFormatter={
                selectedOption === 2 ? (value: number) => `${value}만KW` :
                selectedOption === 1 ? (value: number) => `${value}H` :
                (value: number) => `${value}대`
              }
              height={200}
              showGrid={true}
              yAxisMin={
                selectedOption === 2 ? 0 :  // 방전에너지
                selectedOption === 1 ? 200 : // 방전시간
                150  // 사용대수
              }
              yAxisMax={
                selectedOption === 2 ? 0.5 :  // 방전에너지
                selectedOption === 1 ? 300 :  // 방전시간
                250  // 사용대수
              }
            />
          </div>
        </div>
      </div>

      <OperationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
      />
    </div>
  );
};

export default OperationSummary; 