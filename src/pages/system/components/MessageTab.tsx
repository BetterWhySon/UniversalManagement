import {
    ChevronFilterUpInactive,
    ChevronFilterUpActive,
    ChevronFilterDownInactive,
    ChevronFilterDownActive,
    ChevronLeft,
    ChevronLeftDouble,
    ChevronRight,
    ChevronRightDouble
  } from '@/components/icons';
  import { cn } from '@/helpers/class-name.helper';
  import { useState, useEffect, useMemo } from 'react';
  import useSystemMessage from '@/api/systemMessage';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { useTranslation } from 'react-i18next';
  import Pagination from '@/components/ui/Pagination';
  
  const LEVEL_FILTER_ITEMS = ['All', 'Alarm', 'Protection', 'P-Protection', 'E-Stop ON', 'Rmt E-Stop ON'];
  const RACKNO_FILTER_ITEMS = ['All'];
  const LEVEL_COLORS: Record<string, string> = {
    0: 'bg-hw-green-1',
    1: 'bg-hw-orange-2',
    2: 'bg-hw-orange-3',
    3: 'bg-hw-red-1',
    4: 'bg-hw-red-1',
    5: 'bg-hw-red-1',
  };
  
  export default function MessageTab() {
    const [isLevelFilterClicked, setLevelFilterClicked] = useState(false);
    const [isRackNoFilterClicked, setRackNoFilterClicked] = useState(false);
    const [selectedLevelFilter, setSelectedLevelFilter] = useState(0);
    const [selectedRackNoFilter, setSelectedRackNoFilter] = useState(0);
    const [isDateSort, setIsDateSort] = useState(false);
    const { dataList, storeDataList, sortAsc, sortDesc } = useSystemMessage();
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const itemsPerPage = 12; // 페이지당 아이템 수
    const navigate = useNavigate();
    const location = useLocation();
    const { t: trans } = useTranslation('translation');
  
    useEffect(() => {}, []);
  
    useEffect(() => {
      console.log(dataList);
      const parts = location.pathname.split('/');
      RACKNO_FILTER_ITEMS.splice(1); // 우선 첫번째(all) 빼고 나머진 삭제
      setSelectedRackNoFilter(0); // all 선택한 것으로 셋팅
      if (!parts[4]) {
        if (dataList && dataList.length > 0) {
          RACKNO_FILTER_ITEMS.push('EMS');
          for (let i = 0; i < dataList[0].rack_count; i++) {
            RACKNO_FILTER_ITEMS.push(`Rack #${i + 1}`);
          }
        }
      }
    }, [dataList]);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token === null) {
        navigate('/login');
        return;
      }
      const parts = location.pathname.split('/');
      storeDataList(Number(parts[2]), Number(parts[4]), trans);
    }, [location]);
  
    useEffect(() => {
      if (isDateSort) {
        sortAsc();
      } else {
        sortDesc();
      }
    }, [isDateSort]);
  
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    const filteredDataList = useMemo(() => {
      return dataList
        ?.filter(
          (dataRow) =>
            (dataRow.level === selectedLevelFilter || selectedLevelFilter === 0) && // level 필터
            (selectedRackNoFilter === 0 || (selectedRackNoFilter === 1 ? dataRow.rack_num == null : dataRow.rack_num === selectedRackNoFilter - 1))
        )
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // 페이지별 데이터 슬라이싱
    }, [dataList, selectedLevelFilter, selectedRackNoFilter, currentPage]);
  
    function clickLevel(level: number) {
      setLevelFilterClicked(!setLevelFilterClicked);
      setSelectedLevelFilter(level);
    }
  
    function clickRackNo(rackNo: number) {
      setRackNoFilterClicked(!setRackNoFilterClicked);
      setSelectedRackNoFilter(rackNo);
    }
  
    function getButtonStyle(type: number) {
      switch (type) {
        case 0:
          return 'Normal';
        case 1:
          return 'Alarm';
        case 2:
          return 'Protection';
        case 3:
          return 'P-Protection';
        case 4:
          return 'E-Stop ON';
        case 5:
          return 'Remote E-Stop ON';
        default:
          return 'NoData';
      }
    }
  
    const totalItems = dataList?.filter(
      (dataRow) =>
        (dataRow.level === selectedLevelFilter || selectedLevelFilter === 0) && // level 필터
        (selectedRackNoFilter === 0 || (selectedRackNoFilter === 1 ? dataRow.rack_num == null : dataRow.rack_num === selectedRackNoFilter - 1))
    ).length;
  
    return (
      <div className="w-full p-0 sm:px-[18px] lg:px-0 mb-[42px] sm:mb-0">
        <div className="w-full hidden sm:flex flex-col rounded-[8px] overflow-x-auto min-h-60">
          {/* title row */}
          <div className="w-full min-w-[850px] rounded-t-[8px] mt-[16px] lg:mt-0 flex h-[44px] bg-hw-gray-8.5 border-b-[1px] border-b-hw-gray-5 text-hw-white-2 select-none">
            <div className="w-[180px] lg:w-[304px] h-full">
              <div
                className="flex items-center h-full gap-[16px] pl-[32px] cursor-pointer text-hw-white-2 text-[14px] font-light leading-[18px]"
                onClick={() => setIsDateSort(!isDateSort)}
              >
                <span>Date</span>
                <div className="flex flex-col justify-center items-center gap-[3px]">
                  <ChevronFilterUpInactive />
                  <ChevronFilterDownInactive />
                </div>
              </div>
            </div>
            <div className="w-[184px] h-full relative">
              <div
                onClick={() => setLevelFilterClicked(!isLevelFilterClicked)}
                className="flex items-center h-full px-[32px] gap-[69px] cursor-pointer text-hw-white-2 text-[14px] font-light leading-[18px]"
              >
                <span>Level</span>
                {isLevelFilterClicked ? <ChevronFilterUpActive /> : <ChevronFilterDownActive />}
              </div>
              {isLevelFilterClicked && (
                <div className="bg-hw-gray-8.5 w-full py-2 absolute top-[43px] rounded-b-[8px]">
                  {LEVEL_FILTER_ITEMS.map((item, index) => (
                    <div
                      key={item}
                      onClick={() => clickLevel(index)}
                      className=" cursor-pointer h-[32px] flex items-center px-[32px] text-[14px] leading-[18px] font-light text-hw-white-1"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-[220px] h-full relative">
              <div
                onClick={() => setRackNoFilterClicked(!setRackNoFilterClicked)}
                className="flex items-center h-full px-[32px] gap-[49px] cursor-pointer text-hw-white-2 text-[14px] font-light leading-[18px]"
              >
                <span>System/Rack</span>
                <ChevronFilterDownActive />
              </div>
              {isRackNoFilterClicked && (
                <div className="bg-hw-gray-8.5 w-full py-2 absolute top-[43px] rounded-b-[8px]">
                  {RACKNO_FILTER_ITEMS.map((item, index) => (
                    <div
                      key={item}
                      onClick={() => clickRackNo(index)}
                      className=" cursor-pointer h-[32px] flex items-center px-[32px] text-[14px] leading-[18px] font-light text-hw-white-1"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 h-full flex items-center pl-[32px] text-hw-white-2 text-[14px] font-light leading-[18px]">
              Message
            </div>
          </div>
  
          {/* data rows */}
          {filteredDataList?.map((dataRow, index) => {
            const isEvenRow = index % 2 === 0;
            const isLastRow = index === filteredDataList.length - 1;
            return (
              <div
                key={index}
                className={cn(
                  'flex min-w-[850px] h-[48px] text-[14px] font-light leading-[18px] text-hw-white-1',
                  isEvenRow ? 'bg-hw-gray-7.5' : 'bg-hw-gray-8.5',
                  isLastRow && 'rounded-b-[8px]'
                )}
              >
                <div className="flex items-center pl-[32px] w-[180px] lg:w-[304px]  h-full">{dataRow.timestamp}</div>
                <div className="flex items-center pl-[32px] w-[184px] h-full gap-[8px]">
                  <span className={cn('w-[12px] h-[12px] rounded-full', LEVEL_COLORS[dataRow.level])}></span>
                  <span>{getButtonStyle(dataRow.level)}</span>
                </div>
                <div className="flex items-center pl-[32px] w-[220px] h-full">{dataRow.rack_num}</div>
                <div className="flex items-center pl-[32px] flex-1 h-full">{dataRow.alarm_item}</div>
              </div>
            );
          })}
        </div>
  
        {/* Pagination */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems || 0}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          marginTop="16px"
        />
      </div>
    );
  }
  