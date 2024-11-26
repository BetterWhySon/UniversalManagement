import { Arrow, Calendar, Filter } from '@/components/icons';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { ChangeEvent, useRef, useState, useEffect } from 'react';
import './style.scss';
import dayjs, { Dayjs } from 'dayjs';
import { InputTimeRange } from '@/enums/input-time-range';
import { cn } from '@/helpers/class-name.helper';
import useAdmAccessManagement from '@/api/admAccessManagement';
import { useTranslation } from 'react-i18next';

// const CONNECTION_DATA = Array.from(Array(12)).map((_, index) => {
//   return {
//     id: index,
//     accessTime: '23/08/23 13:21:31',
//     ip: '127.0.0.1',
//     userID: 'betterwhy',
//     name: '배터와이',
//   };
// });


const columns = [
  {
    name: 'connectTime',
    dataIndex: 'accessTime',
    paddingInline: '32px',
    fixedWidth: '190px',
    align: TEXT_ALIGN.CENTER,
  },
  {
    name: 'ip',
    dataIndex: 'ip',
    fixedWidth: '168px',
    paddingInline: '32px',
  },
  {
    name: 'username',
    dataIndex: 'userID',
    fixedWidth: '190px',
    paddingInline: '32px',
  },
  {
    name: 'name',
    dataIndex: 'name',
    fixedWidth: '168px',
    paddingInline: '32px',
  },
];

const paginationL = {
  total: 0,
  pageSize: 12,
};

const paginationR = {
  total: 0,
  pageSize: 12,
};


type AccessManagementData = {
  id: number;
  accessTime: string;
  ip: string;
  userID: string;
  name: string;
};

export default function ConnectionInformationPage() {
  const { dataList, storeDataList } = useAdmAccessManagement();
  // const [data, setData] = useState<AccessManagementData[]>([]);  
  const [dataL, setDataL] = useState<AccessManagementData[]>([]);
  const [dataR, setDataR] = useState<AccessManagementData[]>([]);
  const [startTime, setStartTime] = useState<Dayjs>(dayjs().subtract(7, 'day'));  // 7일전
  const [endTime, setEndTime] = useState<Dayjs>(dayjs());
  const [openFilter, setOpenFilter] = useState<boolean>(true);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const [pageNumber, setPageNumber] = useState(0); // 1페이지
  const [searchText, setSearchText] = useState(""); // 1페이지
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    storeDataList(startTime, endTime, searchText, trans);
  }, []);

  useEffect(() => {
    let _datasL: Array<AccessManagementData> = [];
    let _datasR: Array<AccessManagementData> = [];
    var _tmpData: AccessManagementData
    dataList?.map((item, index) => {
      let strItem = String(item);
      let arrayData = strItem.split(",");
      _tmpData = {
        id: index,
        accessTime: String(arrayData[0]),
        ip: String(arrayData[1]),
        userID: String(arrayData[2]),
        name: String(arrayData[3]),
      }
      if (index % 2 === 0) {
        _datasL.push(_tmpData);
      } else {
        _datasR.push(_tmpData);
      }
      // _datas.push({
      //   id: index,
      //   accessTime: String(arrayData[0]),
      //   ip: String(arrayData[1]),
      //   userID: String(arrayData[2]),
      //   name: String(arrayData[3]),
      // })
    });
    // setData(_datas);
    setDataL(_datasL);
    setDataR(_datasR);
    paginationL.total = _datasL.length; //
    paginationR.total = _datasR.length;

  }, [dataList]);

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>, type: InputTimeRange) => {
    const inputValue = event.target.value;
    const parsedDateTime = dayjs(inputValue);

    if (!parsedDateTime.isValid()) {
      return;
    }

    if (type === InputTimeRange.START) {
      setStartTime(parsedDateTime);
      return;
    }
    setEndTime(parsedDateTime);
  };

  // 우측그리드에 페이지네이션이 달려있기 때문에, 페이지네이션이 변경되는 메세지를 받아서 왼쪽도 처리 하기 위해 이벤트 받음
  const changePage = (page: number) => {
    // console.log(page);
    setPageNumber(page - 1);
  };

  const onChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const onSearch = () => {
    storeDataList(startTime, endTime, searchText, trans);
    setSearchText('') // 입력난 초기화
    setStartTime(dayjs().subtract(7, 'day')); // 시작시간 7일 전으로 초기화
    setEndTime(dayjs()); // 종료시간 현재로 초기화
  };

  return (
    <main className='wrapper flex flex-col items-center w-full pt-5 lg:px-[55px] lg:pt-10 lg:pb-[74px] transition-all'>
      <h1 className='w-full text-hw-white-1 text-xl leading-none mb-6 px-[18px] lg:px-0'>{trans('connectionInfo')}</h1>
      {/* FILTERS */}
      <div className='flex flex-col md:flex-row items-center gap-4 w-full mb-8 md:mb-6 flex-1 px-[18px] lg:px-0'>
        <div className='w-full md:w-fit flex items-center justify-between'>
          <Filter />
          <div
            onClick={() => setOpenFilter((prev) => !prev)}
            className={cn('block md:hidden transition-all rotate-0', openFilter && 'rotate-180')}>
            <Arrow className='stroke-hw-white-1' />
          </div>
        </div>
        <div
          className={cn(
            'w-full md:w-fit flex md:!flex flex-col md:flex-row items-center md:flex-wrap gap-2 md:gap-x-6 md:gap-y-2',
            !openFilter && 'hidden',
          )}>
          <div className='w-full md:w-fit flex items-start gap-0 md:gap-3 mr-0 md:mr-6'>
            <span className='w-[30%] md:w-full text-[14px] font-light leading-8 text-hw-white-2'>{trans('connectTime')}</span>
            <div className='w-full flex flex-col sm:flex-row sm:items-center justify-end gap-2'>
              <div
                onClick={() => startTimeRef.current && startTimeRef.current.showPicker()}
                className='w-full md:w-[232px] py-[11px] pl-[16px] pr-[10px] cursor-pointer rounded-[8px] h-8 bg-hw-dark-2 flex items-center justify-between relative'>
                <input
                  ref={startTimeRef}
                  type='datetime-local'
                  value={startTime.format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => handleTimeChange(e, InputTimeRange.START)}
                  className='opacity-0 absolute w-full h-full'
                />
                <span className='text-[14px] font-light cursor-pointer leading-[18px] outline-none text-hw-white-2'>
                  {startTime.format('YYYY-MM-DD HH:mm:ss')}
                </span>
                <Calendar />
              </div>
              <div className='w-full sm:w-fit flex items-center gap-2 relative'>
                <p className='absolute sm:relative top-[50%] -translate-y-[50%] left-[-18px] sm:top-0 sm:left-0 sm:translate-y-0 z-40 text-[14px] font-light leading-[18px] text-white'>
                  ~
                </p>
                <div
                  className='w-full sm:w-[232px] py-[11px] pl-[16px] pr-[10px] cursor-pointer rounded-[8px] h-8 bg-hw-dark-2 flex items-center justify-between relative'
                  onClick={() => endTimeRef.current && endTimeRef.current.showPicker()}>
                  <input
                    ref={endTimeRef}
                    type='datetime-local'
                    value={endTime.format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => handleTimeChange(e, InputTimeRange.END)}
                    className='opacity-0 absolute w-full h-full'
                  />
                  <span className='text-[14px] font-light cursor-pointer leading-[18px] outline-none text-hw-white-2'>
                    {endTime.format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                  <Calendar />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-fit flex items-center gap-0 md:gap-3 mr-0 md:mr-6'>
            <span className='w-[30%] md:w-full text-[14px] font-light leading-[18px] text-hw-white-2 '>{trans('username')}</span>
            <input
              type='text'
              value={searchText}
              onChange={onChange}
              className='w-full md:w-[160px] h-[32px] px-4 py-[11px] outline-none rounded-lg bg-hw-dark-2 text-[14px] font-light leading-[18px] text-hw-white-2'
            />
          </div>
          <button onClick={onSearch} className='w-full md:w-fit mt-[16px] md:mt-0 px-6 py-[6px] rounded-lg bg-hw-orange-1 text-hw-white-1 text-base font-light leading-[125%]'>
            {trans('search')}
          </button>
        </div>
      </div>

      {/* PC TABLES */}
      <div className='hw-connection-table_wrapper w-full px-[18px] lg:px-0 relative hidden xs:grid grid-cols-1 lg:grid-cols-2 gap-x-5'>
        <TableData data={dataL} columns={columns} pagination={paginationL} pageNumber={pageNumber} />
        <TableData data={dataR} columns={columns} isPagination pagination={paginationR} paginationMarginTop='20px' onSelectPage={changePage} pageNumber={pageNumber} />
      </div>

      {/* MOBILE TABLE */}
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
        <ul className={cn('w-full h-[calc(100vh-360px)] overflow-y-auto', !openFilter && 'h-[calc(100vh-176px)]')}>
          {dataL.map((row: any, index) => (
            <li key={row.id} className='w-full h-[80px] transition-colors odd:bg-[#363E4B] flex flex-wrap'>
              {columns.map((item, index) => (
                <span
                  key={index}
                  style={{ width: `${item.fixedWidth}` }}
                  className={cn('h-10 pt-[10px] pb-3 px-[32px] text-[14px] font-light leading-5 text-hw-white-2')}>
                  {row[item.dataIndex as string] || ''}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
