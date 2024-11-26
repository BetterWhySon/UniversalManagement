import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { admServerManagement } from '@/types/server-management.type';

interface ServerTableProps {
  dataList: admServerManagement[] | null;
  serverType: string;
}

export default function ServerTable({ dataList, serverType }: ServerTableProps) {
  // const [data, setData] = useState<admServerManagement[]>([]);
  // const { dataList, storeDataList } = useAdmEssManagement();
  const [serverData, setServerData] = useState<admServerManagement>();
  const [localRestore, setLocalRestore] = useState<boolean>(false);
  const [cloudRestore, setCloudRestore] = useState<boolean>(false);
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    dataList?.map((server) => {
      if (server.server == serverType) {
        setServerData(server)
      }
      if (server.server == 'local') {
        setLocalRestore(server.restore_status)
      }
      if (server.server == 'cloud') {
        setCloudRestore(server.restore_status)
      }
    });
  }, []);

  return (
    <>
      <div className='w-full px-[18px] sm:px-[18px] lg:px-8 pt-5 lg:pt-6 pb-10 bg-hw-dark-2 rounded-none lg:rounded-lg flex flex-col'>
        <p className="text-[21px] mb-5 pb-5 border-b">{serverType === 'local' ? 'Local Server' : serverType === 'cloud'? 'Cloud Server' : 'Backup Server' }</p>
        <span className='text-[19px] leading-[18px] font-normal text-hw-white-1'>{trans('networkStatus')}</span>        
        <p className='text-[17px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '10px' }} >- {serverData?.network_status}</p>
        <div style={{ marginTop: '30px' }}></div>
        <span className='text-[19px] leading-[18px] font-normal text-hw-white-1 mt-3'>{trans('faultCondition')}</span>
        <p className='text-[17px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '10px' }} >- {trans('cpuMemoryLoadStatus')}</p>
        <p className='text-[16px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '25px' }} >: {serverData?.check_cpu_memory}</p> 
        <p className='text-[17px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '10px' }} >- {trans('softwareRunningStatus')}</p> 
        <p className='text-[16px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '25px' }} >: {serverData?.check_service}</p>
        <div style={{ marginTop: '30px' }}></div>
        <span className='text-[19px] leading-[18px] font-normal text-hw-white-1 mt-3'>{trans('capacityStatus')}</span>
        <p className='text-[17px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '10px' }} >- {trans('cpuUsage')}</p>
        <p className='text-[16px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '25px' }} >: {serverData?.cpu_usage}%</p>
        <p className='text-[17px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '10px' }} >- {trans('memoryUsage')}</p>
        <p className='text-[16px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '25px' }} >: {serverData?.memory_usage}%</p>
        {serverType === 'backup' && (
          <div>
            <div style={{ marginTop: '30px' }}></div>
            <span className='text-[19px] leading-[18px] font-normal text-hw-white-1 mt-3'>{trans('dataRealTimeRestorationStatus')}</span>
            <p className='text-[17px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '10px' }} >- Local : {localRestore ? "On" : "Off"}</p>
            <p className='text-[17px] mt-3 leading-[18px] font-light text-hw-white-2' style={{ marginLeft: '10px' }} >- Cloud : {cloudRestore ? "On" : "Off"}</p>
          </div>
        )}
      </div>

    </>
  );
}
