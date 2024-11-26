/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function AddFolderModal() {
  const { register } = useFormContext();
  const { t: trans } = useTranslation('translation');

  return (
    <div className='add-user__modal'>
      <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
        {trans('addFolder')}
      </h2>
      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <TextInput label={trans('folderName')} name='group_name' />
      </div>
    </div>
  );
}
