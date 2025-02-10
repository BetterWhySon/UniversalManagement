import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ManufacturerSearchPopup from './ManufacturerSearchPopup';
import DeviceTypeSearchPopup from './DeviceTypeSearchPopup';
import CellTypeSearchPopup from './CellTypeSearchPopup';

interface CustomDataDefinition {
  id: string;
  name: string;
  unit: string;
  dataType: string;
  section: 1 | 2 | 3 | 4 | 5; // 섹션 구분을 위한 필드 추가
}

interface BatteryModelFormData {
  id: number;              // optional 제거
  manufacturer: string;    // 제조 업체명
  modelName: string;      // 배터리 모델명
  category: string;       // 기기 종류
  cellType: string;       // 셀 종류
  cellCount: number;      // 직렬 셀개수
  parallelCount: number;  // 배터리 온도 개수
  systemCount: number;    // 시스템 온도 개수
  dataTime: number;       // 데이터 취득 주기
  capacity: number;       // 팩 공칭 용량
  voltage: number;        // 팩 공칭 전압
  cellUpperVoltage: number;  // 셀 상한 전압
  cellLowerVoltage: number;  // 셀 하한 전압
  batteryUpperTemp: number;  // 배터리 상한 온도
  batteryLowerTemp: number;  // 배터리 하한 온도
  registrationDate: string; // optional 제거
  maxChargeAmp: number;    // 최대 충전전류
  maxDischargeAmp: number; // 최대 방전전류
  cellNominalVoltage: number; // 셀 공칭 전압
  systemUpperTemp: number;  // 시스템 상한 온도
  systemLowerTemp: number;  // 시스템 하한 온도
  parallelCellCount: number; // 병렬 셀 개수
  packResistance: number;   // 팩 공칭 저항
  cellCycleCount: number;   // 셀 가용 싸이클 수
  packPrice: number;        // 팩 출고가
  firmwareVersion: string;  // 공정 연비
  canId: number;           // Can ID
  dataExists: {
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
  };
  customDataDefinitions: CustomDataDefinition[];
}

interface BatteryModelRegistrationPopupProps {
  onClose: () => void;
  onSave: (data: BatteryModelFormData) => void;
  initialData?: BatteryModelFormData;
  mode?: 'create' | 'edit';
}

export default function BatteryModelRegistrationPopup({ 
  onClose, 
  onSave,
  initialData,
  mode = 'create'
}: BatteryModelRegistrationPopupProps) {
  const { t: trans } = useTranslation('translation');
  const [formData, setFormData] = useState<BatteryModelFormData>(initialData || {
    id: 0,
    manufacturer: '',
    modelName: '',
    category: '',
    cellType: '',
    cellCount: 0,
    parallelCount: 0,
    systemCount: 0,
    dataTime: 0,
    capacity: 0,
    voltage: 0,
    cellUpperVoltage: 0,
    cellLowerVoltage: 0,
    batteryUpperTemp: 0,
    batteryLowerTemp: 0,
    registrationDate: new Date().toLocaleDateString(),
    maxChargeAmp: 0,
    maxDischargeAmp: 0,
    cellNominalVoltage: 0,
    systemUpperTemp: 0,
    systemLowerTemp: 0,
    parallelCellCount: 0,
    packResistance: 0,
    cellCycleCount: 0,
    packPrice: 0,
    firmwareVersion: '0',
    canId: 0,
    dataExists: {
      cellV: false,
      current: false,
      battTemp: false,
      sysTemp: false,
      soc: false,
      sac: false,
      seperatedSac: false,
      packV: false,
      soh: false,
      saac: false,
      speed: false,
      mileage: false,
      evState: false,
      accPedalLoc: false,
      subBattVolt: false,
      breakState: false,
      shiftState: false,
      outsideTemp: false,
      fuelState: false,
      chgState: false,
      dispSoc: false
    },
    customDataDefinitions: []
  });

  const [isManufacturerSearchOpen, setIsManufacturerSearchOpen] = useState(false);
  const [isDeviceTypeSearchOpen, setIsDeviceTypeSearchOpen] = useState(false);
  const [isCellTypeSearchOpen, setIsCellTypeSearchOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('count') || name.includes('voltage') || name.includes('temp') || name === 'capacity' || name === 'dataTime'
        ? Number(value)
        : value
    }));
  };

  // 전체 선택/해제 핸들러
  const handleAllDataExists = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dataExists: Object.keys(prev.dataExists).reduce((acc, key) => ({
        ...acc,
        [key]: checked
      }), prev.dataExists)
    }));
  };

  // 개별 체크박스 핸들러
  const handleDataExistsChange = (field: keyof BatteryModelFormData['dataExists']) => {
    setFormData(prev => ({
      ...prev,
      dataExists: {
        ...prev.dataExists,
        [field]: !prev.dataExists[field]
      }
    }));
  };

  // 커스텀 데이터 추가 핸들러 수정
  const handleAddCustomData = (section: 1 | 2 | 3 | 4 | 5) => {
    setFormData(prev => ({
      ...prev,
      customDataDefinitions: [
        ...prev.customDataDefinitions,
        { 
          id: `${prev.customDataDefinitions.length + 1}`, 
          name: '', 
          unit: '', 
          dataType: '',
          section 
        }
      ]
    }));
  };

  // 커스텀 데이터 삭제 핸들러
  const handleRemoveCustomData = (id: string) => {
    setFormData(prev => ({
      ...prev,
      customDataDefinitions: prev.customDataDefinitions.filter(item => item.id !== id)
    }));
  };

  // 커스텀 데이터 수정 핸들러
  const handleCustomDataChange = (id: string, field: keyof CustomDataDefinition, value: string) => {
    setFormData(prev => ({
      ...prev,
      customDataDefinitions: prev.customDataDefinitions.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // 커스텀 1~5 모두 동일한 구조 적용
  const renderCustomSection = (sectionNumber: number) => {
    // 커스텀 1과 5만 단위 필드가 있는 레이아웃
    const hasUnitField = sectionNumber === 1 || sectionNumber === 5;
    
    return (
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base text-gray-300">커스텀 {sectionNumber}: {getSectionTitle(sectionNumber)}</h3>
          <button
            type="button"
            onClick={() => handleAddCustomData(sectionNumber as 1 | 2 | 3 | 4 | 5)}
            className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            추가
          </button>
        </div>
        {formData.customDataDefinitions
          .filter(item => item.section === sectionNumber)
          .reduce((rows: any[][], item, index) => {
            if (index % 2 === 0) {
              rows.push([item]);
            } else {
              rows[rows.length - 1].push(item);
            }
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-16 mb-4">
              {row.map((item, colIndex) => (
                <div key={item.id} className="flex-1 flex gap-3">
                  <div className="w-[80px]">
                    <label className="block text-sm text-gray-400 mb-1">번호</label>
                    <div className="flex items-center h-9 px-4 bg-gray-600 rounded text-white/60 select-none">
                      {rowIndex * 2 + colIndex + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">이름</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleCustomDataChange(item.id, 'name', e.target.value)}
                      className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                    />
                  </div>
                  {hasUnitField && (
                    <div className="w-[120px]">
                      <label className="block text-sm text-gray-400 mb-1">단위</label>
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleCustomDataChange(item.id, 'unit', e.target.value)}
                        className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                      />
                    </div>
                  )}
                  <div className="w-[200px]">
                    <label className="block text-sm text-gray-400 mb-1">데이터 타입</label>
                    <div className="flex gap-2">
                      <select
                        value={item.dataType}
                        onChange={(e) => handleCustomDataChange(item.id, 'dataType', e.target.value)}
                        className="flex-1 h-9 px-4 bg-hw-dark-1 rounded text-white"
                      >
                        <option value="">선택</option>
                        {getDataTypeOptions(sectionNumber)}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomData(item.id)}
                        className="px-4 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {row.length === 1 && <div className="flex-1" />}
            </div>
          ))}
      </div>
    );
  };

  // 섹션 제목 반환 함수
  const getSectionTitle = (section: number) => {
    switch (section) {
      case 1: return "실시간성 데이터";
      case 2: return "동작, 제어상태";
      case 3: return "알람상태";
      case 4: return "제어신호";
      case 5: return "모델의 추가 사양, 구성값";
      default: return "";
    }
  };

  // 데이터 타입 옵션 반환 함수
  const getDataTypeOptions = (section: number) => {
    switch (section) {
      case 2:
        return <option value="float">float</option>;
      case 3:
      case 4:
      case 5:
        return <option value="int">int</option>;
      default:
        return (
          <>
            <option value="int">int</option>
            <option value="float">float</option>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-[1400px] max-h-[900px] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg text-white">신규 등록</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6">
            <div className="py-2 px-4">
              <h2 className="text-lg text-white">필수 입력 정보</h2>
            </div>

            <div className="grid grid-cols-6 gap-6 px-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">제조 업체명</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                  />
                  <button
                    type="button"
                    className="h-9 px-4 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition-colors flex items-center justify-center whitespace-nowrap"
                    onClick={() => setIsManufacturerSearchOpen(true)}
                  >
                    검색
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">배터리 모델명</label>
                <input
                  type="text"
                  name="modelName"
                  value={formData.modelName}
                  onChange={handleChange}
                  className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">기기 종류</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                  />
                  <button
                    type="button"
                    className="h-9 px-4 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition-colors flex items-center justify-center whitespace-nowrap"
                    onClick={() => setIsDeviceTypeSearchOpen(true)}
                  >
                    검색
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">셀 종류</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="cellType"
                    value={formData.cellType}
                    onChange={handleChange}
                    className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() => setIsCellTypeSearchOpen(true)}
                    className="h-8 px-4 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition-colors flex items-center justify-center whitespace-nowrap"
                  >
                    검색
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">직렬 셀개수</label>
                <input
                  type="number"
                  name="cellCount"
                  value={formData.cellCount}
                  onChange={handleChange}
                  className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">배터리 온도 개수</label>
                <input
                  type="number"
                  name="parallelCount"
                  value={formData.parallelCount}
                  onChange={handleChange}
                  className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">시스템 온도 개수</label>
                <input
                  type="number"
                  name="systemCount"
                  value={formData.systemCount}
                  onChange={handleChange}
                  className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">데이터 취득 주기 (s)</label>
                <input
                  type="number"
                  name="dataTime"
                  value={formData.dataTime}
                  onChange={handleChange}
                  className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">팩 공칭 용량 (Ah)</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">팩 공칭 전압 (V)</label>
                <input
                  type="number"
                  name="voltage"
                  value={formData.voltage}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">셀 상한 전압</label>
                <input
                  type="number"
                  name="cellUpperVoltage"
                  value={formData.cellUpperVoltage}
                  onChange={handleChange}
                  className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">셀 하한 전압</label>
                <input
                  type="number"
                  name="cellLowerVoltage"
                  value={formData.cellLowerVoltage}
                  onChange={handleChange}
                  className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">배터리 상한 온도 (℃)</label>
                <input
                  type="number"
                  name="batteryUpperTemp"
                  value={formData.batteryUpperTemp}
                  onChange={handleChange}
                  className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">배터리 하한 온도 (℃)</label>
                <input
                  type="number"
                  name="batteryLowerTemp"
                  value={formData.batteryLowerTemp}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">최대 충전전류 (A)</label>
                <input
                  type="number"
                  name="maxChargeAmp"
                  value={formData.maxChargeAmp}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">최대 방전전류 (A)</label>
                <input
                  type="number"
                  name="maxDischargeAmp"
                  value={formData.maxDischargeAmp}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">셀 공칭 전압 (V)</label>
                <input
                  type="number"
                  name="cellNominalVoltage"
                  value={formData.cellNominalVoltage}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
            </div>

            <div className="border-t border-gray-600 mt-4"></div>

            <div className="py-2 px-4">
              <h2 className="text-lg text-white">선택 입력 정보</h2>
            </div>

            <div className="grid grid-cols-6 gap-6 px-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">시스템 상한 온도 (℃)</label>
                <input
                  type="number"
                  name="systemUpperTemp"
                  value={formData.systemUpperTemp}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">시스템 하한 온도 (℃)</label>
                <input
                  type="number"
                  name="systemLowerTemp"
                  value={formData.systemLowerTemp}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">병렬 셀 개수</label>
                <input
                  type="number"
                  name="parallelCellCount"
                  value={formData.parallelCellCount}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">팩 공칭 저항 (mΩ)</label>
                <input
                  type="number"
                  name="packResistance"
                  value={formData.packResistance}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">셀 가용 싸이클 수</label>
                <input
                  type="number"
                  name="cellCycleCount"
                  value={formData.cellCycleCount}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">팩 출고가 (원)</label>
                <input
                  type="number"
                  name="packPrice"
                  value={formData.packPrice}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">공정 연비 (전비)</label>
                <input
                  type="text"
                  name="firmwareVersion"
                  value={formData.firmwareVersion}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Can ID</label>
                <input
                  type="number"
                  name="canId"
                  value={formData.canId}
                  onChange={handleChange}
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                />
              </div>
            </div>

            <div className="border-t border-gray-600 mt-4"></div>

            <div className="py-2 px-4 flex items-center gap-6">
              <h2 className="text-lg text-white">데이터 존재 여부</h2>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleAllDataExists(true)}
                  className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  전체선택
                </button>
                <button
                  type="button"
                  onClick={() => handleAllDataExists(false)}
                  className="px-4 py-1.5 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  전체해제
                </button>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-6 px-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.cellV}
                    onChange={() => handleDataExistsChange('cellV')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  Cell_v
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.current}
                    onChange={() => handleDataExistsChange('current')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  current
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.battTemp}
                    onChange={() => handleDataExistsChange('battTemp')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  batt_temp
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.sysTemp}
                    onChange={() => handleDataExistsChange('sysTemp')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  sys_temp
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.soc}
                    onChange={() => handleDataExistsChange('soc')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  soc
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.sac}
                    onChange={() => handleDataExistsChange('sac')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  sac
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.seperatedSac}
                    onChange={() => handleDataExistsChange('seperatedSac')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  seperated_sac
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.packV}
                    onChange={() => handleDataExistsChange('packV')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  pack_v
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.soh}
                    onChange={() => handleDataExistsChange('soh')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  soh
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.saac}
                    onChange={() => handleDataExistsChange('saac')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  saac
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.speed}
                    onChange={() => handleDataExistsChange('speed')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  speed
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.mileage}
                    onChange={() => handleDataExistsChange('mileage')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  milege
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.evState}
                    onChange={() => handleDataExistsChange('evState')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  ev_state
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.accPedalLoc}
                    onChange={() => handleDataExistsChange('accPedalLoc')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  acc_pedal_loc
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.subBattVolt}
                    onChange={() => handleDataExistsChange('subBattVolt')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  sub_batt_volt
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.breakState}
                    onChange={() => handleDataExistsChange('breakState')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  break_state
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.shiftState}
                    onChange={() => handleDataExistsChange('shiftState')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  shift_state
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.outsideTemp}
                    onChange={() => handleDataExistsChange('outsideTemp')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  outside_temp
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.fuelState}
                    onChange={() => handleDataExistsChange('fuelState')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  fuel_state
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.chgState}
                    onChange={() => handleDataExistsChange('chgState')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  chg_state
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={formData.dataExists.dispSoc}
                    onChange={() => handleDataExistsChange('dispSoc')}
                    className="w-4 h-4 accent-blue-500"
                  />
                  disp_soc
                </label>
              </div>
            </div>

            <div className="border-t border-gray-600 mt-4"></div>

            <div className="py-2 px-4">
              <h2 className="text-lg text-white">커스텀 데이터 정의</h2>
            </div>

            {/* 각 섹션 렌더링 */}
            {[1, 2, 3, 4, 5].map(section => renderCustomSection(section as 1 | 2 | 3 | 4 | 5))}
          </div>

          <div className="flex justify-end gap-4 p-6 border-t border-gray-600 bg-hw-dark-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-hw-orange-1 text-hw-orange-1 rounded hover:bg-hw-orange-1/10"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90"
            >
              {mode === 'create' ? '등록' : '수정'}
            </button>
          </div>
        </form>

        {/* form 바깥으로 이동 */}
        {isManufacturerSearchOpen && (
          <ManufacturerSearchPopup
            isOpen={isManufacturerSearchOpen}
            onClose={() => setIsManufacturerSearchOpen(false)}
            onSelect={(manufacturer) => {
              setFormData(prev => ({
                ...prev,
                manufacturer: manufacturer.name
              }));
              setIsManufacturerSearchOpen(false);
            }}
          />
        )}

        {isDeviceTypeSearchOpen && (
          <DeviceTypeSearchPopup
            isOpen={isDeviceTypeSearchOpen}
            onClose={() => setIsDeviceTypeSearchOpen(false)}
            onSelect={(deviceType) => {
              setFormData(prev => ({
                ...prev,
                category: deviceType.name
              }));
              setIsDeviceTypeSearchOpen(false);
            }}
          />
        )}

        {isCellTypeSearchOpen && (
          <CellTypeSearchPopup
            isOpen={isCellTypeSearchOpen}
            onClose={() => setIsCellTypeSearchOpen(false)}
            onSelect={(cellType) => {
              setFormData(prev => ({
                ...prev,
                cellType: cellType.name
              }));
              setIsCellTypeSearchOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
} 