import { cn } from '@/helpers/class-name.helper';
import { useFormContext } from 'react-hook-form';

type TextInputProps = {
  label: string;
  mobileLabel?: string;
  name: string;
  readOnly?: boolean;
  defaultValue?: string;
  required?: boolean;
  type?: string;  
  placeholder?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({
  label,
  mobileLabel,
  name,
  readOnly = false,
  defaultValue = '',
  required = false,
  type = 'text',
  placeholder= '',
  onChange
}: TextInputProps) {
  const { register } = useFormContext();
  return (
    <div className='w-full'>
      <h5
        className={cn(
          'text-sm font-light leading-[128.57%] text-hw-white-1 mb-3 block',
          mobileLabel && 'hidden xs:block',
        )}>
        {label}
      </h5>
      <h5
        className={cn(
          'text-sm font-light leading-[128.57%] text-hw-white-1 mb-3 hidden',
          mobileLabel && 'block xs:hidden',
        )}>
        {mobileLabel}
      </h5>
      <input
        type={type}
        {...register(name, { 
          required, 
          onChange: (e) => { // register의 onChange와 사용자 정의 onChange 함께 처리
            onChange?.(e); // 사용자 정의 onChange가 있다면 호출
          }
        })}
        readOnly={readOnly}
        defaultValue={defaultValue}
        placeholder={placeholder}
        // value={defaultValue}
        className={`${
          readOnly ? 'bg-[#353A40] text-hw-white-2' : 'bg-hw-dark-1 text-hw-white-1 '
        } rounded-lg w-full  py-[11px] px-4 text-sm font-light leading-[128.57%] outline-none`}
      />
    </div>
  );
}
