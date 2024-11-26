import React, { useState } from 'react';

interface VehicleDetail {
  unitNumber: string;
  owner: string;
  contact: string;
  chargingStatus: string;
  vehicleType: string;
  vehicleNumber: string;
  batteryStatus: string;
  batteryHealth: string;
}

interface VehicleDetailPopupProps {
  vehicle: VehicleDetail;
  onClose: () => void;
}

const VehicleDetailPopup: React.FC<VehicleDetailPopupProps> = ({ vehicle, onClose }) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  return (
    <div className="bg-hw-dark-2 p-4 rounded-lg border border-white w-[400px]">
      <h2 className="text-white text-xl mb-4 flex items-center">
        <span className="mr-2">🚙</span> 차량정보
      </h2>
      <div className="grid grid-cols-2 gap-2 text-white">
        <div className="bg-gray-700 p-2 rounded">
          <div className="text-gray-400 text-sm">동/호수</div>
          <div>{vehicle.unitNumber}</div>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <div className="text-gray-400 text-sm">차주</div>
          <div>{vehicle.owner}</div>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <div className="text-gray-400 text-sm">연락처</div>
          <div>{vehicle.contact}</div>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <div className="text-gray-400 text-sm">차량 상태정보</div>
          <div>{vehicle.chargingStatus}</div>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <div className="text-gray-400 text-sm">차종</div>
          <div>{vehicle.vehicleType}</div>
        </div>
        <div className="bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleAdditionalInfo}>
          <div className="text-gray-400 text-sm">차량번호</div>
          <div>{vehicle.vehicleNumber}</div>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <div className="text-gray-400 text-sm">배터리 상태정보</div>
          <div>{vehicle.batteryStatus}</div>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          <div className="text-gray-400 text-sm">배터리 안전지수</div>
          <div>{vehicle.batteryHealth}</div>
        </div>
      </div>
      {showAdditionalInfo && (
        <div className="mt-4 bg-gray-700 p-2 rounded text-white">
          <h3 className="text-lg mb-2">추가 차량 정보</h3>
          <p>여기에 추가적인 차량 정보를 표시할 수 있습니다.</p>
          {/* 추가 정보를 여기에 넣으세요 */}
        </div>
      )}
      <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">닫기</button>
    </div>
  );
};

export default VehicleDetailPopup;
