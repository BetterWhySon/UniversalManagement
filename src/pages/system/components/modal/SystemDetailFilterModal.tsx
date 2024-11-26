import CheckBox from '@/components/ui/CheckBox';
import '@/styles/_checkbox.scss';
import useSystemDetailDataType from '@/pages/system/components/info/data/SystemDetailDataType';
import { useTranslation } from 'react-i18next';

const FILTERS_DATA = [
  'Status',
  'Alarm Status',
  'Voltage',
  'Current',
  'SOC',
  'SOH',
  'A. Ch Current',
  'A. Dch Current',
  'Max Cell Vol',
  'Min Cell Vol',
  'Avg Cell Vol',
  'Max Cell Temp',
  'Min Cell Temp',
  'Avg Cell Temp',
  'Balancing',
  'Fan',  
];

type FilterModalProps = {
  closeModal: () => void;
};

export default function SystemDetailFilterModal({ closeModal }: FilterModalProps) {
  const { detailDataTypes, storeReset } = useSystemDetailDataType();
  const { t: trans } = useTranslation('translation');

  const resetChecked = () => {
    storeReset()
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center transition-all'>
      <div onClick={closeModal} className='relative z-30 w-full h-full bg-black bg-opacity-60'></div>
      <div className='absolute z-40 max-w-[886px] h-fit mx-[18px] rounded-3xl bg-hw-dark-2 lg:pl-[40px] p-4 pb-6 lg:pr-[41px] lg:pt-[48px] lg:pb-[40px]'>
        <span className='flex items-center lg:items-start h-9 lg:h-fit mb-4 lg:mb-8 text-[20px] leading-5 font-normal text-hw-white-1'>
          System detail Filter
        </span>
        <div className='w-full mb-8 lg:mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-[20px] gap-y-3 lg:gap-x-5 lg:gap-y-4'>
          {FILTERS_DATA.map((filter, index) => (
            <CheckBox key={filter} label={filter} gap='8px' checked={detailDataTypes[index+1].checked} fontSize='14px' index={index} />
          ))}
        </div>
        <div className='flex gap-2 justify-end'>
          <button
            type='button'
            onClick={resetChecked}
            className='w-full lg:w-32 px-6 py-2 leading-[20px] font-light text-[1rem] rounded-lg border border-[#E2E2E2] text-hw-orange-1'>
            {trans('reset')}
          </button>
          <button type='button' onClick={closeModal} className='w-full lg:w-32 px-6 py-2 leading-[20px] font-light text-[1rem] rounded-lg bg-hw-orange-1 text-hw-white-1'>
          {trans('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
