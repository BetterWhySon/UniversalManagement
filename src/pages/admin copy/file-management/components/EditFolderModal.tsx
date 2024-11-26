/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { UserManagementData } from '@/types/user-management.type';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fileManagement_group } from '@/types/file-management.type';

type EditFolderModalProps = {
  folderData: fileManagement_group;
};

export default function EditFolderModal({ folderData }: EditFolderModalProps) {
  const { register } = useFormContext();
  const { t: trans } = useTranslation('translation');

  return (
    <div className='edit-user__modal'>
      <div className='w-full'>
        <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
          {trans('editFolder')}
        </h2>
      </div>

      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('folderName')} name='group_name' defaultValue={folderData.group_name} />
        </div>
        <div style={{ display: 'none' }}>
          <TextInput label='' name='group_id' defaultValue={folderData.id + ""} />
        </div>
      </div>
    </div>
  );
}
