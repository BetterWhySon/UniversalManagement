import { ChevronDown } from '@/components/icons';
import { FilterDropdownType as FilterDropdownProps } from '@/types/dropdown-filter.type';
import { transcode } from 'buffer';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {  useEffect } from 'react';
export default function FilterDropdown({ filter, title, callback_Site, callback_Ship, callback_BMS, callback}: FilterDropdownProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const { register } = useFormContext();
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    
  }, []);

  const clickHandler_site = (name:string, filterName:string) => {
    console.log(name,filterName)    
    callback_Site(name)
  }
  const clickHandler_ship = (name:string, filterName:string) => {
    console.log(name,filterName)    
    callback_Ship(name)
  }
  const clickHandler_BMS = (name:string, filterName:string) => {
    console.log(name,filterName)    
    callback_BMS(name)
  }
  const clickHandler = (name:string, filterName:string) => {
    console.log(name,filterName)    
    callback(name)
  }
  // const clickHandler_BMSModel = (name:string, filterName:string) => {
  //   console.log(name,filterName)    
  //   callback_BMSModel(name)
  // }
  // const clickHandler_BMSCreate = (name:string, filterName:string) => {
  //   console.log(name,filterName)    
  //   callback_BMSModel(name)
  // }
  return (
    <div className='w-full md:w-fit flex items-center justify-between gap-5'>
      <span className='text-hw-white-2 text-sm leading-[128.57%] font-light'>{title}</span>
      <div className='group transition-all text-hw-white-2 hover:text-hw-white-1 text-sm font-light relative h-8 flex flex-col items-center bg-[#303944] w-[78%] md:w-[160px] rounded-lg hover:rounded-b-none'>
        <button type= 'button' name={filter.name}  className='flex h-full items-center text-left justify-between leading-[128.57%] pl-4 pr-[10px] group-hover:border-t group-hover:border-x border-[#7082A0] w-full rounded-lg group-hover:rounded-b-none'>
          {/* {searchParams.get(title) || filter.selected} */}
          {filter.selected == '전체'? trans('all'):filter.selected}
          <ChevronDown className='group-hover:-rotate-180 transition-all' />
        </button>
        <div className='z-20 group-hover:scale-100 scale-0 absolute top-[100%] flex flex-col w-full border-b border-x border-[#7082A0] bg-[#303944] rounded-b-lg'>
          {filter.values
            .filter((item: string) => item !== searchParams.get(title))
            .map((value: string, index: number) => (
              // <button key={index} onClick={()=>{clickHandler(value,filter.name)}} className='leading-[128.57%] px-4 text-hw-white-1 items-center text-left h-8'>
              <button key={index} type= 'button' onClick={()=>{
                if( filter.name === '사이트' ) {
                  clickHandler_site(value,filter.name)
                } else if( filter.name === '선박' ) {
                  clickHandler_ship(value,filter.name)
                } else if( filter.name === 'BMS'  ) {
                  clickHandler_BMS(value,filter.name)
                } else if( filter.name === 'specNumber'  ) {
                  clickHandler(value,filter.name)
                } else if( filter.name === 'bmsModel'  ) {
                  clickHandler(value,filter.name)
                } else if( filter.name === 'bmsCreate'  ) {
                  clickHandler(value,filter.name)
                } else if( filter.name === 'searchSite'  ) {
                  clickHandler(value,filter.name)
                }
                filter.selected = value
              }} 
              className='leading-[128.57%] px-4 text-hw-white-1 items-center text-left h-8'>
                {value== "전체"? trans('all') :value}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
