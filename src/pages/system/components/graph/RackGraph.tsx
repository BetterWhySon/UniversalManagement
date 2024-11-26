import { ChevronFilterDownActive } from '@/components/icons';
import CheckBox from '@/components/ui/CheckBox';
import { InputTimeRange } from '@/enums/input-time-range';
import { cn } from '@/helpers/class-name.helper';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const GRAPH_CHECKBOXS_CELLS = ['CELL 전압', 'CELL 온도'];
const RACK_GRAPH_CHECKBOXS_EMS = ['RACK 전압', 'RACK 전류', 'RACK SOC', 'RACK SOH'];
const RACK_GRAPH_CHECKBOXS_CELLS = ['CELL 전압', 'CELL 온도'];

const RackGraph = () => {
  const [startTime, setStartTime] = useState<Dayjs>(dayjs('2023-08-24T09:00'));
  const [endTime, setEndTime] = useState<Dayjs>(dayjs('2023-08-24T09:00'));
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const { t: trans } = useTranslation('translation');

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
  return (
    <>
      {/* DATETIME INPUTS */}
      <div className='flex flex-col xs:flex-row gap-[8px] xs:items-center mb-[32px] mt-4 xs:mt-0'>
        <div className='w-full xs:w-[208px] text-[14px] font-bold leading-[18px] text-hw-white-1 py-[9px] px-[8px] rounded-[8px] h-[36px] bg-transparent border border-hw-gray-0.5 relative'>
          <input
            ref={startTimeRef}
            type='datetime-local'
            value={startTime.format('YYYY - MM - DDTHH:mm')}
            onChange={(e) => handleTimeChange(e, InputTimeRange.START)}
            onClick={() => startTimeRef.current && startTimeRef.current.showPicker()}
            className='opacity-0 absolute w-full h-full'
          />
          <span>{startTime.format('YYYY - MM - DD HH:mm:ss')}</span>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-[14px] font-light leading-[18px] text-hw-white-1'>~</p>
          <div className='w-full xs:w-[208px] text-[14px] font-bold leading-[18px] text-hw-white-1 py-[9px] px-[8px] rounded-[8px] h-[36px] bg-transparent border border-hw-gray-0.5 relative'>
            <input
              ref={endTimeRef}
              type='datetime-local'
              value={endTime.format('YYYY - MM - DDTHH:mm')}
              onChange={(e) => handleTimeChange(e, InputTimeRange.END)}
              onClick={() => endTimeRef.current && endTimeRef.current.showPicker()}
              className='opacity-0 absolute w-full h-full'
            />
            <span>{endTime.format('YYYY - MM - DD HH:mm:ss')}</span>
          </div>
        </div>
      </div>

      {/* CHECKBOXS */}
      <div className='w-full flex flex-wrap'>
        <div className='w-full flex flex-col xl:flex-row xl:items-center mb-6 xl:mb-0'>
          <span className='text-[16px] font-normal leading-4 xl:text-[18px] xl:font-bold xl:leading-[18px] text-hw-white-2 mr-[14px] mb-[14px] xl:mb-0'>
            RACK
          </span>
          <ul className='grid grid-cols-2 gap-0 sm:flex sm:gap-x-5'>
            {RACK_GRAPH_CHECKBOXS_EMS.map((check, index) => (
              <CheckBox key={check} label={check} fontWeight='bold' gap='4px' index={index} />
            ))}
          </ul>
        </div>
        <div className='w-full sm:w-fit flex flex-col xl:flex-row xl:items-center mb-6 xl:mb-0 mr-0 sm:mr-[94px]'>
          <span className='text-[16px] font-normal leading-4 xl:text-[18px] xl:font-bold xl:leading-[18px] text-hw-white-2 mr-[14px] mb-[14px] xl:mb-0'>
            CELL <span className='text-[12px] leading-[12px] font-bold xl:font-light'>({trans('maxMinAve')})</span>
          </span>
          <ul className='grid grid-cols-2 gap-0 sm:flex sm:gap-x-5'>
            {GRAPH_CHECKBOXS_CELLS.map((check, index) => (
              <CheckBox key={check} label={check} fontWeight='bold' gap='4px' index={index} />
            ))}
          </ul>
        </div>
        <div className='w-full sm:w-fit flex flex-col xl:flex-row xl:items-center mb-6 xl:mb-0'>
          <span className='text-[16px] font-normal leading-4 xl:text-[18px] xl:font-bold xl:leading-[18px] text-hw-white-2 mr-[14px] mb-[14px] xl:mb-0'>
            CELL <span className='text-[12px] leading-[12px] font-bold xl:font-light'>({trans('individual')})</span>
          </span>
          <ul className='grid grid-cols-1 gap-2 sm:gap-y-0 sm:flex sm:gap-x-5'>
            {RACK_GRAPH_CHECKBOXS_CELLS.map((check, index) => {
              const value = index === 0 ? '#112' : index === 1 ? '#1' : '';
              return (
                <div key={check} className='flex items-center gap-[8px]'>
                  <CheckBox label={check} fontWeight='bold' index={index} />
                  <div className={cn('custom-select', index === 0 && 'dark-bg', index === 1 && 'light-bg')}>
                    <select>
                      <option selected value={value}>
                        {value}
                      </option>
                    </select>
                    <div className='select-arrow'>
                      <ChevronFilterDownActive />
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RackGraph;
