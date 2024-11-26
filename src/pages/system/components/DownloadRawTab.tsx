import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { cn } from '@/helpers/class-name.helper';
import { backendURL, serverDomain } from '@/api/URLs';
import { useTranslation } from 'react-i18next';
import ProgressBar from './download/ProgressBar';
import { api } from '@/api/api';

interface IcheckboxData {
  id: number,
  name: string,
  desc: string,
  checked: boolean
}

export default function DownloadTab() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const bmsid = pathnameParts.length > 2 ? pathnameParts[2] : null;

  const [startTime, setStartTime] = useState<Dayjs>();
  const [endTime, setEndTime] = useState<Dayjs>();
  const [filename, setFilename] = useState<string>('');
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [duration, setDuration] = useState(-1);
  const { t: trans } = useTranslation('translation');

  const theme = createTheme({
    palette: {
      mode: 'dark', // Dark 모드 설정
    },
  });

  const CHECKBOX_DATA: IcheckboxData[] = [
    {
      id: 0,
      name: 'Can_Data',
      desc: 'BMS Can Raw Data',
      checked: true
    },
    {
      id: 1,
      name: 'Modbus_Data',
      desc: 'BMS Modbus Raw Data',
      checked: true
    },
    {
      id: 4,
      name: 'Table_data',
      desc: 'DB Table Data',
      checked: true
    },
    {
      id: 5,
      name: 'Null_data',
      desc: 'DB Null Table Data',
      checked: true
    },
  ]
  const [checkboxData, setCheckboxData] = useState(CHECKBOX_DATA);

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
    setTime();
  }, [bmsid]);

  useEffect(() => {
    setFilename("");
  }, [bmsid, startTime, endTime, checkboxData]);

  return (
    <>
      <div className='w-full px-[18px] sm:px-[18px] lg:px-8 pt-5 lg:pt-6 pb-10 bg-hw-dark-2 rounded-none lg:rounded-lg flex flex-col'>
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
    </>
  );
}
