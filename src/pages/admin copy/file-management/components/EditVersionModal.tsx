/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fileManagement_version } from '@/types/file-management.type';
import useAdmSendFileData from '@/api/admFileManagementSendFileData';
import { useState } from 'react';
import '../style.scss';

type EditVersionModalProps = {
  versionData: fileManagement_version;
};

export default function EditFileModal({ versionData }: EditVersionModalProps) {
  const { register } = useFormContext();
  const { t: trans } = useTranslation('translation');
  const { storeSendFileData } = useAdmSendFileData();
  const [progress, setProgress] = useState(0); // Progress state

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    const MAX_SIZE = 500 * 1024 * 1024;

    if (file && file.size > MAX_SIZE) {
      alert(trans('fileSizeExceed'));
      event.target.value = "";
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await storeSendFileData(file, (progress) => {
          setProgress(Math.floor(progress)); // 소수점 없이 정수로 표시
        });
      } catch (error) {
        console.error('File upload failed', error);
      }
    }
  };

  return (
    <div className='edit-user__modal'>
      <div className='w-full'>
        <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
          {trans('editVersion')}
        </h2>
      </div>

      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('versionName')} name='version_name' defaultValue={versionData.version_name} />
        </div>
        <div style={{ display: 'none' }}>
          <TextInput type='hidden' label='' name='version_id' defaultValue={versionData.id + ""} />
        </div>
        <div style={{ display: 'none' }}>
          <TextInput type='hidden' label='' name='file_name' defaultValue={versionData.file_name} />
        </div>
        <div style={{ display: 'none' }}>
          <TextInput type='hidden' label='' name='save_file_name' defaultValue={versionData.save_file_name} />
        </div>
        <div className='flex flex-col'>
          {/* <input type="file" id="file" {...register("imageFile")} onChange={handleChangeFile} name='imageFile'/>             */}
          {/* <input type="file" id="file" {...register("file")} onChange={handleImageChange} name='flie' /> */}
          <input type="file" id="file" {...register("file")} onChange={handleFileChange} name='flie' />
        </div>
        {progress > 0 && (
          <div className='progress-bar'>
            <div className='progress' style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
