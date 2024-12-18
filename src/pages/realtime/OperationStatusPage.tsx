import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';

interface Group {
  name: string;
  devices: string[];
}

interface Company {
  name: string;
  groups: Group[];
  전기차운영대수: string;
  배터리운영대수: string;
  배터리설치용량: string;
  배터리누적방전용량: string;
  운영효율: string;
}

const pagination = {
  total: 0,
  pageSize: 8,
};

const OperationStatusPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');

  const summaryData = {
    total: {
      전기차운영대수: "70대",
      배터리운영대수: "70대",
      배터리설치용량: "7,200kWh"
    },
    companies: [
      {
        name: "서울 사업장",
        전기차운영대수: "30대",
        배터리운영대수: "30대",
        배터리설치용량: "3,000kWh",
        배터리누적방전용량: "2,800kWh",
        운영효율: "86%",
        groups: [
          {
            name: "그룹 A",
            devices: ["DEV001", "DEV002", "DEV003"],
            전기차운영대수: "20대",
            배터리설치용량: "2,000kWh",
            배터리누적방전용량: "1,800kWh",
            배터리효율: "92%",
            운영효율: "86%"
          },
          {
            name: "그룹 B",
            devices: ["DEV004", "DEV005"],
            전기차운영대수: "10대",
            배터리설치용량: "1,000kWh",
            배터리누적방전용량: "1,000kWh",
            배터리효율: "90%",
            운영효율: "85%"
          }
        ]
      },
      {
        name: "부산 사업장",
        전기차운영대수: "40대",
        배터리운영대수: "40대",
        배터리설치용량: "4,200kWh",
        배터리누적방전용량: "4,000kWh",
        운영효율: "74%",
        groups: [
          {
            name: "그룹 A",
            devices: ["DEV006", "DEV007", "DEV008"],
            전기차운영대수: "25대",
            배터리설치용량: "2,500kWh",
            배터리누적방전용량: "2,300kWh",
            배터리효율: "95%",
            운영효율: "78%"
          },
          {
            name: "그룹 B",
            devices: ["DEV009", "DEV010"],
            전기차운영대수: "15대",
            배터리설치용량: "1,700kWh",
            배터리누적방전용량: "1,700kWh",
            배터리효율: "91%",
            운영효율: "70%"
          }
        ]
      }
    ]
  };

  const [batteryDetailData] = useState([
    { id: 1, 사업장: "서울 사업장", 그룹: "그룹 A", 기기no: "DEV001", 배터리번호: "BAT001", 실시간상태정보: "정상", SOC: "85%", 전압: "48.2V", 전류: "12A", 온도: "25°C", 저항: "0.5Ω", SOC변화: "+2%", 전압변화: "+0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 2, 사업장: "서울 사업장", 그룹: "그룹 A", 기기no: "DEV002", 배터리번호: "BAT002", 실시간상태정보: "충전중", SOC: "45%", 전압: "47.8V", 전류: "15A", 온도: "28°C", 저항: "0.6Ω", SOC변화: "+5%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "온도상승", 관리알람: "점검필요", 기타: "-" },
    { id: 3, 사업장: "서울 사업장", 그룹: "그룹 A", 기기no: "DEV003", 배터리번호: "BAT003", 실시간상태정보: "방전중", SOC: "65%", 전압: "48.0V", 전류: "-10A", 온도: "24°C", 저항: "0.4Ω", SOC변화: "-3%", 전압변화: "-0.1V", 온도변화: "0°C", 용량변화: "-0.3kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 4, 사업장: "서울 사업장", 그룹: "그룹 B", 기기no: "DEV004", 배터리번호: "BAT004", 실시간상태정보: "대기", SOC: "90%", 전압: "48.5V", 전류: "0A", 온도: "22°C", 저항: "0.5Ω", SOC변화: "0%", 전압변화: "0V", 온도변화: "-1°C", 용량변화: "0kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 5, 사업장: "서울 사업장", 그룹: "그룹 B", 기기no: "DEV005", 배터리번호: "BAT005", 실시간상태정보: "충전중", SOC: "30%", 전압: "47.5V", 전류: "18A", 온도: "29°C", 저항: "0.7Ω", SOC변화: "+6%", 전압변화: "+0.3V", 온도변화: "+3°C", 용량변화: "-0.2kWh", 이상알람: "과전류", 관리알람: "주의", 기타: "-" },
    { id: 6, 사업장: "부산 사업장", 그룹: "그룹 A", 기기no: "DEV006", 배터리번호: "BAT006", 실시간상태정보: "방전중", SOC: "70%", 전압: "48.1V", 전류: "-8A", 온도: "26°C", 저항: "0.5Ω", SOC변화: "-2%", 전압변화: "-0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 7, 사업장: "부산 사업장", 그룹: "그룹 A", 기기no: "DEV007", 배터리번호: "BAT007", 실시간상태정보: "충전중", SOC: "55%", 전압: "47.9V", 전류: "14A", 온도: "27°C", 저항: "0.6Ω", SOC변화: "+4%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "-", 관리알람: "점검필요", 기타: "-" },
    { id: 8, 사업장: "부산 사업장", 그룹: "그룹 A", 기기no: "DEV008", 배터리번호: "BAT008", 실시간상태정보: "대기", SOC: "95%", 전압: "48.6V", 전류: "0A", 온도: "23°C", 저항: "0.4Ω", SOC변화: "0%", 전압변화: "0V", 온도변화: "-1°C", 용량변화: "0kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 9, 사업장: "부산 사업장", 그룹: "그룹 B", 기기no: "DEV009", 배터리번호: "BAT009", 실시간상태정보: "충전중", SOC: "40%", 전압: "47.7V", 전류: "16A", 온도: "28°C", 저항: "0.6Ω", SOC변화: "+5%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "온도상승", 관리알람: "주의", 기타: "-" },
    { id: 10, 사업장: "부산 사업장", 그룹: "그룹 B", 기기no: "DEV010", 배터리번호: "BAT010", 실시간상태정보: "방전��", SOC: "75%", 전압: "48.2V", 전류: "-9A", 온도: "25°C", 저항: "0.5Ω", SOC변화: "-2%", 전압변화: "-0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" }
  ]);

  const columns = [
    {
      name: '사업장',
      dataIndex: '사업장',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '150px',
    },
    {
      name: '그룹',
      dataIndex: '그룹',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '130px',
    },
    {
      name: '기기 no.',
      dataIndex: '기기no',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '130px',
    },
    {
      name: '배터리 번호',
      dataIndex: '배터리번호',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '130px',
    },
    {
      name: '실시간 상태정보',
      dataIndex: '실시간태정보',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    },
    {
      name: 'SOC',
      dataIndex: 'SOC',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '전압',
      dataIndex: '전압',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '전류',
      dataIndex: '전류',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '온도',
      dataIndex: '온도',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '저항',
      dataIndex: '저항',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: 'SOC 변화',
      dataIndex: 'SOC변화',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '전압 변화',
      dataIndex: '전압변화',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '온도 변화',
      dataIndex: '온도변화',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '용량 변화',
      dataIndex: '용량변화',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '이상알람',
      dataIndex: '이상알람',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
    {
      name: '관리��람',
      dataIndex: '관리알람',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
    {
      name: '기타',
      dataIndex: '기타',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
  ];

  // 스크롤 관련 상태와 핸들러 추가
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [showGroupView, setShowGroupView] = useState<string | null>(null);

  // 필터링된 데이터 계산
  const filteredBatteryData = React.useMemo(() => {
    if (showGroupView) {
      // 그룹별 보기 때
      if (selectedCompany) {
        // 특정 그룹이 선택된 경우
        return batteryDetailData.filter(
          item => item.사업장 === showGroupView && item.그룹 === selectedCompany
        );
      }
      // 그룹이 선택되지 않은 경우 해당 사업장의 모든 데이터
      return batteryDetailData.filter(item => item.사업장 === showGroupView);
    }
    
    // 일반 업장 선택일 때
    if (selectedCompany) {
      return batteryDetailData.filter(item => item.사업장 === selectedCompany);
    }
    
    // 아무것도 선택되지 않았을 때
    return batteryDetailData;
  }, [batteryDetailData, selectedCompany, showGroupView]);

  // 배터리 종합현황 카드 내용
  const renderSummaryCard = () => {
    if (showGroupView) {
      const company = summaryData.companies.find(c => c.name === showGroupView);
      if (!company) return null;

      return (
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-hw-white-1 text-lg font-medium">{company.name}</h2>
            <button 
              className="text-sm text-blue-400 hover:text-blue-300 px-2 py-1 border border-blue-400 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setShowGroupView(null);
              }}
            >
              돌아가기
            </button>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">전기차 운영 대수</span>
              <span className="text-white text-lg">50대</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">배터리 설치 용량</span>
              <span className="text-white text-lg">6,000kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">배터리 누적방전용량</span>
              <span className="text-white text-lg">5,000kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">배터리 효율</span>
              <span className="text-white text-lg">99%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">운영효율</span>
              <span className="text-white text-lg">55%</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        <h2 className="text-hw-white-1 text-lg font-medium mb-2">배터리 종합현황</h2>
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-600/50 pb-3">
            <span className="text-gray-400 text-sm">전기차 운영 대수</span>
            <span className="text-blue-400 text-2xl font-bold">{summaryData.total.전기차운영대수}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-600/50 pb-3">
            <span className="text-gray-400 text-sm">배터리 운영 대수</span>
            <span className="text-green-400 text-2xl font-bold">{summaryData.total.배터리운영대수}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">배터리 설치 용량</span>
            <span className="text-yellow-400 text-2xl font-bold">{summaryData.total.배터리설치용량}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-4 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            실시간 운영현황
          </h1>
        </div>

        {/* 카드 영역 */}
        <div className="flex gap-4">
          {/* 배터리 종합현황 카드 */}
          <div 
            className={`w-[300px] h-[230px] flex-shrink-0 bg-hw-dark-2 p-4 rounded-lg cursor-pointer overflow-hidden
              ${!selectedCompany ? 'border-[4px] border-blue-500' : 'border-[4px] border-blue-500/50'}`}
            onClick={() => {
              if (showGroupView) {
                setSelectedCompany(null);
              } else {
                setSelectedCompany(null);
                setShowGroupView(null);
              }
            }}
          >
            {renderSummaryCard()}
          </div>

          {/* 사업장별 현황 카드들 - 스크롤 영역 */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-x-auto"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex gap-4 min-w-min cursor-grab active:cursor-grabbing select-none">
              {showGroupView ? (
                // 그룹별 보기
                <div className="flex gap-4">
                  {summaryData.companies
                    .find(c => c.name === showGroupView)
                    ?.groups.map((group, index) => (
                      <div 
                        key={index} 
                        className={`w-[250px] flex-shrink-0 bg-hw-dark-2 p-4 rounded-lg cursor-pointer 
                          ${selectedCompany === group.name ? 'border-2 border-blue-400' : ''}`}
                        onClick={() => setSelectedCompany(
                          selectedCompany === group.name ? null : group.name
                        )}
                      >
                        <h3 className="text-hw-white-1 text-lg mb-3">{group.name}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">전기차 운영 대수</span>
                            <span className="text-hw-white-1">{group.전기차운영대수}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">배터리 설치 용량</span>
                            <span className="text-hw-white-1">{group.배터리설치용량}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">배터리 누적방전용량</span>
                            <span className="text-hw-white-1">{group.배터리누적방전용량}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">배터리 효율</span>
                            <span className="text-hw-white-1">{group.배터리효율}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">운영효율</span>
                            <span className="text-hw-white-1">{group.운영효율}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                // 기존 사업장별 보기
                summaryData.companies.map((company, index) => (
                  <div 
                    key={index} 
                    className={`w-[250px] flex-shrink-0 bg-hw-dark-2 p-4 rounded-lg cursor-pointer 
                      ${selectedCompany === company.name ? 'border-2 border-blue-400' : ''}`}
                    onClick={() => setSelectedCompany(
                      selectedCompany === company.name ? null : company.name
                    )}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-hw-white-1 text-lg">{company.name}</h3>
                      <button 
                        className="text-xs text-blue-400 hover:text-blue-300 px-1.5 py-0.5 border border-blue-400 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowGroupView(showGroupView === company.name ? null : company.name);
                          setSelectedCompany(null);
                        }}
                      >
                        그룹별
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">전기차 운영 대수</span>
                        <span className="text-hw-white-1">{company.전기차운영대수}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">배터리 운영 대수</span>
                        <span className="text-hw-white-1">{company.배터리운영대수}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">배터리 설치 용량</span>
                        <span className="text-hw-white-1">{company.배터리설치용량}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">배터리 누적방전용량</span>
                        <span className="text-hw-white-1">{company.배터리누적방전용량}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">운영효율</span>
                        <span className="text-hw-white-1">{company.운영효율}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 실시간 배터리 운영 현황 세부 테이블 */}
      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-hw-white-1 text-lg">
            실시간 배터리 운영 현황 세부
            {showGroupView 
              ? selectedCompany
                ? ` - ${showGroupView} > ${selectedCompany}`  // 사업장 > 그룹 형태로 표���
                : ` - ${showGroupView}`
              : selectedCompany 
                ? ` - ${selectedCompany}` 
                : ''
            }
          </h2>
          {selectedCompany && (
            <button 
              className="text-sm text-gray-400 hover:text-white px-3 py-1.5 border border-gray-400 rounded"
              onClick={() => setSelectedCompany(null)}
            >
              전체보기
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <TableData<typeof batteryDetailData[0]>
            data={filteredBatteryData}
            columns={columns}
            isPagination
            pagination={{
              total: filteredBatteryData.length,
              pageSize: 8,
            }}
            paginationMarginTop='32px'
            emptyMessage='데이터가 없습니다.'
          />
        </div>
      </div>
    </div>
  );
};  

export default OperationStatusPage; 