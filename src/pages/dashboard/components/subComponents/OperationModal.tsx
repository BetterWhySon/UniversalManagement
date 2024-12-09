import React, { useState } from 'react';
import TimeSettingModal from './TimeSettingModal';

interface OperationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContextMenu {
  x: number;
  y: number;
  show: boolean;
  rowIndex: number;
}

const OperationModal: React.FC<OperationModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    x: 0,
    y: 0,
    show: false,
    rowIndex: -1
  });
  const [periodSettings, setPeriodSettings] = useState<{ [key: number]: string }>({
    1: '주간',
    2: '주간'
  });
  const [isTimeSettingOpen, setIsTimeSettingOpen] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContextMenu = (e: React.MouseEvent, rowIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      show: true,
      rowIndex
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ x: 0, y: 0, show: false, rowIndex: -1 });
  };

  const handlePeriodChange = (period: string) => {
    setPeriodSettings(prev => ({
      ...prev,
      [contextMenu.rowIndex]: period
    }));
    handleCloseContextMenu();
  };

  const handleApply = () => {
    // TODO: 선택된 옵션 적용 로직
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]"
      onClick={(e) => {
        handleBackdropClick(e);
        handleCloseContextMenu();
      }}
    >
      <div className="bg-slate-800 p-6 rounded-lg w-[80%] max-w-4xl border border-white">
        <div className="mb-6">
          <h2 className="text-white text-lg">운영 현황</h2>
        </div>
        
        <div className="text-white overflow-auto">
          <table className="w-full text-[15px] font-light">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 w-24 text-center border border-gray-600 px-4">구분</th>
                <th className="py-2 text-center border border-gray-600 px-4">운영현황</th>
                <th className="py-2 text-center border border-gray-600 px-4 w-[120px]">집계단위</th>
                <th className="py-2 text-center border border-gray-600 px-4">기준값 설정<br/>(목표, 적정량 등)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700 hover:bg-gray-600">
                <td className="py-4 border border-gray-600 px-4 text-center">
                  <input 
                    type="radio" 
                    name="operation" 
                    checked={selectedOption === 0}
                    onChange={() => setSelectedOption(0)}
                    className="w-4 h-4 cursor-pointer mx-auto"
                  />
                </td>
                <td className="border border-gray-600 px-4">관리대수중 실시간 사용중인 대수</td>
                <td className="border border-gray-600 px-4">실시간</td>
                <td className="border border-gray-600 px-4">-</td>
              </tr>
              <tr className="border-b border-gray-700 hover:bg-gray-600">
                <td className="py-4 border border-gray-600 px-4 text-center">
                  <input 
                    type="radio" 
                    name="operation" 
                    checked={selectedOption === 1}
                    onChange={() => setSelectedOption(1)}
                    className="w-4 h-4 cursor-pointer mx-auto"
                  />
                </td>
                <td className="border border-gray-600 px-4">목표사용 시간대비 실제 사용시간</td>
                <td className="border border-gray-600 px-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400">{periodSettings[1]}</span>
                    <button
                      className="text-blue-400 hover:text-blue-300 border border-blue-400 rounded px-2 py-0.5 text-sm"
                      onClick={(e) => handleContextMenu(e, 1)}
                    >
                      선택
                    </button>
                  </div>
                </td>
                <td className="border border-gray-600 px-4 text-blue-400 cursor-pointer hover:text-blue-300" onClick={() => setIsTimeSettingOpen(true)}>
                  목표시간 등록
                </td>
              </tr>
              <tr className="hover:bg-gray-600">
                <td className="py-4 border border-gray-600 px-4 text-center">
                  <input 
                    type="radio" 
                    name="operation" 
                    checked={selectedOption === 2}
                    onChange={() => setSelectedOption(2)}
                    className="w-4 h-4 cursor-pointer mx-auto"
                  />
                </td>
                <td className="border border-gray-600 px-4">적정 사용에너지 대비 실제 사용에너지</td>
                <td className="border border-gray-600 px-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400">{periodSettings[2]}</span>
                    <button
                      className="text-blue-400 hover:text-blue-300 border border-blue-400 rounded px-2 py-0.5 text-sm"
                      onClick={(e) => handleContextMenu(e, 2)}
                    >
                      선택
                    </button>
                  </div>
                </td>
                <td className="border border-gray-600 px-4 text-blue-400">적정 사용량 등록</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white border border-gray-400 rounded hover:border-white"
          >
            취소
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            적용
          </button>
        </div>

        {contextMenu.show && (
          <div 
            className="fixed bg-hw-dark-2 border border-hw-gray-4 rounded-lg shadow-lg py-1.5 w-[120px]"
            style={{ 
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
              zIndex: 1000
            }}
          >
            <button 
              className="w-full px-3 py-1.5 text-center hover:bg-hw-dark-3 text-hw-white-1 whitespace-nowrap text-sm"
              onClick={() => handlePeriodChange('주간')}
            >
              주간
            </button>
            <button 
              className="w-full px-3 py-1.5 text-center hover:bg-hw-dark-3 text-hw-white-1 whitespace-nowrap text-sm"
              onClick={() => handlePeriodChange('월간')}
            >
              월간
            </button>
          </div>
        )}

        <TimeSettingModal 
          isOpen={isTimeSettingOpen}
          onClose={() => setIsTimeSettingOpen(false)}
        />
      </div>
    </div>
  );
};

export default OperationModal; 