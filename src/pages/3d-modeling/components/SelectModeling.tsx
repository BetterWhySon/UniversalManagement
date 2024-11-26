import { Arrow } from '@/components/icons';
import { cn } from '@/helpers/class-name.helper';

type SelectProps = {
  index: number;
  label: string;
  options: string[];
  selectedOption: string;
  onChange: (selectedOption: string, index: number) => void;
};

export default function SelectModeling({ index, label, options, selectedOption, onChange }: SelectProps) {
  const handleOptionClick = (option: string) => {
    onChange(option, index);
  };
  return (
    <div className={cn(`group cursor-pointer relative w-fit h-fit bg-hw-dark-2`)}>
      <div
        className={cn(
          `border-r border-l border-l-hw-dark-2 border-r-hw-white-3 group-hover:border-l group-hover:border-l-hw-white-3 bg-hw-dark-2 w-[411px] h-full py-6 pl-[56px] pr-4 flex ic justify-between text-[28px] font-light leading-7 text-white`,
        )}>
        <span>{selectedOption !== '' ? selectedOption : label}</span>
        <div className={cn('w-fit h-fit transition-all rotate-0 group-hover:rotate-180')}>
          <Arrow className='stroke-hw-white-1' />
        </div>
      </div>

      <ul className=' opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all absolute select-none top-[100%] left-0 w-full h-fit pb-4 bg-inherit rounded-b-2xl border border-t-0 border-hw-white-3'>
        {!options || options.length === 0 ? (
          <li className='py-3 px-[52px] text-[24px] font-light leading-6 text-white'>Empty</li>
        ) : (
          options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={cn(
                'transition-all py-3 px-[52px] text-[24px] font-light leading-6 text-white',
                selectedOption === option && 'text-hw-orange-1',
              )}>
              {option}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
