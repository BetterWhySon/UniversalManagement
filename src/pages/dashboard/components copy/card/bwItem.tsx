import { cn } from '@/helpers/class-name.helper';
import { CARD_TYPE } from '@/constants/dashboard.constant';
import { Dot } from '@/components/icons';
import { useTranslation } from 'react-i18next';

function getBatteryStyle(type: CARD_TYPE) {
  switch (type) {
    case CARD_TYPE.NORMAL:
      return {
        bg: 'bg-hw-green-1',
        text: 'text-hw-white-1',
      };
    case CARD_TYPE.WARNING:
      return {
        bg: 'bg-hw-gray-1',
        text: 'text-hw-gray-9',
      };
    case CARD_TYPE.FAULT:
      return {
        bg: 'bg-hw-yellow-1',
        text: 'text-hw-gray-9',
      };

    default:
      return {
        bg: 'bg-hw-yellow-1',
        text: 'text-hw-gray-9',
      };
  }
}
function getButtonStyle(type: CARD_TYPE) {
  switch (type) {
    case CARD_TYPE.NORMAL:
      return {
        bg: 'bg-hw-green-1',
      };
    case CARD_TYPE.WARNING:
      return {
        bg: 'bg-hw-orange-2',
      };
    case CARD_TYPE.FAULT:
      return {
        bg: 'bg-hw-red-1',
      };
    default:
      return {
        bg: 'bg-hw-green-1',
      };
  }
}
function getDotStyle(type: CARD_TYPE) {
  switch (type) {
    case CARD_TYPE.NORMAL:
      return {
        color: 'hw-blue-1',
      };
    case CARD_TYPE.WARNING:
      return {
        color: 'hw-gray-1',
      };
    case CARD_TYPE.FAULT:
      return {
        color: 'hw-orange-2',
      };
    default:
      return {
        color: 'hw-blue-1',
      };
  }
}
export default function BWCardItem({ data }: any) {
  // useEffect(() => {
  //   console.log(tipRef.current?.getBoundingClientRect());
  // }, [tipRef]);
  const { t: trans } = useTranslation('homeCard');

  return (
    <div
      className={cn(
        'bg-hw-dark-1 flex w-full min-w-[240px] flex-col justify-center items-center relative pt-[22px] pb-[18px] px-6 rounded-lg font-light',
      )}>
      <Dot className='absolute top-4 right-4' color={getDotStyle(data.type).color} />
      <div className={cn('flex flex-col text-hw-white-2 self-start')}>
        <span className='leading-[128.571%] text-sm'>{data.title.line1}</span>
        <span className={cn('text-hw-white-1 mb-1 mt-2 text-lg leading-[122.222%] ')}>{data.title.line2}</span>
        <span className='leading-tight'>{data.title.line3}</span>
      </div>
      <div
        className={cn(
          'w-[188px] h-8 flex items-center pl-2 mt-[18px] text-lg font-light gap-2 relative rounded leading-none',
          'after:absolute after:content-[""] after:bg-inherit after:-right-1 after:rounded-r-[4px] after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-4',
          getBatteryStyle(data.type).bg,
          getBatteryStyle(data.type).text,
        )}>
        {data.battery.icon}
        <span>{data.battery.label}</span>
      </div>

      <span className={cn('text-[40px] font-normal leading-none text-hw-orange-3 self-end mt-[26px]')}>
        {data.percentage}%
      </span>
      <div className={cn('flex flex-col w-full gap-[14px] mt-[18px] mb-10')}>
        {data.parameters.map((parameter: any) => {
          return (
            <span key={parameter.id} className={cn('flex leading-none text-lg text-hw-white-2 justify-between')}>
              <span className='leading-none font-extralight'>{trans(parameter.label)}</span>
              <span className={cn('font-normal text-hw-white-1 leading-none')}>{parameter.value}</span>
            </span>
          );
        })}
      </div>
      <button
        className={cn(
          'hw-tooltip',
          'flex items-center justify-center text-hw-white-1 w-full h-12 rounded-lg text-lg font-light gap-2',
          getButtonStyle(data.type).bg,
        )}>
        {data.action.icon} {data.action.label}
        <div className='hw-tooltip-text hw-tooltip-top hw-tooltip-center'>
          <div className='text-sm bg-hw-gray-10 flex w-max leading-[128.571%] rounded-lg h-8'>
            <span className='flex items-center px-4'>22.06.30 15:20:25</span>
            <span className='flex items-center gap-2 px-4 w-[11.5rem]'>
              <Dot color='hw-orange-4' /> <span className='leading-[128.571%]'>Warning</span>
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
