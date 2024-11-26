import ServerTable from './components/ServerTable';
import { useEffect } from 'react';
import useAdmServerManagement from '@/api/admServerManagement';
import { useTranslation } from 'react-i18next';

export default function ServerManagementPage() {
  // const { selectSite } = useAdmEssManagement();
  // const { selectShip, storeSeletShip } = useAdmEssManagement();
  const { dataList, storeDataList } = useAdmServerManagement();
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    storeDataList(trans);
  }, []);

  useEffect(() => {
    console.log(dataList);
  }, [dataList]);


  // useEffect(() => {   // 사이트,선박  생성,수정 후 데이터 리로드 처리
  //   storeDataList(trans);
  // }, [errorMsg_siteCreat, errorMsg_siteEdit, errorMsg_siteDelete, errorMsg_shipCreat, errorMsg_shipEdit, errorMsg_shipDelete, errorMsg_bmsCreat, errorMsg_bmsEdit, errorMsg_bmsDelete]);

  return (
    <main className='transition-all flex flex-col items-center w-full pt-5 px-0 lg:px-[55px] lg:pt-10 pb-[74px] ship-management__wrapper'>
      <h1 className='w-full text-hw-white-1 text-[22px] font-normal leading-4 lg:text-xl lg:leading-none mb-6 px-[18px] lg:px-0'>
        {trans('serverManagement')}
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-[96px] px-0 xs:px-[18px] lg:px-0 md:gap-5 w-full h-auto'>
        {dataList && <ServerTable dataList={dataList} serverType="local" />}
        {dataList && <ServerTable dataList={dataList} serverType="cloud" />}
        {dataList && <ServerTable dataList={dataList} serverType="backup" />}
      </div>
    </main>
  );
}
