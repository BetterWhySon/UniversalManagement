import React from 'react';

interface BatteryStatus {
  status: string;
  site: string;
  group: string;
  deviceName: string;
  batteryId: string;
  userInfo1: string;
  userInfo2: string;
  userInfo3: string;
  otherInfo1: string;
  otherInfo2: string;
  otherInfo3: string;
  otherInfo4: string;
}

const BatteryStatusPage: React.FC = () => {
  const batteryStatuses: BatteryStatus[] = [
    // 예시 데이터
    {
      status: '사용대기',
      site: '사이트1',
      group: '그룹A',
      deviceName: '배터리01',
      batteryId: 'BAT001',
      userInfo1: '정보1',
      userInfo2: '정보2',
      userInfo3: '정보3',
      otherInfo1: '기타1',
      otherInfo2: '기타2',
      otherInfo3: '기타3',
      otherInfo4: '기타4'
    },
    // ... 더 많은 데이터
  ];

  return (
    <div className="p-4 bg-slate-800 rounded-lg border border-white h-full">
      <div className="flex items-center gap-2 p-3 border-b border-gray-600">
        <img src="/icons/clipboard.svg" alt="clipboard" className="w-5 h-5" />
        <h3 className="text-white text-lg">실시간 배터리 상태정보</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-white text-sm mt-4">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="pb-2 text-left font-normal text-gray-400">실시간 상태정보</th>
              <th className="pb-2 text-left font-normal text-gray-400">사업장</th>
              <th className="pb-2 text-left font-normal text-gray-400">그룹명</th>
              <th className="pb-2 text-left font-normal text-gray-400">기기명</th>
              <th className="pb-2 text-left font-normal text-gray-400">배터리 팩 ID</th>
              <th className="pb-2 text-left font-normal text-gray-400">사용자 정보1</th>
              <th className="pb-2 text-left font-normal text-gray-400">사용자 정보2</th>
              <th className="pb-2 text-left font-normal text-gray-400">사용자 정보3</th>
              <th className="pb-2 text-left font-normal text-gray-400">기타 정보1</th>
              <th className="pb-2 text-left font-normal text-gray-400">기타 정보2</th>
              <th className="pb-2 text-left font-normal text-gray-400">기타 정보3</th>
              <th className="pb-2 text-left font-normal text-gray-400">기타 정보4</th>
            </tr>
          </thead>
          <tbody>
            {batteryStatuses.map((status, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-700 last:border-b-0 hover:bg-slate-700"
              >
                <td className="py-2 text-green-500">{status.status}</td>
                <td className="py-2">{status.site}</td>
                <td className="py-2">{status.group}</td>
                <td className="py-2">{status.deviceName}</td>
                <td className="py-2">{status.batteryId}</td>
                <td className="py-2">{status.userInfo1}</td>
                <td className="py-2">{status.userInfo2}</td>
                <td className="py-2">{status.userInfo3}</td>
                <td className="py-2">{status.otherInfo1}</td>
                <td className="py-2">{status.otherInfo2}</td>
                <td className="py-2">{status.otherInfo3}</td>
                <td className="py-2">{status.otherInfo4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatteryStatusPage;