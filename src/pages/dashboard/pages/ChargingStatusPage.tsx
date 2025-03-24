import React, { useState, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';

interface ChargingStatusPageProps {
  status: 'good' | 'normal' | 'bad';
}

interface ChargingStatusData {
  id: number;
  사업장: string;
  그룹: string;
  기기명: string;
  어플리케이션: string;
  충전진행: string;
  SOC: string;
  스트레스: string;
  원인: string;
  현재DATA: string;
  정상범위: string;
  조치내용: string;
  statusInfo: string;
}

type TableDataProps = React.ComponentProps<typeof TableData<ChargingStatusData>>;
type ColumnType = TableDataProps['columns'][number];

const pagination = {
  total: 0,
  pageSize: 12,
};

const ChargingStatusPage: React.FC<ChargingStatusPageProps> = ({ status }) => {
  const [statusData, setStatusData] = useState<ChargingStatusData[]>([]);

  useEffect(() => {
    const dummyData: ChargingStatusData[] = [
      { id: 1, 사업장: "서울 사업장", 그룹: "A그룹", 기기명: "충전기 01", 어플리케이션: "AGV", 충전진행: "충전중", SOC: "85%", 스트레스: "높음", 원인: "모듈 온도 고온", 현재DATA: "64 °C", 정상범위: "45~55°C", 조치내용: "냉각 시스템 점검 필요", statusInfo: status },
      { id: 2, 사업장: "부산 사업장", 그룹: "B그룹", 기기명: "충전기 02", 어플리케이션: "지게차", 충전진행: "충전완료", SOC: "92%", 스트레스: "낮음", 원인: "전압 불균형", 현재DATA: "4.2V", 정상범위: "3.8~4.3V", 조치내용: "셀 밸런싱 필요", statusInfo: status },
      { id: 3, 사업장: "대구 사업장", 그룹: "C그룹", 기기명: "충전기 03", 어플리케이션: "전동차", 충전진행: "충전중", SOC: "75%", 스트레스: "중간", 원인: "과전류", 현재DATA: "150A", 정상범위: "100~130A", 조치내용: "충전 전류 조정 필요", statusInfo: status },
      { id: 4, 사업장: "인천 사업장", 그룹: "A그룹", 기기명: "충전기 04", 어플리케이션: "AGV", 충전진행: "충전중", SOC: "68%", 스트레스: "높음", 원인: "모듈 온도 고온", 현재DATA: "66 °C", 정상범위: "45~55°C", 조치내용: "냉각팬 교체 필요", statusInfo: status },
      { id: 5, 사업장: "광주 사업장", 그룹: "B그룹", 기기명: "충전기 05", 어플리케이션: "지게차", 충전진행: "충전완료", SOC: "82%", 스트레스: "중간", 원인: "통신 오류", 현재DATA: "Error", 정상범위: "정상", 조치내용: "통신 모듈 점검", statusInfo: status },
      { id: 6, 사업장: "대전 사업장", 그룹: "C그룹", 기기명: "충전기 06", 어플리케이션: "전동차", 충전진행: "충전중", SOC: "70%", 스트레스: "중간", 원인: "과전압", 현재DATA: "59 °C", 정상범위: "4.40V", 조치내용: "셀 전압이 상한값을 초과했습니다.", statusInfo: status },
      { id: 7, 사업장: "울산 사업장", 그룹: "A그룹", 기기명: "충전기 07", 어플리케이션: "AGV", 충전진행: "충전중", SOC: "65%", 스트레스: "높음", 원인: "모듈 온도 고온", 현재DATA: "63 °C", 정상범위: "4.33V", 조치내용: "냉각 시스템 점검이 필요합니다.", statusInfo: status },
      { id: 8, 사업장: "세종 사업장", 그룹: "B그룹", 기기명: "충전기 08", 어플리케이션: "지게차", 충전진행: "충전중", SOC: "60%", 스트레스: "중간", 원인: "전류 불균형", 현재DATA: "57 °C", 정상범위: "4.30V", 조치내용: "충전 전류가 불안정합니다.", statusInfo: status },
      { id: 9, 사업장: "제주 사업장", 그룹: "C그룹", 기기명: "충전기 09", 어플리케이션: "전동차", 충전진행: "충전중", SOC: "55%", 스트레스: "높음", 원인: "과열 경고", 현재DATA: "61 °C", 정상범위: "4.34V", 조치내용: "배터리 온도가 상승 중입니다.", statusInfo: status },
      { id: 10, 사업장: "경기 사업장", 그룹: "A그룹", 기기명: "충전기 10", 어플리케이션: "AGV", 충전진행: "충전중", SOC: "70%", 스트레스: "중간", 원인: "모듈 이상", 현재DATA: "60 °C", 정상범위: "4.36V", 조치내용: "특정 모듈에서 이상이 감지되었습니다.", statusInfo: status },
      { id: 11, 사업장: "강원 사업장", 그룹: "B그룹", 기기명: "충전기 11", 어플리케이션: "지게차", 충전진행: "충전중", SOC: "60%", 스트레스: "높음", 원인: "모듈 온도 고온", 현재DATA: "65 °C", 정상범위: "4.31V", 조치내용: "모듈 온도가 높아 주의가 필요합니다.", statusInfo: status },
      { id: 12, 사업장: "충북 사업장", 그룹: "C그룹", 기기명: "충전기 12", 어플리케이션: "전동차", 충전진행: "충전중", SOC: "55%", 스트레스: "중간", 원인: "전압 이상", 현재DATA: "58 °C", 정상범위: "4.29V", 조치내용: "전압이 불안정한 상태입니다.", statusInfo: status },
      { id: 13, 사업장: "충남 사업장", 그룹: "A그룹", 기기명: "충전기 13", 어플리케이션: "AGV", 충전진행: "충전중", SOC: "60%", 스트레스: "중간", 원인: "과전류", 현재DATA: "62 °C", 정상범위: "4.33V", 조치내용: "과전류가 감지되었습니다.", statusInfo: status },
      { id: 14, 사업장: "전북 사업장", 그룹: "B그룹", 기기명: "충전기 14", 어플리케이션: "지게차", 충전진행: "충전중", SOC: "50%", 스트레스: "높음", 원인: "통신 오류", 현재DATA: "57 °C", 정상범위: "4.35V", 조치내용: "통신 상태가 불안정합니다.", statusInfo: status },
      { id: 15, 사업장: "전남 사업장", 그룹: "C그룹", 기기명: "충전기 15", 어플리케이션: "전동차", 충전진행: "충전중", SOC: "55%", 스트레스: "높음", 원인: "모듈 이상", 현재DATA: "64 °C", 정상범위: "4.32V", 조치내용: "모듈 점검이 필요합니다.", statusInfo: status }
    ];
    setStatusData(dummyData);
    pagination.total = dummyData.length;
  }, [status]);

  const columns: ColumnType[] = [
    {
      name: '사업장',
      dataIndex: '사업장',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    },
    {
      name: '그룹',
      dataIndex: '그룹',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
    },
    {
      name: '기기명',
      dataIndex: '기기명',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
    },
    {
      name: '어플리케이션',
      dataIndex: '어플리케이션',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
    },
    {
      name: '충전진행',
      dataIndex: '충전진행',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
    },
    {
      name: 'SOC',
      dataIndex: 'SOC',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
    {
      name: '스트레스',
      dataIndex: '스트레스',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
    {
      name: '원인',
      dataIndex: '원인',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    },
    {
      name: '현재DATA',
      dataIndex: '현재DATA',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
    },
    {
      name: '정상범위',
      dataIndex: '정상범위',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
    },
    {
      name: '조치내용',
      dataIndex: '조치내용',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px',
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'good':
        return '#8AA8DA';
      case 'normal':
        return '#A9D18E';
      case 'bad':
        return '#FF6969';
      default:
        return 'white';
    }
  };

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full h-fit md:h-5'>
          <div className='flex items-center gap-2'>
            <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
              충전 상태 정보
            </h1>
            <span style={{ color: getStatusColor(status) }} className='text-[16px] lg:text-xl'>
              ({status.toUpperCase()})
            </span>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<ChargingStatusData>
            data={statusData}
            columns={columns}
            isPagination
            pagination={pagination}
            paginationMarginTop='32px'
            emptyMessage='데이터가 없습니다.'
          />
        </div>

        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 구현 */}
        </div>
      </div>
    </div>
  );
};

export default ChargingStatusPage; 