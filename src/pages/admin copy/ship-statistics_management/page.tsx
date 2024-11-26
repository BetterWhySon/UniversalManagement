import { Refresh } from '@/components/icons';
import TableData from '@/components/table/TableData';
import { cn } from '@/helpers/class-name.helper';
import { admEssStatisticsManagement } from '@/types/ess-statistics-management.type';
import { useMemo, useState, useEffect } from 'react';
import './style.scss';
import useAdmEssStatisticsManagement from '@/api/admEssStatisticsManagement';
import { useTranslation } from 'react-i18next';

const pagination = {
  total: 0,
  pageSize: 12,
};

export default function ShipStatisticsManagementPage() {
  const { dataList, errorMsg_essStatistics, storeDataList, storeEssReset } = useAdmEssStatisticsManagement();
  const [data, setData] = useState<admEssStatisticsManagement[]>([]);  
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
  }, []);

  useEffect(() => {
    storeDataList(trans);
  }, [errorMsg_essStatistics]);

  useEffect(() => {
    let _datas: Array<admEssStatisticsManagement> = [];

    dataList?.map((item, index) => {
      _datas.push({
        id:index,
        timestamp: item.timestamp,
        capacity: item.capacity.toString(),
        whole_dchg_amount: item.whole_dchg_amount.toString(),
        day_dchg_amount: item.day_dchg_amount.toString(),
        whole_dchg_time: item.whole_dchg_time.toString(),
        day_dchg_time: item.day_dchg_time.toString()
      })
    });
    setData(_datas);    
    pagination.total = _datas.length; //
  }, [dataList]);

  const columns = useMemo(
    () => [
      {
        name: 'date',
        dataIndex: 'timestamp',
        paddingInline: '24px',
        fixedWidth: '229px',
      },
      {
        name: 'installed',
        dataIndex: 'capacity',
        paddingInline: '24px',
        fixedWidth: '130px',
      },
      {
        name: 'cumulativeDischarge',
        dataIndex: 'whole_dchg_amount',
        // align: TEXT_ALIGN.CENTER,
        // mobileAlign: TEXT_ALIGN.LEFT,
        paddingInline: '24px',
        fixedWidth: '179px',
      },
      {
        name: 'dailyDischarge',
        dataIndex: 'day_dchg_amount',
        paddingInline: '24px',
        fixedWidth: '130px',
        // render: (value: number) => value.toString(), 
      },
      {
        name: 'cumulativeDischargeTime',
        dataIndex: 'whole_dchg_time',
        paddingInline: '24px',
        fixedWidth: '130px',
      },
      {
        name: 'dailyDischargeTime',
        dataIndex: 'day_dchg_time',
        paddingInline: '24px',
        fixedWidth: '130px',
      },
    ],
    [],
  );

  const onClickReset = () => {    
    storeEssReset(trans)
  }

  return (
    <main className='transition-all flex flex-col items-center w-full pt-5 px-0 lg:px-[55px] lg:pt-10 xs:pb-[74px] user-management__wrapper'>
      <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5 px-[18px] lg:px-0'>
        <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none flex items-center gap-2'>
          {trans('shipEssStatisticsManagement')}
          <button
            onClick={() => onClickReset()}
            className='flex justify-center items-center'>
            <Refresh width='25' height='25' stroke='white' />
          </button>
        </h1>
      </div>

      {/* PC DATA TABLE */}
      <div className='w-full hidden xs:block px-[18px] lg:px-0'>
        <TableData
          data={data}
          columns={columns}
          // emptyMessage='사용자를 등록해 주세요.'
          isPagination
          pagination={pagination}
          paginationMarginTop='32px'
        />
      </div>

      {/* MOBILE DATA TABLE */}
      <div className='w-full block xs:hidden relative'>
        <div className='absolute top-0 z-10 py-2 bg-hw-dark-2 flex flex-wrap border-b border-hw-gray-5'>
          {columns.map((item, index) => (
            <span
              key={index}
              style={{ width: `${item.fixedWidth}` }}
              className='py-[6px] px-8 text-[16px] font-light leading-5 text-hw-white-2'>
              {item.name}
            </span>
          ))}
        </div>
        <ul className='w-full h-[calc(100vh-297px)] mt-[113px] overflow-y-auto'>
          {data.map((row: any) => (
            <li key={row.id} className='w-full h-[112px] py-2 transition-colors odd:bg-[#363E4B] flex flex-wrap'>
              {columns.map((item, index) => (
                <span
                  key={index}
                  style={{ width: `${item.fixedWidth}`}}
                  className={cn(
                    'py-[6px] px-[18px] text-[14px] font-light leading-5 text-hw-white-2',                    
                  )}>
                  {/* {item.render ? item.render(row, item.dataIndex) : row[item.dataIndex as string] || ''} */}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
