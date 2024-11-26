import Model3D from '@/components/3d-modal/3DModel';
import { SmallClose } from '@/components/icons';
import { useState } from 'react';
import SelectModeling from './components/SelectModeling';

const SELECT_1_MOCK_DATA = {
  label: '선택',
  options: ['공랭식', '액침식'],
};
const SELECT_2_MOCK_DATA: Record<string, string[]> = {
  ['공랭식']: ['HMCB-A-2B', 'HMCB-A-4B', 'HMCB-A-5B', 'HMCB-A-6B'],
  ['액침식']: ['Pack', 'BPU', 'SPU', 'SEAL'],
};
const SELECT_3_MOCK_DATA: Record<string, string[]> = {
  ['HMCB-A-2B']: ['2B Enclosure', 'Chiller 1EA', 'FSP 1EA'],
  ['HMCB-A-4B']: ['4B Enclosure', 'Chiller 1EA', 'FSP 1EA'],
  ['HMCB-A-5B']: ['5B Enclosure', 'Chiller 1EA', 'FSP 1EA'],
  ['HMCB-A-6B']: ['6B Enclosure', 'Chiller 1EA', 'FSP 1EA'],
};

export default function Modeling3DPage() {
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [selectedOption3, setSelectedOption3] = useState<string>('');
  const handleSelectChange = (option: string, index: number) => {
    switch (index) {
      case 1:
        setSelectedOption1(option);
        setSelectedOption2('');
        setSelectedOption3('');
        break;
      case 2:
        setSelectedOption2(option);
        setSelectedOption3('');
        break;
      case 3:
        setSelectedOption3(option);
        break;
      default:
        break;
    }
  };
  return (
    <div className='w-full h-full'>
      <div className='w-full h-[76px] bg-hw-dark-2 pl-[56px] flex justify-between'>
        <div className='flex w-fit h-full'>
          <SelectModeling
            index={1}
            label={SELECT_1_MOCK_DATA.label}
            options={SELECT_1_MOCK_DATA.options}
            onChange={handleSelectChange}
            selectedOption={selectedOption1}
          />
          <SelectModeling
            index={2}
            label='선택'
            options={SELECT_2_MOCK_DATA[selectedOption1]}
            onChange={handleSelectChange}
            selectedOption={selectedOption2}
          />
          {selectedOption1 !== SELECT_1_MOCK_DATA.options[1] && (
            <SelectModeling
              index={3}
              label='선택'
              options={SELECT_3_MOCK_DATA[selectedOption2]}
              onChange={handleSelectChange}
              selectedOption={selectedOption3}
            />
          )}
        </div>
        <div className='h-full flex items-center justify-center p-[30px] cursor-pointer'>
          <SmallClose />
        </div>
      </div>
      <div className='w-full h-[calc(100vh-76px)] flex items-center justify-center border border-[#D9D9D9]'>
        <span className='text-[28px] font-light leading-7 text-white'>
          <Model3D url='/Gripper01.stp' />
        </span>
      </div>
    </div>
  );
}
