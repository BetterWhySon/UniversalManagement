import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnusedBatteryPage from '@/pages/dashboard/pages/UnusedBatteryPage';

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

  const handleClosePopup = () => {
    setShowPopup(false);
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
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white inline-block"
          onClick={() => setShowPopup(true)}
        >
          최근 미사용 배터리
        </h3>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="w-full text-[12px] font-light">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-2 px-1.5 text-center text-white">운영사</th>
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
                <td className="py-2 px-1.5 text-center">{vehicle.vehicleId}</td>
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
            className="bg-gray-800 rounded-lg w-[90%] h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-white text-xl font-semibold">최근 미사용 배터리</h2>
              <button 
                onClick={handleClosePopup}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(90vh-4rem)] overflow-auto">
              <UnusedBatteryPage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnusedVehicleList; 