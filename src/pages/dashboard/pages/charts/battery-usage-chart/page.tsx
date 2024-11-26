import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface VehicleData {
  realTimeStatus: string;
  vehicleNumber: string;
  vehicleType: string;
  unitNumber: string;
  owner: string;
  contact: string;
  unregisteredReason?: string;
}

const BatteryUsageChartPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const location = useLocation();
  const type = location.state?.type || '미등록(지원가능)';

  const vehicleData: VehicleData[] = [
    { realTimeStatus: '-', vehicleNumber: '65모9203', vehicleType: '', unitNumber: '', owner: '', contact: '', unregisteredReason: '배터리 정보 없음' },
    { realTimeStatus: '-', vehicleNumber: '66모9217', vehicleType: '', unitNumber: '', owner: '', contact: '', unregisteredReason: '배터리 정보 없음' },
    { realTimeStatus: '-', vehicleNumber: '67모9230', vehicleType: '', unitNumber: '', owner: '', contact: '', unregisteredReason: '배터리 정보 없음' },
    { realTimeStatus: '-', vehicleNumber: '68모8447', vehicleType: '', unitNumber: '', owner: '', contact: '', unregisteredReason: '배터리 정보 없음' },
    { realTimeStatus: '-', vehicleNumber: '69모7585', vehicleType: '', unitNumber: '', owner: '', contact: '', unregisteredReason: '배터리 정보 없음' },
    { realTimeStatus: '-', vehicleNumber: '70모4723', vehicleType: '', unitNumber: '', owner: '', contact: '', unregisteredReason: '배터리 정보 없음' },
    { realTimeStatus: '-', vehicleNumber: '47나4696', vehicleType: '', unitNumber: '', owner: '', contact: '', unregisteredReason: '배터리 정보 없음' },
    { realTimeStatus: '-', vehicleNumber: '48다4834', vehicleType: '', unitNumber: '', owner: '', contact: '', unregisteredReason: '배터리 정보 없음' },
  ];

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-5 lg:pt-10 pb-6">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            {trans(type)}
          </h1>
        </div>
      </div>

      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        <div className="bg-hw-dark-2 p-4 rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">실시간 상태정보</th>
                  <th scope="col" className="px-6 py-3">차량번호</th>
                  <th scope="col" className="px-6 py-3">차종</th>
                  <th scope="col" className="px-6 py-3">동/호수</th>
                  <th scope="col" className="px-6 py-3">차주</th>
                  <th scope="col" className="px-6 py-3">연락처</th>
                  {type === '미등록(지원불가)' && <th scope="col" className="px-6 py-3">미등록 사유</th>}
                </tr>
              </thead>
              <tbody>
                {vehicleData.map((vehicle, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                    <td className="px-6 py-4">{vehicle.realTimeStatus}</td>
                    <td className="px-6 py-4">{vehicle.vehicleNumber}</td>
                    <td className="px-6 py-4">{vehicle.vehicleType}</td>
                    <td className="px-6 py-4">{vehicle.unitNumber}</td>
                    <td className="px-6 py-4">{vehicle.owner}</td>
                    <td className="px-6 py-4">{vehicle.contact}</td>
                    {type === '미등록(지원불가)' && <td className="px-6 py-4">{vehicle.unregisteredReason}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryUsageChartPage;
