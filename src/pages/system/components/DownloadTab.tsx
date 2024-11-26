import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { cn } from '@/helpers/class-name.helper';
import { backendURL, serverDomain } from '@/api/URLs';
import LogFileDownload from './download/LogFileDownload';
import { useTranslation } from 'react-i18next';

export default function DownloadTab() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const bmsid = pathnameParts.length > 2 ? pathnameParts[2] : null;

  const [canChecked, setCanChecked] = useState(true);
  const [modbusChecked, setModbusChecked] = useState(true);
  const [startTime, setStartTime] = useState<Dayjs>(dayjs('2024-03-22T09:00'));
  const [endTime, setEndTime] = useState<Dayjs>(dayjs('2024-03-22T10:00'));
  const [filename, setFilename] = useState<string>('');
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const { t: trans } = useTranslation('translation');

  const theme = createTheme({
    palette: {
      mode: 'dark', // Dark 모드 설정
    },
  });


  const onClickDownload = async () => {
    // console.log('onClickDownload')
    setFilename("")
    setLoadingFile(true);
    // setIsDownload(!isDownload)
    const date_from_str = startTime?.format('YYYY-MM-DD HH:mm:ss')
    const date_to_str = endTime?.format('YYYY-MM-DD HH:mm:ss')
    const response = await axios.post(backendURL + 'user_download/', {
      "bms_id": Number(bmsid),
      'date_from': date_from_str,
      'date_to': date_to_str,
      'can_checked': canChecked,
      'modbus_checked': modbusChecked,
    }, {
      headers: {
        // responseType: 'stream',
        Authorization: "Bearer " + token,
      },
    })
    // console.log(response.data)
    // response.data.on('data', (chunk: any) => {
    //   console.log(chunk)
    // })
    setLoadingFile(false);
    setFilename(response.data.filename)


  }
  const setTime = () => {
    const curDate = new Date();
    curDate.setMinutes(0);
    curDate.setSeconds(0);
    setEndTime(dayjs(curDate));
    curDate.setDate(curDate.getDate() -1);
    setStartTime(dayjs(curDate));
  }

  useEffect(() => {
    setTime();
  }, []);


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
            <a className='ml-2' href={loadingFile ? '#' : serverDomain + '/files/' + filename}>
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
            </a>
          )}
        </div>

        {/* CHECKBOXS */}
        <ul className='sm:grid w-full grid-cols-2 gap-x-10 gap-y-10'>
          <div className='w-full flex gap-[6px]'>
            <input type='checkbox' name='fitler-checkbox' checked={canChecked} onChange={() => setCanChecked(!canChecked)} className='hw-checkbox w-[16px] h-[16px] mr-[10px] mb-[10px]' />
            <div className='flex flex-col'>
              <span className='text-[18px] leading-[18px] font-normal text-hw-white-1'>Can_Data</span>
              <p className='text-[14px] mt-3 leading-[18px] font-light text-hw-white-2'>BMS Can Raw Data</p>
            </div>
          </div>
          <div className='w-full flex gap-[6px]'>
            <input type='checkbox' name='fitler-checkbox' checked={modbusChecked} onChange={() => setModbusChecked(!modbusChecked)} className='hw-checkbox w-[16px] h-[16px] mr-[10px] mb-[10px]' />
            <div className='flex flex-col'>
              <span className='text-[18px] leading-[18px] font-normal text-hw-white-1'>Modbus_Data</span>
              <p className='text-[14px] mt-3 leading-[18px] font-light text-hw-white-2'>BMS Modbus Raw Data</p>
            </div>
          </div>
        </ul>
      </div>
      <LogFileDownload />
    </>
  );
}
