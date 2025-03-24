import React, { useState } from 'react';
import UsageTimeModal from './UsageTimeModal';

interface TimeSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'time' | 'discharge';
}

interface ContextMenu {
  x: number;
  y: number;
  show: boolean;
}

const TimeSettingModal: React.FC<TimeSettingModalProps> = ({ isOpen, onClose, type = 'time' }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    x: 0,
    y: 0,
    show: false
  });
  const [targetTime, setTargetTime] = useState<number>(100);
  const [rowTimes, setRowTimes] = useState<number[]>(new Array(8).fill(100));
  const [isUsageTimeOpen, setIsUsageTimeOpen] = useState(false);

  const isDischargeType = type === 'discharge';

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

  const handleTimeSubmit = () => {
    if (targetTime) {
      setRowTimes(prev => prev.map((time, index) => 
        selectedRows.length > 0 ? (selectedRows.includes(index) ? targetTime : time) : targetTime
      ));
    }
  };

  const handleApply = () => {
    // 여기에 적용 로직 추가
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
      onClick={(e) => {
        handleBackdropClick(e);
      }}
    >
      <div className="bg-slate-800 p-6 rounded-lg w-[80%] max-w-4xl border border-white">
        <div className="mb-6">
          <h2 className="text-white text-lg inline-block">
            {isDischargeType ? '계획 사용량 등록' : '계획시간 등록'}
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
            <div className="flex items-center gap-2 ml-4 border-l border-gray-600 pl-4">
              <span className="text-white whitespace-nowrap">일괄 등록</span>
              <input
                type="number"
                value={targetTime}
                onChange={(e) => setTargetTime(Number(e.target.value))}
                className="bg-hw-dark-3 text-white border border-gray-600 rounded px-2 py-1 w-[80px] text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="시간"
                min="0"
              />
              <span className="text-white">{isDischargeType ? 'KW' : '시간'}</span>
              <button
                onClick={handleTimeSubmit}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                확인
              </button>
            </div>
          </div>
          <span 
            className="text-white underline cursor-pointer hover:text-blue-300"
            onClick={() => setIsUsageTimeOpen(true)}
          >
            사업장/그룹별 {isDischargeType ? '평균사용량' : '평균시간'} 확인하기
          </span>
        </div>

        <div className="text-white overflow-auto">
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
                <th className="py-2 text-center border border-gray-600 px-4">
                  {isDischargeType ? '평균방전량' : '평균방전시간'}<br/>
                  (전체)
                </th>
                <th className="py-2 text-center border border-gray-600 px-4">
                  {isDischargeType ? '평균방전량' : '평균방전시간'}<br/>
                  (최근1주일)
                </th>
                <th className="py-2 text-center border border-gray-600 px-4">
                  {isDischargeType ? '적정 방전량' : '목표시간'}
                </th>
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
                  <td className="border border-gray-600 px-4 text-center">
                    <input
                      type="number"
                      value={rowTimes[index]}
                      onChange={(e) => {
                        const newTimes = [...rowTimes];
                        newTimes[index] = Number(e.target.value);
                        setRowTimes(newTimes);
                      }}
                      className="bg-slate-700 text-white border border-gray-600 rounded px-2 py-1 w-[80px] text-right"
                      min="0"
                    />
                  </td>
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
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            적용
          </button>
        </div>

        {/* 사용시간 현황 모달 */}
        <UsageTimeModal 
          isOpen={isUsageTimeOpen}
          onClose={() => setIsUsageTimeOpen(false)}
          type={type}
        />
      </div>
    </div>
  );
};

export default TimeSettingModal; 