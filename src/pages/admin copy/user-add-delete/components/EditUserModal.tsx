/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { UserManagementData } from '@/types/user-management.type';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type EditUserModalProps = {
  userData: UserManagementData;
};

export default function EditUserModal({ userData }: EditUserModalProps) {
  const { register } = useFormContext();
  const { t: trans } = useTranslation('translation');

  return (
    <div className='edit-user__modal'>
      <div className='w-full'>
        <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
          {trans('editUser')}
        </h2>
      </div>

      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('username')} name='userID' required defaultValue={userData.userID} readOnly />
          <TextInput label={trans('password')} name={trans('password')} type='password' defaultValue={userData.currentPassword} />
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
            <h5 className='text-sm font-light leading-[128.57%] text-hw-white-1 mb-3'>{trans('admin')}</h5>

            <div className='flex h-10 items-center'>
              <label className='h-fit switch'>
                <input type='checkbox' {...register('isAdmin')} defaultChecked={userData.admin} />
                <span className='slider round'></span>
              </label>
            </div>
          </div>

          <TextInput label={trans('email')} name='email' required defaultValue={userData.email} />
        </div>
      </div>
    </div>
  );
}
