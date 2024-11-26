import LogoNameImg from '@/assets/images/logo-name.svg';
import { isAdmin } from '@/helpers/admin.helper';
import { cn } from '@/helpers/class-name.helper';
import dayjs from 'dayjs';
import { Clock, Close, Divider, Hamburger, LanguageSetting, UserProfile } from '../icons';
import { useLocation, useNavigate } from 'react-router-dom';
import useLoginStore from '@/api/loginStore';

import { useState, useEffect, useRef } from 'react';
import useAccessInfoStore from '@/api/accessInfoStore';
import { DATE_FORMAT } from '@/constants/time.constant';
import { useTranslation } from 'react-i18next';
import { websocketURL } from '@/api/URLs';

type Props = {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
};

export default function Header({ isOpenSidebar, toggleSidebar }: Props) {
  const { connect, disconnect, setNavigateCB } = useAccessInfoStore();
  const { connInfo } = useAccessInfoStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { username, isAdminUser } = useLoginStore();
  const { i18n } = useTranslation();
  const { t: trans } = useTranslation('translation');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const LOGOUT_TIME = 1000 * 60 * 60 // 1시간
  const WARNING_TIME = 1000 * 60 * 50 // 50분

  const handleClickLogo = () => {
    // if (location.pathname.includes('/admin')) {
    if (location.pathname.includes('/')) {
      navigate('/');
      return;
    }
    navigate('/');
  };
  const [time, setTime] = useState(dayjs().format(DATE_FORMAT.YYYY_MM_DD_HH_MM_SS_A));
  const { storeUsername, storeIsAdminUser, storeIsLevel1, storeIsLevel2 } = useLoginStore();

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      alert(trans('autoLogout'));
      localStorage.removeItem('token');
      navigate('/login');
    }, LOGOUT_TIME);

    warningTimerRef.current = setTimeout(() => {
      var start_time = Date.now();
      const userConfirmed = confirm(trans('autoLogoutWarn'));
      if (Date.now() - start_time >= LOGOUT_TIME - WARNING_TIME) {
        if (timerRef.current) clearTimeout(timerRef.current);
        alert(trans('autoLogout'));
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      if (userConfirmed) {
        resetTimer();
      }
    }, WARNING_TIME);
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    // startTimer();
  };

  useEffect(() => {

    const username = localStorage.getItem("username");
    if (username !== null) {
      storeUsername(username);
    }

    const isAdmin = localStorage.getItem("is_admin") === "true";
    storeIsAdminUser(isAdmin);
    const isLevel1 = localStorage.getItem("level1") === "true";
    storeIsLevel1(isLevel1);
    const isLevel2 = localStorage.getItem("level2") === "true";
    storeIsLevel2(isLevel2);

    const timerID = setInterval(
      () => tick(),
      1000
    );

    const token = localStorage.getItem("token");
    if (token === null) {
      navigate('/login');
      return;
    }

    setNavigateCB(() => navigate('/login'));
    const url = websocketURL + 'adm_access_info/?token=' + token;
    connect(url);

    // startTimer();

    return () => {
      disconnect(false);
      clearInterval(timerID);
    };

  }, []);

  function tick() {
    setTime(dayjs().format(DATE_FORMAT.YYYY_MM_DD_HH_MM_SS_A));
  }

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setTooltipVisible(false);
  };

  return (
    <header
      className={cn(
        'z-50 h-14 flex items-center justify-between px-6 pl-[18px] pr-[10px] lg:px-[24px] bg-hw-dark-2 w-full fixed top-0 left-0',
      )}
    >
      <div onClick={() => handleClickLogo()} className="flex gap-2 cursor-pointer">
        <img src={LogoNameImg} alt="logo" className="h-6 lg:h-7" />
        {isAdmin() && (
          <div className="flex 2xl:hidden items-center px-2 py-[5px] pt-[6px] h-6 rounded-lg bg-hw-white-2 text-[14px] text-hw-dark-2 leading-[14px] font-light">
            Admin
          </div>
        )}
      </div>
      <div onClick={() => location.pathname !== '/' && toggleSidebar()} className="p-2 block lg:hidden">
        {location.pathname === '/' ? <Hamburger /> : isOpenSidebar ? <Close /> : <Hamburger />}
      </div>
      <div
        className={cn(
          'hidden items-center gap-3 absolute left-[50%] -translate-x-[50%]',
          isAdmin() ? '2xl:flex' : 'xl:flex',
        )}
      >
        <span className={cn('text-[16px] font-bold leading-4 text-hw-white-1 font-Hanwha relative')}>
          {isAdmin() && (
            <div className="absolute right-[calc(100%+12px)] top-[50%] translate-y-[-50%] flex items-center px-2 h-6 rounded-lg text-[14px] bg-hw-white-2 text-hw-dark-2 leading-none font-light">
              Admin
            </div>
          )}
          ESS Data Management System
        </span>
      </div>
      <span
        className={cn(
          'hidden lg:flex text-sm text-hw-white-2 font-light items-center gap-5 leading-none transition-all',
        )}
      >
        {connInfo && isAdmin() && (
          <>
            <span>V{connInfo?.version}</span>
            <span>{connInfo?.location?.includes('local') ? trans('localserver') : trans('cloudserver')}</span>
            <span>{window.navigator.onLine === true ? trans('online') : trans('offline')}</span>
          </>
        )}
        {connInfo && isAdmin() && (
          <>
            <span>{trans('accessor')} : {connInfo?.connCount}</span>
            <Divider />
          </>
        )}
        <span className={cn('flex items-center gap-2 hw-tooltip cursor-pointer')}>
          <UserProfile />
          {username ?? "user"}
          <div
            className={cn(
              'hw-tooltip-text hw-tooltip-bottom',
              'bg-hw-gray-7 text-xs font-light leading-none mt-4 py-[10px] px-2 gap-5 w-[104px] flex flex-col text-hw-white-1 rounded-lg',
            )}
          >
            <span
              className="w-full text-start hw-tooltip-center"
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              key={"0"}
            >
              {trans('logout')}
            </span>
            {isAdminUser && (
              <span
                className="w-full text-start hw-tooltip-center"
                onClick={() => navigate('/admin')}
                key={"1"}
              >
                {trans('adminPage')}
              </span>
            )}
          </div>
        </span>
        <Divider />
        <span className={cn('flex items-center gap-2')}>
          <Clock />
          <span>{time}</span>
        </span>
        <Divider />
        <span className={cn('flex items-center gap-2 hw-tooltip cursor-pointer')}>
          <LanguageSetting onClick={() => setTooltipVisible(!tooltipVisible)} />
          {tooltipVisible && (
            <div
              className={cn(
                'hw-tooltip-text hw-tooltip-bottom hw-tooltip-right',
                'bg-hw-gray-7 text-xs font-light leading-none mt-4 py-[10px] px-2 gap-5 w-[104px] flex flex-col text-hw-white-1 rounded-lg',
              )}
            >
              <button onClick={() => changeLanguage('en')}>English</button>
              <button onClick={() => changeLanguage('kr')}>Korean</button>
            </div>
          )}
        </span>
      </span>
    </header>
  );
}
