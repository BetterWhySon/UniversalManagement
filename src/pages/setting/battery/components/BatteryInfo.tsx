import React from 'react';
import BarChart from '@/components/charts/BarChart';
import DiagPieChart from '@/components/charts/DiagPieChart';

const BatteryInfo: React.FC = () => {
  // 배터리 용량 데이터
  const batteryCapacityData = [
    { id: '공칭', soc: 182 },
    { id: '운영', soc: 184 },
    { id: '실제', soc: 189 }
  ];

  // 셀 용량 분포 데이터
  const cellCapacityData = [
    { id: '188.70', soc: 2 },
    { id: '189.30', soc: 7 },
    { id: '189.70', soc: 34 },
    { id: '190.20', soc: 16 },
    { id: '190.70', soc: 24 },
    { id: '191.20', soc: 11 },
    { id: '191.70', soc: 5 }
  ];

  // 배터리 밸런스 데이터
  const batteryBalanceData = [
    {
      name: '셀 25번',
      data: [
        { id: '0', soc: 100 },
        { id: '0.2', soc: 99.2 },
        { id: '0.4', soc: 0 },
        { id: '0.6', soc: 1.5 }
      ],
      color: '#60A5FA'
    }
  ];

  // 전체 구간 셀 밸런스 데이터
  const cellBalanceData = [
    { id: '0', soc: 1.25 },
    { id: '0.2', soc: 1.21 },
    { id: '0.4', soc: 1.09 },
    { id: '0.6', soc: 0.82 },
    { id: '0.8', soc: 0.92 },
    { id: '1', soc: 0.95 }
  ];

  // 셀 저항 상태 데이터
  const cellResistanceData = [
    { id: '0.2407', soc: 1 },
    { id: '0.2409', soc: 3 },
    { id: '0.2411', soc: 38 },
    { id: '0.2413', soc: 32 },
    { id: '0.2415', soc: 18 },
    { id: '0.2417', soc: 4 },
    { id: '0.2419', soc: 3 }
  ];

  // 셀 저항변화 추세 데이터
  const cellResistanceTrendData = [
    {
      name: '라인1',
      data: [
        { id: '2019', soc: 0.8 },
        { id: '2020', soc: 0.85 },
        { id: '2021', soc: 0.9 },
        { id: '2022', soc: 1.1 },
        { id: '2023', soc: 1.0 },
        { id: '2024', soc: 1.05 }
      ],
      color: '#60A5FA'
    },
    {
      name: '라인2',
      data: [
        { id: '2019', soc: 0.7 },
        { id: '2020', soc: 0.75 },
        { id: '2021', soc: 0.85 },
        { id: '2022', soc: 0.9 },
        { id: '2023', soc: 0.95 },
        { id: '2024', soc: 1.0 }
      ],
      color: '#FFFFFF'
    },
    {
      name: '라인3',
      data: [
        { id: '2019', soc: 0.6 },
        { id: '2020', soc: 0.65 },
        { id: '2021', soc: 0.8 },
        { id: '2022', soc: 0.85 },
        { id: '2023', soc: 0.9 },
        { id: '2024', soc: 0.95 }
      ],
      color: '#EF4444'
    }
  ];

  // SOC 구간별 셀 밸런스 데이터 추가
  const socBalanceData = [
    { id: '0', soc: 5.5 },
    { id: '0.2', soc: 5.2 },
    { id: '0.4', soc: 3.6 },
    { id: '0.6', soc: 2.1 },
    { id: '0.8', soc: 0.8 },
    { id: '1', soc: 2.4 }
  ];

  return (
    <div className="grid grid-cols-[18fr_8fr_21fr] gap-4 -mt-2 auto-rows-[200px]">
      {/* 실제 사용가능 배터리 용량 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 h-[200px] flex flex-col">
        <h3 className="text-white text-lg mb-3">실제 사용가능 배터리 용량</h3>
        <div className="grid grid-cols-5 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400">실제 사용가능 배터리 용량</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-green-400 text-xl">189ah</div>
              <div className="text-green-400 text-l">&nbsp;</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">셀 평균 노화</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">0.2%</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">셀 용량 편차</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">0.5%</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">셀 SOC 편차</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">1.2%</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">저항</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">0.1%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 배터리 용량 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
        <h3 className="text-white text-lg mb-2">배터리 용량</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={batteryCapacityData}
            grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
            backgroundColor="transparent"
            showGrid={false}
            hideYAxis={true}
            isVertical={true}
            chartType="bar"
            showTooltip={false}
            tMargin={15}
          />
        </div>
      </div>

      {/* 셀용량 상세 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
        <h3 className="text-white text-lg mb-2">셀용량 상세</h3>
        <div className="flex h-[calc(100%-40px)]">
          {/* 텍스트 영역 - 왼쪽으로 이동 */}
          <div className="w-1/2 flex flex-col justify-center gap-1 my-8 pl-4 pr-8">
            <div className="flex justify-between items-center">
              <span className="text-white">· 셀 평균 용량</span>
              <span className="text-yellow-300">190.14Ah</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">· 셀 최대 용량</span>
              <span className="text-yellow-300">191.21Ah [4번Cell]</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">· 셀 최소 용량</span>
              <span className="text-yellow-300">188.76Ah [89번Cell]</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">· 셀 평균 용량 편차</span>
              <span className="text-yellow-300">0.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">· 셀 최대 용량 편차</span>
              <span className="text-yellow-300">0.7%</span>
            </div>
          </div>
          
          {/* 차트 영역 - 오른쪽으로 이동 */}
          <div className="w-1/2 h-full">
            <BarChart 
              data={cellCapacityData}
              grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
              backgroundColor="transparent"
              showGrid={false}
              hideYAxis={true}
              isVertical={true}
              chartType="both"
              showTooltip={false}
              tMargin={15}
            />
          </div>
        </div>
      </div>

      {/* 배터리 팩 밸런스 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
        <h3 className="text-white text-lg mb-3">배터리 팩 밸런스</h3>
        <div className="grid grid-cols-3 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400">팩 100% 기준 전압 편차</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">0.4%</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">팩 0% 기준 전��� 편차</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">0.8%</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">용량 손실률 (진행 편차)</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">1.2%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 배터리 밸런스 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-lg mb-2">배터리 밸런스</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={batteryBalanceData}
            grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
            backgroundColor="transparent"
            showGrid={false}
            hideYAxis={true}
            isVertical={true}
            chartType="multiLine"
            showTooltip={false}
            tMargin={15}
          />
        </div>
      </div>

      {/* 전체 구간 셀 밸런스 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-lg mb-2">전체 구간 셀 밸런스</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={cellBalanceData}
            grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
            backgroundColor="transparent"
            showGrid={false}
            hideYAxis={true}
            isVertical={true}
            chartType="both"
            showTooltip={false}
            tMargin={15}
            showValue={true}
          />
        </div>
      </div>

      {/* 배터리 저항 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 h-[200px] flex flex-col">
        <h3 className="text-white text-lg mb-3">배터리 저항</h3>
        <div className="grid grid-cols-5 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">셀 평균저항</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">24.10mΩ</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">최대 셀 저항</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">24.13mΩ</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">최소 셀 저항</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">24.07mΩ</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">셀평균 저항편차</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">0.02mΩ</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">셀최대 저항편차</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">0.06mΩ</div>
            </div>
          </div>
        </div>
      </div>

      {/* 셀 저항 상태 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
        <h3 className="text-white text-lg mb-2">셀 저항 상태</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={cellResistanceData}
            grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
            backgroundColor="transparent"
            showGrid={false}
            hideYAxis={true}
            isVertical={true}
            chartType="both"
            showTooltip={false}
            tMargin={15}
          />
        </div>
      </div>

      {/* 셀 저항변화 추세 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
        <h3 className="text-white text-lg mb-2">셀 저항변화 추세</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={cellResistanceTrendData}
            grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
            backgroundColor="transparent"
            showGrid={false}
            hideYAxis={true}
            isVertical={true}
            chartType="multiLine"
            showTooltip={false}
            tMargin={15}
          />
        </div>
      </div>

      {/* 네 번째 로우 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 h-[200px] flex flex-col">
        <h3 className="text-white text-lg mb-3">셀 용량</h3>
        <div className="grid grid-cols-5 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">셀 평균용량</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">105.4Ah</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">최대 셀 용량</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">105.4Ah</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">최소 셀 용량</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">105.2Ah</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">셀평균 용량편차</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">0.2Ah</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 whitespace-nowrap">셀최대 용량편차</div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <div className="text-white text-xl">0.2Ah</div>
            </div>
          </div>
        </div>
      </div>

      {/* 네 번째 로우 - 두 번째 칸 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
        <h3 className="text-white text-lg mb-2">SOC 구간별 셀 밸런스</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={socBalanceData}
            grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
            backgroundColor="transparent"
            showGrid={false}
            hideYAxis={true}
            isVertical={true}
            chartType="multiLine"
            showTooltip={false}
            tMargin={15}
            showValue={true}
          />
        </div>
      </div>

      {/* 네 번째 로우 - 세 번째 칸 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
        <h3 className="text-white text-lg mb-2">셀별용량 유지율 / 셀별 가용 용량 / 셀별 공칭 저항 / 셀별 현재 저항</h3>
        <div className="h-[calc(100%-40px)] overflow-y-auto">
          <div className="grid grid-cols-[repeat(16,35px)] gap-1 p-2">
            {Array(196).fill(null).map((_, index) => (
              <div 
                key={index} 
                className={`relative w-[32px] h-[32px] rounded ${index === 5 ? 'bg-yellow-500' : 'bg-green-500'}`}
              >
                <div className="absolute top-0.5 left-0.5 text-[8px] text-white font-bold">#{index + 1}</div>
                <div className="absolute bottom-0.5 right-0.5 text-[8px] text-white font-bold">105.4</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryInfo; 