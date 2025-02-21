import React from 'react';

interface DataExistsType {
  cellV: boolean;
  current: boolean;
  battTemp: boolean;
  sysTemp: boolean;
  soc: boolean;
  sac: boolean;
  seperatedSac: boolean;
  packV: boolean;
  soh: boolean;
  saac: boolean;
  speed: boolean;
  mileage: boolean;
  evState: boolean;
  accPedalLoc: boolean;
  subBattVolt: boolean;
  breakState: boolean;
  shiftState: boolean;
  outsideTemp: boolean;
  fuelState: boolean;
  chgState: boolean;
  dispSoc: boolean;
}

interface BetteryDataConfigProps {
  dataExists: DataExistsType;
  onDataExistsChange: (key: keyof DataExistsType) => void;
  onSelectAll: () => void;
  onUnselectAll: () => void;
}

export default function BetteryDataConfig({ 
  dataExists, 
  onDataExistsChange,
  onSelectAll,
  onUnselectAll 
}: BetteryDataConfigProps) {
  return (
    <div className="bg-hw-dark-2 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-white">데이터 구성</h2>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onSelectAll}
            className="text-sm text-blue-500 hover:text-blue-400"
          >
            전체 선택
          </button>
          <button
            type="button"
            onClick={onUnselectAll}
            className="text-sm text-blue-500 hover:text-blue-400"
          >
            전체 해제
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={dataExists.cellV}
              onChange={() => onDataExistsChange('cellV')}
              className="w-4 h-4 accent-blue-500"
            />
            cell_v
          </label>
        </div>
        {/* ... 나머지 체크박스들 */}
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={dataExists.dispSoc}
              onChange={() => onDataExistsChange('dispSoc')}
              className="w-4 h-4 accent-blue-500"
            />
            disp_soc
          </label>
        </div>
      </div>
    </div>
  );
} 