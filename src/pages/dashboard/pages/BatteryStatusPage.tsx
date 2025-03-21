import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface BatteryStatus {
  id: number;
  status: string;
  soc: string;
  site: string;
  group: string;
  deviceName: string;
  application: string;
  manufacturer: string;
  batteryId: string;
  modelInfo: string;
  user: string;
  contact: string;
}

type TableDataProps = React.ComponentProps<typeof TableData<BatteryStatus>>;
type ColumnType = TableDataProps['columns'][number];

const pagination = {
  total: 0,
  pageSize: 12,
};

interface BatteryStatusPageProps {
  selectedStatus?: string;
}

const BatteryStatusPage: React.FC<BatteryStatusPageProps> = ({ selectedStatus: propSelectedStatus }) => {
  const [allBatteryStatuses, setAllBatteryStatuses] = useState<BatteryStatus[]>([]);
  const [filteredBatteryStatuses, setFilteredBatteryStatuses] = useState<BatteryStatus[]>([]);
  const { t: trans } = useTranslation('translation');
  const location = useLocation();

  useEffect(() => {
    // 임시 데이터 30줄
    const dummyData: BatteryStatus[] = [
      { id: 1, status: '사용대기', soc: '95%', site: '사이트1', group: '그룹A', deviceName: '배터리01', application: '지게차', manufacturer: '삼성SDI', batteryId: 'BAT001', modelInfo: 'LI-001', user: '홍길동', contact: '010-1234-5678' },
      { id: 2, status: '사용대기', soc: '87%', site: '사이트2', group: '그룹B', deviceName: '배터리02', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT002', modelInfo: 'LI-002', user: '김철수', contact: '010-2345-6789' },
      { id: 3, status: '사용중', soc: '72%', site: '사이트3', group: '그룹C', deviceName: '배터리03', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT003', modelInfo: 'LI-003', user: '이영희', contact: '010-3456-7890' },
      { id: 4, status: '사용중', soc: '65%', site: '사이트4', group: '그룹A', deviceName: '배터리04', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT004', modelInfo: 'LI-001', user: '박민준', contact: '010-4567-8901' },
      { id: 5, status: '사용대기', soc: '93%', site: '사이트5', group: '그룹B', deviceName: '배터리05', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT005', modelInfo: 'LI-002', user: '정수민', contact: '010-5678-9012' },
      { id: 6, status: '충전중', soc: '42%', site: '사이트6', group: '그룹C', deviceName: '배터리06', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT006', modelInfo: 'LI-003', user: '윤지원', contact: '010-6789-0123' },
      { id: 7, status: '사용대기', soc: '91%', site: '사이트7', group: '그룹A', deviceName: '배터리07', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT007', modelInfo: 'LI-001', user: '장현우', contact: '010-7890-1234' },
      { id: 8, status: '충전중', soc: '55%', site: '사이트8', group: '그룹B', deviceName: '배터리08', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT008', modelInfo: 'LI-002', user: '임서연', contact: '010-8901-2345' },
      { id: 9, status: '사용대기', soc: '90%', site: '사이트9', group: '그룹C', deviceName: '배터리09', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT009', modelInfo: 'LI-003', user: '강도현', contact: '010-9012-3456' },
      { id: 10, status: '오프라인', soc: '0%', site: '사이트10', group: '그룹A', deviceName: '배터리10', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT010', modelInfo: 'LI-001', user: '조예은', contact: '010-0123-4567' },
      { id: 11, status: '사용대기', soc: '89%', site: '사이트11', group: '그룹B', deviceName: '배터리11', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT011', modelInfo: 'LI-002', user: '한지민', contact: '010-1234-5678' },
      { id: 12, status: '충전중', soc: '37%', site: '사이트12', group: '그룹C', deviceName: '배터리12', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT012', modelInfo: 'LI-003', user: '신재민', contact: '010-2345-6789' },
      { id: 13, status: '사용대기', soc: '92%', site: '사이트13', group: '그룹A', deviceName: '배터리13', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT013', modelInfo: 'LI-001', user: '유성민', contact: '010-3456-7890' },
      { id: 14, status: '오프라인', soc: '0%', site: '사이트14', group: '그룹B', deviceName: '배터리14', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT014', modelInfo: 'LI-002', user: '백지원', contact: '010-4567-8901' },
      { id: 15, status: '사용대기', soc: '87%', site: '사이트15', group: '그룹C', deviceName: '배터리15', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT015', modelInfo: 'LI-003', user: '남궁민', contact: '010-5678-9012' },
      { id: 16, status: '사용중', soc: '78%', site: '사이트16', group: '그룹A', deviceName: '배터리16', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT016', modelInfo: 'LI-001', user: '손영수', contact: '010-6789-0123' },
      { id: 17, status: '사용대기', soc: '96%', site: '사이트17', group: '그룹B', deviceName: '배터리17', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT017', modelInfo: 'LI-002', user: '서민준', contact: '010-7890-1234' },
      { id: 18, status: '충전중', soc: '48%', site: '사이트18', group: '그룹C', deviceName: '배터리18', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT018', modelInfo: 'LI-003', user: '문지혜', contact: '010-8901-2345' },
      { id: 19, status: '사용대기', soc: '94%', site: '사이트19', group: '그룹A', deviceName: '배터리19', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT019', modelInfo: 'LI-001', user: '양승민', contact: '010-9012-3456' },
      { id: 20, status: '오프라인', soc: '0%', site: '사이트20', group: '그룹B', deviceName: '배터리20', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT020', modelInfo: 'LI-002', user: '최서아', contact: '010-0123-4567' },
      { id: 21, status: '사용대기', soc: '88%', site: '사이트21', group: '그룹C', deviceName: '배터리21', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT021', modelInfo: 'LI-003', user: '권민재', contact: '010-1234-5678' },
      { id: 22, status: '충전중', soc: '52%', site: '사이트22', group: '그룹A', deviceName: '배터리22', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT022', modelInfo: 'LI-001', user: '오지민', contact: '010-2345-6789' },
      { id: 23, status: '사용중', soc: '75%', site: '사이트23', group: '그룹B', deviceName: '배터리23', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT023', modelInfo: 'LI-002', user: '김현수', contact: '010-3456-7890' },
      { id: 24, status: '오프라인', soc: '0%', site: '사이트24', group: '그룹C', deviceName: '배터리24', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT024', modelInfo: 'LI-003', user: '이민지', contact: '010-4567-8901' },
      { id: 25, status: '사용대기', soc: '95%', site: '사이트25', group: '그룹A', deviceName: '배터리25', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT025', modelInfo: 'LI-001', user: '박준호', contact: '010-5678-9012' },
      { id: 26, status: '충전중', soc: '45%', site: '사이트26', group: '그룹B', deviceName: '배터리26', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT026', modelInfo: 'LI-002', user: '정지혜', contact: '010-6789-0123' },
      { id: 27, status: '사용대기', soc: '91%', site: '사이트27', group: '그룹C', deviceName: '배터리27', application: 'AGV', manufacturer: '삼성SDI', batteryId: 'BAT027', modelInfo: 'LI-003', user: '윤성민', contact: '010-7890-1234' },
      { id: 28, status: '사용중', soc: '70%', site: '사이트28', group: '그룹A', deviceName: '배터리28', application: '지게차', manufacturer: 'LG에너지솔루션', batteryId: 'BAT028', modelInfo: 'LI-001', user: '장서연', contact: '010-8901-2345' },      
    ];
    setAllBatteryStatuses(dummyData);
    setFilteredBatteryStatuses(dummyData);
    pagination.total = dummyData.length;
  }, []);

  // 상태값에 따라 데이터 필터링
  useEffect(() => {
    const { state } = location;
    const selectedStatus = propSelectedStatus || state?.status;
    
    if (selectedStatus && selectedStatus !== '전체대수') {
      const filtered = allBatteryStatuses.filter(item => item.status === selectedStatus);
      setFilteredBatteryStatuses(filtered);
      pagination.total = filtered.length;
    } else {
      setFilteredBatteryStatuses(allBatteryStatuses);
      pagination.total = allBatteryStatuses.length;
    }
  }, [location, allBatteryStatuses, propSelectedStatus]);

  // 상태에 따른 텍스트 색상 지정
  const getStatusColor = (status: string) => {
    switch (status) {
      case '사용대기':
        return 'text-[#FFD03B]';
      case '사용중':
        return 'text-[#6CFF31]';
      case '충전중':
        return 'text-[#8AA8DA]';
      case '오프라인':
        return 'text-[#A1A1A1]';
      default:
        return 'text-white';
    }
  };

  const columns: ColumnType[] = useMemo(() => [
    {
      name: '실시간 상태정보',
      dataIndex: 'status',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
      render: (row: BatteryStatus) => (
        <span className={getStatusColor(row.status)}>{row.status}</span>
      )
    },
    {
      name: 'SOC',
      dataIndex: 'soc',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px',
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
      fixedWidth: '100px',
    },
    {
      name: '기기명',
      dataIndex: 'deviceName',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
    },
    {
      name: '어플리케이션',
      dataIndex: 'application',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '배터리 제조사',
      dataIndex: 'manufacturer',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    },
    {
      name: '팩 ID',
      dataIndex: 'batteryId',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
    {
      name: '팩 모델정보',
      dataIndex: 'modelInfo',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
    },
    {
      name: '사용자',
      dataIndex: 'user',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
    {
      name: '연락처',
      dataIndex: 'contact',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    }
  ], []);

  // 타이틀 텍스트 결정
  const getTitleText = () => {
    const { state } = location;
    const selectedStatus = propSelectedStatus || state?.status;
    
    if (selectedStatus && selectedStatus !== '전체대수') {
      return `${selectedStatus} 배터리 상태정보`;
    }
    return '실시간 배터리 상태정보';
  };

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            {getTitleText()}
          </h1>
        </div>
      </div>

      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        {/* PC DATA TABLE */}
        <div className='w-full hidden xs:block'>
          <TableData<BatteryStatus>
            data={filteredBatteryStatuses}
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