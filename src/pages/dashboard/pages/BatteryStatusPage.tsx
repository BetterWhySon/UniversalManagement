import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import { useTranslation } from 'react-i18next';

interface BatteryStatus {
  id: number;
  status: string;
  site: string;
  group: string;
  deviceName: string;
  batteryId: string;
  userInfo1: string;
  userInfo2: string;
  userInfo3: string;
  otherInfo1: string;
  otherInfo2: string;
  otherInfo3: string;
  otherInfo4: string;
}

type TableDataProps = React.ComponentProps<typeof TableData<BatteryStatus>>;
type ColumnType = TableDataProps['columns'][number];

const pagination = {
  total: 0,
  pageSize: 15,
};

const BatteryStatusPage: React.FC = () => {
  const [batteryStatuses, setBatteryStatuses] = useState<BatteryStatus[]>([]);
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    // 임시 데이터 30줄
    const dummyData: BatteryStatus[] = [
      { id: 1, status: '사용대기', site: '사이트1', group: '그룹A', deviceName: '배터리01', batteryId: 'BAT001', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 2, status: '사용대기', site: '사이트2', group: '그룹B', deviceName: '배터리02', batteryId: 'BAT002', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 3, status: '사용중', site: '사이트3', group: '그룹C', deviceName: '배터리03', batteryId: 'BAT003', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 4, status: '사용중', site: '사이트4', group: '그룹A', deviceName: '배터리04', batteryId: 'BAT004', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 5, status: '사용대기', site: '사이트5', group: '그룹B', deviceName: '배터리05', batteryId: 'BAT005', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 6, status: '사용중', site: '사이트6', group: '그룹C', deviceName: '배터리06', batteryId: 'BAT006', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 7, status: '사용대기', site: '사이트7', group: '그룹A', deviceName: '배터리07', batteryId: 'BAT007', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 8, status: '사용중', site: '사이트8', group: '그룹B', deviceName: '배터리08', batteryId: 'BAT008', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 9, status: '사용대기', site: '사이트9', group: '그룹C', deviceName: '배터리09', batteryId: 'BAT009', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 10, status: '사용중', site: '사이트10', group: '그룹A', deviceName: '배터리10', batteryId: 'BAT010', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 11, status: '사용대기', site: '사이트11', group: '그룹B', deviceName: '배터리11', batteryId: 'BAT011', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 12, status: '사용중', site: '사이트12', group: '그룹C', deviceName: '배터리12', batteryId: 'BAT012', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 13, status: '사용대기', site: '사이트13', group: '그룹A', deviceName: '배터리13', batteryId: 'BAT013', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 14, status: '사용중', site: '사이트14', group: '그룹B', deviceName: '배터리14', batteryId: 'BAT014', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 15, status: '사용대기', site: '사이트15', group: '그룹C', deviceName: '배터리15', batteryId: 'BAT015', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 16, status: '사용중', site: '사이트16', group: '그룹A', deviceName: '배터리16', batteryId: 'BAT016', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 17, status: '사용대기', site: '사이트17', group: '그룹B', deviceName: '배터리17', batteryId: 'BAT017', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 18, status: '사용중', site: '사이트18', group: '그룹C', deviceName: '배터리18', batteryId: 'BAT018', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 19, status: '사용대기', site: '사이트19', group: '그룹A', deviceName: '배터리19', batteryId: 'BAT019', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 20, status: '사용중', site: '사이트20', group: '그룹B', deviceName: '배터리20', batteryId: 'BAT020', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 21, status: '사용대기', site: '사이트21', group: '그룹C', deviceName: '배터리21', batteryId: 'BAT021', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 22, status: '사용중', site: '사이트22', group: '그룹A', deviceName: '배터리22', batteryId: 'BAT022', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 23, status: '사용대기', site: '사이트23', group: '그룹B', deviceName: '배터리23', batteryId: 'BAT023', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 24, status: '사용중', site: '사이트24', group: '그룹C', deviceName: '배터리24', batteryId: 'BAT024', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 25, status: '사용대기', site: '사이트25', group: '그룹A', deviceName: '배터리25', batteryId: 'BAT025', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 26, status: '사용중', site: '사이트26', group: '그룹B', deviceName: '배터리26', batteryId: 'BAT026', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 27, status: '사용대기', site: '사이트27', group: '그룹C', deviceName: '배터리27', batteryId: 'BAT027', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },
      { id: 28, status: '사용중', site: '사이트28', group: '그룹A', deviceName: '배터리28', batteryId: 'BAT028', userInfo1: '정보1', userInfo2: '정보2', userInfo3: '정보3', otherInfo1: '기타1', otherInfo2: '기타2', otherInfo3: '기타3', otherInfo4: '기타4' },      
    ];
    setBatteryStatuses(dummyData);
    pagination.total = dummyData.length;
  }, []);

  const columns: ColumnType[] = useMemo(() => [
    {
      name: '실시간 상태정보',
      dataIndex: 'status',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
      render: (row: BatteryStatus) => (
        <span className="text-green-500">{row.status}</span>
      )
    },
    {
      name: '사업장',
      dataIndex: 'site',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '그룹명',
      dataIndex: 'group',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
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
      name: '사용자 정보1',
      dataIndex: 'userInfo1',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '사용자 정보2',
      dataIndex: 'userInfo2',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '사용자 정보3',
      dataIndex: 'userInfo3',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '기타 정보1',
      dataIndex: 'otherInfo1',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '기타 정보2',
      dataIndex: 'otherInfo2',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '기타 정보3',
      dataIndex: 'otherInfo3',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '기타 정보4',
      dataIndex: 'otherInfo4',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    }
  ], []);

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            실시간 배터리 상태정보
          </h1>
        </div>
      </div>

      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        {/* PC DATA TABLE */}
        <div className='w-full hidden xs:block'>
          <TableData<BatteryStatus>
            data={batteryStatuses}
            columns={columns}
            isPagination
            pagination={pagination}
            paginationMarginTop='32px'
            emptyMessage={trans('데이터가 없습니다.')}
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

export default BatteryStatusPage; 