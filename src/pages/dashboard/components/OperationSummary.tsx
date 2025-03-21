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
    <div className="bg-[#2B313B] p-2 rounded-lg h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-4">
        <h3 
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white/20 inline-block"
          onClick={() => setIsModalOpen(true)}
        >
          운영 현황
        </h3>
        <button 
          className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={() => setShowGroupView(true)}
        >
          그룹별
        </button>
      </div>
      
      <div className="flex h-[calc(100%-2rem)]">
        {/* 왼쪽: 링 차트 하나만 표시 */}
        <div className="flex-[0.8] flex items-center justify-center relative">
          <div className="text-gray-400 text-sm absolute -top-2 w-full text-center">
            ※ 선택 : {
              selectedOption === 1 ? '방전시간' : 
              selectedOption === 2 ? '방전에너지' : 
              '실시간 사용대수'
            }
          </div>
          <div className="flex flex-col items-center">
            <div className="w-36 h-36">
              <DiagRingChart 
                value={91} 
                color="#BBF7D0"
                label="53%"
                unit=""
                subLabel="(106대)"
              />
            </div>
            <span className="text-white mt-2">등록대수 200대</span>
          </div>
        </div>

        {/* 오른쪽: 라인 그래프 */}
        <div className="flex-[1.2] relative">
          <div className="text-gray-400 text-sm ml-8 absolute -top-2">
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
              showGrid={false}
              showMinMax={true}
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