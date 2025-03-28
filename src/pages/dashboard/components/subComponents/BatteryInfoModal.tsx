import React, { useEffect, useState } from 'react';

interface BatteryInfo {
  workplace: string;
  groupName: string;
  deviceId: string;
  application: string;
  packId: string;
  packModel: string;
  userName: string;
  contact: string;
}

interface BatteryInfoModalProps {
  deviceId: string;
  onClose: () => void;
}

const BatteryInfoModal: React.FC<BatteryInfoModalProps> = ({ deviceId, onClose }) => {
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo>({
    workplace: '인천 물류센터',
    groupName: '지게차 1팀',
    deviceId: deviceId,
    application: '지게차',
    packId: `PACK-${deviceId}`,
    packModel: 'LFP-48V100AH',
    userName: '김물류',
    contact: '010-1234-5678'
  });

  useEffect(() => {
    // TODO: API 호출로 데이터 가져오기
    // const fetchBatteryInfo = async () => {
    //   try {
    //     const response = await fetch(`/api/battery/${deviceId}`);
    //     const data = await response.json();
    //     setBatteryInfo(data);
    //   } catch (error) {
    //     console.error('Error fetching battery info:', error);
    //   }
    // };
    // fetchBatteryInfo();
  }, [deviceId]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg p-6 border border-white max-w-2xl w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white">배터리 정보</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-white">
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">사업장</h3>
            <p>{batteryInfo.workplace}</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">그룹명</h3>
            <p>{batteryInfo.groupName}</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">기기명</h3>
            <p>{batteryInfo.deviceId}</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">어플리케이션</h3>
            <p>{batteryInfo.application}</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">팩 ID</h3>
            <p>{batteryInfo.packId}</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">팩 모델정보</h3>
            <p>{batteryInfo.packModel}</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">사용자</h3>
            <p>{batteryInfo.userName}</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">연락처</h3>
            <p>{batteryInfo.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryInfoModal; 