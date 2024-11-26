import { cn } from '@/helpers/class-name.helper';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InfoDetailSetion from './info/InfoDetailSection';
import InfoRackDetailSection from './info/InfoRackDetailSection';
import InfoStatusSection from './info/InfoStatusSection';
import SystemDetailFilterModal from './modal/SystemDetailFilterModal';
// import useSystemInfoRtStore from '@/api/systemInfoRt';

export default function InfoTab() {
  const location = useLocation();
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  // const navigate = useNavigate();
  // const { connect, disconnect } = useSystemInfoRtStore();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token === null) {
  //     navigate('/login');
  //     return;
  //   }

  //   const data = [token, "30"]
      
  //   const url = websocketURL + 'system_info_rt/?query_string=' + data;
  //   console.log(url);
  //   connect(url);

  //   return () => {
  //     disconnect();
  //   };

  // }, []);

  useEffect(() => {     
   console.log('openFilter = ', openFilter); 
  },[openFilter]);

  return (
    <div className='w-full mb-[72px] md:mb-0'>
      <InfoStatusSection />
      {location.pathname.includes('/rack') ? (
        <InfoRackDetailSection />
      ) : (
        <>
          <InfoDetailSetion openModal={() => setOpenFilter(true)} />
          <div className={cn('opacity-0 invisible  z-50 fixed transition-all', openFilter && 'opacity-100 visible')}>
            <SystemDetailFilterModal closeModal={() => setOpenFilter(false)} />
          </div>
        </>
      )}
    </div>
  );
}
