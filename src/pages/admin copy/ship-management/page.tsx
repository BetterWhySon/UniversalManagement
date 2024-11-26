import SiteTable from './components/SiteTable';
import ShipTable from './components/ShipTable';
import BMSTable from './components/BMSTable';
import { useState, useEffect } from 'react';
import useAdmEssManagement from '@/api/admEssManagement';
import useAdmEssManagementSiteCreat from '@/api/admEssManagementSiteCreat';
import useAdmEssManagementSiteEdit from '@/api/admEssManagementSiteEdit';
import useAdmEssManagementSiteDelete from '@/api/admEssManagementSiteDelete';
import useAdmEssManagementShipCreate from '@/api/admEssManagementShipCreat';
import useAdmEssManagementShipEdit from '@/api/admEssManagementShipEdit';
import useAdmEssManagementShipDelete from '@/api/admEssManagementShipDelete';
import useAdmEssManagementBmsCreate from '@/api/admEssManagementBmsCreat';
import useAdmEssManagementBmsEdit from '@/api/admEssManagementBmsEdit';
import useAdmEssManagementBmsDelete from '@/api/admEssManagementBmsDelete';
import { useTranslation } from 'react-i18next';

export default function ShipManagementPage() {
  const { selectSite } = useAdmEssManagement();  
  const { selectShip, storeSeletShip } = useAdmEssManagement();  
  const { dataList, storeDataList } = useAdmEssManagement();    
  const [shipDisabled, setShipDisabled] = useState<boolean>(true);
  const [BMSDisabled, setBMSDisabled] = useState<boolean>(true);
  const { errorMsg_siteCreat } = useAdmEssManagementSiteCreat();
  const { errorMsg_siteEdit } = useAdmEssManagementSiteEdit();
  const { errorMsg_siteDelete } = useAdmEssManagementSiteDelete();
  const { errorMsg_shipCreat } = useAdmEssManagementShipCreate();
  const { errorMsg_shipEdit } = useAdmEssManagementShipEdit();
  const { errorMsg_shipDelete } = useAdmEssManagementShipDelete();
  const { errorMsg_bmsCreat } = useAdmEssManagementBmsCreate();
  const { errorMsg_bmsEdit } = useAdmEssManagementBmsEdit();
  const { errorMsg_bmsDelete } = useAdmEssManagementBmsDelete();
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    storeDataList(trans);
  },[]);

  useEffect(() => {   
    console.log(dataList);   
  },[dataList]);
  
  useEffect(() => {     
    if( selectSite == -1 ) {
      setShipDisabled(true)
    } else {
      setShipDisabled(false)
    }    
  },[selectSite]);
  
  useEffect(() => {   // 사이트,선박  생성,수정 후 데이터 리로드 처리
    storeDataList(trans);   
  },[errorMsg_siteCreat, errorMsg_siteEdit, errorMsg_siteDelete, errorMsg_shipCreat, errorMsg_shipEdit, errorMsg_shipDelete, errorMsg_bmsCreat, errorMsg_bmsEdit, errorMsg_bmsDelete]);
  
  useEffect(() => {     
    if( selectShip == -1 ) {
      setBMSDisabled(true)
    } else {
      setBMSDisabled(false)
    }    
  },[selectShip]);

  return (
    <main className='transition-all flex flex-col items-center w-full pt-5 px-0 lg:px-[55px] lg:pt-10 pb-[74px] ship-management__wrapper'>
      <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none mb-6 px-[18px] lg:px-0'>
        {trans('shipEssManagement')}
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-[96px] px-0 xs:px-[18px] lg:px-0 md:gap-5 w-full'>      
          <SiteTable />      
        <div style={shipDisabled ? {pointerEvents: "none", opacity: "0.4"} : {}}>      
          <ShipTable />
        </div>
        <div style={BMSDisabled ? {pointerEvents: "none", opacity: "0.4"} : {}}>      
          <BMSTable />
        </div>
      </div>
    </main>
  );
}
