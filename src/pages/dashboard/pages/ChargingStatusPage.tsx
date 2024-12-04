import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';

interface LocationState {
  status: 'good' | 'normal' | 'bad';
}

interface ChargingStatusData {
  id: number;           // id 필드 다시 추가
  site: string;          // 사업장
  group: string;         // 그룹명
  deviceName: string;    // 기기명
  batteryId: string;     // 배터리 팩 ID
  chargingStatus: string;// 충전진행
  statusInfo: string;    // 상태정보
  cause: string;         // 원인
  currentTemp: string;   // 현재온도
  normalRange: string;   // 정상범위
  memo: string;         // 조치 내용
}

type TableDataProps = React.ComponentProps<typeof TableData<ChargingStatusData>>;
type ColumnType = TableDataProps['columns'][number];

const pagination = {
  total: 0,
  pageSize: 15,
};

const ChargingStatusPage: React.FC = () => {
  const [statusData, setStatusData] = useState<ChargingStatusData[]>([]);
  const location = useLocation();
  const { status } = (location.state as LocationState) || { status: 'bad' };

  useEffect(() => {
    // 임시 데이터 35개
    const dummyData: ChargingStatusData[] = [
      { id: 1, site: "서울 사업장", group: "A그룹", deviceName: "충전기 01", batteryId: "BAT_001", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 온도 고온", currentTemp: "64 °C", normalRange: "4.31V", memo: "충전 중, 특정 모듈의 온도가 너무 높습니다." },
      { id: 2, site: "부산 사업장", group: "B그룹", deviceName: "충전기 02", batteryId: "BAT_002", chargingStatus: "충전중", statusInfo: "Bad", cause: "전압 불균형", currentTemp: "58 °C", normalRange: "4.28V", memo: "셀 간 전압 불균형이 감지되었습니다." },
      { id: 3, site: "대구 사업장", group: "C그룹", deviceName: "충전기 03", batteryId: "BAT_003", chargingStatus: "충전중", statusInfo: "Bad", cause: "과전류", currentTemp: "52 °C", normalRange: "4.35V", memo: "충전 전류가 정상 범위를 초과했습니다." },
      { id: 4, site: "인천 사업장", group: "A그룹", deviceName: "충전기 04", batteryId: "BAT_004", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 온도 고온", currentTemp: "66 °C", normalRange: "4.29V", memo: "모듈 온도가 위험 수준입니다." },
      { id: 5, site: "광주 사업장", group: "B그룹", deviceName: "충전기 05", batteryId: "BAT_005", chargingStatus: "충전중", statusInfo: "Bad", cause: "통신 오류", currentTemp: "55 °C", normalRange: "4.32V", memo: "BMS 통신이 불안정합니다." },
      { id: 6, site: "대전 사업장", group: "C그룹", deviceName: "충전기 06", batteryId: "BAT_006", chargingStatus: "충전중", statusInfo: "Bad", cause: "과전압", currentTemp: "59 °C", normalRange: "4.40V", memo: "셀 전압이 상한값을 초과했습니다." },
      { id: 7, site: "울산 사업장", group: "A그룹", deviceName: "충전기 07", batteryId: "BAT_007", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 온도 고온", currentTemp: "63 °C", normalRange: "4.33V", memo: "냉각 시스템 점검이 필요합니다." },
      { id: 8, site: "세종 사업장", group: "B그룹", deviceName: "충전기 08", batteryId: "BAT_008", chargingStatus: "충전중", statusInfo: "Bad", cause: "전류 불균형", currentTemp: "57 °C", normalRange: "4.30V", memo: "충전 전류가 불안정합니다." },
      { id: 9, site: "제주 사업장", group: "C그룹", deviceName: "충전기 09", batteryId: "BAT_009", chargingStatus: "충전중", statusInfo: "Bad", cause: "과열 경고", currentTemp: "61 °C", normalRange: "4.34V", memo: "배터리 온도가 상승 중입니다." },
      { id: 10, site: "경기 사업장", group: "A그룹", deviceName: "충전기 10", batteryId: "BAT_010", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 이상", currentTemp: "60 °C", normalRange: "4.36V", memo: "특정 모듈에서 이상이 감지되었습니다." },
      { id: 11, site: "강원 사업장", group: "B그룹", deviceName: "충전기 11", batteryId: "BAT_011", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 온도 고온", currentTemp: "65 °C", normalRange: "4.31V", memo: "모듈 온도가 높아 주의가 필요합니다." },
      { id: 12, site: "충북 사업장", group: "C그룹", deviceName: "충전기 12", batteryId: "BAT_012", chargingStatus: "충전중", statusInfo: "Bad", cause: "전압 이상", currentTemp: "58 °C", normalRange: "4.29V", memo: "전압이 불안정한 상태입니다." },
      { id: 13, site: "충남 사업장", group: "A그룹", deviceName: "충전기 13", batteryId: "BAT_013", chargingStatus: "충전중", statusInfo: "Bad", cause: "과전류", currentTemp: "62 °C", normalRange: "4.33V", memo: "과전류가 감지되었습니다." },
      { id: 14, site: "전북 사업장", group: "B그룹", deviceName: "충전기 14", batteryId: "BAT_014", chargingStatus: "충전중", statusInfo: "Bad", cause: "통신 오류", currentTemp: "57 °C", normalRange: "4.35V", memo: "통신 상태가 불안정합니다." },
      { id: 15, site: "전남 사업장", group: "C그룹", deviceName: "충전기 15", batteryId: "BAT_015", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 이상", currentTemp: "64 °C", normalRange: "4.32V", memo: "모듈 점검이 필요합니다." },
      { id: 16, site: "경북 사업장", group: "A그룹", deviceName: "충전기 16", batteryId: "BAT_016", chargingStatus: "충전중", statusInfo: "Bad", cause: "과열", currentTemp: "66 °C", normalRange: "4.30V", memo: "과열 상태입니다." },
      { id: 17, site: "경남 사업장", group: "B그룹", deviceName: "충전기 17", batteryId: "BAT_017", chargingStatus: "충전중", statusInfo: "Bad", cause: "전압 불균형", currentTemp: "59 °C", normalRange: "4.34V", memo: "전압 균형 조정이 필요합니다." },
      { id: 18, site: "서울중구 사업장", group: "C그룹", deviceName: "충전기 18", batteryId: "BAT_018", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 온도 고온", currentTemp: "63 °C", normalRange: "4.31V", memo: "온도가 높습니다." },
      { id: 19, site: "서울종로 사업장", group: "A그룹", deviceName: "충전기 19", batteryId: "BAT_019", chargingStatus: "충전중", statusInfo: "Bad", cause: "과전류", currentTemp: "61 °C", normalRange: "4.33V", memo: "전류가 높습니다." },
      { id: 20, site: "서울마포 사업장", group: "B그룹", deviceName: "충전기 20", batteryId: "BAT_020", chargingStatus: "충전중", statusInfo: "Bad", cause: "통신 오류", currentTemp: "58 °C", normalRange: "4.35V", memo: "통신 상태 불량입니다." },
      { id: 21, site: "부산중구 사업장", group: "C그룹", deviceName: "충전기 21", batteryId: "BAT_021", chargingStatus: "충전중", statusInfo: "Bad", cause: "과전압", currentTemp: "64 °C", normalRange: "4.32V", memo: "전압이 높습니다." },
      { id: 22, site: "부산해운대 사업장", group: "A그룹", deviceName: "충전기 22", batteryId: "BAT_022", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 이상", currentTemp: "62 °C", normalRange: "4.34V", memo: "모듈 상태 불량입니다." },
      { id: 23, site: "대구중구 사업장", group: "B그룹", deviceName: "충전기 23", batteryId: "BAT_023", chargingStatus: "충전중", statusInfo: "Bad", cause: "과열", currentTemp: "65 °C", normalRange: "4.31V", memo: "과열 상태입니다." },
      { id: 24, site: "인천중구 사업장", group: "C그룹", deviceName: "충전기 24", batteryId: "BAT_024", chargingStatus: "충전중", statusInfo: "Bad", cause: "전압 불균형", currentTemp: "60 °C", normalRange: "4.33V", memo: "전압 불균형 상태입니다." },
      { id: 25, site: "광주북구 사업장", group: "A그룹", deviceName: "충전기 25", batteryId: "BAT_025", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 온도 고온", currentTemp: "63 °C", normalRange: "4.35V", memo: "온도가 높습니다." },
      { id: 26, site: "대전중구 사업장", group: "B그룹", deviceName: "충전기 26", batteryId: "BAT_026", chargingStatus: "충전중", statusInfo: "Bad", cause: "과전류", currentTemp: "61 °C", normalRange: "4.32V", memo: "전류가 높습니다." },
      { id: 27, site: "울산중구 사업장", group: "C그룹", deviceName: "충전기 27", batteryId: "BAT_027", chargingStatus: "충전중", statusInfo: "Bad", cause: "통신 오류", currentTemp: "59 °C", normalRange: "4.34V", memo: "통신 상태 불량입니다." },
      { id: 28, site: "세종시 사업장", group: "A그룹", deviceName: "충전기 28", batteryId: "BAT_028", chargingStatus: "충전중", statusInfo: "Bad", cause: "과전압", currentTemp: "64 °C", normalRange: "4.31V", memo: "전압이 높습니다." },
      { id: 29, site: "제주시 사업장", group: "B그룹", deviceName: "충전기 29", batteryId: "BAT_029", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 이상", currentTemp: "62 °C", normalRange: "4.33V", memo: "모듈 상태 불량입니다." },
      { id: 30, site: "경기수원 사업장", group: "C그룹", deviceName: "충전기 30", batteryId: "BAT_030", chargingStatus: "충전중", statusInfo: "Bad", cause: "과열", currentTemp: "65 °C", normalRange: "4.35V", memo: "과열 상태입니다." },
      { id: 31, site: "경기성남 사업장", group: "A그룹", deviceName: "충전기 31", batteryId: "BAT_031", chargingStatus: "충전중", statusInfo: "Bad", cause: "전압 불균형", currentTemp: "60 °C", normalRange: "4.32V", memo: "전압 불균형 상태입니다." },
      { id: 32, site: "경기안양 사업장", group: "B그룹", deviceName: "충전기 32", batteryId: "BAT_032", chargingStatus: "충전중", statusInfo: "Bad", cause: "모듈 온도 고온", currentTemp: "63 °C", normalRange: "4.34V", memo: "온도가 높습니다." },
      { id: 33, site: "경기부천 사업장", group: "C그룹", deviceName: "충전기 33", batteryId: "BAT_033", chargingStatus: "충전중", statusInfo: "Bad", cause: "과전류", currentTemp: "61 °C", normalRange: "4.31V", memo: "전류가 높습니다." },
      { id: 34, site: "경기광명 사업장", group: "A그룹", deviceName: "충전기 34", batteryId: "BAT_034", chargingStatus: "충전중", statusInfo: "Bad", cause: "통신 오류", currentTemp: "59 °C", normalRange: "4.33V", memo: "통신 상태 불량입니다." },
      { id: 35, site: "경기평택 사업장", group: "B그룹", deviceName: "충전기 35", batteryId: "BAT_035", chargingStatus: "충전중", statusInfo: "Bad", cause: "과전압", currentTemp: "64 °C", normalRange: "4.35V", memo: "전압이 높습니다." }
    ];
    setStatusData(dummyData);
    pagination.total = dummyData.length;
  }, []);

  const columns: ColumnType[] = [
    {
      name: '사업장',
      dataIndex: 'site',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    },
    {
      name: '그룹명',
      dataIndex: 'group',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    },
    {
      name: '기기명',
      dataIndex: 'deviceName',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '배터리 팩 ID',
      dataIndex: 'batteryId',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '충전진행',
      dataIndex: 'chargingStatus',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '상태정보',
      dataIndex: 'statusInfo',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
      render: (row: { id: number } & ChargingStatusData, dataIndex: string) => (
        <span className="text-hw-red-1">{row.statusInfo}</span>
      )
    },
    {
      name: '원인',
      dataIndex: 'cause',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '현재온도',
      dataIndex: 'currentTemp',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '정상범위',
      dataIndex: 'normalRange',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '조치 내용',
      dataIndex: 'memo',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px',
    }
  ];

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            충전 상태 정보
          </h1>
        </div>
      </div>

      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        {/* PC DATA TABLE */}
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

        {/* MOBILE DATA TABLE */}
        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 구현 */}
        </div>
      </div>
    </div>
  );
};

export default ChargingStatusPage; 