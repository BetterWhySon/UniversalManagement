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

interface Selection {
  company: string;
  groups: string[];
}

interface ManagementPageTemplateProps {
  title: string;
  defaultChartType?: ChartType;
  companies: any[];
  mockData: any[];
  pageType: 'item' | 'device';
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
  const [selectedCondition, setSelectedCondition] = useState<ConditionType>('사��장');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<string>('');
  const [selectedFilterItems, setSelectedFilterItems] = useState<string[]>([]);
  const [selectedFilterItemsForRatioChart, setSelectedFilterItemsForRatioChart] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isCompanyGroupPopupOpen, setIsCompanyGroupPopupOpen] = useState(false);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isDeviceSelectPopupOpen, setIsDeviceSelectPopupOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

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

  const handleDeviceSelect = (devices: string[]) => {
    setSelectedDevices(devices);
    setIsDeviceSelectPopupOpen(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
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
                          name="condition"
                          value={condition}
                          checked={selectedCondition === condition}
                          onChange={(e) => setSelectedCondition(e.target.value as ConditionType)}
                          className="form-radio text-hw-orange-1 bg-hw-dark-3 border-hw-gray-4"
                        />
                        <span className="text-hw-white-1">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='relative w-[400px]'>
                <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                  {trans('검색조건')}
                </h3>
                <div className='border border-hw-gray-4 rounded-lg p-3 pt-4'>
                  <div className='flex flex-wrap gap-2 h-8 items-center'>
                    <button 
                      className="bg-blue-600 text-white px-3 rounded h-full border border-blue-500 min-w-[140px] hover:bg-blue-700 transition-colors"
                      onClick={() => pageType === 'device' ? setIsDeviceSelectPopupOpen(true) : setIsCompanyGroupPopupOpen(true)}
                    >
                      <span className="block text-center">
                        {selectedCompanyGroup || (pageType === 'device' ? '기기 선택' : '사업장/그룹 선택')}
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
                      className="bg-hw-dark-3 text-hw-white-1 px-2 rounded h-full border-none outline-none min-w-[80px]"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      <option value="">기간단위</option>
                      <option value="daily">일간</option>
                      <option value="weekly">주간</option>
                      <option value="monthly">월간</option>
                      <option value="yearly">연간</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className='h-[60px] flex-1'>
              <div className="text-white h-full overflow-y-auto">
                <div className="flex flex-wrap gap-1 min-h-full items-center text-sm">
                  {selections.length > 0 && (
                    <span className="text-blue-400 font-medium whitespace-normal leading-tight">
                      {selections.map(sel => {
                        const groupText = sel.groups.length > 0 ? `(${sel.groups.join(', ')})` : '';
                        return `${sel.company}${groupText}`;
                      }).join(', ')}
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

      <div className="flex-1 overflow-y-auto px-[18px] lg:px-[55px] pb-8">
        {chartType === '비교차트' && <ComparisonChart data={mockData} pageType={pageType} />}
        {chartType === '시계열차트' && <TimeSeriesChart data={[]} pageType={pageType} />}
        {chartType === '비율차트' && <RatioChart data={[]} pageType={pageType} />}
      </div>

      {/* 팝업 컴포넌트들 */}
      <FilterPopup 
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        maxChecked={3}
        exactCount={true}
        onApply={handleFilterApply}
        selectedItems={chartType === '비율차트' ? selectedFilterItemsForRatioChart : selectedFilterItems}
        mode={chartType === '비율차트' ? 'chart' : 'default'}
      />

      <CompanyGroupPopup 
        isOpen={isCompanyGroupPopupOpen}
        onClose={() => setIsCompanyGroupPopupOpen(false)}
        companies={companies}
        onSelect={handleCompanyGroupSelect}
        conditionType={selectedCondition}
        title={pageType === 'device' ? '기기 선택' : '사업장/그룹 선택'}
      />
    </div>
  );
};

export default ManagementPageTemplate; 