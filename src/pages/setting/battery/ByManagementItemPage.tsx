import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ComparisonChart from './components/ComparisonChart';
import TimeSeriesChart from './components/TimeSeriesChart';
import RatioChart from './components/RatioChart';
import FilterPopup from '@/pages/dashboard/components/subComponents/FilterPopup';
import CompanyGroupPopup from './components/CompanyGroupPopup';

type ChartType = '비교차트' | '시계열차트' | '비율차트';
type ConditionType = '사업장' | '그룹' | '기기';

interface Selection {
  company: string;
  groups: string[];
}

const companies = [
  {
    name: "서울 사업장",
    groups: [
      { name: "그룹 A", devices: ["DEV001", "DEV002", "DEV003"] },
      { name: "그룹 B", devices: ["DEV004", "DEV005"] }
    ]
  },
  {
    name: "부산 사업장",
    groups: [
      { name: "그룹 A", devices: ["DEV006", "DEV007", "DEV008"] },
      { name: "그룹 B", devices: ["DEV009", "DEV010"] }
    ]
  },
  {
    name: "대구 사업장",
    groups: [
      { name: "그룹 A", devices: ["DEV011", "DEV012", "DEV013"] },
      { name: "그룹 B", devices: ["DEV014", "DEV015"] },
      { name: "그룹 C", devices: ["DEV016", "DEV017"] }
    ]
  },
  {
    name: "인천 사업장",
    groups: [
      { name: "그룹 A", devices: ["DEV018", "DEV019", "DEV020"] },
      { name: "그룹 B", devices: ["DEV021", "DEV022"] },
      { name: "그룹 C", devices: ["DEV023", "DEV024", "DEV025"] }
    ]
  }
];

const mockData = [
  { id: 'VABJ001', before: 85, after: 92, beforeDiff: 5, afterDiff: 2, level: 'normal', average: 90, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ001', user: '김영식', birthDate: '1975-05-21', gender: '남', contact: '010-1234-5678' } },
  { id: 'VABJ002', before: 78, after: 88, beforeDiff: -2, afterDiff: 3, level: 'warning', average: 85, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ002', user: '이철수', birthDate: '1980-03-15', gender: '남', contact: '010-2345-6789' } },
  { id: 'VABJ003', before: 92, after: 95, beforeDiff: 8, afterDiff: 5, level: 'good', average: 93, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ003', user: '박영희', birthDate: '1982-11-30', gender: '여', contact: '010-3456-7890' } },
  { id: 'VABJ004', before: 75, after: 82, beforeDiff: -5, afterDiff: -3, level: 'warning', average: 80, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ004', user: '최민수', birthDate: '1978-07-25', gender: '남', contact: '010-4567-8901' } },
  { id: 'VABJ005', before: 88, after: 91, beforeDiff: 3, afterDiff: 1, level: 'normal', average: 89, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ005', user: '정미영', birthDate: '1985-09-12', gender: '여', contact: '010-5678-9012' } },
  { id: 'VABJ006', before: 82, after: 87, beforeDiff: -1, afterDiff: 2, level: 'normal', average: 86, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ006', user: '김민재', birthDate: '1983-12-05', gender: '남', contact: '010-6789-0123' } },
  { id: 'VABJ007', before: 79, after: 84, beforeDiff: -3, afterDiff: -1, level: 'warning', average: 83, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ007', user: '이지원', birthDate: '1979-08-17', gender: '여', contact: '010-7890-1234' } },
  { id: 'VABJ008', before: 91, after: 94, beforeDiff: 6, afterDiff: 4, level: 'good', average: 92, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ008', user: '박준호', birthDate: '1981-04-23', gender: '남', contact: '010-8901-2345' } },
  { id: 'VABJ009', before: 84, after: 89, beforeDiff: 2, afterDiff: 0, level: 'normal', average: 87, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ009', user: '김서연', birthDate: '1984-10-08', gender: '여', contact: '010-9012-3456' } },
  { id: 'VABJ010', before: 77, after: 83, beforeDiff: -4, afterDiff: -2, level: 'warning', average: 81, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ010', user: '최동훈', birthDate: '1977-06-14', gender: '남', contact: '010-0123-4567' } },
  { id: 'VABJ011', before: 86, after: 90, beforeDiff: 4, afterDiff: 1, level: 'normal', average: 88, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ011', user: '정영', birthDate: '1986-02-19', gender: '여', contact: '010-1234-5679' } },
  { id: 'VABJ012', before: 93, after: 96, beforeDiff: 7, afterDiff: 6, level: 'good', average: 94, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ012', user: '이태준', birthDate: '1982-12-01', gender: '남', contact: '010-2345-6780' } },
  { id: 'VABJ013', before: 81, after: 86, beforeDiff: 0, afterDiff: -1, level: 'normal', average: 84, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ013', user: '김민지', birthDate: '1983-07-27', gender: '여', contact: '010-3456-7891' } },
  { id: 'VABJ014', before: 76, after: 81, beforeDiff: -6, afterDiff: -4, level: 'warning', average: 79, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ014', user: '박성민', birthDate: '1980-01-11', gender: '남', contact: '010-4567-8902' } }
];

const ByManagementItemPage = () => {
  const { t: trans } = useTranslation('translation');
  const [chartType, setChartType] = useState<ChartType>('비교차트');
  const [selectedCondition, setSelectedCondition] = useState<ConditionType>('사업장');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<string>('');
  const [selectedFilterItems, setSelectedFilterItems] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isCompanyGroupPopupOpen, setIsCompanyGroupPopupOpen] = useState(false);
  const [selections, setSelections] = useState<Selection[]>([]);

  const handleFilterApply = (items: string[]) => {
    setSelectedFilterItems(items);
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

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            관리항목별 조회
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
                          onChange={(e) => setChartType(e.target.value as ChartType)}
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
                      onClick={() => setIsCompanyGroupPopupOpen(true)}
                    >
                      <span className="block text-center">
                        {selectedCompanyGroup || '사업장/그룹 선택'}
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
                  {selectedFilterItems.length > 0 && (
                    <>
                      <span className="text-gray-400">/</span>
                      <span className="text-green-400 whitespace-normal leading-tight">
                        {selectedFilterItems.join(', ')}
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
                  {!selections.length && !selectedFilterItems.length && !selectedPeriod && (
                    <span className="text-gray-400 leading-tight">선택된 조건이 없습니다</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[18px] lg:px-[55px] pb-8">
        {chartType === '비교차트' && <ComparisonChart data={mockData} />}
        {chartType === '시계열차트' && <TimeSeriesChart data={[]} />}
        {chartType === '비율차트' && <RatioChart data={[]} />}
      </div>

      {/* 팝업 컴포넌트들 */}
      <FilterPopup 
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        maxChecked={3}
        exactCount={true}
        onApply={handleFilterApply}
        selectedItems={selectedFilterItems}
      />

      <CompanyGroupPopup 
        isOpen={isCompanyGroupPopupOpen}
        onClose={() => setIsCompanyGroupPopupOpen(false)}
        companies={companies}
        onSelect={handleCompanyGroupSelect}
        conditionType={selectedCondition}
      />
    </div>
  );
};

export default ByManagementItemPage; 