import { cn } from '@/helpers/class-name.helper';
import LogoNameImg from '@/assets/images/logo-name.svg';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { PATH } from '@/router/path';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useLoginStore from '@/api/loginStore';
import { backendURL } from '@/api/URLs';
// import BWIcon from '@/assets/images/bw_icon.png';
// import BWIcon from '@/assets/images/r_logo.png';
import BWIcon from '@/assets/images/white-logo.png';


interface ILoginData {
  username: string;
  is_admin: boolean;
  level1: boolean;
  level2: boolean;
  access_token: string;
}
export default function LoginPage() {
  const { t: trans } = useTranslation('translation');
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { storeUsername } = useLoginStore();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === '' || password === '') {
      alert(trans('pleaseEnterYourIDAndPassword'));   //'아이디와 비밀번호를 입력해주세요.'
      return;
    }
    try {
      const response = await axios.post(backendURL + 'login/', {
        username,
        password
      });

      if (response.status === 200) {
        let loginData: ILoginData = response.data;
        localStorage.setItem("token", loginData.access_token);
        localStorage.setItem("username", loginData.username);
        localStorage.setItem("is_admin", loginData.is_admin.toString());
        // localStorage.setItem("level1", loginData.level1.toString());
        // localStorage.setItem("level2", loginData.level2.toString());
        storeUsername(username);
        navigate('/');
      } else {
        alert(trans('pleaseCheckYourIDAndPassword'));    //'아이디와 비밀번호를 확인해주세요.'
      }
    } catch (error:any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        alert(trans('pleaseCheckYourIDAndPassword'));    //'아이디와 비밀번호를 확인해주세요.'
      }else{
        alert(trans('serverError'));   // '서버 오류'
      }

    }
  };

  return (
    <main className={cn('bg-hw-dark-1 px-[18px] h-screen w-full flex items-center justify-center')}>
      <div
        className={cn(
          'max-w-[782px] min-w-[339px] w-full bg-hw-dark-2 pt-12 pb-16 px-4 flex rounded-2xl flex-col items-center',
        )}>
        <div className={cn('flex flex-col items-center gap-4 sm:gap-6')}>
          {/* <span className={cn('h-fit flex items-center gap-2 bg-white p-1 rounded')}> */}
          <span className={cn('h-fit flex items-center gap-2 p-1 rounded')}>
            <img src={BWIcon} alt="BW Icon" className="h-10 w-auto" />
          </span>
          <div className='flex flex-col gap-2 sm:flex-row sm:gap-5 items-center w-fit'>
            {location.pathname.includes(PATH.ADMIN_BW.get()) && (
              <div className='flex items-center px-2 h-6 rounded-lg border border-hw-white-2 text-hw-white-2 leading-none font-light'>
                Admin
              </div>
            )}
            <h1
              className={cn(
                'text-[16px] leading-6 sm:text-2xl sm:leading-none  font-bold font-Hanwha  transition-all',
              )}>
              배터와이 공동관제 시스템
            </h1>
          </div>
        </div>
        <form
          className={cn('max-w-[324px] mt-12 w-full')}
          onSubmit={handleLogin}>
          <div className={cn('flex gap-3 leading-[128.571%] flex-col')}>
            <label className={cn('text-sm leading-5 sm:leading-[128.571%] font-light')} htmlFor='username'>
              {trans('username')}
            </label>
            <input
              type='text'
              id='username'
              className={cn('h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={cn('flex gap-3 flex-col mt-6')}>
            <label className={cn('text-sm leading-[128.571%] font-light')} htmlFor='password'>
              {trans('password')}
            </label>
            <input
              type='password'
              id='password'
              className={cn('h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={cn(
              'bg-hw-orange-1 leading-none w-full rounded-lg h-[46px] text-lg font-normal outline-none border-none mt-14 sm:mt-10 transition-all active:bg-hw-orange-1/80',
            )}>
            {trans('submit')}
          </button>
        </form>
      </div>
    </main>
  );
}
