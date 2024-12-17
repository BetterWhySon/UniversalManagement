import React from 'react';

interface UsageTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UsageTimeModal: React.FC<UsageTimeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 p-6 rounded-lg w-[80%] max-w-4xl border border-white">
        <div className="mb-6">
          <h2 className="text-white text-lg">사업장/그룹별 방전시간</h2>
        </div>

        <div className="text-white overflow-auto">
          <table className="w-full text-[15px] font-light">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 text-center border border-gray-600 px-4 w-[150px] h-[42px]">사업장</th>
                <th className="py-2 text-center border border-gray-600 px-4 w-[150px] h-[42px]">그룹명</th>
                <th className="py-2 text-center border border-gray-600 px-4 w-[130px] h-[42px]">기준</th>
                <th className="py-2 text-center border border-gray-600 px-4 w-[130px] h-[42px]">전체 평균시간</th>
                <th className="py-2 text-center border border-gray-600 px-4 w-[130px] h-[42px]">직전 평균시간</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-600">
                <td className="border border-gray-600 px-4 text-center h-[42px]">전체</td>
                <td className="border border-gray-600 px-4 text-center h-[42px]"></td>
                <td className="border border-gray-600 px-4 text-center h-[42px]">주간</td>
                <td className="border border-gray-600 px-4 text-center h-[42px]">100</td>
                <td className="border border-gray-600 px-4 text-center h-[42px]">98</td>
              </tr>
              {[...Array(6)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-600">
                  <td className="border border-gray-600 px-4 text-center h-[42px]">신일운수</td>
                  <td className="border border-gray-600 px-4 text-center h-[42px]">영업1팀</td>
                  <td className="border border-gray-600 px-4 text-center h-[42px]">주간</td>
                  <td className="border border-gray-600 px-4 text-center h-[42px]">{94 + (index * 2)}</td>
                  <td className="border border-gray-600 px-4 text-center h-[42px]">{92 + (index * 4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white border border-gray-400 rounded hover:border-white"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsageTimeModal; 