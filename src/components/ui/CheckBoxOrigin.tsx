import { useMemo, useState } from 'react';
import useSystemDetailDataType from '@/pages/system/components/info/data/SystemDetailDataType';

type CheckBoxProps = {
  label: string;
  description?: string;
  gap?: string;
  fontSize?: string;
  fontWeight?: string;
  checked?: boolean;
  index: number;
};

export default function CheckBoxOrigin({ label, description, gap, checked, fontSize = '16px', fontWeight = '300', index }: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(checked);
  const { detailDataTypes, storeCheck, storeUnCheck } = useSystemDetailDataType();

  const toggleCheckbox = () => {
    if (isChecked) {
      storeUnCheck(index + 1)
    } else {
      storeCheck(index + 1)
    }
    setIsChecked(!isChecked);
  };

  return (
    <>
      {!description ? (
        <div style={{ gap }} className={`w-fit h-[36px] flex items-center`}>
          <input id={label} type='checkbox' name='fitler-checkbox' checked={isChecked} onChange={toggleCheckbox} className='hw-checkbox w-[16px] h-[16px] m-[10px]' />
          <label
            htmlFor={label}
            style={{ fontSize, fontWeight }}
            className={`w-full block not-italic leading-[20px] text-hw-white-1 whitespace-nowrap`}>
            {label}
          </label>
        </div>
      ) : (
        <div className='w-full flex gap-[6px]'>
          <input type='checkbox' name='fitler-checkbox' className='hw-checkbox w-[16px] h-[16px] mr-[10px] mb-[10px]' />
          <div className='flex flex-col'>
            <span className='text-[18px] leading-[18px] font-normal text-hw-white-1'>{label}</span>
            <p className='text-[14px] mt-3 leading-[18px] font-light text-hw-white-2'>{description}</p>
          </div>
        </div>
      )}
    </>
  );
}
