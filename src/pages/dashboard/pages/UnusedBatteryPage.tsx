import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';

interface UnusedBattery {
  id: number;
  checkbox: string;
  사업장: string;
  그룹명: string;
  기기명: string;
  최근사용: string;
  경과: string;
  배터리상태: string;
  등록일자: string;
  사용자: string;
  성별: string;
  생년월일: string;
  연락처: string;
  불용기기등록일자: string;
}

type TableDataProps = React.ComponentProps<typeof TableData<UnusedBattery>>;
type ColumnType = TableDataProps['columns'][number];

const pagination = {
  total: 0,
  pageSize: 13,
};

const UnusedBatteryPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { t: trans } = useTranslation('translation');
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    show: boolean;
  }>({
    x: 0,
    y: 0,
    show: false,
  });
  
  const [data, setData] = useState<UnusedBattery[]>([]);

  useEffect(() => {
    const dummyData: UnusedBattery[] = [
      { id: 1, checkbox: '', 사업장: 'FF캠퍼카', 그룹명: 'BENZ C', 기기명: 'VABJ231', 최근사용: '23.08.17', 경과: '258일', 배터리상태: '불용기기', 등록일자: '23.08.20', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '23.08.20' },
      { id: 2, checkbox: '', 사업장: 'FF캠퍼카', 그룹명: 'Bayrun 640', 기기명: 'VABJ248', 최근사용: '23.09.25', 경과: '218일', 배터리상태: '사용가능', 등록일자: '23.09.30', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '23.09.30' },
      { id: 3, checkbox: '', 사업장: 'FF캠퍼카', 그룹명: 'Bayrun 560', 기기명: 'VABJ148', 최근사용: '23.12.28', 경과: '125일', 배터리상태: '사용가능', 등록일자: '24.01.12', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '24.01.12' },
      { id: 4, checkbox: '', 사업장: '정우E', 그룹명: 'Bayrun 640', 기기명: 'VABJ049', 최근사용: '24.01.05', 경과: '117일', 배터리상태: '사용가능', 등록일자: '24.01.05', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '24.01.05' },
      { id: 5, checkbox: '', 사업장: '정우E', 그룹명: 'Bayrun 560', 기기명: 'VABJ078', 최근사용: '24.02.17', 경과: '74일', 배터리상태: '사용가능', 등록일자: '24.02.17', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '24.02.17' },
      { id: 6, checkbox: '', 사업장: 'FF캠퍼카', 그룹명: 'BENZ D', 기기명: 'VABJ232', 최근사용: '23.08.18', 경과: '257일', 배터리상태: '불용기기', 등록일자: '23.08.21', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '23.08.21' },
      { id: 7, checkbox: '', 사업장: 'FF캠퍼카', 그룹명: 'Bayrun 650', 기기명: 'VABJ249', 최근사용: '23.09.26', 경과: '217일', 배터리상태: '사용가능', 등록일자: '23.10.01', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '23.10.01' },
      { id: 8, checkbox: '', 사업장: 'FF캠퍼카', 그룹명: 'Bayrun 570', 기기명: 'VABJ149', 최근사용: '23.12.29', 경과: '124일', 배터리상태: '사용가능', 등록일자: '24.01.13', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '24.01.13' },
      { id: 9, checkbox: '', 사업장: '정우E', 그룹명: 'Bayrun 650', 기기명: 'VABJ050', 최근사용: '24.01.06', 경과: '116일', 배터리상태: '사용가능', 등록일자: '24.01.06', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '24.01.06' },
      { id: 10, checkbox: '', 사업장: '정우E', 그룹명: 'Bayrun 570', 기기명: 'VABJ079', 최근사용: '24.02.18', 경과: '73일', 배터리상태: '사용가능', 등록일자: '24.02.18', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '24.02.18' },
      { id: 11, checkbox: '', 사업장: 'FF캠퍼카', 그룹명: 'BENZ E', 기기명: 'VABJ233', 최근사용: '23.08.19', 경과: '256일', 배터리상태: '불용기기', 등록일자: '23.08.22', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '23.08.22' },
      { id: 12, checkbox: '', 사업장: 'FF캠퍼카', 그룹명: 'Bayrun 660', 기기명: 'VABJ250', 최근사용: '23.09.27', 경과: '216일', 배터리상태: '사용가능', 등록일자: '23.10.02', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '23.10.02' },
      { id: 13, checkbox: '', 사업장: 'FF캠퍼카', 그룹명: 'Bayrun 580', 기기명: 'VABJ150', 최근사용: '23.12.30', 경과: '123일', 배터리상태: '사용가능', 등록일자: '24.01.14', 사용자: '', 성별: '', 생년월일: '', 연락처: '010-1234-5678', 불용기기등록일자: '24.01.14' },
      // ... 14~39번까지 추가 데이터 (위와 비슷한 패턴으로 계속)
    ];
    setData(dummyData);
    pagination.total = dummyData.length;
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(data.map(item => item.id.toString()));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (selectedRows.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        show: true,
      });
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ x: 0, y: 0, show: false });
  };

  const handleStatusChange = (status: '불용기기' | '사용가능') => {
    const today = new Date().toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace('.', '');

    const updatedData = data.map(item => {
      if (selectedRows.includes(item.id.toString())) {
        return {
          ...item,
          배터리상태: status,
          불용기기등록일자: status === '불용기기' ? today : ''
        };
      }
      return item;
    });

    setData(updatedData);
    handleCloseContextMenu();
  };

  const columns: ColumnType[] = useMemo(() => [
    {
      name: ' ',
      dataIndex: 'checkbox',
      paddingInline: '12px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '40px',
      render: (row: UnusedBattery, dataIndex: string) => (
        <div className="flex items-center justify-center w-full">
          <input 
            type="checkbox" 
            className="w-4 h-4 cursor-pointer accent-hw-orange-1"
            checked={selectedRows.includes(row.id?.toString() || '')}
            onChange={() => row.id && handleSelectRow(row.id.toString())}
          />
        </div>
      ),
      title: (
        <div className="flex items-center justify-center w-full">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer accent-hw-orange-1"
            checked={data.length > 0 && selectedRows.length === data.length}
            onChange={handleSelectAll}
          />
        </div>
      )
    },
    {
      name: '사업장',
      dataIndex: '사업장',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '150px',
    },
    {
      name: '그룹명',
      dataIndex: '그룹명',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '150px',
    },
    {
      name: '기기명(ID)',
      dataIndex: '기기명',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '130px',
    },
    {
      name: '최근사용',
      dataIndex: '최근사용',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '경과',
      dataIndex: '경과',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '최초 등록 일자',
      dataIndex: '등록일자',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '사용자',
      dataIndex: '사용자',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '성별',
      dataIndex: '성별',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '생년월일',
      dataIndex: '생년월일',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '연락처',
      dataIndex: '연락처',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
    },
    {
      name: '불용기기 등록일자',
      dataIndex: '불용기기등록일자',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
      render: (row: UnusedBattery, dataIndex: string) => (
        row.배터리상태 === '불용기기' ? (
          <div className="text-hw-red-1">
            {row.불용기기등록일자}
          </div>
        ) : null
      )
    },
    {
      name: '배터리 상태',
      dataIndex: '배터리상태',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
      render: (row: UnusedBattery, dataIndex: string) => (
        <div className={row.배터리상태 === '불용기기' ? 'text-hw-red-1' : 'text-hw-white-1'}>
          {row.배터리상태}
        </div>
      )
    }
  ], [selectedRows, data]);

  return (
    <div className="flex flex-col h-full bg-hw-dark-1" onClick={handleCloseContextMenu}>
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            {trans('배터리 불용 등록')}
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 p-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-start gap-8'>
            {/* 등록 구분 */}
            <div className='relative'>
              <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                {trans('등록 구분')}
              </h3>
              <div className='border border-hw-gray-4 rounded-lg p-4 pt-5'>
                <div className='flex flex-wrap space-x-4 h-10 items-center'>
                  <div className='flex items-center space-x-2'>
                    <input 
                      type='radio' 
                      id='all' 
                      name='filter' 
                      checked={selectedFilter === '전체'} 
                      onChange={() => setSelectedFilter('전체')} 
                    />
                    <label htmlFor='all'>{trans('전체')}</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <input 
                      type='radio' 
                      id='unused' 
                      name='filter' 
                      checked={selectedFilter === '불용기기'} 
                      onChange={() => setSelectedFilter('불용기기')} 
                    />
                    <label htmlFor='unused'>{trans('불용기기')}</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <input 
                      type='radio' 
                      id='usable' 
                      name='filter' 
                      checked={selectedFilter === '사용가능'} 
                      onChange={() => setSelectedFilter('사용가능')} 
                    />
                    <label htmlFor='usable'>{trans('사용가능')}</label>
                  </div>
                </div>
              </div>
            </div>

            {/* 기간 설정 */}
            <div className='relative'>
              <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                {trans('기간 설정')}
              </h3>
              <div className='border border-hw-gray-4 rounded-lg p-4 pt-5'>
                <div className='flex flex-wrap gap-2 h-10 items-center'>
                  <select 
                    className="bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full border-none outline-none min-w-[120px]"
                  >
                    <option value="">{trans('사업장')}</option>
                  </select>
                  <select 
                    className="bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full border-none outline-none min-w-[120px]"
                  >
                    <option value="">{trans('그룹명')}</option>
                  </select>
                  <select 
                    className="bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full border-none outline-none min-w-[120px]"
                  >
                    <option value="">{trans('기기명')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 조회 버튼 */}
            <button className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center h-10 mt-[26px]'>
              <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>
                {trans('조회')}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        {/* PC DATA TABLE */}
        <div className='w-full hidden xs:block'>
          <TableData<UnusedBattery>
            data={data}
            columns={columns}
            isPagination
            pagination={pagination}
            paginationMarginTop='32px'
            emptyMessage={trans('데이터 없습니다.')}
            selectedRows={selectedRows}
            onCellContextMenu={(e, columnIndex) => {
              if (columnIndex === 0 && selectedRows.length > 0) {
                handleContextMenu(e);
              }
            }}
          />
        </div>

        {/* MOBILE DATA TABLE */}
        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 구현 */}
        </div>
      </div>

      {/* 컨텍스트 메뉴 */}
      {contextMenu.show && (
        <div 
          className="fixed bg-hw-dark-2 border border-hw-gray-4 rounded-lg shadow-lg py-1.5 w-[120px]"
          style={{ 
            left: `${contextMenu.x + 10}px`,
            top: contextMenu.y,
            zIndex: 1000,
            transform: 'none'
          }}
        >
          <button 
            className="w-full px-3 py-1.5 text-center hover:bg-hw-dark-3 text-hw-white-1 whitespace-nowrap text-sm"
            onClick={() => handleStatusChange('불용기기')}
          >
            불용기기 등록
          </button>
          <button 
            className="w-full px-3 py-1.5 text-center hover:bg-hw-dark-3 text-hw-white-1 whitespace-nowrap text-sm"
            onClick={() => handleStatusChange('사용가능')}
          >
            사용가능 등록
          </button>
        </div>
      )}
    </div>
  );
};

export default UnusedBatteryPage; 