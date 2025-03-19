import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ComparisonChart from './ComparisonChart';
import TimeSeriesChart from './TimeSeriesChart';
import RatioChart from './RatioChart';
import FilterPopup from '@/pages/dashboard/components/subComponents/FilterPopup';
import CompanyGroupPopup from './CompanyGroupPopup';
import DeviceSelectPopup from './DeviceSelectPopup';

type ChartType = '비교차트' | '시계열차트' | '비율차트';
type ConditionType = '사업장' | '그룹' | '기기';
type PageType = 'item' | 'device';

interface Selection {
  company: string;
  groups: string[];
  device?: string;
}

interface ManagementPageTemplateProps {
  title: string;
  defaultChartType?: ChartType;
  companies: any[];
  mockData: any[];
  pageType: PageType;
}

const ManagementPageTemplate: React.FC<ManagementPageTemplateProps> = ({
  title,
  defaultChartType = '비교차트',
  companies,
  mockData,
  pageType
}) => {
  const { t: trans } = useTranslation('translation');
  const [chartType, setChartType] = useState<ChartType>(defaultChartType);
  const [selectedCondition, setSelectedCondition] = useState<ConditionType>(pageType === 'device' ? '기기' : '사업장');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<string>('');
  const [selectedFilterItems, setSelectedFilterItems] = useState<string[]>([]);
  const [selectedFilterItemsForRatioChart, setSelectedFilterItemsForRatioChart] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isCompanyGroupPopupOpen, setIsCompanyGroupPopupOpen] = useState(false);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isDeviceSelectPopupOpen, setIsDeviceSelectPopupOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleFilterApply = (items: string[]) => {
    if (chartType === '비율차트') {
      setSelectedFilterItemsForRatioChart(items);
    } else {
      setSelectedFilterItems(items);
    }
    setIsFilterPopupOpen(false);
  };

  const handleCompanyGroupSelect = (newSelections: Selection[], selectedGroups: {[company: string]: string[]}) => {
    const filteredSelections = companies.map(company => ({
      company: company.name,
      groups: (selectedGroups[company.name] || [])
    })).filter(sel => sel.groups.length > 0);
    
    setSelections(filteredSelections);
    setIsCompanyGroupPopupOpen(false);
  };

  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
  };

  const handleDeviceSelect = (devices: any[]) => {
    setSelectedDevices(devices.map(d => d.device));
    const selectedDeviceInfo = devices.map(device => ({
      company: device.company,
      groups: [device.group],
      device: device.device
    }));
    setSelections(selectedDeviceInfo);
    setIsDeviceSelectPopupOpen(false);
  };

  const handleSearch = () => {
    // 검색조건 체크
    const missingConditions = [];
    
    if (!selections.length) {
      missingConditions.push(selectedCondition === '기기' ? '기기 선택' : '사업장/그룹 선택');
    }
    
    if (!(chartType === '비율차트' ? selectedFilterItemsForRatioChart : selectedFilterItems).length) {
      missingConditions.push('조회항목');
    }
    
    if (!selectedPeriod) {
      missingConditions.push('기간단위');
    }

    if (missingConditions.length > 0) {
      setAlertMessage(`다음 항목을 선택해주세요.\n${missingConditions.map(item => `- ${item}`).join('\n')}`);
      setShowAlert(true);
      return;
    }

    // TODO: 실제 검색 로직 구현
    console.log('검색 실행');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-hw-dark-2 p-6 rounded-lg shadow-lg max-w-[300px] w-full mx-2">
            <div className="text-hw-white-1 mb-4 whitespace-pre-line text-sm">{alertMessage}</div>
            <div className="flex justify-end">
              <button
                className="bg-hw-orange-1 text-white px-4 py-2 rounded hover:bg-hw-orange-2 transition-colors"
                onClick={() => setShowAlert(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            {title}
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 p-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-start gap-8'>
            <div className='flex flex-row items-start gap-8'>
              <div className='relative'>
                <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                  {trans('차트 Type')}
                </h3>
                <div className='border border-hw-gray-4 rounded-lg p-3 pt-4'>
                  <div className='flex gap-4 items-center h-8'>
                    {(['비교차트', '시계열차트', '비율차트'] as ChartType[]).map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="chartType"
                          value={type}
                          checked={chartType === type}
                          onChange={(e) => handleChartTypeChange(e.target.value as ChartType)}
                          className="form-radio text-hw-orange-1 bg-hw-dark-3 border-hw-gray-4"
                        />
                        <span className="text-hw-white-1">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {pageType !== 'device' && (
                <div className='relative'>
                  <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                    {trans('조회 조건')}
                  </h3>
                  <div className='border border-hw-gray-4 rounded-lg p-3 pt-4'>
                    <div className='flex flex-wrap gap-4 h-8 items-center'>
                      {(['사업장', '그룹', '기기'] as ConditionType[]).map((condition) => (
                        <div key={condition} className='flex gap-2 items-center'>
                          <input
                            type="radio"
                            id={`condition-${condition}`}
                            name="condition"
                            value={condition}
                            checked={selectedCondition === condition}
                            onChange={(e) => setSelectedCondition(e.target.value as ConditionType)}
                            className="form-radio text-hw-orange-1 bg-hw-dark-3 border-hw-gray-4"
                          />
                          <label 
                            htmlFor={`condition-${condition}`} 
                            className="text-hw-white-1 cursor-pointer"
                            onClick={() => setSelectedCondition(condition)}
                          >
                            {condition}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className='relative w-[360px]'>
                <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                  {trans('검색조건')}
                </h3>
                <div className='border border-hw-gray-4 rounded-lg p-3 pt-4'>
                  <div className='flex flex-wrap gap-2 h-8 items-center'>
                    <button 
                      className="bg-blue-600 text-white px-3 rounded h-full border border-blue-500 min-w-[140px] hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        if (pageType === 'device' || selectedCondition === '기기') {
                          setIsDeviceSelectPopupOpen(true);
                        } else {
                          setIsCompanyGroupPopupOpen(true);
                        }
                      }}
                    >
                      <span className="block text-center">
                        {selectedCompanyGroup || (selectedCondition === '기기' ? '기기 선택' : '사업장/그룹 선택')}
                      </span>
                    </button>

                    <button 
                      className="bg-blue-600 text-white px-3 rounded h-full border border-blue-500 min-w-[90px] hover:bg-blue-700 transition-colors"
                      onClick={() => setIsFilterPopupOpen(true)}
                    >
                      <span className="block text-center">
                        조회항목
                      </span>
                    </button>

                    <select 
                      className="bg-hw-dark-3 text-hw-white-1 px-2 rounded h-full border-none outline-none min-w-[80px] text-center"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      <option value="" className="text-center">기간단위</option>
                      <option value="daily" className="text-center">일간</option>
                      <option value="weekly" className="text-center">주간</option>
                      <option value="monthly" className="text-center">월간</option>
                      <option value="yearly" className="text-center">연간</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center h-[60px] -ml-4">
              <button 
                className="bg-hw-orange-1 text-white px-3 rounded h-8 hover:bg-hw-orange-2 transition-colors min-w-[70px]"
                onClick={handleSearch}
              >
                조회
              </button>
            </div>

            <div className='h-[60px] flex-1'>
              <div className="text-white h-full overflow-y-auto">
                <div className="flex flex-wrap gap-1 min-h-full items-center text-sm">
                  {selections.length > 0 && (
                    <span className="text-blue-400 font-medium whitespace-normal leading-tight">
                      {pageType === 'device' ? 
                        selections.map(sel => sel.device).join(', ') :
                        selections.map(sel => {
                          const groupText = sel.groups.length > 0 ? `(${sel.groups.join(', ')})` : '';
                          return `${sel.company}${groupText}`;
                        }).join(', ')
                      }
                    </span>
                  )}
                  {(chartType === '비율차트' ? selectedFilterItemsForRatioChart : selectedFilterItems).length > 0 && (
                    <>
                      <span className="text-gray-400">/</span>
                      <span className="text-green-400 whitespace-normal leading-tight">
                        {(chartType === '비율차트' ? selectedFilterItemsForRatioChart : selectedFilterItems).join(', ')}
                      </span>
                    </>
                  )}
                  {selectedPeriod && (
                    <>
                      <span className="text-gray-400">/</span>
                      <span className="text-yellow-400 leading-tight">
                        {selectedPeriod === 'daily' ? '일간' : 
                         selectedPeriod === 'weekly' ? '주간' : 
                         selectedPeriod === 'monthly' ? '월간' : '연간'}
                      </span>
                    </>
                  )}
                  {!selections.length && !(chartType === '비율차트' ? selectedFilterItemsForRatioChart : selectedFilterItems).length && !selectedPeriod && (
                    <span className="text-gray-400 leading-tight">선택된 조건이 없습니다</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[10px] lg:px-[20px] pb-8">
        {pageType === 'device' && selections.length > 0 ? (
          <div className="space-y-8">
            {selections.map((selection) => (
              <div key={selection.device} className="bg-hw-dark-2 p-4 rounded-lg">
                <h2 className="text-blue-400 text-lg mb-4 font-medium">
                  {selection.device}({selection.company}, {selection.groups.join(', ')})
                </h2>
                {chartType === '비교차트' && <ComparisonChart data={mockData} pageType={pageType} selectedCondition={selectedCondition} />}
                {chartType === '시계열차트' && <TimeSeriesChart data={[]} pageType={pageType} selectedCondition={selectedCondition} />}
                {chartType === '비율차트' && <RatioChart data={[]} pageType={pageType} selectedCondition={selectedCondition} />}
              </div>
            ))}
          </div>
        ) : (
          <>
            {chartType === '비교차트' && <ComparisonChart data={mockData} pageType={pageType} selectedCondition={selectedCondition} />}
            {chartType === '시계열차트' && <TimeSeriesChart data={[]} pageType={pageType} selectedCondition={selectedCondition} />}
            {chartType === '비율차트' && <RatioChart data={[]} pageType={pageType} selectedCondition={selectedCondition} />}
          </>
        )}
      </div>

      {/* 팝업 컴포넌트들 */}
      <FilterPopup 
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        maxChecked={pageType === 'device' ? 100 : 3}
        exactCount={false}
        onApply={handleFilterApply}
        selectedItems={chartType === '비율차트' ? selectedFilterItemsForRatioChart : selectedFilterItems}
        mode={chartType === '비율차트' ? 'chart' : 'default'}
      />

      <DeviceSelectPopup 
        isOpen={isDeviceSelectPopupOpen && (pageType === 'device' || selectedCondition === '기기')}
        onClose={() => setIsDeviceSelectPopupOpen(false)}
        onSelect={(selections, selectedDevices) => {
          setSelections(selections);
          setSelectedDevices(Object.values(selectedDevices).flat());
          setIsDeviceSelectPopupOpen(false);
        }}
        conditionType={selectedCondition}
        title="기기 선택"
        pageType={pageType}
        selectedDeviceIds={selections.map(s => s.device).filter(Boolean) as string[]}
      />

      <CompanyGroupPopup 
        isOpen={isCompanyGroupPopupOpen && pageType !== 'device' && selectedCondition !== '기기'}
        onClose={() => setIsCompanyGroupPopupOpen(false)}
        companies={companies}
        onSelect={handleCompanyGroupSelect}
        conditionType={selectedCondition}
        title='사업장/그룹 선택'
      />
    </div>
  );
};

export default ManagementPageTemplate; 