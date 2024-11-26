import { CellDetailArrowDown, CellDetailArrowUp } from '@/components/icons';
import { cn } from '@/helpers/class-name.helper';

type Props = {
  dummyArr: number[];
  dummyContent: Record<string, string>;
  title: string;
  upTemp: Record<string, string>;
  downTemp: Record<string, string>;
  redIndex: number;
  blueIndex: number;
};

function CellDetailCol({ dummyArr, dummyContent, title, upTemp, downTemp, redIndex, blueIndex }: Props) {
  return (
    <div className='px-[18px] 2xl:px-[32px] py-[24px] h-full bg-hw-dark-2 rounded-none lg:rounded-[8px] w-full flex flex-col'>
      {/* header row */}
      <div className='w-full mb-[24px]'>
        {/* title */}
        <p className='hidden 2lg:block text-[20px] font-normal leading-[20px] mb-[20px]'>{title}</p>
        {/* main stats */}
        <div className='flex flex-col 2xl:flex-row 2xl:items-center gap-4 2xl:gap-[40px]'>
          <div className='w-[226px] h-5 2xl:h-[24px] flex items-center text-[#FFA7A7] text-[16px] 2xl:text-[18px] font-light leading-5 2xl:leading-[22px]'>
            <CellDetailArrowUp />
            <span className='ml-[12px]'>{upTemp.title}</span>
            <span className='ml-[27px] mr-[24px]'>:</span>
            <span>{upTemp.value}</span>
          </div>
          <div className='w-[226px] h-5 2xl:h-[24px] flex items-center text-[#7EC5FF] text-[16px] 2xl:text-[18px] font-light leading-5 2xl:leading-[22px]'>
            <CellDetailArrowDown />
            <span className='ml-[12px]'>{downTemp.title}</span>
            <span className='ml-[16px] mr-[24px]'>:</span>
            <span>{downTemp.value}</span>
          </div>
        </div>
      </div>
      {/* stats table */}
      <div className='w-full overflow-y-auto h-[634px] white-scrollbar'>
        <div className='grid grid-cols-2 2xl:grid-cols-3 gap-x-2 2xl:gap-y-[16px] 2xl:gap-x-10 h-[40px] transition-all text-[14px] font-light leading-[18px]'>
          {dummyArr.map((val, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center h-[40px] px-[16px] pt-[4px] justify-between rounded-[8px] text-hw-white-2',
                index === redIndex && 'text-hw-white-1 bg-hw-red-1',
                index === blueIndex && 'text-hw-white-1 bg-hw-blue-1',
              )}>
              {title == "Voltage" ?
                <span>{`Cell V#${index+1}`}</span>
                : <span>{`Temp #${index+1}`}</span>
              }
              <span className='text-white-1 ml-0 sm:ml-4'>:</span>
              {title == "Voltage" ?
                <span className='text-hw-white-1'>{val.toFixed(3)}V</span>
                : <span className='text-hw-white-1'>{val}°C</span>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CellDetailCol;
