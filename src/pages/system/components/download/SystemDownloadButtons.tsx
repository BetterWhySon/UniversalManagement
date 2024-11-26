import { cn } from '@/helpers/class-name.helper';

export default function SystemDownloadButtons() {
  return (
    <div className={cn('flex h-9 mb-8 sm:mb-10')}>
      <button className='w-fit hidden sm:inline-flex text-[16px] mr-[18px] font-bold sm:font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg bg-[#FFDAC2] border border-hw-orange-1'>
        전체 날짜
      </button>
      <button className='inline-block sm:hidden w-[45%] sm:w-fit text-[16px] mr-2 sm:mr-[18px] font-bold sm:font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg bg-[#FFDAC2] border border-hw-orange-1'>
        실시간
      </button>
      <button className='w-[55%] sm:w-fit text-[16px] mr-0 sm:mr-[40px] font-bold sm:font-light leading-[20px] text-hw-orange-1 px-6 py-2 rounded-lg border border-[#E2E2E2]'>
        날짜 선택
      </button>
      <button className='hidden sm:block text-[16px] font-bold sm:font-light leading-[20px] text-hw-white-2 px-6 py-2 rounded-lg bg-hw-white-1 bg-opacity-20'>
        Download
      </button>
    </div>
  );
}
