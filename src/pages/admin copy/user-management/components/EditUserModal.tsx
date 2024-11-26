/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { UserManagementData } from '@/types/user-management.type';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type EditUserModalProps = {
  userData: UserManagementData;
};

export default function EditUserModal({ userData }: EditUserModalProps) {
  const { register, setValue } = useFormContext();
  const { t: trans } = useTranslation('translation');
  const [checkboxes, setCheckboxes] = useState({
    isAdmin: false,
    userLevel2: false,
    userLevel1: false,
  });

  const handleCheckboxChange = (name: keyof typeof checkboxes) => {
    setCheckboxes((prevState) => {
      const newState = {
        isAdmin: false,
        userLevel2: false,
        userLevel1: false,
        [name]: !prevState[name],
      };
      setValue('isAdmin', newState.isAdmin);
      setValue('userLevel2', newState.userLevel2);
      setValue('userLevel1', newState.userLevel1);
      return newState;
    });
  };

  return (
    <div className='edit-user__modal'>
      <div className='w-full'>
        <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
          {trans('editUser')}
          <span className='text-[12px] leading-[18px] font-light mt-auto ml-2'>
            (이름, 연락처, 이메일은 비밀번호 입력없이 수정가능합니다.)
          </span>
        </h2>
      </div>

      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('username')} name='userID' required defaultValue={userData.userID} readOnly />
          <TextInput label={trans('password')} name='password' type='password' defaultValue={userData.currentPassword} />
        </div>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <div className='hidden xs:inline-flex w-full'>
            <TextInput label={trans('newPassword')} name='newPassword' type='password' />
          </div>
          <TextInput
            label={trans('newPasswordConfirm')}
            mobileLabel='비밀번호 확인'
            name='verifyPassword'
            type='password'

          />
        </div>

        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('name')} name='name' required defaultValue={userData.name} />

          <TextInput label={trans('tel')} name='contact' required defaultValue={userData.contact} />
        </div>


        <div className='flex flex-col-reverse xs:flex-row gap-4 xs:gap-5'>
          <div className='w-full'>
            <div className='flex flex-wrap gap-4'>
              <div className='flex flex-col items-center'>
                <span className='text-sm font-light leading-[128.57%] text-hw-white-1'>{trans('admin')}</span>
                <label className='h-fit switch'>
                  <input
                    type='checkbox'
                    {...register('isAdmin')}
                    defaultChecked={userData.admin}
                    // checked={checkboxes.isAdmin}
                    onChange={() => handleCheckboxChange('isAdmin')}
                  />
                  <span className='slider round'></span>
                </label>
              </div>
              <div className='flex flex-col items-center'>
                <span className='text-sm font-light leading-[128.57%] text-hw-white-1'>{trans('userLevel2')}</span>
                <label className='h-fit switch'>
                  <input
                    type='checkbox'
                    {...register('userLevel2')}
                    defaultChecked={userData.level2}
                    // checked={checkboxes.userLevel2}
                    onChange={() => handleCheckboxChange('userLevel2')}
                  />
                  <span className='slider round'></span>
                </label>
              </div>
              <div className='flex flex-col items-center'>
                <span className='text-sm font-light leading-[128.57%] text-hw-white-1'>{trans('userLevel1')}</span>
                <label className='h-fit switch'>
                  <input
                    type='checkbox'
                    {...register('userLevel1')}
                    defaultChecked={userData.level1}
                    // checked={checkboxes.userLevel1}
                    onChange={() => handleCheckboxChange('userLevel1')}
                  />
                  <span className='slider round'></span>
                </label>
              </div>
            </div>
          </div>


          <TextInput label={trans('email')} name='email' required defaultValue={userData.email} />
        </div>
      </div>
    </div>
  );
}
