import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';

interface BatteryData {
  id: number;
  user: string;
  contact: string;
  userId: string;
  deviceType: string;
  batteryManufacturer: string;
  batteryPurchaser: string;
  packModel: string;
  idaModel: string;
  packId: string;
  serviceRegistrationDate: string;
}

export default function BatteryPackPage() {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const columns = useMemo(() => [
    {
      name: '사용자',
      dataIndex: 'user',
      align: TEXT_ALIGN.CENTER,
      width: '100px'
    },
    {
      name: '연락처',
      dataIndex: 'contact',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: 'User ID',
      dataIndex: 'userId',
      align: TEXT_ALIGN.CENTER,
      width: '100px'
    },
    {
      name: '기기종류',
      dataIndex: 'deviceType',
      align: TEXT_ALIGN.CENTER,
      width: '100px',
      render: (row: BatteryData) => (
        <span className="text-yellow-400">{row.deviceType}</span>
      )
    },
    {
      name: '배터리 생산처',
      dataIndex: 'batteryManufacturer',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '배터리 구입처',
      dataIndex: 'batteryPurchaser',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '팩 모델',
      dataIndex: 'packModel',
      align: TEXT_ALIGN.CENTER,
      width: '100px'
    },
    {
      name: 'IDA 모델',
      dataIndex: 'idaModel',
      align: TEXT_ALIGN.CENTER,
      width: '100px'
    },
    {
      name: '팩ID',
      dataIndex: 'packId',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '서비스 등록일자',
      dataIndex: 'serviceRegistrationDate',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    }
  ], []);

  const dummyData: BatteryData[] = Array(26).fill(null).map((_, index) => ({
    id: index + 1,
    user: ['홍길동', '이율곡', '김정아', '김정미'][index % 4],
    contact: '---_----_----',
    userId: index === 0 ? '' : `TEST${String(index).padStart(2, '0')}`,
    deviceType: ['캠핑카', '드론', '파워뱅크', 'E-BIKE'][index % 4],
    batteryManufacturer: index % 2 === 0 ? '한화솔루션' : '배터리웨이',
    batteryPurchaser: index % 2 === 0 ? 'FF캠핑카' : '드론파크',
    packModel: index % 2 === 0 ? 'BW-P100' : 'BW-D200',
    idaModel: '',
    packId: index === 0 ? 'VA012AB002' : '',
    serviceRegistrationDate: ''
  }));

  const getFilteredData = useMemo(() => {
    if (!searchKeyword) return dummyData;
    const searchLower = searchKeyword.toLowerCase();
    return dummyData.filter(item => 
      item.user.toLowerCase().includes(searchLower) ||
      item.userId.toLowerCase().includes(searchLower) ||
      item.deviceType.toLowerCase().includes(searchLower) ||
      item.batteryManufacturer.toLowerCase().includes(searchLower) ||  // 배터리 생산처 검색 추가
      item.batteryPurchaser.toLowerCase().includes(searchLower) ||     // 배터리 구입처 검색 추가
      item.packModel.toLowerCase().includes(searchLower)               // 팩 모델 검색 추가
    );
  }, [searchKeyword]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            배터리 팩 등록 현황
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 py-3 px-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center gap-2'>
              <input 
                type="text" 
                className="h-8 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[200px] placeholder-white/40"
                placeholder="검색어를 입력하세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<BatteryData>
            data={getFilteredData}
            columns={columns}
            isPagination
            pagination={{
              total: getFilteredData.length,
              pageSize: 16,
            }}
            paginationMarginTop='32px'
            emptyMessage={trans('데이터가 없습니다.')}
          />
        </div>
      </div>
    </div>
  );
} 