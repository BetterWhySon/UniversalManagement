import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN, OverflowX } from '@/enums/table';
import FilterPopup from '@/pages/dashboard/components/subComponents/FilterPopup';
import { cn } from '@/helpers/class-name.helper';
import DeviceSelectPopup from '@/pages/setting/battery/components/DeviceSelectPopup';

type TableDataProps = React.ComponentProps<typeof TableData<any>>;
type ColumnType = TableDataProps['columns'][number];
type DeviceSelectPopupProps = React.ComponentProps<typeof DeviceSelectPopup>;
type DeviceSelection = {
  company: string;
  group: string;
  device: string;
};

const pagination = {
  total: 0,
  pageSize: 13,
};

const useHorizontalDragScroll = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    const element = elRef.current;
    if (!element) return;

    setIsDragging(true);
    setDragStartX(e.clientX);
    setScrollStartX(element.scrollLeft);
    element.style.cursor = 'grabbing';
    element.style.userSelect = 'none';
  };

  const onMouseUp = () => {
    const element = elRef.current;
    if (!element) return;

    setIsDragging(false);
    element.style.cursor = 'grab';
    element.style.removeProperty('user-select');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const element = elRef.current;
    if (!element || !isDragging) return;

    const dx = e.clientX - dragStartX;
    element.scrollLeft = scrollStartX - dx;
  };

  useEffect(() => {
    const element = elRef.current;
    if (!element) return;

    const onMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        element.style.cursor = 'grab';
        element.style.removeProperty('user-select');
      }
    };

    element.addEventListener('mouseleave', onMouseLeave);
    return () => element.removeEventListener('mouseleave', onMouseLeave);
  }, [isDragging]);

  return {
    ref: elRef,
    handlers: {
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onMouseLeave: onMouseUp
    },
    style: { cursor: 'grab' }
  };
};

const DailyOperationPage = () => {
  const { t: trans } = useTranslation('translation');
  const [data, setData] = useState<any[]>([]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [selectedFilterItems, setSelectedFilterItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('dailyOperationFilterItems');
    return saved ? JSON.parse(saved) : [];
  });
  const dragScroll = useHorizontalDragScroll();
  const [isCompanyGroupPopupOpen, setIsCompanyGroupPopupOpen] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<'사업장' | '그룹' | '기기'>('기기');
  const [selectedDevices, setSelectedDevices] = useState<DeviceSelection[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilterApply = (items: string[]) => {
    console.log('Selected in popup:', items);
    setSelectedFilterItems(items);
    localStorage.setItem('dailyOperationFilterItems', JSON.stringify(items));
    setIsFilterPopupOpen(false);
  };

  const handleDeviceSelect: DeviceSelectPopupProps['onSelect'] = (selections, devices) => {
    console.log('Selected:', selections, devices);
    if (selections.length > 0) {
      const selectedDevice = selections[0];
      console.log('Selected device:', selectedDevice);
    }
    setIsCompanyGroupPopupOpen(false);
  };

  useEffect(() => {
    const dummyData: any[] = Array.from({ length: 26 }, (_, i) => ({
      id: i + 1,
      사업장: 'FF캠핑카',
      그룹명: 'Bayrun640',
      기기명: `VABJ${String(i + 1).padStart(3, '0')}`,
      날짜: '24.01.01',
      사용관리: 80 + Math.floor(Math.random() * 20),
      누적운용시간: Math.floor(Math.random() * 200),
      누적방전량: +(Math.random() * 90).toFixed(1),
      고속방전: Math.floor(Math.random() * 45),
      사용평균파워: +(Math.random() * 0.8).toFixed(2),
      셀과충전: Math.floor(Math.random() * 10),
      셀과방전횟수: Math.floor(Math.random() * 5),
      사용시간: Math.floor(Math.random() * 50),
      충전시간: Math.floor(Math.random() * 55),
      미사용시간: Math.floor(Math.random() * 95),
      급속충전: Math.floor(Math.random() * 8)
    }));
    setData(dummyData);
    pagination.total = dummyData.length;
  }, []);

  const baseColumns: ColumnType[] = [
    {
      name: '사업장',
      dataIndex: '사업장',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixed: 'left'
    },
    {
      name: '그룹명',
      dataIndex: '그룹명',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixed: 'left'
    },
    {
      name: '기기명',
      dataIndex: '기기명',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixed: 'left'
    },
    {
      name: '날짜',
      dataIndex: '날짜',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixed: 'left'
    }
  ];

  const columns = useMemo(() => {
    const selectedColumns = selectedFilterItems.map(item => ({
      name: item,
      dataIndex: item,
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
      width: '130px'
    }));
    return [...baseColumns, ...selectedColumns];
  }, [selectedFilterItems]);

  useEffect(() => {
    console.log('Selected Items:', selectedFilterItems);
    console.log('Generated Columns:', columns);
  }, [selectedFilterItems, columns]);

  useEffect(() => {
    const companiesData = [
      {
        name: "서울 사업장",
        groups: [
          { name: "그룹 A", devices: ["DEV001", "DEV002", "DEV003"] },
          { name: "그룹 B", devices: ["DEV004", "DEV005"] }
        ]
      },
      // ... 더 많은 데이터
    ];
    setCompanies(companiesData);
  }, []);

  return (
    <div className="px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
      <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
        <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
          일자별 배터리 운영현황
        </h1>
      </div>

      <div className='w-full bg-hw-dark-2 p-4 rounded-lg text-hw-white-1'>
        <div className='flex flex-row items-start gap-8'>
          <div className='flex flex-row items-start gap-8'>
            <div className='relative'>
              <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                검색 조건
              </h3>
              <div className='border border-hw-gray-4 rounded-lg p-3 pt-4'>
                <div className='flex flex-wrap gap-2 h-8 items-center'>
                  <button 
                    className="bg-blue-600 text-white px-3 rounded h-full border border-blue-500 min-w-[140px] hover:bg-blue-700 transition-colors"
                    onClick={() => setIsCompanyGroupPopupOpen(true)}
                  >
                    <span className="block text-center">
                      기기 선택
                    </span>
                  </button>
                  <div 
                    className="bg-hw-dark-3 text-hw-white-1 px-2 rounded h-full min-w-[140px] flex items-center cursor-pointer"
                    onClick={(e) => {
                      const input = e.currentTarget.querySelector('input');
                      if (input) input.showPicker();
                    }}
                  >
                    <input 
                      type="date" 
                      className="bg-transparent border-none outline-none w-full cursor-pointer text-center"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <span className="text-hw-white-1">~</span>
                  <div 
                    className="bg-hw-dark-3 text-hw-white-1 px-2 rounded h-full min-w-[140px] flex items-center cursor-pointer"
                    onClick={(e) => {
                      const input = e.currentTarget.querySelector('input');
                      if (input) input.showPicker();
                    }}
                  >
                    <input 
                      type="date" 
                      className="bg-transparent border-none outline-none w-full cursor-pointer text-center"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <button 
                    className="bg-blue-600 text-white px-3 rounded h-full border border-blue-500 min-w-[90px] hover:bg-blue-700 transition-colors"
                    onClick={() => setIsFilterPopupOpen(true)}
                  >
                    <span className="block text-center">
                      조회항목
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className='w-full hidden xs:block'>
          <div 
            className="overflow-x-auto"
            ref={dragScroll.ref}
            onMouseDown={dragScroll.handlers.onMouseDown}
            onMouseLeave={dragScroll.handlers.onMouseLeave}
            onMouseUp={dragScroll.handlers.onMouseUp}
            onMouseMove={dragScroll.handlers.onMouseMove}
            style={dragScroll.style}
          >
            <TableData<any>
              data={data}
              columns={columns}
              isPagination
              pagination={pagination}
              paginationMarginTop='32px'
              emptyMessage={trans('데이터가 없습니다.')}
              minWidth="1500px"
              className={cn(
                'relative',
                '[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10',
                '[&_th:nth-child(-n+4)]:sticky [&_th:nth-child(-n+4)]:z-20',
                '[&_td:nth-child(-n+4)]:sticky [&_td:nth-child(-n+4)]:z-10',
                '[&_th:nth-child(-n+4)]:bg-hw-dark-2',
                '[&_td:nth-child(-n+4)]:bg-[#363E4B]',
                '[&_th:nth-child(1)]:left-0 [&_td:nth-child(1)]:left-0',
                '[&_th:nth-child(2)]:left-[130px] [&_td:nth-child(2)]:left-[110px]',
                '[&_th:nth-child(3)]:left-[260px] [&_td:nth-child(3)]:left-[219px]',
                '[&_th:nth-child(4)]:left-[390px] [&_td:nth-child(4)]:left-[330px]',
                '[&_th]:border-r [&_th]:border-hw-gray-7',
                '[&_td]:border-r [&_td]:border-hw-gray-7',
                '[&_tr:nth-child(odd)_td]:bg-[#363E4B]'
              )}
            />
          </div>
        </div>

        <div className='w-full block xs:hidden'>
          {/* 모일 테이블 현 */}
        </div>
      </div>

      <FilterPopup 
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        maxChecked={100}
        onApply={handleFilterApply}
        selectedItems={selectedFilterItems}
        mode="default"
      />

      <DeviceSelectPopup 
        isOpen={isCompanyGroupPopupOpen}
        onClose={() => setIsCompanyGroupPopupOpen(false)}
        onSelect={handleDeviceSelect}
        conditionType="기기"
        title='기기 선택'
      />
    </div>
  );
};

export default DailyOperationPage;