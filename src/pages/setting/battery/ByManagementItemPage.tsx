import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ComparisonChart from './components/ComparisonChart';
import TimeSeriesChart from './components/TimeSeriesChart';
import RatioChart from './components/RatioChart';

type ChartType = '비교차트' | '시계열차트' | '비율차트';

const ByManagementItemPage = () => {
  const { t: trans } = useTranslation('translation');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [chartType, setChartType] = useState<ChartType>('비교차트');

  const mockData = [
    { id: 'VABJ023', before: 78, after: 100, beforeDiff: -2, afterDiff: 5, level: 'L5', average: 80, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ023', user: '이두식', birthDate: '68.12.25', gender: '남성', contact: '010-8644-2468' } },
    { id: 'VABJ026', before: 57, after: 77, beforeDiff: 3, afterDiff: -8, level: 'L8', average: 70, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ026', user: '김민수', birthDate: '75.03.15', gender: '남성', contact: '010-2345-6789' } },
    { id: 'VABJ021', before: 65, after: 75, beforeDiff: 2, afterDiff: 5, level: 'L10', average: 75, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ021', user: '박지성', birthDate: '82.06.20', gender: '남성', contact: '010-3456-7890' } },
    { id: 'VABJ153', before: 88, after: 91, beforeDiff: 2, afterDiff: 5, level: 'L6', average: 85, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ153', user: '이영희', birthDate: '79.09.10', gender: '여성', contact: '010-4567-8901' } },
    { id: 'VABJ172', before: 76, after: 86, beforeDiff: 2, afterDiff: 5, level: 'L1', average: 82, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ172', user: '최철수', birthDate: '71.11.30', gender: '남성', contact: '010-5678-9012' } },
    { id: 'VABJ173', before: 78, after: 82, beforeDiff: 2, afterDiff: 5, level: 'L3', average: 80, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ173', user: '김영수', birthDate: '85.04.05', gender: '남성', contact: '010-6789-0123' } },
    { id: 'VABJ045', before: 57, after: 59, beforeDiff: 2, afterDiff: 5, level: 'L26', average: 58, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ045', user: '박미란', birthDate: '77.08.22', gender: '여성', contact: '010-7890-1234' } },
    { id: 'VABJ056', before: 71, after: 65, beforeDiff: 2, afterDiff: 5, level: 'L20', average: 68, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ056', user: '이상호', birthDate: '80.12.15', gender: '남성', contact: '010-8901-2345' } },
    { id: 'VABJ078', before: 90, after: 84, beforeDiff: 2, afterDiff: 5, level: 'L1', average: 87, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ078', user: '김태희', birthDate: '83.07.18', gender: '여성', contact: '010-9012-3456' } },
    { id: 'VABJ054', before: 88, after: 88, beforeDiff: 2, afterDiff: 5, level: 'L3', average: 88, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ054', user: '정민우', birthDate: '74.02.28', gender: '남성', contact: '010-0123-4567' } },
    { id: 'VABJ053', before: 75, after: 54, beforeDiff: 2, afterDiff: 5, level: 'L31', average: 65, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ053', user: '송혜교', birthDate: '81.05.12', gender: '여성', contact: '010-1234-5678' } },
    { id: 'VABJ012', before: 84, after: 75, beforeDiff: 2, afterDiff: 5, level: 'L10', average: 80, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ012', user: '박서준', birthDate: '76.10.25', gender: '남성', contact: '010-2345-6789' } },
    { id: 'VABJ047', before: 80, after: 76, beforeDiff: 2, afterDiff: 5, level: 'L9', average: 78, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ047', user: '김수현', birthDate: '84.01.08', gender: '남성', contact: '010-3456-7890' } },
    { id: 'VABJ145', before: 92, after: 88, beforeDiff: 2, afterDiff: 5, level: 'L4', average: 90, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ145', user: '이나영', birthDate: '78.03.20', gender: '여성', contact: '010-4567-8901' } },
    { id: 'VABJ256', before: 68, after: 82, beforeDiff: 2, afterDiff: 5, level: 'L15', average: 75, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ256', user: '최동욱', birthDate: '72.09.15', gender: '남성', contact: '010-5678-9012' } },
    { id: 'VABJ178', before: 73, after: 79, beforeDiff: 2, afterDiff: 5, level: 'L12', average: 76, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ178', user: '정유미', birthDate: '86.11.30', gender: '여성', contact: '010-6789-0123' } },
    { id: 'VABJ254', before: 85, after: 91, beforeDiff: 2, afterDiff: 5, level: 'L7', average: 88, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ254', user: '강동원', birthDate: '73.04.25', gender: '남성', contact: '010-7890-1234' } },
    { id: 'VABJ153', before: 79, after: 83, beforeDiff: 2, afterDiff: 5, level: 'L18', average: 81, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ153', user: '손예진', birthDate: '82.08.10', gender: '여성', contact: '010-8901-2345' } },
    { id: 'VABJ212', before: 66, after: 72, beforeDiff: 2, afterDiff: 5, level: 'L22', average: 69, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ212', user: '현빈', birthDate: '75.12.05', gender: '남성', contact: '010-9012-3456' } },
    { id: 'VABJ147', before: 82, after: 87, beforeDiff: 2, afterDiff: 5, level: 'L14', average: 85, info: { company: 'FF캠핑카', group: 'Bayrun640', deviceId: 'VABJ147', user: '김태리', birthDate: '87.06.18', gender: '여성', contact: '010-0123-4567' } }
  ];

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
            <div className='relative'>
              <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                {trans('차트 Type')}
              </h3>
              <div className='border border-hw-gray-4 rounded-lg p-4 pt-5'>
                <div className='flex gap-4 items-center h-10'>
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
              <div className='border border-hw-gray-4 rounded-lg p-4 pt-5'>
                <div className='flex flex-wrap gap-4 h-10 items-center'>
                  <div className='flex gap-2 items-center'>
                    <input
                      type="radio"
                      name="condition"
                      value="사업장"
                      checked={true}
                      className="form-radio text-hw-orange-1 bg-hw-dark-3 border-hw-gray-4"
                    />
                    <span className="text-hw-white-1">사업장</span>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input
                      type="radio"
                      name="condition"
                      value="그룹"
                      className="form-radio text-hw-orange-1 bg-hw-dark-3 border-hw-gray-4"
                    />
                    <span className="text-hw-white-1">그룹</span>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input
                      type="radio"
                      name="condition"
                      value="기기"
                      className="form-radio text-hw-orange-1 bg-hw-dark-3 border-hw-gray-4"
                    />
                    <span className="text-hw-white-1">기기</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='relative'>
              <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                {trans('검색 조건')}
              </h3>
              <div className='border border-hw-gray-4 rounded-lg p-4 pt-5'>
                <div className='flex flex-wrap gap-2 h-10 items-center'>
                  <select 
                    className="bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full border-none outline-none min-w-[120px]"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="">사업장</option>
                    <option value="신일운수">신일운수</option>
                  </select>
                  <select 
                    className="bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full border-none outline-none min-w-[120px]"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                  >
                    <option value="">그룹명</option>
                    <option value="영업1팀">영업1팀</option>
                    <option value="영업2팀">영업2팀</option>
                  </select>
                  <select 
                    className="bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full border-none outline-none min-w-[120px]"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                  >
                    <option value="">조회항목</option>
                    <option value="item1">항목1</option>
                    <option value="item2">항목2</option>
                  </select>
                  <select 
                    className="bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full border-none outline-none min-w-[120px]"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option value="">기간단위</option>
                    <option value="1">1개월</option>
                    <option value="3">3개월</option>
                    <option value="6">6개월</option>
                  </select>
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
    </div>
  );
};

export default ByManagementItemPage; 