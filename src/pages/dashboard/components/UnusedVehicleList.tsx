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
    <div className="h-full bg-slate-800 rounded-lg border border-white">
      <div className="flex items-center gap-2 p-3 border-b border-gray-600">
        <h3 
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white inline-block"
          onClick={() => navigate('/dashboard/unused-battery')}
        >
          최근 미운행 전기차 LIST
        </h3>
      </div>
      
      <div className="p-3 overflow-y-auto" style={{ height: 'calc(100% - 45px)' }}>
        <table className="w-full text-white text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="pb-2 text-left font-normal text-gray-400">운영사</th>
              <th className="pb-2 text-left font-normal text-gray-400">그룹명</th>
              <th className="pb-2 text-left font-normal text-gray-400">기기명</th>
              <th className="pb-2 text-left font-normal text-gray-400">최근사용</th>
              <th className="pb-2 text-left font-normal text-gray-400">경과</th>
            </tr>
          </thead>
          <tbody>
            {unusedVehicles.map((vehicle, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-700 last:border-b-0 hover:bg-slate-700 cursor-pointer"
              >
                <td className="py-2">{vehicle.operator}</td>
                <td className="py-2">{vehicle.groupName}</td>
                <td className="py-2">{vehicle.vehicleId}</td>
                <td className="py-2">{vehicle.lastUsed}</td>
                <td className="py-2">{vehicle.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnusedVehicleList; 