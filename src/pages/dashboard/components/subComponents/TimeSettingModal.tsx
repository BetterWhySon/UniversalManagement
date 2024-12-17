import React, { useState } from 'react';
import UsageTimeModal from './UsageTimeModal';

interface TimeSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContextMenu {
  x: number;
  y: number;
  show: boolean;
}

const TimeSettingModal: React.FC<TimeSettingModalProps> = ({ isOpen, onClose }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    x: 0,
    y: 0,
    show: false
  });
  const [targetTime, setTargetTime] = useState<string>('');
  const [isUsageTimeOpen, setIsUsageTimeOpen] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows(prev => {
      if (prev.includes(index)) {
        return prev.filter(item => item !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows([...Array(8)].map((_, i) => i));
    } else {
      setSelectedRows([]);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (selectedRows.length > 0) {
      e.preventDefault();
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        show: true
      });
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ x: 0, y: 0, show: false });
  };

  const handleTimeSubmit = () => {
    if (targetTime) {
      // TODO: 목표시간 적용 로직
      handleCloseContextMenu();
      setTargetTime('');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
      onClick={(e) => {
        handleBackdropClick(e);
        handleCloseContextMenu();
      }}
    >
      <div className="bg-slate-800 p-6 rounded-lg w-[80%] max-w-4xl border border-white">
        <div className="mb-6">
          <h2 className="text-white text-lg inline-block">
            목표시간 설정
          </h2>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <select className="bg-hw-dark-3 text-white border border-gray-600 rounded px-3 py-1.5">
              <option value="">사업장</option>
              <option>신일운수</option>
            </select>
            <select className="bg-hw-dark-3 text-white border border-gray-600 rounded px-3 py-1.5">
              <option value="">그룹명</option>
              <option>영업1팀</option>
              <option>영업2</option>
              <option>영업3팀</option>
            </select>
            <button className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
              조회
            </button>
          </div>
          <span 
            className="text-white underline cursor-pointer hover:text-blue-300"
            onClick={() => setIsUsageTimeOpen(true)}
          >
            사업장/그룹별 방전시간 확인하기
          </span>
        </div>

        <div className="text-white overflow-auto" onContextMenu={handleContextMenu}>
          <table className="w-full text-[15px] font-light">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 w-12 text-center border border-gray-600 px-2">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-blue-500"
                    checked={selectedRows.length === 8}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-2 text-center border border-gray-600 px-4">사업장</th>
                <th className="py-2 text-center border border-gray-600 px-4">그룹명</th>
                <th className="py-2 text-center border border-gray-600 px-4">기기명</th>
                <th className="py-2 text-center border border-gray-600 px-4">기준</th>
                <th className="py-2 text-center border border-gray-600 px-4">체 평균시간</th>
                <th className="py-2 text-center border border-gray-600 px-4">최근 평균시간</th>
                <th className="py-2 text-center border border-gray-600 px-4">목표시간</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-600">
                  <td className="py-2 border border-gray-600 px-2 text-center">
                    <input 
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-blue-500"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                    />
                  </td>
                  <td className="border border-gray-600 px-4 text-center">신일운수</td>
                  <td className="border border-gray-600 px-4 text-center">영업{Math.floor(index/3) + 1}팀</td>
                  <td className="border border-gray-600 px-4 text-center">{`${46 + index}자${9411 + index}`}</td>
                  <td className="border border-gray-600 px-4 text-center">주간</td>
                  <td className="border border-gray-600 px-4 text-center">{88 + index}</td>
                  <td className="border border-gray-600 px-4 text-center">{89 + index}</td>
                  <td className="border border-gray-600 px-4 text-center">100</td>
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

        {/* 컨텍스트 메뉴 */}
        {contextMenu.show && (
          <div 
            className="fixed bg-hw-dark-2 border border-hw-gray-4 rounded-lg shadow-lg p-4"
            style={{ 
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
              zIndex: 1000
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="text-white whitespace-nowrap">일괄 등록</span>
              <input
                type="text"
                value={targetTime}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setTargetTime(value);
                }}
                className="bg-white text-gray-800 border border-gray-300 rounded px-2 py-1 w-[60px] placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-right"
                placeholder="시간"
              />
              <span className="text-white">시간</span>
              <button
                onClick={handleTimeSubmit}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                확인
              </button>
            </div>
          </div>
        )}

        {/* 사용시간 현황 모달 */}
        <UsageTimeModal 
          isOpen={isUsageTimeOpen}
          onClose={() => setIsUsageTimeOpen(false)}
        />
      </div>
    </div>
  );
};

export default TimeSettingModal; 