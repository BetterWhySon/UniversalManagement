import React from 'react';

interface BatteryInfoModalProps {
  deviceId: string;
  onClose: () => void;
}

const BatteryInfoModal: React.FC<BatteryInfoModalProps> = ({ deviceId, onClose }) => {
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
            <p>사이트 1</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">그룹명</h3>
            <p>그룹 A</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">기기명</h3>
            <p>{deviceId}</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">배터리 팩 ID</h3>
            <p>BAT001</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">사용자</h3>
            <p>홍길동</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">연락처</h3>
            <p>010-1234-5678</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">등록일자</h3>
            <p>2024-03-14</p>
          </div>
          <div className="border border-gray-600 rounded p-3">
            <h3 className="text-gray-400 mb-2">상태정보</h3>
            <p>정상</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryInfoModal; 