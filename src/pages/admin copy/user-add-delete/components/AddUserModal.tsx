/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function AddUserModal() {
  const { register } = useFormContext();
  const { t: trans } = useTranslation('translation');

  return (
    <div className='add-user__modal'>
      <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
        {trans('addUser')}
      </h2>
      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <TextInput label={trans('username')} name='userID' />

        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('password')} name='newPassword' type='password' />

          <TextInput label={trans('passwordConfirm')} name='verifyPassword' type='password' />
        </div>

        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('name')} name='name' />

          <TextInput label={trans('tel')} name='contact' />
        </div>

        <div className='flex flex-col-reverse xs:flex-row gap-4 xs:gap-5'>
          <div className='w-full'>
            <h5 className='text-sm font-light leading-[128.57%] text-hw-white-1 mb-3'>{trans('admin')}</h5>
            <div className='flex h-10 items-center'>
              <label className='h-fit switch'>
                <input type='checkbox' {...register('isAdmin')} />
                <span className='slider round'></span>
              </label>
            </div>
          </div>

          <TextInput label={trans('email')} name='email' />
        </div>
      </div>
    </div>
  );
}
