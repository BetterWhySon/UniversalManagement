import CheckBoxGraph from '@/components/ui/CheckBoxGraph';
import systemEmsGraphStore from '@/api/systemEmsGraphStore';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// const GRAPH_CHECKBOXS_EMS = ['EMS 전압', 'EMS 전류', 'EMS SOC', 'EMS 온도', 'EMS 습도', 'EMS 전류적산량'];
// const GRAPH_CHECKBOXS_RACKS = ['RACK 전압', 'RACK 전류', 'RACK 온도'];
// const GRAPH_CHECKBOXS_CELLS = ['CELL 전압', 'CELL 온도'];

const SystemGraph = () => {
  const { graphInfos } = systemEmsGraphStore();
  const location = useLocation();
  const { t: trans } = useTranslation('translation');

  return (

    <div className='w-full flex flex-wrap mt-8 xs:mt-0'>
      {
        location.pathname.includes('/rack') ?
          <>
            <div className='w-full flex flex-col xl:flex-row xl:items-center mb-6 xl:mb-3'>
              <span className='text-[16px] font-normal leading-4 xl:text-[18px] xl:font-bold xl:leading-[18px] text-hw-white-2 mr-[14px] mb-[14px] xl:mb-0'>
                EMS
              </span>
              <ul className='grid grid-cols-2 gap-0 sm:grid-cols-3 2sm:grid-cols-4 2lg:flex sm:gap-x-5'>
                {graphInfos.filter((box) => box.page == 'RACK' && box.type === 'RACK').map((box) => (
                  <CheckBoxGraph key={box.gid} gid={box.gid} label={box.name} checked={box.checked} gap='4px' />
                ))}
              </ul>
            </div>
            <div className='w-full sm:w-fit flex flex-col xl:flex-row xl:items-center mr-0 sm:mr-[94px] mb-6 xl:mb-3'>
              <span className='text-[16px] font-normal leading-4 xl:text-[18px] xl:font-bold xl:leading-[18px] text-hw-white-2 mr-[14px] mb-[14px] xl:mb-0'>
                RACK <span className='text-[12px] leading-[12px] font-bold xl:font-light'>({trans('maxMinAve')})</span>
              </span>
              <ul className='grid grid-cols-2 gap-0 sm:grid-cols-3 2sm:grid-cols-4 md:flex sm:gap-x-5'>
                {graphInfos.filter((box) => box.page == 'RACK' && box.type === 'CELL').map((box) => (
                  <CheckBoxGraph key={box.gid} gid={box.gid} label={box.name} checked={box.checked} gap='4px' />
                ))}
              </ul>
            </div></>
          :
          <>
            <div className='w-full flex flex-col xl:flex-row xl:items-center mb-6 xl:mb-3'>
              <span className='text-[16px] font-normal leading-4 xl:text-[18px] xl:font-bold xl:leading-[18px] text-hw-white-2 mr-[14px] mb-[14px] xl:mb-0'>
                EMS
              </span>
              <ul className='grid grid-cols-2 gap-0 sm:grid-cols-3 2sm:grid-cols-4 2lg:flex sm:gap-x-5'>
                {graphInfos.filter((box) => box.page == 'EMS' && box.type === 'EMS').map((box) => (
                  <CheckBoxGraph key={box.gid} gid={box.gid} label={box.name} checked={box.checked} gap='4px' />
                ))}
              </ul>
            </div>
            <div className='w-full sm:w-fit flex flex-col xl:flex-row xl:items-center mr-0 sm:mr-[94px] mb-6 xl:mb-3'>
              <span className='text-[16px] font-normal leading-4 xl:text-[18px] xl:font-bold xl:leading-[18px] text-hw-white-2 mr-[14px] mb-[14px] xl:mb-0'>
                RACK <span className='text-[12px] leading-[12px] font-bold xl:font-light'>({trans('maxMinAve')})</span>
              </span>
              <ul className='grid grid-cols-2 gap-0 sm:grid-cols-3 2sm:grid-cols-4 md:flex sm:gap-x-5'>
                {graphInfos.filter((box) => box.page == 'EMS' && box.type === 'RACK').map((box) => (
                  <CheckBoxGraph key={box.gid} gid={box.gid} label={box.name} checked={box.checked} gap='4px' />
                ))}
              </ul>
            </div>
            <div className='w-full sm:w-fit flex flex-col xl:flex-row xl:items-center mr-0 sm:mr-[94px] mb-6 xl:mb-3'>
              <span className='text-[16px] font-normal leading-4 xl:text-[18px] xl:font-bold xl:leading-[18px] text-hw-white-2 mr-[14px] mb-[14px] xl:mb-0'>
                CELL <span className='text-[12px] leading-[12px] font-bold xl:font-light'>({trans('maxMinAve')})</span>
              </span>
              <ul className='grid grid-cols-2 gap-0 sm:grid-cols-3 2sm:grid-cols-4 md:flex sm:gap-x-5'>
                {graphInfos.filter((box) => box.page == 'EMS' && box.type === 'CELL').map((box) => (
                  <CheckBoxGraph key={box.gid} gid={box.gid} label={box.name} checked={box.checked} gap='4px' />
                ))}
              </ul>
            </div>
          </>
      }

    </div>

  );
};

export default SystemGraph;
