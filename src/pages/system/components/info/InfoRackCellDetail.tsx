import { ReactNode, useState, useEffect } from 'react';
import CellDetailCol from './CellDetailCol';
import { cn } from '@/helpers/class-name.helper';
import useSystemInfoRtCellStore from '@/api/systemInfoRtCellInfo';
import useSystemInfoRtRackStore from '@/api/systemInfoRtRackInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { websocketURL } from '@/api/URLs';


const enum CellDetailTabs {
  VOLTAGE = 'Voltage',
  TEMP = 'Temperature',
}

type OutputDatas = {
  maxVol: number;
  maxTemp: number;
  minVol: number;
  minTemp: number;
  maxVolIndex: number;
  maxTempIndex: number;
  minVolIndex: number;
  minTempIndex: number;  
};

const InfoRackCellDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [output, setOutput] = useState<OutputDatas>({
    maxVol: 0,
    maxTemp: 0,
    minVol: 0,
    minTemp: 0,
    maxVolIndex: -1,
    maxTempIndex: -1,
    minVolIndex: -1,
    minTempIndex: -1,
  });
  const { systemInfoRtCellDetail, connectCell, disconnectCell } = useSystemInfoRtCellStore();
  const { disconnectReck } = useSystemInfoRtRackStore();
  const [currentTab, setCurrentTab] = useState<CellDetailTabs>(CellDetailTabs.VOLTAGE);
  const dummyArr = Array.from({ length: 120 }, (_, index) => index);  
  const tabContent: Record<string, ReactNode> = {
    [CellDetailTabs.VOLTAGE]: (
      <CellDetailCol
        title='Voltage'
        dummyArr={dummyArr}
        dummyContent={{ title: 'Cell V#1', value: '5.214V' }}
        upTemp={{ title: 'Cell V#5', value: '3.713V' }}
        downTemp={{ title: 'Cell V#18', value: '3.713V' }}
        redIndex={4}
        blueIndex={21}
      />
    ),
    [CellDetailTabs.TEMP]: (
      <CellDetailCol
        title='Temperature'
        dummyArr={dummyArr}
        dummyContent={{ title: 'Temp #10', value: '25°C' }}
        upTemp={{ title: 'Temp#13', value: '25°C' }}
        downTemp={{ title: 'Temp#3', value: '25°C' }}
        redIndex={12}
        blueIndex={5}
      />
    ),
  };

  useEffect(() => {
    console.log(location);
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate('/login');
      return;
    }
    // SystemInfoRtStore disconnect
    disconnectReck();

    const parts = location.pathname.split('/');
    const data = [token, parts[2], parts[4], 'cell']  //토큰, BMS_ID(30), rack(1), true(bool)

    const url = websocketURL + 'system_info_rt/?query_string=' + data;
    connectCell(url);

    return () => {
      disconnectCell();
    };
  }, [location]);

  useEffect(() => {
    const maxVol = systemInfoRtCellDetail?.cell && systemInfoRtCellDetail?.cell.length > 0 ? Math.max(...systemInfoRtCellDetail?.cell) : 0;   // 최대전압
    const maxTemp = systemInfoRtCellDetail?.temp && systemInfoRtCellDetail?.temp.length > 0 ? Math.max(...systemInfoRtCellDetail?.temp) : 0;  // 최대온도
    const minVol = systemInfoRtCellDetail?.cell && systemInfoRtCellDetail?.cell.length > 0 ? Math.min(...systemInfoRtCellDetail?.cell) : 0;   // 최소전압
    const minTemp = systemInfoRtCellDetail?.temp && systemInfoRtCellDetail?.temp.length > 0 ? Math.min(...systemInfoRtCellDetail?.temp) : 0;  // 최소온도
    const maxVolIndex = systemInfoRtCellDetail?.cell.indexOf(maxVol) ?? 0;         // 최대전압의 배열상 위치
    const maxTempIndex = systemInfoRtCellDetail?.temp.indexOf(maxTemp) ?? 0;       // 최대온도의 배열상 위치
    const minVolIndex = systemInfoRtCellDetail?.cell.indexOf(minVol) ?? 0;         // 최소전압의 배열상 위치
    const minTempIndex = systemInfoRtCellDetail?.temp.indexOf(minTemp) ?? 0;       // 최소온도의 배열상 위치
    console.log(maxVol,' ',maxVolIndex);
    console.log(maxTemp,' ',maxTempIndex);
    console.log(minVol,' ',minVolIndex);
    console.log(minTemp,' ',minTempIndex);
    setOutput({maxVol ,maxTemp,minVol,minTemp,maxVolIndex,maxTempIndex,minVolIndex,minTempIndex});
    
  }, [systemInfoRtCellDetail]);


  return (
    <>
      {/* MOBILE TABS */}
      <div className='flex 2lg:hidden h-9'>
        <div
          onClick={() => setCurrentTab(CellDetailTabs.VOLTAGE)}
          className={cn(
            'cursor-pointer transition-all w-[188px] p-2 pb-3 flex items-center justify-center text-[16px] leading-4 font-normal text-hw-white-3',
            currentTab === CellDetailTabs.VOLTAGE && 'text-hw-white-1 border-b border-hw-white-1',
          )}>
          {CellDetailTabs.VOLTAGE}
        </div>
        <div
          onClick={() => setCurrentTab(CellDetailTabs.TEMP)}
          className={cn(
            'cursor-pointer transition-all w-[188px] p-2 pb-3 flex items-center justify-center text-[16px] leading-4 font-normal text-hw-white-3',
            currentTab === CellDetailTabs.TEMP && 'text-hw-white-1 border-b border-hw-white-1',
          )}>
          {CellDetailTabs.TEMP}
        </div>
      </div>

      {/* PC TABLES */}
      <div className='hidden 2lg:grid w-full h-[772px] rounded-lg grid-cols-2 gap-[20px]'>
        {/* voltage */}
        <CellDetailCol
          title='Voltage'
          dummyArr={systemInfoRtCellDetail?.cell ?? []}
          dummyContent={{ title: 'Cell V#1', value: '5.214V' }}
          upTemp={{ title: `Cell V#${output.maxVolIndex+1}`, value: output.maxVol.toFixed(3)+"V" }}
          downTemp={{ title: `Cell V#${output.minVolIndex+1}`, value: output.minVol.toFixed(3)+"V" }}
          redIndex={output.maxVolIndex}
          blueIndex={output.minVolIndex}
        />
        {/* temperature */}
        <CellDetailCol
          title='Temperature'
          dummyArr={[...(systemInfoRtCellDetail?.temp ?? []), ...(systemInfoRtCellDetail?.m_temp ?? [])]}
          dummyContent={{ title: 'Temp #10', value: '25°C' }}
          upTemp={{ title: `Temp #${output.maxTempIndex+1}`, value: output.maxTemp+"°C" }}
          downTemp={{ title: `Cell #${output.minTempIndex+1}`, value: output.minTemp+"°C" }}
          redIndex={output.maxTempIndex}
          blueIndex={output.minTempIndex}
        />
      </div>

      {/* MOBILE TABLES */}
      <div className='block 2lg:hidden mb-8'>{tabContent[currentTab]}</div>
    </>
  );
};

export default InfoRackCellDetail;
