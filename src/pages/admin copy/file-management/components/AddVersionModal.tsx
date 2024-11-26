/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import useAdmSendFileData from '@/api/admFileManagementSendFileData';
import { Field } from 'formik';
import useAdmVersionManagement from '@/api/admFileManagementVersion'
import '../style.scss';

type DefaultValues = {
  fileId: string;
  fileName: string;
};

export default function AddVersionModal({ fileId, fileName }: DefaultValues) {
  const { register } = useFormContext();
  const { t: trans } = useTranslation('translation');
  const [imgBase64, setImgBase64] = useState<string[]>([]); // 파일 base64 (화면표출용)
  const [progress, setProgress] = useState(0); // Progress state
  const { storeSendFileData } = useAdmSendFileData();

  // 사용자가 이미지를 선택했을 때 이미지 로드 함수
  // const handleImageChange = (event: any) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       const base64 = reader.result;
  //       if (typeof base64 === 'string') {
  //         setImgBase64([base64]);
  //       } else {
  //         console.error('Failed to read the file as a string');
  //       }
  //     };
  //   }
  // };
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0] || null;
  //   if( file != null)
  //     storeSendFileData(file);
  // };
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
    <div className='add-user__modal'>
      <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
        {trans('addFile')}
      </h2>
      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <div className='mb-2'> {/* marginBottom 추가 */}
          <TextInput label={trans('versionName')} name='version_name' placeholder={"ex) v1.0"} />
        </div>
        <div style={{ display: 'none' }}>
          <TextInput label='' name='file_id' defaultValue={fileId} />
        </div>
        <div style={{ display: 'none' }}>
          <TextInput label='' name='file_name' defaultValue={fileName} />
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
