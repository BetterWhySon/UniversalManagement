import React from 'react';
import BarChart from '@/components/charts/BarChart';

const LifeManagement: React.FC = () => {
  // ESS018 데이터
  const ess018Data = [
    { id: '2019', soc: 105 },
    { id: '2020', soc: 103 },
    { id: '2021', soc: 102 },
    { id: '2022', soc: 99 },
    { id: '2023', soc: 98 },
    { id: '2024', soc: 96 }
  ];

  // ESS 평균 데이터
  const essAverageData = [
    { id: '2019', soc: 105 },
    { id: '2020', soc: 101 },
    { id: '2021', soc: 99 },
    { id: '2022', soc: 96 },
    { id: '2023', soc: 93 },
    { id: '2024', soc: 90 }
  ];

  // 배터리 예상수명 데이터
  const batteryLifeData = [
    {
      name: 'ESS018',
      data: [
        { id: 'T1', soc: 100 },
        { id: 'T2', soc: 98 },
        { id: 'T3', soc: 97 },
        { id: 'T4', soc: 95 },
        { id: 'T5', soc: 94 },
        { id: '현재', soc: 92 },
        { id: 'D1', soc: 90 },
        { id: 'D2', soc: 88 },
        { id: 'D3', soc: 87 },
        { id: 'D4', soc: 85 },
        { id: 'D5', soc: 84 },
        { id: 'D6', soc: 82 },
        { id: 'D7', soc: 80 },
        { id: 'D14', soc: 78 }
      ],
      color: '#FFFFFF'
    },
    {
      name: 'ESS 평균',
      data: [
        { id: 'T1', soc: 85 },
        { id: 'T2', soc: 83 },
        { id: 'T3', soc: 81 },
        { id: 'T4', soc: 80 },
        { id: 'T5', soc: 78 },
        { id: '현재', soc: 76 },
        { id: 'D1', soc: 74 },
        { id: 'D2', soc: 72 },
        { id: 'D3', soc: 70 },
        { id: 'D4', soc: 68 },
        { id: 'D5', soc: 66 },
        { id: 'D6', soc: 64 },
        { id: 'D7', soc: 62 },
        { id: 'D14', soc: 60 }
      ],
      color: '#4ADE80'
    },
    {
      name: '스트레스 관리',
      data: [
        { id: 'T1', soc: 115 },
        { id: 'T2', soc: 113 },
        { id: 'T3', soc: 112 },
        { id: 'T4', soc: 110 },
        { id: 'T5', soc: 108 },
        { id: '현재', soc: 106 },
        { id: 'D1', soc: 104 },
        { id: 'D2', soc: 102 },
        { id: 'D3', soc: 100 },
        { id: 'D4', soc: 98 },
        { id: 'D5', soc: 96 },
        { id: 'D6', soc: 94 },
        { id: 'D7', soc: 92 },
        { id: 'D14', soc: 90 }
      ],
      color: '#FF0000'
    }
  ];

  // 배터리 종합성능 지수 데이터
  const batteryPerformanceData = [
    {
      name: 'ESS018',
      data: [
        { id: '2019', soc: 105 },
        { id: '2020', soc: 103 },
        { id: '2021', soc: 102 },
        { id: '2022', soc: 99 },
        { id: '2023', soc: 98 },
        { id: '2024', soc: 96 }
      ],
      color: '#FFFFFF'  // 흰색 라인
    },
    {
      name: 'ESS 평균',
      data: [
        { id: '2019', soc: 105 },
        { id: '2020', soc: 101 },
        { id: '2021', soc: 99 },
        { id: '2022', soc: 96 },
        { id: '2023', soc: 93 },
        { id: '2024', soc: 90 }
      ],
      color: '#4ADE80'  // 초록색 라인
    }
  ];

  return (
    <div className="grid grid-cols-[18fr_8fr_21fr] gap-4 -mt-2">
      {/* 수명정보 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-3">수명정보</h3>
        <div className="grid grid-cols-4 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400">운영기간</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">886h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">예상 진존수명</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">285h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">가속조건 진존수명</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">305h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">우호건 진존수명</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">296h</div>
            </div>
          </div>
        </div>
      </div>

      {/* 평균 대비 수명/에너지 비교 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">평균 대비 수명/에너지 비교</h3>
        <div className="text-sm text-gray-300 px-4">
          <p>배터리의 총 예상 수명은 68개월로, 전체 관리 대상 배터리 중 상위 28%에 달합니다. 또한, 에너지 소모 기준으로는 42,658kWh로 상위 33%에 속해, 성능 면에서 우수한 수준을 보여줍니다.</p>
        </div>
      </div>

      {/* 배터리 예상수명 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">배터리 예상수명</h3>
        <div className="flex h-[calc(100%-40px)]">
          {/* 차트 영역 */}
          <div className="flex-1 h-full">
            <BarChart 
              data={batteryLifeData}
              grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
              backgroundColor="transparent"
              showGrid={false}
              hideYAxis={true}
              isVertical={true}
              chartType="multiLine"
              showTooltip={false}
            />
          </div>
          
          {/* 텍스트 영역 */}
          <div className="w-44 flex flex-col justify-center gap-3 pl-1">
            <div className="flex flex-col text-center">
              <span className="text-white">예상 진존수명</span>
              <span className="text-yellow-300">49.0M / 32,876Wh</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-white">스트레스 관리 충족</span>
              <span className="text-yellow-300">12% 연장</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-white">스트레스 관리 난발</span>
              <span className="text-yellow-300">11% 단축</span>
            </div>
          </div>
        </div>
      </div>

      {/* 배터리 종합성능 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-3">배터리 종합성능</h3>
        <div className="grid grid-cols-3 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400">배터리 종합성능</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">886h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">에너지 효율</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">285h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">배터리 효율</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">305h</div>
            </div>
          </div>
        </div>
      </div>

      {/* 충전 파워 % */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">충전 파워 %</h3>
        <div className="text-sm text-gray-300 px-4">
          <p>배터리는 종합 성능 점수 102점으로, 관리 대상 배터리 중 상위 26%에 속합니다. 에너지 효율 96%로 상위 21%에 해당해 효율 면에서도 우수한 성능을 나타냅니다.</p>
        </div>
      </div>

      {/* 배터리 종합성능 지수 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">배터리 종합성능 지수</h3>
        <div className="flex h-[calc(100%-40px)]">
          {/* 차트 영역 */}
          <div className="flex-1 h-full">
            <BarChart 
              data={batteryPerformanceData}
              grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
              backgroundColor="transparent"
              showGrid={false}
              hideYAxis={true}
              isVertical={true}
              chartType="multiLine"
              showTooltip={false}
            />
          </div>
          
          {/* 텍스트 영역 */}
          <div className="w-44 flex flex-col justify-center gap-3 pl-1">
            <div className="flex flex-col text-center">
              <span className="text-white">ESS018</span>
              <span className="text-yellow-300">96점</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-white">ESS 평균</span>
              <span className="text-yellow-300">90점</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeManagement; 