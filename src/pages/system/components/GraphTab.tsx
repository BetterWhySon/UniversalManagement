import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import { cn } from '@/helpers/class-name.helper';
import { InputTimeRange } from '@/enums/input-time-range';
import { PeriodType } from '@/enums/graph';
import systemEmsGraphStore from '@/api/systemEmsGraphStore';

import GraphEchart from './graph/GraphEchart';
import SystemGraph from './graph/SystemGraph';
import { api } from '@/api/api';
import { backendURL, websocketURL } from '@/api/URLs';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@/components/icons';

const GRAPH_BUTTONS = [
  {
    id: 1,
    name: 'realTime',
    periodType: PeriodType.REALTIME,
    className:
      'text-[16px] h-9 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
  },
  {
    id: 2,
    name: 'date',
    periodType: PeriodType.SELECTED,
    className:
      'text-[16px] h-9 mr-0 mr-[18px] font-bold font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border',
  },
];

export default function GraphTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const { periodType, startTime, endTime, graphInfos, setPeriodType, setStartTime, setEndTime, connect, disconnect, setGraphInfos, resetGraphInfos } = systemEmsGraphStore();
  const [isLoading, setIsLoading] = useState(false);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const pathnameParts = location.pathname.split('/');
  const bmsid = pathnameParts.length > 2 ? pathnameParts[2] : null;
  const rackid = pathnameParts.length > 4 ? pathnameParts[4] : null;

  const token = localStorage.getItem("token");
  const query_string_bms = [token, bmsid, 3600, 'web']
  const query_string_rack = [token, bmsid, 3600, 'web', rackid]
  const url = websocketURL + 'system_graph_rt/?query_string=';
  const { t: trans } = useTranslation('translation');

  const onClickPeriod = async () => {
    setIsLoading(true);
    const params: any = {
      "bms_id": Number(bmsid),
      'date_from': startTime?.format('YYYY-MM-DD HH:mm:ss'),
      'date_to': endTime?.format('YYYY-MM-DD HH:mm:ss'),
    }

    let timeDifference = endTime!.diff(startTime!, 'day')
    if (timeDifference >= 60) {
      params.interval_1h = true;
    } else if (timeDifference > 0) {
      params.interval_1m = true;
    }

    if (rackid) {
      params.rack_num = Number(rackid)
      const response = await api.post(backendURL + 'user_graph_period/', params, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      setGraphInfos(response.data, 'RACK')
    }
    else {
      params.rack_id = rackid
      const response = await api.post(backendURL + 'user_graph_period/', params, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      setGraphInfos(response.data, 'EMS')
    }
    setIsLoading(false);
  }

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>, type: InputTimeRange) => {
    const inputValue = event.target.value;
    const parsedDateTime = dayjs(inputValue);

    if (!parsedDateTime.isValid()) {
      return;
    }

    if (type === InputTimeRange.START) {
      setStartTime(parsedDateTime);
    }
    else {
      setEndTime(parsedDateTime);
    }
  };


  useEffect(() => {
    setTime();
    if (token === null) {
      navigate('/login');
      return;
    }
    if (periodType === PeriodType.SELECTED) {
      setPeriodType(PeriodType.REALTIME);
    }
    return () => {
      resetGraphInfos();
    };
  }, []);

  useEffect(() => {
    setTime();
    if (periodType === PeriodType.REALTIME) {
      if (rackid === null) {
        connect(url + query_string_bms);
      }
      else {
        connect(url + query_string_rack);
      }
      return () => {
        disconnect();
      };
    }
    else if (periodType === PeriodType.SELECTED) {
      resetGraphInfos();
    }
  }, [bmsid, periodType, rackid]);

  return (
    <div className='flex flex-col gap-[32px] mb-0 lg:mb-[32px] w-full h-[calc(100vh-149px)] lg:h-fit'>
      {/* buttons and check boxes section */}
      <section className='h-full py-5 px-[18px] lg:px-8 lg:py-6 lg:pb-3 bg-hw-dark-2 rounded-none lg:rounded-lg flex flex-col'>
        <div className={cn('flex items-center w-full mb-6')}>
          {GRAPH_BUTTONS.map((btn) => {
            return (
              <button
                key={btn.id}
                className={cn(btn.className, btn.periodType == periodType && 'bg-[#FFDAC2] border-hw-orange-1')}
                onClick={() => {
                  setPeriodType(btn.periodType);
                }}>
                {trans(btn.name)}
              </button>
            );
          })}
          <div className='w-full md:w-fit flex items-start gap-3'>
            <div className='w-full flex flex-col sm:flex-row sm:items-center justify-end gap-2'>
              <div
                onClick={() => startTimeRef.current && startTimeRef.current.showPicker()}
                className={cn('w-full md:w-[232px] py-[11px] pl-[16px] pr-[10px] cursor-pointer rounded-[8px] h-8 bg-hw-dark-2 flex items-center justify-between relative border', periodType != PeriodType.SELECTED && 'border-hw-white-3')}>
                <input
                  ref={startTimeRef}
                  type='datetime-local'
                  value={startTime?.format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => handleTimeChange(e, InputTimeRange.START)}
                  className='opacity-0 absolute w-full h-full'
                />
                <span className={cn('text-[14px] font-light cursor-pointer leading-[18px] outline-none text-hw-white-2', periodType == PeriodType.SELECTED && 'font-bold text-white')}>
                  {startTime?.format('YYYY-MM-DD HH:mm:ss')}
                </span>
                <Calendar />
              </div>
              <div className='w-full sm:w-fit flex items-center gap-2 relative'>
                <p className='absolute sm:relative top-[50%] -translate-y-[50%] left-[-18px] sm:top-0 sm:left-0 sm:translate-y-0 z-40 text-[14px] font-light leading-[18px] text-white'>
                  ~
                </p>
                <div
                  className={cn('w-full sm:w-[232px] py-[11px] pl-[16px] pr-[10px] cursor-pointer rounded-[8px] h-8 bg-hw-dark-2 flex items-center justify-between relative border', periodType != PeriodType.SELECTED && 'border-hw-white-3')}
                  onClick={() => endTimeRef.current && endTimeRef.current.showPicker()}>
                  <input
                    ref={endTimeRef}
                    type='datetime-local'
                    value={endTime?.format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => handleTimeChange(e, InputTimeRange.END)}
                    className='opacity-0 absolute w-full h-full'
                  />
                <span className={cn('text-[14px] font-light cursor-pointer leading-[18px] outline-none text-hw-white-2', periodType == PeriodType.SELECTED && 'font-bold text-white')}>
                {endTime?.format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                  <Calendar />
                </div>
              </div>
            </div>
          </div>
          {/* DATETIME INPUTS */}
          {/* <div className={cn('text-[14px] text-[#6a6a6a] leading-[18px] rounded-[8px] h-[36px] bg-transparent border relative', periodType != PeriodType.SELECTED ? ' border-hw-white-3 ' : 'font-bold text-white')}>
            <input
              disabled={periodType != PeriodType.SELECTED}
              ref={startTimeRef}
              type='datetime-local'
              value={startTime ? startTime.format('YYYY-MM-DD HH:mm:ss') : ''}
              onChange={(e) => handleTimeChange(e, InputTimeRange.START)}
              onClick={() => startTimeRef.current && startTimeRef.current.showPicker()}
              className='h-full w-full bg-transparent text-center'
            />
          </div>
          <p className='text-[14px] font-light mx-2'>-</p>
          <div className='flex items-center gap-2'>
            <div className={cn('text-[14px] text-[#6a6a6a] leading-[18px] rounded-[8px] h-[36px] bg-transparent border relative', periodType != PeriodType.SELECTED ? ' border-hw-white-3' : 'font-bold text-white')}>
              <input
                disabled={periodType != PeriodType.SELECTED}
                ref={endTimeRef}
                type='datetime-local'
                value={endTime ? endTime.format('YYYY-MM-DD HH:mm:ss') : ''}
                onChange={(e) => handleTimeChange(e, InputTimeRange.END)}
                onClick={() => endTimeRef.current && endTimeRef.current.showPicker()}
                className='h-full w-full bg-transparent text-center'
              />
            </div>
          </div> */}
          <button
            key={6}
            disabled={periodType != PeriodType.SELECTED || isLoading}
            className={cn('relative text-[16px] h-9 font-light leading-[20px] text-hw-white-1 ml-3 px-6 py-2 rounded-lg bg-hw-orange-1', (periodType != PeriodType.SELECTED) || isLoading ? 'bg-opacity-50' : 'bg-opacity-100')}
            onClick={() => {
              onClickPeriod();
            }}>
            <span className='mx-2'>{trans('search')}</span>
            {isLoading && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}

          </button>
        </div>

        <SystemGraph />
      </section>
      <section className='w-full px-8 py-6 bg-hw-dark-2 rounded-lg grid grid-cols-2 gap-[48px]'>
        {
          graphInfos
            .filter((graphInfo) => {
              if (location.pathname.includes('/rack')) {
                return graphInfo.page == 'RACK'
              } else {
                return graphInfo.page == 'EMS'
              }
            })
            .filter((graphInfo) => graphInfo.checked)
            .map((graphInfo) => { return (<GraphEchart key={graphInfo.gid} graphInfo={graphInfo} />) })
        }
      </section>
    </div>
  );

  function setTime() {
    const startDate = new Date();
    startDate.setHours(startDate.getHours() - 1);
    const endDate = new Date();
    if (startDate.getSeconds() == 0) {
      startDate.setSeconds(1);
    }
    if (endDate.getSeconds() == 0) {
      endDate.setSeconds(1);
    }
    setStartTime(dayjs(startDate));
    setEndTime(dayjs(endDate));
  }
}
