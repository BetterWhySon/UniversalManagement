import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UnusedVehicle {
  operator: string;
  groupName: string;
  vehicleId: string;
  lastUsed: string;
  duration: string;
}

const UnusedVehicleList: React.FC = () => {
  const navigate = useNavigate();

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
    <div className="bg-slate-800 p-2 rounded-lg border border-white h-full flex flex-col relative">
      <div className="flex items-center gap-2 py-1 px-3 mb-1">
        <h3 
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white inline-block"
          onClick={() => navigate('/dashboard/unused-battery')}
        >
          최근 미운행 전기차 LIST
        </h3>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="w-full text-[14px] font-light">
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
    </div>
  );
};

export default UnusedVehicleList; 