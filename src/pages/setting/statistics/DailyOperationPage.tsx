import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import FilterPopup from '@/pages/dashboard/components/subComponents/FilterPopup';
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

// 드래그 스크롤 커스텀 훅
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
    // 더미 데이터 생성
    const dummyData: any[] = Array.from({ length: 26 }, (_, i) => ({
      id: i + 1,
      사업장: 'FF캠핑카',
      그룹명: 'Bayrun640',
      기기명: `VABJ${String(i + 1).padStart(3, '0')}`,
      날짜: '24.01.01',
      사용관리: 80 + Math.floor(Math.random() * 20),
      누적운용시간: Math.floor(Math.random() * 200),
      누적방전량: Math.floor(Math.random() * 90),
      고속방전: Math.floor(Math.random() * 45),
      사용평균파워: Math.floor(Math.random() * 80) / 100,
      셀과충전: Math.floor(Math.random() * 10),
      셀과방전횟수: Math.floor(Math.random() * 5),
      사용시간: Math.floor(Math.random() * 50),
      충전시간: Math.floor(Math.random() * 55),
      미사용시간: Math.floor(Math.random() * 95),
      급속충전: Math.floor(Math.random() * 8)
    }));
    setData(dummyData);
    // pagination.total = dummyData.length; // 페이지네이션 사용하지 않으므로 주석처리
  }, []);

  // 고정 컬럼 정의
  const baseColumns: ColumnType[] = [
    {
      name: '날짜',
      dataIndex: '날짜',
      paddingInline: '12px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
      width: '130px',
      className: 'fixed-column-1',
      render: (row, dataIndex) => {
        const value = row[dataIndex as keyof typeof row];
        return <span className="cell-content">{value}</span>;
      }
    }
  ];

  // 선택된 조회 항목에 대한 컬럼 생성
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

  // 고정 컬럼의 스타일을 설정하는 CSS 추가
  useEffect(() => {
    // 기존 스타일 요소가 있으면 제거
    const existingStyle = document.getElementById('fixed-table-style');
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }

    // 새 스타일 요소 생성
    const styleElement = document.createElement('style');
    styleElement.id = 'fixed-table-style';
    styleElement.innerHTML = `
      /* 글로벌 스크롤바 스타일 */
      html, body {
        scrollbar-width: thin;
        scrollbar-color: #6B7DB3 #2D3541;
      }
      
      html::-webkit-scrollbar, 
      body::-webkit-scrollbar {
        width: 14px;
        height: 14px;
        background-color: #2D3541;
      }
      
      html::-webkit-scrollbar-thumb, 
      body::-webkit-scrollbar-thumb {
        background-color: #6B7DB3;
        border-radius: 6px;
        border: 2px solid #2D3541;
      }
      
      html::-webkit-scrollbar-track, 
      body::-webkit-scrollbar-track {
        background-color: #2D3541;
      }
      
      html::-webkit-scrollbar-corner, 
      body::-webkit-scrollbar-corner {
        background-color: #2D3541;
      }
      
      /* 테이블 설정 */
      .custom-table-container {
        position: relative;
        overflow-x: auto;
        overflow-y: auto;
        max-height: 700px;
        border-radius: 8px;
        box-shadow: none;
        scrollbar-width: thin;
        scrollbar-color: #6B7DB3 #2D3541;
      }
      
      /* 테이블 레이아웃 */
      .custom-table-container table {
        border-collapse: collapse !important;
        border-spacing: 0 !important;
      }
      
      /* 스크롤바 스타일 */
      .custom-table-container::-webkit-scrollbar {
        width: 14px !important;
        height: 14px !important;
        background-color: #2D3541 !important;
      }
      
      .custom-table-container::-webkit-scrollbar-thumb {
        background-color: #6B7DB3 !important;
        border-radius: 6px !important;
        border: 2px solid #2D3541 !important;
      }
      
      .custom-table-container::-webkit-scrollbar-track {
        background-color: #2D3541 !important;
        border-radius: 6px !important;
      }
      
      .custom-table-container::-webkit-scrollbar-corner {
        background-color: #2D3541 !important;
      }
      
      /* 트랜스폼 고정 위치 버그 해결을 위한 스타일 */
      .custom-table-container table th, 
      .custom-table-container table td {
        backface-visibility: hidden;
        transform: translateZ(0);
        padding: 8px 12px !important;
      }
      
      /* 테이블 행 스타일 */
      .custom-table-container table tr {
        background-color: transparent !important;
      }
      
      /* 셀 컨텐츠 스타일 */
      .cell-content {
        display: block;
        height: 100%;
        width: 100%;
      }
      
      /* 고정 컬럼 1 (날짜) */
      .custom-table-container table th:nth-child(1) {
        position: sticky !important;
        left: 0 !important;
        z-index: 30 !important;
        background-color: #2D3541 !important;
        border-right: 2px solid rgba(64, 73, 88, 1) !important;
        width: 130px !important;
        max-width: 130px !important;
        min-width: 130px !important;
      }
      
      .custom-table-container table td:nth-child(1) {
        position: sticky !important;
        left: 0 !important;
        z-index: 20 !important;
        border-right: 2px solid rgba(64, 73, 88, 1) !important;
        width: 130px !important;
        max-width: 130px !important;
        min-width: 130px !important;
        box-sizing: border-box !important;
      }
      
      /* 홀수 행의 고정 컬럼 배경색 */
      .custom-table-container table tbody tr:nth-child(odd) td:nth-child(1) {
        background-color: #363E4B !important;
      }
      
      /* 짝수 행의 고정 컬럼 배경색 */
      .custom-table-container table tbody tr:nth-child(even) td:nth-child(1) {
        background-color: #2D3541 !important;
      }
      
      /* 호버 시 고정 컬럼 배경색 */
      .custom-table-container table tbody tr:hover td:nth-child(1) {
        background-color: #414C5E !important;
      }
      
      /* 일반 셀 스타일 */
      .custom-table-container table td {
        height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      /* 일반 홀수 행 스타일 */
      .custom-table-container table tbody tr:nth-child(odd) td {
        background-color: #363E4B;
      }
      
      /* 일반 짝수 행 스타일 */
      .custom-table-container table tbody tr:nth-child(even) td {
        background-color: #2D3541;
      }
      
      /* 일반 호버 스타일 */
      .custom-table-container table tbody tr:hover td {
        background-color: #414C5E;
      }
      
      /* 헤더 스타일 */
      .custom-table-container table th {
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: #2D3541;
        height: 50px;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

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

      <div className='w-full bg-hw-dark-2 py-1 px-2 rounded-lg text-hw-white-1 mb-0.5'>
        <div className='flex flex-row items-center gap-2'>
          <button 
            className="bg-blue-600 text-white px-3 rounded h-6 border border-blue-500 min-w-[90px] hover:bg-blue-700 transition-colors"
            onClick={() => setIsCompanyGroupPopupOpen(true)}
          >
            <span className="block text-center text-sm">
              기기 선택
            </span>
          </button>
          <div 
            className="bg-hw-dark-3 text-hw-white-1 px-2 rounded h-6 min-w-[120px] flex items-center cursor-pointer"
            onClick={(e) => {
              const input = e.currentTarget.querySelector('input');
              if (input) input.showPicker();
            }}
          >
            <input 
              type="date" 
              className="bg-transparent border-none outline-none w-full cursor-pointer text-center text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <span className="text-hw-white-1">~</span>
          <div 
            className="bg-hw-dark-3 text-hw-white-1 px-2 rounded h-6 min-w-[120px] flex items-center cursor-pointer"
            onClick={(e) => {
              const input = e.currentTarget.querySelector('input');
              if (input) input.showPicker();
            }}
          >
            <input 
              type="date" 
              className="bg-transparent border-none outline-none w-full cursor-pointer text-center text-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button 
            className="bg-blue-600 text-white px-3 rounded h-6 border border-blue-500 min-w-[80px] hover:bg-blue-700 transition-colors"
            onClick={() => setIsFilterPopupOpen(true)}
          >
            <span className="block text-center text-sm">
              조회항목
            </span>
          </button>
          <div className="ml-4 flex items-center">
            <span className="text-sm mr-2">사업장: </span>
            <span className="text-sm text-blue-400 mr-4">FF캠핑카</span>
            <span className="text-sm mr-2">그룹명: </span>
            <span className="text-sm text-blue-400 mr-4">Bayrun640</span>
            <span className="text-sm mr-2">기기명: </span>
            <span className="text-sm text-blue-400">VABJ023</span>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className='w-full hidden xs:block'>
          <div 
            className="custom-table-container"
            ref={dragScroll.ref}
            onMouseDown={dragScroll.handlers.onMouseDown}
            onMouseLeave={dragScroll.handlers.onMouseLeave}
            onMouseUp={dragScroll.handlers.onMouseUp}
            onMouseMove={dragScroll.handlers.onMouseMove}
            style={{
              ...dragScroll.style,
              position: 'relative',
              overflowX: 'auto',
              overflowY: 'auto',
              height: '700px',
              background: 'transparent',
              borderRadius: '8px'
            }}
          >
            <div className="table-divider-line" style={{
              position: 'absolute',
              top: 0,
              left: '130px',
              width: '1px',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              zIndex: 40,
              pointerEvents: 'none'
            }}></div>
            <div className="fixed-column-backdrop" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '130px',
              height: '100%',
              backgroundColor: '#2D3541',
              zIndex: 15,
              pointerEvents: 'none'
            }}></div>
            <TableData<any>
              data={data}
              columns={columns}
              isPagination={false}
              emptyMessage={trans('데이터가 없습니다.')}
              minWidth="1500px"
              style={{ 
                position: 'relative', 
                backgroundColor: '#2D3541',
                boxShadow: 'none'
              }}
            />
          </div>
        </div>

        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 뷰 */}
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
        selectedDeviceIds={selectedDevices.map(item => item.device)}
      />
    </div>
  );
};

export default DailyOperationPage;