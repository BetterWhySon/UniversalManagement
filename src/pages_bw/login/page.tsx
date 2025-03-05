import { cn } from '@/helpers/class-name.helper';
import LogoNameImg from '@/assets/images/logo-name.svg';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { PATH } from '@/router/path';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useLoginStore from '@/api/loginStore';
import { /*backendURL,*/ backendURL_admin } from '@/api/URLs';
// import BWIcon from '@/assets/images/bw_icon.png';
// import BWIcon from '@/assets/images/r_logo.png';
import BWIcon from '@/assets/images/white-logo.png';


interface ILoginData {
  username: string;
  is_admin: boolean;
  is_superuser: boolean;
  level1: boolean;
  level2: boolean;
  access_token: string;
  refresh_token: string;
  customer_id: number;
  customer_name: string;
}

export default function LoginPageBW() {
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
      const response = await axios.post(backendURL_admin + 'login/', {
        username,
        password
      });

      // 응답 상태 체크
      if (response.status === 401) {
        alert(trans('인증이 만료되었습니다. 다시 로그인해주세요.'));
        localStorage.clear();
        window.location.href = '/login';
        return;
      }
      if (response.status === 403) {
        alert(trans('관리자 권한이 없는 ID입니다.'));
        return;
      }

      if (response.status === 200) {
        let loginData: ILoginData = response.data;
        localStorage.setItem("token_admin", loginData.access_token);
        localStorage.setItem("username_admin", loginData.username);
        localStorage.setItem("is_admin_admin", loginData.is_admin.toString());
        localStorage.setItem("is_admin_superuser", loginData.is_superuser.toString());
        localStorage.setItem("customer_id", loginData.customer_id.toString());
        localStorage.setItem("customer_name", loginData.customer_name);    
        // localStorage.setItem("level1", loginData.level1.toString());
        // localStorage.setItem("level2", loginData.level2.toString());
        storeUsername(username);
        
        // 슈퍼유저가 아닌 경우 admin-user 페이지로 이동
        if (!loginData.is_superuser) {
          navigate('/admin/admin-user');
        } else {
          navigate('/admin');
        }
      } else {
        alert(trans('pleaseCheckYourIDAndPassword'));    //'아이디와 비밀번호를 확인해주세요.'
      }
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          alert(trans('인증이 만료되었습니다. 다시 로그인해주세요.'));
          localStorage.clear();
          window.location.href = '/login';
        } else if (error.response.status === 403) {
          alert(trans('관리자 권한이 없습니다.'));
        } else {
          alert(trans('pleaseCheckYourIDAndPassword'));
        }
      } else {
        alert(trans('serverError'));   // '서버 오류'
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin(e as unknown as React.FormEvent<HTMLFormElement>);
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
              범용 배터리 관리 시스템 (관리자 로그인)
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
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            className={cn(
              'bg-hw-orange-1 leading-none w-full rounded-lg h-[46px] text-lg font-normal outline-none border-none mt-14 sm:mt-10 transition-all active:bg-hw-orange-1/80',
            )}>
            {trans('submit')}
          </button>
          <div className="flex justify-end gap-4 mt-4 text-sm text-gray-400">
            <button 
              className="hover:text-hw-orange-1 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigate(PATH.LOGIN.get('FIND_ID'));
              }}
            >
              아이디찾기
            </button>
            <button 
              className="hover:text-hw-orange-1 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigate(PATH.LOGIN.get('FIND_PASSWORD'));
              }}
            >
              비밀번호찾기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
