import React, { useState } from 'react';
import { cn } from '@/helpers/class-name.helper';
import { useNavigate } from 'react-router-dom';
import BWIcon from '@/assets/images/white-logo.png';
import axios from 'axios';
import { backendURL } from '@/api/URLs';

const FindPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleFindPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(backendURL + 'find-password/', {
        email,
        username
      });

      if (response.status === 200) {
        alert('등록된 이메일로 임시 비밀번호가 발송되었습니다.');
        navigate('/login');
      }
    } catch (error) {
      alert('등록된 정보가 없습니다.');
    }
  };

  return (
    <main className={cn('bg-hw-dark-1 px-[18px] h-screen w-full flex items-center justify-center')}>
      <div className={cn('max-w-[782px] min-w-[339px] w-full bg-hw-dark-2 pt-12 pb-16 px-4 flex rounded-2xl flex-col items-center')}>
        <div className={cn('flex flex-col items-center gap-4 sm:gap-6')}>
          <span className={cn('h-fit flex items-center gap-2 p-1 rounded')}>
            <img src={BWIcon} alt="BW Icon" className="h-10 w-auto" />
          </span>
          <h1 className={cn('text-[16px] leading-6 sm:text-2xl sm:leading-none font-bold font-Hanwha transition-all')}>
            비밀번호 찾기
          </h1>
        </div>

        <form className={cn('max-w-[324px] mt-12 w-full')} onSubmit={handleFindPassword}>
          <div className={cn('flex gap-3 leading-[128.571%] flex-col')}>
            <label className={cn('text-sm leading-5 sm:leading-[128.571%] font-light')} htmlFor='username'>
              아이디
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
            <label className={cn('text-sm leading-[128.571%] font-light')} htmlFor='email'>
              이메일
            </label>
            <input
              type='email'
              id='email'
              className={cn('h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mt-14 sm:mt-10">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className={cn('flex-1 leading-none rounded-lg h-[46px] text-lg font-normal outline-none border border-hw-orange-1 text-hw-orange-1 transition-all hover:bg-hw-orange-1/10')}
            >
              취소
            </button>
            <button
              type="submit"
              className={cn('flex-1 bg-hw-orange-1 leading-none rounded-lg h-[46px] text-lg font-normal outline-none border-none transition-all active:bg-hw-orange-1/80')}
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default FindPasswordPage; 