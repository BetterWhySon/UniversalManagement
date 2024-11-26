import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TableData from '@/components/table/TableData';
import { backendURL, serverDomain } from '@/api/URLs';
import { api } from '@/api/api';
import { Calendar, InfoDetailRefresh } from '@/components/icons';
import dayjs, { Dayjs } from 'dayjs';
import { InputTimeRange } from '@/enums/input-time-range';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { cn } from '@/helpers/class-name.helper';
import ProgressBar from './download/ProgressBar';

export default function DownloadTab() {
  const { t: trans } = useTranslation('translation');
  const token = localStorage.getItem("token");
  const pathnameParts = location.pathname.split('/');
  const bmsid = pathnameParts.length > 2 ? pathnameParts[2] : null;

  const [startTime, setStartTime] = useState<Dayjs>(dayjs().subtract(7, 'day'));
  const [endTime, setEndTime] = useState<Dayjs>(dayjs());
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");

  const [filename, setFilename] = useState<string>('');
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [duration, setDuration] = useState(-1);
  interface IcheckboxData {
    id: number,
    name: string,
    desc: string,
    checked: boolean
  }

  const CHECKBOX_DATA: IcheckboxData[] = [
    {
      id: 2,
      name: 'Data_transfer_state',
      desc: 'BMS Transfer State Data',
      checked: true
    },
    {
      id: 3,
      name: 'Delay_time',
      desc: 'BMS Delay Time Data',
      checked: true
    },
    {
      id: 6,
      name: 'Cache_data_transfer_state',
      desc: 'Cache Data Transfer State',
      checked: true
    },
  ]

  const [checkboxData, setCheckboxData] = useState(CHECKBOX_DATA);

  const theme = createTheme({
    palette: {
      mode: 'dark', // Dark 모드 설정
    },
  });

  interface IFile {
    id: any;
    file_name: string;
    file_size: string;
    modified_time: string;
  }
  const defaultTableData = [{
    id: 1,
    'file_name': '',
    'file_size': '',
    'modified_time': trans('dataNotExist'),
  }]
  const [data, setData] = useState<IFile[]>(defaultTableData);
  const [fileDir, setFileDir] = useState('');
  const columns = [
    {
      name: 'name',
      dataIndex: 'file_name',
      paddingInline: '32px',
      render: (row: IFile) => (
        <a className="hover:font-bold underline underline-offset-4"
          href={serverDomain + `/infos/${fileDir}/${row.file_name}`} download>
          {row.file_name}
        </a>
      )
    },
    {
      name: 'modificationDate',
      dataIndex: 'modified_time',
      paddingInline: '24px',
    },
    {
      name: 'size',
      dataIndex: 'file_size',
      paddingInline: '24px'
    },
  ];

  const onSearch = () => {
    getLogFiles();
  };
  const onChange = (e: any) => {
    setSearchText(e.target.value);
  };

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
  const resetFilter = () => {
    setSearchText("");
    setStartTime(dayjs().subtract(7, 'day'))
    setEndTime(dayjs())
  }

  const getLogFiles = async () => {
    setData([]);
    const date_from_str = startTime?.format('YYYY-MM-DD HH:mm:ss')
    const date_to_str = endTime?.format('YYYY-MM-DD HH:mm:ss')
    const payload = {
      "bms_id": Number(bmsid),
      'date_from': date_from_str,
      'date_to': date_to_str,
      'filename_pattern': searchText,
    };
    try {
      const response = await api.post(
        backendURL + 'user_download_lgw_info_file/',
        payload,
        { headers: { Authorization: "Bearer " + token, }, }
      )
      const fileList = response.data.files
      setFileDir(response.data.dir)
      if (fileList.length > 0) {
        let i = 1;
        fileList.forEach((element: IFile) => { element.id = i++; });
        setData(fileList)
      } else {
        setData(defaultTableData);
      }

    } catch (error) {
      setData(defaultTableData);
    }
  };

  const onClickDownload = async () => {
    const checked_list = checkboxData.filter(elem => elem.checked).map(elem => elem.id)
    if (checked_list.length == 0) {
      alert(trans('pleaseSelect'));
      return;
    }

    setFilename("")
    setLoadingFile(true);

    const date_from_str = startTime?.format('YYYY-MM-DD HH:mm:ss')
    const date_to_str = endTime?.format('YYYY-MM-DD HH:mm:ss')
    const size_response = await api.post(backendURL + 'user_download_size/', {
      "bms_id": Number(bmsid),
      'date_from': date_from_str,
      'date_to': date_to_str,
      'checked_list': checked_list,
    }, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })

    setDuration(size_response.data.filesize);
    const response = await api.post(backendURL + 'user_download/', {
      "bms_id": Number(bmsid),
      'date_from': date_from_str,
      'date_to': date_to_str,
      'checked_list': checked_list,
    }, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    setLoadingFile(false);
    setFilename(response.data.filename)
    setDuration(-1);

  }
  const setTime = () => {
    const curDate = new Date();
    curDate.setMinutes(0);
    curDate.setSeconds(0);
    setEndTime(dayjs(curDate));
    curDate.setDate(curDate.getDate() - 1);
    setStartTime(dayjs(curDate));
  }
  const onchangeCheckbox = (id: number) => {
    setCheckboxData(prevCheckboxData => {
      return prevCheckboxData.map(checkbox => {
        if (checkbox.id === id) {
          return { ...checkbox, checked: !checkbox.checked };
        }
        return checkbox;
      });
    });
  }

  useEffect(() => {
    setFilename("");
  }, [bmsid, startTime, endTime, checkboxData])

  useEffect(() => {
    setTime();
    setSearchText("")
    getLogFiles();
    return () => {
      setData(defaultTableData);
    }
  }, [bmsid]);

  useEffect(() => {
    if (searchText === "") {
      onSearch()
    }
  }, [searchText, startTime, endTime]);

  return (
    <>
      <div className='w-full px-[18px] sm:px-[18px] lg:px-8 pt-5 lg:pt-6 pb-10 mb-10 bg-hw-dark-2 rounded-none lg:rounded-lg flex flex-col'>
        <p className="text-xl mb-5 pb-5 border-b">Raw Data Download</p>
        <div className={cn('flex h-9 my-5')}>
          <div className='flex flex-col xs:flex-row gap-[8px] xs:items-center mt-[16px] mr-8 sm:mb-[40px]'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <ThemeProvider theme={theme}>
                <DateTimePicker
                  views={['year', 'month', 'day', 'hours']}
                  label="Start date"
                  ampm={false}
                  format='YYYY/MM/DD HH A'
                  value={startTime}
                  onChange={(v) => {
                    if (v) {
                      setStartTime(v)
                      if (endTime!.diff(v) > 31 * 24 * 3600 * 1000) {
                        setEndTime(v.add(30, 'days'));
                        alert(trans('limitThePeriodTo30Days'))    // "기간을 30일로 한정"
                      }
                    }
                  }}

                />
              </ThemeProvider>
            </LocalizationProvider>
            <div className='flex items-center gap-2'>
              <p className='text-[14px] font-light leading-[18px] text-hw-white-1'>~</p>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <ThemeProvider theme={theme}>
                  <DateTimePicker
                    views={['year', 'month', 'day', 'hours']}
                    label="End date"
                    ampm={false}
                    format='YYYY/MM/DD HH A'
                    value={endTime}
                    onChange={(v) => {
                      if (v) {
                        setEndTime(v)
                        if (v!.diff(startTime) > 31 * 24 * 3600 * 1000) {
                          setStartTime(v.subtract(30, 'days'));
                          alert(trans('limitThePeriodTo30Days'))    // "기간을 30일로 한정"
                        }
                      }
                    }}
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </div>
          </div>
          <button
            onClick={onClickDownload}
            className={cn(
              'hidden sm:block text-[16px] font-bold sm:font-light leading-[20px] px-6 py-2 rounded-lg bg-hw-orange-1 text-hw-white-1 transition-all'
            )}>
            {trans('readyToDownload')}
          </button>
          {(filename !== "" || loadingFile) && (
            <a className='ml-2 flex items-center' href={loadingFile ? '#' : serverDomain + 'files/' + filename}>
              <button
                className={cn(
                  'hidden sm:block text-[16px] font-bold sm:font-light leading-[20px] px-6 py-2 rounded-lg bg-hw-green-1 text-hw-white-1 transition-all relative px-8', loadingFile && 'bg-hw-gray-5'
                )}>
                {trans('download')}
                {loadingFile && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                )}

              </button>
              <div className='m-2'>
                {filename}
              </div>
            </a>

          )}
          {loadingFile && <ProgressBar duration={duration} />}


        </div>

        {/* CHECKBOXS */}
        <ul className='mt-10 sm:grid w-full grid-cols-2 gap-x-10 gap-y-10'>
          {checkboxData.map((checkbox) => {
            return (
              <div key={checkbox.id} className='w-full flex gap-[6px]'>
                <input type='checkbox' name='fitler-checkbox' checked={checkbox.checked} onChange={() => { onchangeCheckbox(checkbox.id) }} className='hw-checkbox w-[16px] h-[16px] mr-[10px] mb-[10px]' />
                <div className='flex flex-col'>
                  <span className='text-[18px] leading-[18px] font-normal text-hw-white-1'>{checkbox.name}</span>
                  <p className='text-[14px] mt-3 leading-[18px] font-light text-hw-white-2'>{checkbox.desc}</p>
                </div>
              </div>
            )
          })}
        </ul>
      </div>
      <hr/>
      <div className='w-full md:w-fit flex md:!flex flex-col md:flex-row items-center md:flex-wrap gap-10 m-5 py-5'>
        <div className='w-full md:w-fit flex items-center gap-3'>
          <span className='w-[30%] md:w-full text-[14px] font-light leading-[18px] text-hw-white-2 '>{trans('fileName')}</span>
          <input
            type='text'
            value={searchText}
            onChange={onChange}
            className='w-full md:w-[160px] h-[32px] px-4 py-[11px] outline-none rounded-lg bg-hw-dark-2 text-[14px] font-light leading-[18px] text-hw-white-2'
          />
        </div>
        <div className='w-full md:w-fit flex items-start gap-3'>
          <span className='w-[30%] md:w-full text-[14px] font-light leading-8 text-hw-white-2'>{trans('modificationDate')}</span>
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

        <button
          onClick={onSearch}
          className='w-full md:w-fit mt-[16px] md:mt-0 px-6 py-[6px] rounded-lg bg-hw-orange-1 text-hw-white-1 text-base font-light leading-[125%]'>
          {trans('search')}
        </button>

        <button onClick={resetFilter} className='h-full w-[40px] px-2 py-[6px] inline-flex items-center justify-center rounded-lg border border-[#E2E2E2]'>
          <InfoDetailRefresh />
        </button>

      </div>
      <div className="m-5">
        <TableData
          data={data}
          columns={columns}
          isPagination={true}
          pagination={{
            total: data?.length,
            pageSize: 20,
          }}
          paginationMarginTop='32px'
        />
      </div>
    </>
  );
}
