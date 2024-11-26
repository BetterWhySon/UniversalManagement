/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function AddUserModal() {
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
            <div className='flex flex-wrap gap-4'>
              <div className='flex flex-col items-center'>
                <span className='text-sm font-light leading-[128.57%] text-hw-white-1'>{trans('admin')}</span>
                <label className='h-fit switch'>
                  <input
                    type='checkbox'
                    {...register('isAdmin')}
                    checked={checkboxes.isAdmin}
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
                    checked={checkboxes.userLevel2}
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
                    checked={checkboxes.userLevel1}
                    onChange={() => handleCheckboxChange('userLevel1')}
                  />
                  <span className='slider round'></span>
                </label>
              </div>
            </div>
          </div>

          <TextInput label={trans('email')} name='email' />
        </div>
      </div>
    </div>
  );
}
