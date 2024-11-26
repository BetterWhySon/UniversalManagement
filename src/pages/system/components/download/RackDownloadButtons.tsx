import { cn } from '@/helpers/class-name.helper';
import { useState } from 'react';

export default function RackDownloadButtons() {
  const [isDownload, setIsDownload] = useState<boolean>(false);
  return (
    <div className={cn('flex h-9')}>
      <button className='w-[45%] sm:w-fit text-[16px] mr-2 sm:mr-[18px] font-bold sm:font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border border-[#E2E2E2] '>
        실시간
      </button>
      <button className='w-[55%] sm:w-fit text-[16px] mr-0 sm:mr-[40px] font-bold sm:font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg bg-[#FFDAC2] border border-hw-orange-1'>
        날짜 선택
      </button>
      <button
        onClick={() => setIsDownload((prev) => !prev)}
        className={cn(
          'hidden sm:block text-[16px] font-bold sm:font-light leading-[20px] px-6 py-2 rounded-lg bg-hw-orange-1 text-hw-white-1 transition-all',
          isDownload && 'text-hw-white-2 bg-hw-white-1 bg-opacity-20',
        )}>
        Download
      </button>
      {isDownload && (
        <div className='ml-auto flex items-center gap-[16px] relative'>
          <span className='text-hw-white-2 text-[14px] leading-[18px] font-bold sm:font-light'>다운로드 진행률</span>
          <div className='w-[300px] h-[24px] bg-hw-gray-7.25 rounded-[4px] relative'>
            <div className='absolute h-[24px] bg-hw-green-6 rounded-[4px] left-0 w-[118px]'></div>
          </div>
          <p className='text-hw-gray-9 absolute right-[8px] text-[12px] leading-[12px]'>00%</p>
        </div>
      )}
    </div>
  );
}
