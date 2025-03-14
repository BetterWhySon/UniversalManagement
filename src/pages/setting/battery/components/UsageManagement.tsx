import React from 'react';
import DiagPieChart from '@/components/charts/DiagPieGraph';
import BarChart from '@/components/charts/BarChart';

const UsageManagement: React.FC = () => {
  // 운영시간 % 데이터
  const operationTimeData = [
    { name: '방전', value: 37, itemStyle: { color: '#8AA8DA' } },
    { name: '충전', value: 39, itemStyle: { color: '#A9D18E' } },
    { name: '미사용', value: 24, itemStyle: { color: '#A1A1A1' } }
  ];

  // 방전 % 데이터
  const dischargeData = [
    { name: '고속방전', value: 22, itemStyle: { color: '#8AA8DA' } },
    { name: '저속방전', value: 78, itemStyle: { color: '#A9D18E' } }
  ];

  // 충전 % 데이터
  const chargeData = [
    { name: '고속충전', value: 17, itemStyle: { color: '#8AA8DA' } },
    { name: '저속충전', value: 83, itemStyle: { color: '#A9D18E' } }
  ];

  // 방전 파워 % 데이터
  const dischargePowerData = [
    { id: '정격최대', soc: 8.4, style: { color: '#8AA8DA' } },
    { id: '실제최대', soc: 8.4, style: { color: '#A9D18E' } },
    { id: '적정Power', soc: 6.2, style: { color: '#8AA8DA' } },
    { id: '평균Power', soc: 6.2, style: { color: '#A9D18E' } }
  ];

  // 충전 파워 % 데이터
  const chargePowerData = [
    { id: '정격최대', soc: 8.4, style: { color: '#8AA8DA' } },
    { id: '실제최대', soc: 8.4, style: { color: '#A9D18E' } },
    { id: '적정Power', soc: 6.2, style: { color: '#8AA8DA' } },
    { id: '평균Power', soc: 6.2, style: { color: '#A9D18E' } }
  ];

  // 최근 방전시간(h) 데이터
  const dischargeTimeData = [
    { id: 'D1', soc: 780, itemStyle: { color: '#8AA8DA' } },
    { id: 'D2', soc: 20, itemStyle: { color: '#8AA8DA' } },
    { id: 'D3', soc: 14, itemStyle: { color: '#8AA8DA' } },
    { id: 'D4', soc: 18, itemStyle: { color: '#8AA8DA' } },
    { id: 'D5', soc: 350, itemStyle: { color: '#8AA8DA' } },
    { id: 'D6', soc: 840, itemStyle: { color: '#8AA8DA' } },
    { id: 'D7', soc: 2405, itemStyle: { color: '#8AA8DA' } },
    { id: 'D8', soc: 18, itemStyle: { color: '#8AA8DA' } },
    { id: 'D9', soc: 17, itemStyle: { color: '#8AA8DA' } },
    { id: 'D10', soc: 18, itemStyle: { color: '#8AA8DA' } },
    { id: 'D11', soc: 1450, itemStyle: { color: '#8AA8DA' } },
    { id: 'D12', soc: 17, itemStyle: { color: '#8AA8DA' } },
    { id: 'D13', soc: 18, itemStyle: { color: '#8AA8DA' } },
    { id: 'D14', soc: 20, itemStyle: { color: '#8AA8DA' } }
  ];

  // 적정 SOC 방전비율 데이터
  const socDischargeData = [
    { id: '~10%', soc: 0, itemStyle: { color: '#8AA8DA' } },
    { id: '~20%', soc: 0, itemStyle: { color: '#8AA8DA' } },
    { id: '~30%', soc: 0, itemStyle: { color: '#8AA8DA' } },
    { id: '~40%', soc: 0, itemStyle: { color: '#8AA8DA' } },
    { id: '~50%', soc: 20, itemStyle: { color: '#8AA8DA' } },
    { id: '~60%', soc: 35, itemStyle: { color: '#8AA8DA' } },
    { id: '~70%', soc: 55, itemStyle: { color: '#8AA8DA' } },
    { id: '~80%', soc: 75, itemStyle: { color: '#8AA8DA' } },
    { id: '~90%', soc: 45, itemStyle: { color: '#8AA8DA' } },
    { id: '~100%', soc: 15, itemStyle: { color: '#8AA8DA' } }
  ];

  // 최근 충전시간(h) 데이터
  const chargeTimeData = [
    { id: 'D1', soc: 420, itemStyle: { color: '#8AA8DA' } },
    { id: 'D2', soc: 1250, itemStyle: { color: '#8AA8DA' } },
    { id: 'D3', soc: 380, itemStyle: { color: '#8AA8DA' } },
    { id: 'D4', soc: 25, itemStyle: { color: '#8AA8DA' } },
    { id: 'D5', soc: 18, itemStyle: { color: '#8AA8DA' } },
    { id: 'D6', soc: 1680, itemStyle: { color: '#8AA8DA' } },
    { id: 'D7', soc: 950, itemStyle: { color: '#8AA8DA' } },
    { id: 'D8', soc: 480, itemStyle: { color: '#8AA8DA' } },
    { id: 'D9', soc: 1850, itemStyle: { color: '#8AA8DA' } },
    { id: 'D10', soc: 320, itemStyle: { color: '#8AA8DA' } },
    { id: 'D11', soc: 28, itemStyle: { color: '#8AA8DA' } },
    { id: 'D12', soc: 1450, itemStyle: { color: '#8AA8DA' } },
    { id: 'D13', soc: 680, itemStyle: { color: '#8AA8DA' } },
    { id: 'D14', soc: 1250, itemStyle: { color: '#8AA8DA' } }
  ];

  // 방전시 Power % 데이터
  const dischargePowerTimeData = [
    { id: '0~20%', soc: 46, itemStyle: { color: '#8AA8DA' } },
    { id: '20~40%', soc: 45, itemStyle: { color: '#8AA8DA' } },
    { id: '40~60%', soc: 9, itemStyle: { color: '#8AA8DA' } },
    { id: '60~80%', soc: 0, itemStyle: { color: '#8AA8DA' } },
    { id: '80~100%', soc: 0, itemStyle: { color: '#8AA8DA' } }
  ];

  // 충전시 Power % 데이터
  const chargePowerTimeData = [
    { id: '0~20%', soc: 38, itemStyle: { color: '#8AA8DA' } },
    { id: '20~40%', soc: 42, itemStyle: { color: '#8AA8DA' } },
    { id: '40~60%', soc: 20, itemStyle: { color: '#8AA8DA' } },
    { id: '60~80%', soc: 0, itemStyle: { color: '#8AA8DA' } },
    { id: '80~100%', soc: 0, itemStyle: { color: '#8AA8DA' } }
  ];

  return (
    <div className="grid grid-cols-[17fr_9fr_21fr] gap-4 -mt-2">
      {/* 첫 번째 로우 - 운영시간 정보 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-3">운영시간 정보</h3>
        <div className="grid grid-cols-4 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400">운영 시간</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">886h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">방전 시간</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">285h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">충전 시간</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">305h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">미사용시간</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">296h</div>
            </div>
          </div>
        </div>
      </div>

      {/* 운영시간 % */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-1">운영시간 %</h3>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center h-full">
            <div className="flex flex-col text-[11px] justify-center pl-2 w-20">
              {operationTimeData.map((item, index) => (
                <div key={index} className="flex items-center mb-1">
                  <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: item.itemStyle.color }}></span>
                  <span className="text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
            <div className="flex-1 h-full flex items-center justify-center">
              <div className="w-[150px] h-[150px]">
                <DiagPieChart 
                  datas={operationTimeData} 
                  radius={['25%', '90%']}
                  itemGap={4}
                  labelColor="#404040"
                  labelSize={19}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 방전시간(h) */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">최근 방전시간(h)</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={dischargeTimeData}
            grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
            backgroundColor="transparent"
            showGrid={false}
            hideYAxis={true}
            isVertical={true}
            chartType="line"
            showTooltip={false}
            tMargin={15}
          />
        </div>
      </div>

      {/* 두 번째 로우 - 방전 정보 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-3">방전 정보</h3>
        <div className="grid grid-cols-4 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400">누적 방전용량</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">886h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">고속방전 용량</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">285h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">저속방전 용량</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">305h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">일평균 방전용량</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">296h</div>
            </div>
          </div>
        </div>
      </div>

      {/* 방전 % */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-1">방전 %</h3>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center h-full">
            <div className="flex flex-col text-[12px] justify-center pl-2 w-20">
              {dischargeData.map((item, index) => (
                <div key={index} className="flex items-center mb-1">
                  <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: item.itemStyle.color }}></span>
                  <span className="text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
            <div className="flex-1 h-full flex items-center justify-center">
              <div className="w-[150px] h-[150px]">
                <DiagPieChart 
                  datas={dischargeData}
                  radius={['25%', '90%']}
                  itemGap={4}
                  labelColor="#404040"
                  labelSize={19}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 적정 SOC 방전비율 */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">SOC 구간별 방전 비율</h3>
        <div className="flex h-[calc(100%-40px)]">
          {/* 차트 영역 */}
          <div className="flex-1 h-full">
            <BarChart 
              data={socDischargeData}
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
          
          {/* 텍스트 영역 */}
          <div className="w-44 flex flex-col justify-center gap-3 pl-1">
            <div>
              <span className="text-white">· 저 SOC : </span>
              <span className="text-yellow-300">0%</span>
            </div>
            <div>
              <span className="text-white">· 적정 SOC : </span>
              <span className="text-yellow-300">93%</span>
            </div>
            <div>
              <span className="text-white">· 고 SOC : </span>
              <span className="text-yellow-300">7%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 세 번째 로우 - 충전 정보 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-3">충전 정보</h3>
        <div className="grid grid-cols-4 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400">누적 충전용량</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">886h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">고속충전 용량</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">285h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">저속충전 용량</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">305h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">일평균 충전용량</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">296h</div>
            </div>
          </div>
        </div>
      </div>

      {/* 충전 % */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-1">충전 %</h3>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center h-full">
            <div className="flex flex-col text-[12px] justify-center pl-2 w-20">
              {chargeData.map((item, index) => (
                <div key={index} className="flex items-center mb-1">
                  <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: item.itemStyle.color }}></span>
                  <span className="text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
            <div className="flex-1 h-full flex items-center justify-center">
              <div className="w-[150px] h-[150px]">
                <DiagPieChart 
                  datas={chargeData}
                  radius={['25%', '90%']}
                  itemGap={4}
                  labelColor="#404040"
                  labelSize={19}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 충전시간(h) */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">최근 충전시간(h)</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={chargeTimeData}
            grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
            backgroundColor="transparent"
            showGrid={false}
            hideYAxis={true}
            isVertical={true}
            chartType="line"
            showTooltip={false}
            tMargin={15}
          />
        </div>
      </div>

      {/* 네 번째 로우 - 방전 Power 정보 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-3">방전 Power 정보</h3>
        <div className="grid grid-cols-4 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400">정격 최대</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">886h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">실제 최대</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">285h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">적정 Power</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">305h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">평균 Power</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">296h</div>
            </div>
          </div>
        </div>
      </div>

      {/* 방전 파워 % */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">방전 파워 %</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={dischargePowerData}
            grid={{ top: 30, right: 20, bottom: 20, left: 60 }}
            yAxis={{ max: 10 }}
            backgroundColor="transparent"
            isVertical={true}
            hideYAxis={true}
            showGrid={false}
            rMargin={5}
            showTooltip={false}
          />
        </div>
      </div>

      {/* 방전시 Power % */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">방전시 Power %</h3>
        <div className="flex h-[calc(100%-40px)]">
          {/* 차트 영역 */}
          <div className="flex-1 h-full">
            <BarChart 
              data={dischargePowerTimeData}
              grid={{ top: 40, right: 10, bottom: 20, left: 40 }}
              backgroundColor="transparent"
              showGrid={false}
              hideYAxis={true}
              isVertical={true}
              chartType="both"
              showTooltip={false}
            />
          </div>
          
          {/* 텍스트 영역 */}
          <div className="w-44 flex flex-col justify-center gap-3 pl-1">
            <div>
              <span className="text-white">· 저 Power : </span>
              <span className="text-yellow-300">46%</span>
            </div>
            <div>
              <span className="text-white">· 적정 Power : </span>
              <span className="text-yellow-300">45%</span>
            </div>
            <div>
              <span className="text-white">· 고 Power : </span>
              <span className="text-yellow-300">9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 다섯 번째 로우 - 충전 Power 정보 */}
      <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
        <h3 className="text-white text-[19px] mb-3">충전 Power 정보</h3>
        <div className="grid grid-cols-4 gap-4 flex-1 items-center">
          <div className="text-center">
            <div className="text-gray-400">정격 최대</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">886h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">실제 최대</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">285h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">적정 Power</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">305h</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">평균 Power</div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-white text-xl">296h</div>
            </div>
          </div>
        </div>
      </div>

      {/* 충전 파워 % */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">충전 파워 %</h3>
        <div className="h-[calc(100%-40px)]">
          <BarChart 
            data={chargePowerData}
            grid={{ top: 40, right: 20, bottom: 20, left: 60 }}
            yAxis={{ max: 10 }}
            backgroundColor="transparent"
            isVertical={true}
            hideYAxis={true}
            showGrid={false}
            rMargin={5}
            showTooltip={false}
          />
        </div>
      </div>

      {/* 충전시 Power % */}
      <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
        <h3 className="text-white text-[19px] mb-2">충전시 Power %</h3>
        <div className="flex h-[calc(100%-40px)]">
          {/* 차트 영역 */}
          <div className="flex-1 h-full">
            <BarChart 
              data={chargePowerTimeData}
              grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
              backgroundColor="transparent"
              showGrid={false}
              hideYAxis={true}
              isVertical={true}
              chartType="both"
              showTooltip={false}
            />
          </div>
          
          {/* 텍스트 영역 */}
          <div className="w-44 flex flex-col justify-center gap-3 pl-1">
            <div>
              <span className="text-white">· 저 Power : </span>
              <span className="text-yellow-300">38%</span>
            </div>
            <div>
              <span className="text-white">· 적정 Power : </span>
              <span className="text-yellow-300">42%</span>
            </div>
            <div>
              <span className="text-white">· 고 Power : </span>
              <span className="text-yellow-300">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageManagement; 