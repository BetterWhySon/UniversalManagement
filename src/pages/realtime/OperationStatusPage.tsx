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
      배터리운용대수: "70대",
      배터리설치용량: "7,200kWh",
      운영효율: "85%",
      데이터연동율: "98%"
    },
    companies: [
      {
        name: "서울 사업장",
        배터리운용대수: "30대",
        배터리설치용량: "3,000kWh",
        운영효율: "86%",
        데이터연동율: "99%",
        groups: [
          {
            name: "그룹 A",
            devices: ["DEV001", "DEV002", "DEV003"],
            배터리운용대수: "20대",
            배터리설치용량: "2,000kWh",
            운영효율: "88%",
            데이터연동율: "100%"
          },
          {
            name: "그룹 B",
            devices: ["DEV004", "DEV005"],
            배터리운용대수: "10대",
            배터리설치용량: "1,000kWh",
            운영효율: "84%",
            데이터연동율: "98%"
          }
        ]
      },
      {
        name: "부산 사업장",
        배터리운용대수: "40대",
        배터리설치용량: "4,200kWh",
        운영효율: "84%",
        데이터연동율: "97%",
        groups: [
          {
            name: "그룹 A",
            devices: ["DEV006", "DEV007", "DEV008"],
            배터리운용대수: "25대",
            배터리설치용량: "2,500kWh",
            운영효율: "86%",
            데이터연동율: "96%"
          },
          {
            name: "그룹 B",
            devices: ["DEV009", "DEV010"],
            배터리운용대수: "15대",
            배터리설치용량: "1,700kWh",
            운영효율: "82%",
            데이터연동율: "98%"
          }
        ]
      }
    ]
  };

  const [batteryDetailData] = useState([
    { id: 1, 사업장: "서울 사업장", 그룹: "그룹 A", 기기명: "DEV001", 어플리케이션: "지게차", 실시간상태정보: "정상", SOC: "85%", 팩전압: "48.2V", 전압: "3.7V", 전류: "12A", 배터리온도: "25°C", 시스템온도: "28°C", 운영효율: "92%", 데이터연동율: "100%", 이상알람: "-", 관리알람: "-" },
    { id: 2, 사업장: "서울 사업장", 그룹: "그룹 A", 기기명: "DEV002", 어플리케이션: "지게차", 실시간상태정보: "충전중", SOC: "45%", 팩전압: "47.8V", 전압: "3.6V", 전류: "15A", 배터리온도: "28°C", 시스템온도: "30°C", 운영효율: "88%", 데이터연동율: "99%", 이상알람: "온도상승", 관리알람: "점검필요" },
    { id: 3, 사업장: "서울 사업장", 그룹: "그룹 A", 기기명: "DEV003", 어플리케이션: "AGV", 실시간상태정보: "방전중", SOC: "65%", 팩전압: "48.0V", 전압: "3.7V", 전류: "-10A", 배터리온도: "24°C", 시스템온도: "27°C", 운영효율: "90%", 데이터연동율: "100%", 이상알람: "-", 관리알람: "-" },
    { id: 4, 사업장: "서울 사업장", 그룹: "그룹 B", 기기명: "DEV004", 어플리케이션: "AGV", 실시간상태정보: "대기", SOC: "90%", 팩전압: "48.5V", 전압: "3.7V", 전류: "0A", 배터리온도: "22°C", 시스템온도: "25°C", 운영효율: "95%", 데이터연동율: "100%", 이상알람: "-", 관리알람: "-" },
    { id: 5, 사업장: "서울 사업장", 그룹: "그룹 B", 기기명: "DEV005", 어플리케이션: "지게차", 실시간상태정보: "충전중", SOC: "30%", 팩전압: "47.5V", 전압: "3.6V", 전류: "18A", 배터리온도: "29°C", 시스템온도: "31°C", 운영효율: "87%", 데이터연동율: "98%", 이상알람: "과전류", 관리알람: "주의" },
    { id: 6, 사업장: "부산 사업장", 그룹: "그룹 A", 기기명: "DEV006", 어플리케이션: "지게차", 실시간상태정보: "방전중", SOC: "70%", 팩전압: "48.1V", 전압: "3.7V", 전류: "-8A", 배터리온도: "26°C", 시스템온도: "28°C", 운영효율: "91%", 데이터연동율: "100%", 이상알람: "-", 관리알람: "-" },
    { id: 7, 사업장: "부산 사업장", 그룹: "그룹 A", 기기명: "DEV007", 어플리케이션: "AGV", 실시간상태정보: "충전중", SOC: "55%", 팩전압: "47.9V", 전압: "3.6V", 전류: "14A", 배터리온도: "27°C", 시스템온도: "29°C", 운영효율: "89%", 데이터연동율: "99%", 이상알람: "-", 관리알람: "점검필요" },
    { id: 8, 사업장: "부산 사업장", 그룹: "그룹 A", 기기명: "DEV008", 어플리케이션: "지게차", 실시간상태정보: "대기", SOC: "95%", 팩전압: "48.6V", 전압: "3.7V", 전류: "0A", 배터리온도: "23°C", 시스템온도: "26°C", 운영효율: "94%", 데이터연동율: "100%", 이상알람: "-", 관리알람: "-" },
    { id: 9, 사업장: "부산 사업장", 그룹: "그룹 B", 기기명: "DEV009", 어플리케이션: "AGV", 실시간상태정보: "충전중", SOC: "40%", 팩전압: "47.7V", 전압: "3.6V", 전류: "16A", 배터리온도: "28°C", 시스템온도: "30°C", 운영효율: "88%", 데이터연동율: "98%", 이상알람: "온도상승", 관리알람: "주의" },
    { id: 10, 사업장: "부산 사업장", 그룹: "그룹 B", 기기명: "DEV010", 어플리케이션: "지게차", 실시간상태정보: "방전중", SOC: "75%", 팩전압: "48.2V", 전압: "3.7V", 전류: "-9A", 배터리온도: "25°C", 시스템온도: "27°C", 운영효율: "92%", 데이터연동율: "100%", 이상알람: "-", 관리알람: "-" }
  ]);

  const columns = [
    {
      name: '사업장',
      dataIndex: '사업장',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '120px',
    },
    {
      name: '그룹',
      dataIndex: '그룹',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '100px',
    },
    {
      name: '기기명',
      dataIndex: '기기명',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '100px',
    },
    {
      name: '어플리케이션',
      dataIndex: '어플리케이션',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '120px',
    },
    {
      name: '실시간 상태정보',
      dataIndex: '실시간상태정보',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: 'SOC',
      dataIndex: 'SOC',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '80px',
    },
    {
      name: '팩전압',
      dataIndex: '팩전압',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '90px',
    },
    {
      name: '전압',
      dataIndex: '전압',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '80px',
    },
    {
      name: '전류',
      dataIndex: '전류',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '80px',
    },
    {
      name: '배터리온도',
      dataIndex: '배터리온도',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '시스템온도',
      dataIndex: '시스템온도',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '운영효율',
      dataIndex: '운영효율',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '90px',
    },
    {
      name: '데이터 연동율',
      dataIndex: '데이터연동율',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '110px',
    },
    {
      name: '이상알람',
      dataIndex: '이상알람',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
    {
      name: '관리알람',
      dataIndex: '관리알람',
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
              <span className="text-gray-400 text-sm">배터리 운용 대수</span>
              <span className="text-white text-lg">{company.배터리운용대수}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">배터리 설치 용량</span>
              <span className="text-white text-lg">{company.배터리설치용량}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">운영 효율</span>
              <span className="text-white text-lg">{company.운영효율}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">데이터 연동율</span>
              <span className="text-white text-lg">{company.데이터연동율}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        <h2 className="text-hw-white-1 text-xl font-medium mb-2">배터리 종합현황</h2>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">배터리 운용 대수</span>
            <span className="text-blue-400 text-xl font-bold">{summaryData.total.배터리운용대수}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">배터리 설치 용량</span>
            <span className="text-green-400 text-xl font-bold">{summaryData.total.배터리설치용량}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">운영 효율</span>
            <span className="text-yellow-400 text-xl font-bold">{summaryData.total.운영효율}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">데이터 연동율</span>
            <span className="text-purple-400 text-xl font-bold">{summaryData.total.데이터연동율}</span>
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
            className={`w-[300px] h-[200px] flex-shrink-0 bg-hw-dark-2 p-4 rounded-lg cursor-pointer overflow-hidden
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
                            <span className="text-gray-400">배터리 운용 대수</span>
                            <span className="text-hw-white-1">{group.배터리운용대수}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">배터리 설치 용량</span>
                            <span className="text-hw-white-1">{group.배터리설치용량}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">운영 효율</span>
                            <span className="text-hw-white-1">{group.운영효율}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">데이터 연동율</span>
                            <span className="text-hw-white-1">{group.데이터연동율}</span>
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
                        <span className="text-gray-400">배터리 운용 대수</span>
                        <span className="text-hw-white-1">{company.배터리운용대수}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">배터리 설치 용량</span>
                        <span className="text-hw-white-1">{company.배터리설치용량}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">운영 효율</span>
                        <span className="text-hw-white-1">{company.운영효율}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">데이터 연동율</span>
                        <span className="text-hw-white-1">{company.데이터연동율}</span>
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
                ? ` - ${showGroupView} > ${selectedCompany}`  // 사업장 > 그룹 형태로 표출
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