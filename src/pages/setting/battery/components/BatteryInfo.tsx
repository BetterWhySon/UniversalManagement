import React from 'react';
import BarChart from '@/components/charts/BarChart';
import BatteryBalanceChart from '@/components/charts/BatteryBalanceChart';
import * as echarts from 'echarts';

const BatteryInfo: React.FC = () => {
  // 배터리 용량 데이터
  const batteryCapacityData = [
    { id: '공칭', soc: 182, style: { color: '#8AA8DA' } },
    { id: '운영', soc: 184, style: { color: '#8AA8DA' } },
    { id: '실제', soc: 189, style: { color: '#A9D18E' } }
  ];

  // 셀 용량 분포 데이터
  const cellCapacityData = [
    { id: '188.70', soc: 2, style: { color: '#8AA8DA' } },
    { id: '', soc: 7, style: { color: '#8AA8DA' } },
    { id: '189.70', soc: 34, style: { color: '#8AA8DA' } },
    { id: '', soc: 16, style: { color: '#8AA8DA' } },
    { id: '190.70', soc: 24, style: { color: '#8AA8DA' } },
    { id: '', soc: 11, style: { color: '#8AA8DA' } },
    { id: '191.70', soc: 5, style: { color: '#8AA8DA' } }
  ];

  // 배터리 밸런스 데이터
  const batteryBalanceTopData = [
    {
      name: '배터리 밸런스',
      data: [
        { id: '셀 25번', start: 0, end: -100 },
        { id: '셀 87번', start: 3, end: -97 }
      ],
      color: '#60A5FA'
    }
  ];

  const batteryBalanceBottomData = [
    {
      name: '배터리 밸런스',
      data: [
        { id: '셀 89번', start: 0, end: 100 },
        { id: '셀 22번', start: 0, end: 80 }
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
    { id: '0.2407', soc: 1, style: { color: '#8AA8DA' } },
    { id: '', soc: 3, style: { color: '#8AA8DA' } },
    { id: '0.2409', soc: 38, style: { color: '#8AA8DA' } },
    { id: '', soc: 32, style: { color: '#8AA8DA' } },
    { id: '0.2411', soc: 18, style: { color: '#8AA8DA' } },
    { id: '', soc: 4, style: { color: '#8AA8DA' } },
    { id: '0.2413', soc: 3, style: { color: '#8AA8DA' } }
  ];

  // 셀 저항변화 추세 데이터
  const cellResistanceTrendData = [
    {
      name: '최대값',
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
      name: '평균값',
      data: [
        { id: '2019', soc: 0.7 },
        { id: '2020', soc: 0.75 },
        { id: '2021', soc: 0.85 },
        { id: '2022', soc: 0.9 },
        { id: '2023', soc: 0.95 },
        { id: '2024', soc: 1.0 }
      ],
      color: '#A1A1A1',
      hideValue: true
    },
    {
      name: '최소값',
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

  // 셀 용량 변화 추세 데이터
  const cellCapacityTrendData = [
    {
      name: '최대값',
      data: [
        { id: '2019', soc: 0.9 },
        { id: '2020', soc: 0.88 },
        { id: '2021', soc: 0.86 },
        { id: '2022', soc: 0.84 },
        { id: '2023', soc: 0.82 },
        { id: '2024', soc: 0.8 }
      ],
      color: '#60A5FA'
    },
    {
      name: '평균값',
      data: [
        { id: '2019', soc: 0.85 },
        { id: '2020', soc: 0.82 },
        { id: '2021', soc: 0.8 },
        { id: '2022', soc: 0.78 },
        { id: '2023', soc: 0.76 },
        { id: '2024', soc: 0.75 }
      ],
      color: '#A1A1A1',
      hideValue: true
    },
    {
      name: '최소값',
      data: [
        { id: '2019', soc: 0.8 },
        { id: '2020', soc: 0.76 },
        { id: '2021', soc: 0.73 },
        { id: '2022', soc: 0.7 },
        { id: '2023', soc: 0.68 },
        { id: '2024', soc: 0.65 }
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
      color: '#6CFF31'  // ESS018 라인 색상 변경
    },
    {
      name: '평균값',
      data: [
        { id: '2019', soc: 95 },
        { id: '2020', soc: 93 },
        { id: '2021', soc: 92 },
        { id: '2022', soc: 89 },
        { id: '2023', soc: 88 },
        { id: '2024', soc: 86 }
      ],
      color: '#FFFFFF',
      hideValue: false,
      labelPosition: 'bottom'
    }
  ];

  // 방전 파워 % 데이터 추가
  const dischargePowerData = [
    { id: '정격최대', soc: 8.4, style: { color: '#8AA8DA' } },
    { id: '실제최대', soc: 8.4, style: { color: '#8AA8DA' } },
    { id: '적정Power', soc: 6.2, style: { color: '#8AA8DA' } },
    { id: '평균Power', soc: 6.2, style: { color: '#8AA8DA' } }
  ];

  // 배터리 예상수명 데이터
  const batteryLifeData = [
    {
      name: '예상수명',
      data: [
        { id: 'T1', soc: 0.92 },
        { id: 'T2', soc: 0.91 },
        { id: 'T3', soc: 0.9 },
        { id: 'T4', soc: 0.88 },
        { id: 'T5', soc: 0.87 },
        { id: 'T6', soc: 0.85 },
        { id: 'T7', soc: 0.83 },
        { id: 'T8', soc: 0.82 },
        { id: 'T9', soc: 0.8 },
        { id: 'T10', soc: 0.79 },
        { id: 'T11', soc: 0.77 },
        { id: '현재', soc: 0.75 },
        { id: 'D1', soc: 0.73 },
        { id: 'D2', soc: 0.7 },
        { id: 'D3', soc: 0.65 },
        { id: 'D4', soc: 0.6 },
        { id: 'D5', soc: 0.55 },
        { id: 'D6', soc: 0.5 },
        { id: 'D7', soc: 0.45 },
        { id: 'D8', soc: 0.4 },
        { id: 'D9', soc: 0.3 },
        { id: 'D10', soc: 0.25 },
        { id: 'D11', soc: 0.2 },
        { id: 'D12', soc: 0.15 },
        { id: 'D13', soc: 0.1 },
        { id: 'D14', soc: 0.05 }
      ],
      color: '#A1A1A1'
    },
    {
      name: '우호조건',
      data: [
        { id: 'T1', soc: 0.92 },
        { id: 'T2', soc: 0.91 },
        { id: 'T3', soc: 0.9 },
        { id: 'T4', soc: 0.89 },
        { id: 'T5', soc: 0.88 },
        { id: 'T6', soc: 0.87 },
        { id: 'T7', soc: 0.86 },
        { id: 'T8', soc: 0.85 },
        { id: 'T9', soc: 0.84 },
        { id: 'T10', soc: 0.83 },
        { id: 'T11', soc: 0.81 },
        { id: '현재', soc: 0.79 },
        { id: 'D1', soc: 0.77 },
        { id: 'D2', soc: 0.76 },
        { id: 'D3', soc: 0.74 },
        { id: 'D4', soc: 0.72 },
        { id: 'D5', soc: 0.7 },
        { id: 'D6', soc: 0.68 },
        { id: 'D7', soc: 0.65 },
        { id: 'D8', soc: 0.62 },
        { id: 'D9', soc: 0.58 },
        { id: 'D10', soc: 0.53 },
        { id: 'D11', soc: 0.48 },
        { id: 'D12', soc: 0.42 },
        { id: 'D13', soc: 0.35 },
        { id: 'D14', soc: 0.25 }
      ],
      color: '#6CFF31'
    },
    {
      name: '가혹조건',
      data: [
        { id: 'T1', soc: 0.92 },
        { id: 'T2', soc: 0.91 },
        { id: 'T3', soc: 0.9 },
        { id: 'T4', soc: 0.88 },
        { id: 'T5', soc: 0.87 },
        { id: 'T6', soc: 0.85 },
        { id: 'T7', soc: 0.83 },
        { id: 'T8', soc: 0.81 },
        { id: 'T9', soc: 0.79 },
        { id: 'T10', soc: 0.77 },
        { id: 'T11', soc: 0.75 },
        { id: '현재', soc: 0.73 },
        { id: 'D1', soc: 0.7 },
        { id: 'D2', soc: 0.65 },
        { id: 'D3', soc: 0.6 },
        { id: 'D4', soc: 0.55 },
        { id: 'D5', soc: 0.48 },
        { id: 'D6', soc: 0.4 },
        { id: 'D7', soc: 0.32 },
        { id: 'D8', soc: 0.24 },
        { id: 'D9', soc: 0.18 },
        { id: 'D10', soc: 0.13 },
        { id: 'D11', soc: 0.09 },
        { id: 'D12', soc: 0.05 },
        { id: 'D13', soc: 0.02 },
        { id: 'D14', soc: 0.0 }
      ],
      color: '#FF6969'
    }
  ];

  // 차트 옵션 설정을 위한 함수
  const getChartOptions = () => {
    return {
      backgroundColor: 'transparent',  // 배경색을 투명으로 변경
      grid: { top: 20, right: 40, bottom: 30, left: 15 },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(28, 28, 30, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        formatter: (params: any) => {
          let result = `${params[0].name}<br/>`;
          params.forEach((param: any) => {
            const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>`;
            result += `${marker}${param.seriesName}: ${(param.value * 100).toFixed(1)}%<br/>`;
          });
          return result;
        }
      },
      xAxis: {
        type: 'category',
        data: batteryLifeData[0].data.map(d => d.id),
        axisLabel: { show: false },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLabel: { show: false },
        splitLine: { show: false }
      },
      series: [
        {
          name: '예상수명',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 3.5,
          showSymbol: true,
          data: batteryLifeData[0].data.map(d => d.soc),
          lineStyle: {
            color: '#A1A1A1',
            width: 1,
            type: 'solid'
          },
          itemStyle: {
            color: '#A1A1A1'
          }
        },
        {
          name: '우호조건',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 3.5,
          showSymbol: true,
          data: batteryLifeData[1].data.map(d => d.soc),
          lineStyle: {
            color: '#6CFF31',
            width: 1,
            type: 'dashed'
          },
          itemStyle: {
            color: '#6CFF31'
          }
        },
        {
          name: '가혹조건',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 3.5,
          showSymbol: true,
          data: batteryLifeData[2].data.map(d => d.soc),
          lineStyle: {
            color: '#FF6969',
            width: 1,
            type: 'dashed'
          },
          itemStyle: {
            color: '#FF6969'
          }
        }
      ]
    };
  };

  return (
    <div className="pb-8">
      {/* 메인 그리드 섹션 */}
      <div className="grid grid-cols-[18fr_8fr_21fr] gap-4 -mt-2 auto-rows-[200px]">
        {/* 배터리 종합성능 */}
        <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
          <h3 className="text-white text-[19px] mb-3">배터리 성능 정보</h3>
          <div className="grid grid-cols-4 gap-4 flex-1 items-center">
            <div className="text-center">
              <div className="text-gray-400">배터리 종합성능</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">89점</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">잔여 수명</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">97%</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">에너지 효율</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">88%</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">용량 가용률</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">96%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 충전 파워 % */}
        <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
          <h3 className="text-white text-[19px] mb-2">배터리 성능 평가</h3>
          <div className="text-sm text-gray-300 px-4">
            <p>배터리는 종합 성능 <span className="text-[#6CFF31]">점수가 102점</span>으로(동일 배터리 평균 점수 <span className="text-[#6CFF31]">98점</span>), 관리 대상 배터리 중 <span className="text-[#6CFF31]">상위 26%</span>에 속합니다. 에너지 효율 역시 <span className="text-[#6CFF31]">96%</span>로, <span className="text-[#6CFF31]">상위 21%</span>에 해당해 효율 면에서도 우수한 성능을 나타냅니다.</p>
          </div>
        </div>

        {/* 배터리 종합성능 지수 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
          <h3 className="text-white text-[19px] mb-2">배터리 종합성능 지수</h3>
          <div className="h-[calc(100%-40px)] flex pl-4">
            {/* 가이드 라인 - 왼쪽으로 이동 */}
            <div className="flex flex-col justify-center gap-2 w-20 pr-0">
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#6CFF31] mr-2"></div>
                <span className="text-[#6CFF31] text-xs">ESS018</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#FFFFFF] mr-2"></div>
                <span className="text-[#FFFFFF] text-xs">평균값</span>
              </div>
            </div>
            
            {/* 차트 영역 */}
            <div className="flex-1 relative">
              <BarChart 
                data={batteryPerformanceData}
                grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
                backgroundColor="transparent"
                showGrid={false}
                hideYAxis={true}
                isVertical={true}
                chartType="multiLine"
                showTooltip={false}
                barColor="#8AA8DA"
                showValue={true}
                tMargin={15}
                labelFontSize={12}
              />
            </div>
          </div>
        </div>

        {/* 실제 사용가능 배터리 용량 */}
        <div className="bg-hw-dark-2 rounded-lg p-5 h-[200px] flex flex-col">
          <h3 className="text-white text-[19px] mb-3">용량 가용율</h3>
          <div className="grid grid-cols-5 gap-4 flex-1 items-center">
            <div className="text-center">
              <div className="text-[#6CFF31]">실제 사용가능 배터리 용량</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-[#6CFF31] text-xl">189ah</div>
                <div className="text-[#6CFF31] text-l">&nbsp;</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">셀 평균 노화</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">0.2%</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">셀 용량 편차</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">0.5%</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">셀 SOC 편차</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">1.2%</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">저항</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">0.1%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 팩 용량 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
          <h3 className="text-white text-[19px] mb-2">배터리 팩 용량</h3>
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
              showValue={true}
            />
          </div>
        </div>

        {/* 셀용량 상세 -> 배터리 예상수명으로 변경 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
          <h3 className="text-white text-[19px] mb-2">배터리 예상수명</h3>
          <div className="h-[calc(100%-20px)] flex pl-4">
            {/* 범례 영역 - 왼쪽으로 이동 (배터리 종합성능 지수와 동일한 스타일) */}
            <div className="flex flex-col gap-2 w-20 pr-0 z-30 mt-8">
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#A1A1A1] mr-2"></div>
                <span className="text-[#A1A1A1] text-xs">예상수명</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#6CFF31] mr-2 border-dashed border-t"></div>
                <span className="text-[#6CFF31] text-xs">우호조건</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#FF6969] mr-2 border-dashed border-t"></div>
                <span className="text-[#FF6969] text-xs">가혹조건</span>
              </div>
            </div>
            
            {/* 차트 영역 - 오른쪽으로 이동 */}
            <div className="flex-1 relative">
              {/* 텍스트 정보를 오른쪽 상단에 z-order 높게 설정 */}
              <div className="absolute top-[-36px] right-0 text-right pr-4 z-30 pb-2 rounded-md px-3">
                <div className="text-yellow-300 text-sm font-semibold">예상 잔존수명 49.0M / 72.3만km</div>
                <div className="flex items-center justify-end mt-0.5">
                  <span className="text-xs text-[#FFFFFF]">→ 우호조건,</span>
                  <span className="text-xs text-[#6CFF31] ml-1 font-bold">12% 연장</span>
                </div>
                <div className="flex items-center justify-end mt-0.5">
                  <span className="text-xs text-[#FFFFFF]">→ 가혹조건,</span>
                  <span className="text-xs text-[#FF6969] ml-1 font-bold">11% 단축</span>
                </div>
              </div>
              <div ref={(el) => {
                if (el && !el.getAttribute('data-initialized')) {
                  const chart = echarts.init(el);
                  const options = getChartOptions();
                  options.backgroundColor = 'transparent';  // 배경색을 투명으로 변경
                  chart.setOption(options);
                  el.setAttribute('data-initialized', 'true');
                  
                  // resize 이벤트 처리
                  const resizeObserver = new ResizeObserver(() => {
                    chart.resize();
                    chart.setOption({ backgroundColor: 'transparent' });  // resize 시에도 투명 배경 유지
                  });
                  resizeObserver.observe(el);
                }
              }} className="w-[95%] h-full absolute top-[-10px] left-[2%]" style={{ backgroundColor: 'transparent' }} />
            </div>
          </div>
        </div>

        {/* 배터리 팩 밸런스 */}
        <div className="bg-hw-dark-2 rounded-lg p-5 min-h-[200px] flex flex-col">
          <h3 className="text-white text-[19px] mb-3">배터리 팩 밸런스</h3>
          <div className="grid grid-cols-3 gap-4 flex-1 items-center">
            <div className="text-center">
              <div className="text-gray-400">팩 100% 기준 전압 편차</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">0.4%</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">팩 0% 기준 전압 편차</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">0.8%</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">용량 손실률 (진행 편차)</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">1.2%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 배터리 밸런스 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
          <h3 className="text-white text-[19px] mb-2">배터리 밸런스</h3>
          <div className="h-[calc(100%-40px)] grid grid-cols-2 gap-4">
            <div className="h-full flex flex-col">
              <div className="flex justify-around">
                {batteryBalanceTopData[0].data.map((item, index) => (
                  <div key={item.id} className="text-white text-[13px]">{index === 0 ? '100%' : '99.2%'}</div>
                ))}
              </div>
              <div className="flex-1">
                <BatteryBalanceChart 
                  data={batteryBalanceTopData}
                  min={-100}
                  max={0}
                  xAxisPosition="top"
                />
              </div>
              <div className="flex justify-around">
                {batteryBalanceTopData[0].data.map((item) => (
                  <div key={item.id} className="text-white text-[13px]">{item.id}</div>
                ))}
              </div>
            </div>
            <div className="h-full flex flex-col">
              <div className="flex justify-around">
                {batteryBalanceBottomData[0].data.map((item, index) => (
                  <div key={item.id} className="text-white text-[13px]">{index === 0 ? '0%' : '1.2%'}</div>
                ))}
              </div>
              <div className="flex-1">
                <BatteryBalanceChart 
                  data={batteryBalanceBottomData}
                  min={0}
                  max={100}
                  xAxisPosition="bottom"
                />
              </div>
              <div className="flex justify-around">
                {batteryBalanceBottomData[0].data.map((item) => (
                  <div key={item.id} className="text-white text-[13px]">{item.id}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 전체 구간 셀 밸런스 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 min-h-[200px]">
          <h3 className="text-white text-[19px] mb-2">전체 구간 셀 밸런스</h3>
          <div className="h-[calc(100%-40px)]">
            <BarChart 
              data={cellBalanceData}
              grid={{ top: 30, right: 10, bottom: 20, left: 40 }}
              backgroundColor="transparent"
              showGrid={false}
              hideYAxis={true}
              isVertical={true}
              chartType="line"
              showTooltip={false}
              tMargin={15}
              showValue={true}
              barColor="#8AA8DA"
            />
          </div>
        </div>

        {/* 셀 용량 */}
        <div className="bg-hw-dark-2 rounded-lg p-5 h-[200px] flex flex-col">
          <h3 className="text-white text-[19px] mb-3">셀 용량 상세</h3>
          <div className="grid grid-cols-5 gap-4 flex-1 items-center">
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">셀 평균용량</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">105.4Ah</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">최대 셀 용량</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">105.4Ah</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">최소 셀 용량</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">105.2Ah</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">셀평균 용량편차</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">0.2Ah</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">셀최대 용량편차</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">0.2Ah</div>
              </div>
            </div>
          </div>
        </div>

        {/* SOC 구간별 셀 밸런스 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
          <h3 className="text-white text-[19px] mb-2">셀 용량 분포</h3>
          <div className="h-[calc(100%-40px)]">
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

        {/* 셀 용량변화 추세 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
          <h3 className="text-white text-[19px] mb-2">셀 용량변화 추세</h3>
          <div className="h-[calc(100%-40px)] flex pl-4">
            {/* 범례 영역 - 셀 용량변화 추세 */}
            <div className="flex flex-col justify-center gap-2 w-20 pr-0">
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#60A5FA] mr-2"></div>
                <span className="text-[#60A5FA] text-xs">최대값</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#A1A1A1] mr-2"></div>
                <span className="text-[#A1A1A1] text-xs">평균값</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#EF4444] mr-2"></div>
                <span className="text-[#EF4444] text-xs">최소값</span>
              </div>
            </div>
            
            {/* 차트 영역 */}
            <div className="flex-1">
              <BarChart 
                data={cellCapacityTrendData} 
                chartType="multiLine" 
                showValue={true}
                grid={{ top: 20, right: 30, bottom: 25, left: 10 }}
                backgroundColor="transparent"
                showGrid={false}
                hideYAxis={true}
                isVertical={true}
                tMargin={15}
                labelFontSize={12}
                tooltipFormatter={(params: any) => {
                  const year = params[0].axisValue;
                  const maxValue = params.find((p: any) => p.seriesName === '최대값')?.value;
                  const avgValue = params.find((p: any) => p.seriesName === '평균값')?.value;
                  const minValue = params.find((p: any) => p.seriesName === '최소값')?.value;
                  
                  return `${year}년<br/>
                    최대값: ${maxValue?.toFixed(2)}<br/>
                    평균값: ${avgValue?.toFixed(2)}<br/>
                    최소값: ${minValue?.toFixed(2)}`;
                }}
              />
            </div>
          </div>
        </div>

        {/* 배터리 저항 */}
        <div className="bg-hw-dark-2 rounded-lg p-5 h-[200px] flex flex-col">
          <h3 className="text-white text-[19px] mb-3">셀 저항 상세</h3>
          <div className="grid grid-cols-5 gap-4 flex-1 items-center">
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">셀 평균저항</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">24.10mΩ</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">최대 셀 저항</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">24.13mΩ</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">최소 셀 저항</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">24.07mΩ</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">셀평균 저항편차</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">0.02mΩ</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 whitespace-nowrap">셀최대 저항편차</div>
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="text-white text-xl">0.06mΩ</div>
              </div>
            </div>
          </div>
        </div>

        {/* 셀 저항 상태 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 h-[200px]">
          <h3 className="text-white text-[19px] mb-2">셀 저항 분포</h3>
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
          <h3 className="text-white text-[19px] mb-2">셀 저항변화 추세</h3>
          <div className="h-[calc(100%-40px)] flex pl-4">
            {/* 범례 영역 - 셀 저항변화 추세 */}
            <div className="flex flex-col justify-center gap-2 w-20 pr-0">
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#60A5FA] mr-2"></div>
                <span className="text-[#60A5FA] text-xs">최대값</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#A1A1A1] mr-2"></div>
                <span className="text-[#A1A1A1] text-xs">평균값</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#EF4444] mr-2"></div>
                <span className="text-[#EF4444] text-xs">최소값</span>
              </div>
            </div>
            
            {/* 차트 영역 */}
            <div className="flex-1">
              <BarChart 
                data={cellResistanceTrendData} 
                chartType="multiLine" 
                showValue={true}
                grid={{ top: 20, right: 30, bottom: 25, left: 10 }}
                backgroundColor="transparent"
                showGrid={false}
                hideYAxis={true}
                isVertical={true}
                tMargin={15}
                labelFontSize={12}
                tooltipFormatter={(params: any) => {
                  const year = params[0].axisValue;
                  const maxValue = params.find((p: any) => p.seriesName === '최대값')?.value;
                  const avgValue = params.find((p: any) => p.seriesName === '평균값')?.value;
                  const minValue = params.find((p: any) => p.seriesName === '최소값')?.value;
                  
                  return `${year}년<br/>
                    최대값: ${maxValue?.toFixed(2)}<br/>
                    평균값: ${avgValue?.toFixed(2)}<br/>
                    최소값: ${minValue?.toFixed(2)}`;
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 개별 셀 섹션 그룹과의 간격 */}
      <div className="h-4 w-full"></div>

      {/* 개별 셀 섹션 그룹 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* 개별 셀 수명(SOH) 첫 번째 섹션 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 h-auto">
          <h3 className="text-white text-[19px] mb-2">개별 셀 수명(SOH)</h3>
          <div className="flex justify-center">
            <div className="w-fit">
              <div className="grid grid-cols-[repeat(15,48px)] gap-[6px] p-2">
                {Array(196).fill(null).map((_, index) => (
                  <div 
                    key={index} 
                    className={`relative flex flex-col justify-between items-center w-[48px] h-[48px] rounded ${index === 5 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  >
                    <div className="w-full pt-0.5 pl-1 text-[11px] text-white font-bold text-left">#{index + 1}</div>
                    <div className="w-full pb-0.5 pr-1 text-[11px] text-white font-bold text-right">105.4</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 개별 셀 내부저항(IR) 두 번째 섹션 */}
        <div className="bg-hw-dark-2 rounded-lg p-3 h-auto">
          <h3 className="text-white text-[19px] mb-2">개별 셀 내부저항(IR)</h3>
          <div className="flex justify-center">
            <div className="w-fit">
              <div className="grid grid-cols-[repeat(15,48px)] gap-[6px] p-2">
                {Array(196).fill(null).map((_, index) => (
                  <div 
                    key={index} 
                    className={`relative flex flex-col justify-between items-center w-[48px] h-[48px] rounded ${index === 0 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  >
                    <div className="w-full pt-0.5 pl-1 text-[11px] text-white font-bold text-left">#{index + 1}</div>
                    <div className="w-full pb-0.5 pr-1 text-[11px] text-white font-bold text-right">24.1</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 페이지 하단 추가 여백 */}
      <div className="h-4"></div>
    </div>
  );
};

export default BatteryInfo; 