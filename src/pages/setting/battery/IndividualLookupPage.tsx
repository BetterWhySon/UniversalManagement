import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as echarts from 'echarts';
import BarChart from '@/components/charts/BarChart';
import UsageManagement from './components/UsageManagement';
import LifeManagement from './components/LifeManagement';
import BatteryInfo from './components/BatteryInfo';
import ChargingHistory from './components/ChargingHistory';
import AlarmHistory from './components/AlarmHistory';
import DeviceSelectPopup from './components/DeviceSelectPopup';

interface Selection {
  company: string;
  groups: string[];
  device?: string;
}

const IndividualLookupPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState('사용관리');
  const [showDeviceSelect, setShowDeviceSelect] = useState(false);

  const tabs = ['사용관리', '수명관리', '배터리정보', '충/방전이력', '알람이력'];

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }

      const options = {
        backgroundColor: 'transparent',
        grid: {
          top: 10,
          left: 80,
          right: 40,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          max: 100,
          show: false
        },
        yAxis: {
          type: 'category',
          data: ['배터리정보', '수명관리', '사용관리'],
          axisLabel: {
            color: '#fff',
            fontSize: 14,
            align: 'left'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            data: [
              {
                value: 86,
                itemStyle: { color: '#98FB98' }  // 연한 녹색
              },
              {
                value: 93,
                itemStyle: { color: '#87CEEB' }  // 연한 파란색
              },
              {
                value: 92,
                itemStyle: { color: '#87CEEB' }  // 연한 파란색
              }
            ],
            barWidth: '40%',
            label: {
              show: true,
              position: 'right',
              color: '#fff',
              fontSize: 14
            }
          }
        ]
      };

      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(options);

      const handleResize = () => {
        chartInstance.current?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, []);

  const handleDeviceSelect = () => {
    setShowDeviceSelect(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className='flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4'>
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            개별 조회
          </h1>
        </div>

        <div className='relative w-[180px]'>
          <h3 className='absolute -top-2 left-4 text-white px-2 text-sm bg-transparent'>
            {trans('검색조건')}
          </h3>
          <div className='border border-hw-gray-4 rounded-lg p-3 pt-4'>
            <div className='flex flex-wrap gap-2 h-8 items-center'>
              <button 
                className="bg-blue-600 text-white px-3 rounded h-full border border-blue-500 min-w-[140px] hover:bg-blue-700 transition-colors w-full"
                onClick={handleDeviceSelect}
              >
                <span className="block text-center">
                  {selectedDevice ? `${selectedCompany} / ${selectedGroup} / ${selectedDevice}` : '기기 선택'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex px-[18px] lg:px-[55px] gap-4">
        <div className="flex-[1.2] relative">
          <h3 className="absolute -top-2 left-4 bg-hw-dark-1 px-2 text-white z-10">배터리 등급</h3>
          <div className="bg-hw-dark-1 p-4 rounded-lg border border-gray-600 h-full">
            <div className="flex h-full">
              <div className="w-[200px] flex-none flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-[76px] text-[#98FB98] font-bold leading-none text-center">B+</div>
                </div>
                <div className="text-white text-sm text-center">
                  <div>[관리순위 14 / 78]</div>
                  <div className="text-gray-400">
                    [*관리기기 대비 상위 18%]<br />
                    [*전체기기 대비 상위 35%]
                  </div>
                </div>
              </div>

              <div className="flex-grow flex items-center">
                <div className="flex flex-col h-[160px] border-t border-b border-gray-600 w-full">
                  <div className="flex border-b border-gray-600">
                    <div className="w-1/3 text-white text-sm py-2 text-center">종합관리 점수</div>
                    <div className="w-2/3 text-white text-sm py-2 text-center border-l border-gray-600">항목별 관리점수</div>
                  </div>

                  <div className="flex flex-1">
                    <div className="w-1/3 border-r border-gray-600 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="text-[#98FB98] text-xl font-bold mb-2">86</div>
                        <div className="w-8 h-[80px] bg-gray-700 rounded-t overflow-hidden relative">
                          <div 
                            className="w-full bg-[#98FB98] rounded-t absolute bottom-0" 
                            style={{height: '86%'}}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="w-2/3 pl-2 flex items-center">
                      <div className="w-full h-[120px]">
                        <BarChart 
                          data={[
                            { id: '배터리정보', soc: 86 },
                            { id: '수명관리', soc: 96 },
                            { id: '사용관리', soc: 92 }
                          ]}
                          isTimeData={false}
                          hideXAxis={true}
                          backgroundColor="transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1.8] relative">
          <h3 className="absolute -top-2 left-4 bg-hw-dark-1 px-2 text-white z-10">배터리 정보</h3>
          <div className="bg-hw-dark-1 p-6 rounded-lg border border-gray-600 h-full">
            <div className="grid grid-cols-5 gap-x-6 gap-y-6 text-white h-full content-center">
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">기기명</div>
                <div className="text-[22px] font-medium">VABJ023</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">배터리 등급</div>
                <div className="text-[22px] font-medium">B+</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">최초 등일</div>
                <div className="text-[22px] font-medium">2023-05-01</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">누적 방전용량</div>
                <div className="text-[22px] font-medium">258 kWh</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">일평균 전용량</div>
                <div className="text-[22px] font-medium">1.2 kWh</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">운영기간</div>
                <div className="text-[22px] font-medium">11.1M</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">체수명</div>
                <div className="text-[22px] font-medium">49.0M / 96%</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">공칭용량</div>
                <div className="text-[22px] font-medium text-red-500">1,200 Ah</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">에너지 효율</div>
                <div className="text-[22px] font-medium">95%</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-gray-400 mb-1 text-[16px]">용량 효율</div>
                <div className="text-[22px] font-medium">94%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-hw-dark-1">
        <div className="flex justify-between border-b border-gray-600 px-[18px] lg:px-[55px] mt-2">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-white ${selectedTab === tab ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center text-gray-400 text-[20px]">
            사업장 / 그룹명 / 기기명
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-[18px] lg:p-[20px] pt-2">
          {selectedTab === '사용관리' && <UsageManagement />}
          {selectedTab === '수명관리' && <LifeManagement />}
          {selectedTab === '배터리정보' && <BatteryInfo />}
          {selectedTab === '충/방전이력' && <ChargingHistory />}
          {selectedTab === '알람이력' && <AlarmHistory />}
        </div>
      </div>

      {showDeviceSelect && (
        <DeviceSelectPopup 
          isOpen={showDeviceSelect}
          onClose={() => setShowDeviceSelect(false)}
          onSelect={(selections, selectedDevices) => {
            if (selections.length > 0) {
              const firstDevice = selections[0];
              setSelectedCompany(firstDevice.company);
              setSelectedGroup(firstDevice.groups[0] || '');
              setSelectedDevice(firstDevice.device || '');
            }
            setShowDeviceSelect(false);
          }}
          conditionType="기기"
          title="기기 선택"
        />
      )}
    </div>
  );
};

export default IndividualLookupPage;