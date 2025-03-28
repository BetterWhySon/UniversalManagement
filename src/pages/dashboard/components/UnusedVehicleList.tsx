import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnusedBatteryPage from '@/pages/dashboard/pages/UnusedBatteryPage';
import BatteryInfoModal from './subComponents/BatteryInfoModal';

interface UnusedVehicle {
  operator: string;
  groupName: string;
  vehicleId: string;
  lastUsed: string;
  duration: string;
}

const UnusedVehicleList: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showBatteryInfo, setShowBatteryInfo] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseBatteryInfo = () => {
    setShowBatteryInfo(false);
  };

  const handleVehicleClick = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setShowBatteryInfo(true);
  };

  const unusedVehicles: UnusedVehicle[] = [
    {
      operator: '운영1',
      groupName: '이동형 배터리',
      vehicleId: '배터리 101호',
      lastUsed: '24.07.22',
      duration: '10일 경과'
    },
    {
      operator: '운영6',
      groupName: '이동형 배터리',
      vehicleId: '배터리 201호',
      lastUsed: '24.07.23',
      duration: '9일 경과'
    },
    {
      operator: '운영4',
      groupName: '이동형 배터리',
      vehicleId: '배터리 119호',
      lastUsed: '24.07.25',
      duration: '7일 경과'
    }
  ];

  return (
    <div className="bg-[#2B313B] p-2 rounded-lg h-full flex flex-col relative">
      <div className="flex items-center gap-2 py-1 px-3 mb-1">
        <h3 
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white/20 border-b-[0.5px] inline-block"
          onClick={() => setShowPopup(true)}
        >
          최근 미사용 기기
        </h3>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="w-full text-[12px] font-light">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-2 px-1.5 text-center text-white">사업장</th>
              <th className="py-2 px-1.5 text-center text-white">그룹명</th>
              <th className="py-2 px-1.5 text-center text-white">기기명</th>
              <th className="py-2 px-1.5 text-center text-white">최근사용</th>
              <th className="py-2 px-1.5 text-center text-white">경과</th>
            </tr>
          </thead>
          <tbody>
            {unusedVehicles.map((vehicle, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-700 hover:bg-gray-600 text-white"
              >
                <td className="py-2 px-1.5 text-center">{vehicle.operator}</td>
                <td className="py-2 px-1.5 text-center">{vehicle.groupName}</td>
                <td 
                  className="py-2 px-1.5 text-center cursor-pointer hover:text-blue-400 underline"
                  onClick={() => handleVehicleClick(vehicle.vehicleId)}
                >
                  {vehicle.vehicleId}
                </td>
                <td className="py-2 px-1.5 text-center">{vehicle.lastUsed}</td>
                <td className="py-2 px-1.5 text-center">{vehicle.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClosePopup}
        >
          <div 
            className="bg-gray-800 rounded-lg w-[90%] h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-[90vh] overflow-auto">
              <UnusedBatteryPage />
            </div>
            <div className="absolute bottom-4 right-4">
              <button 
                onClick={handleClosePopup}
                className="bg-gray-700 text-gray-300 px-6 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {showBatteryInfo && (
        <BatteryInfoModal 
          deviceId={selectedVehicle}
          onClose={handleCloseBatteryInfo}
        />
      )}
    </div>
  );
};

export default UnusedVehicleList; 