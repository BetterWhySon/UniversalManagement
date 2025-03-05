import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DeviceTypeSearchPopup from './DeviceTypeSearchPopup';
import CellTypeSearchPopup from './CellTypeSearchPopup';
import ModelGroupSearchPopup from './ModelGroupSearchPopup';
import useAdmBetteryModel from '@/api/admin/admBetteryModel';

interface CustomDataDefinition {
  id: string;
  name: string;
  unit: string;
  dataType: string;
  section: 1 | 2 | 3 | 4 | 5; // 섹션 구분을 위한 필드 추가
}

interface BatteryModelFormData {
  id: number;
  manufacturer: string;    // 제조업체명 (화면 표시용)
  manufacturerId: number;  // 제조업체 ID (서버 전송용) 추가
  modelGroup: string;      // 모델그룹 종류 (추가)
  modelGroupId: number;    // 추가
  modelName: string;       // 배터리 모델명
  category: string;       // 기기 종류
  categoryId: number;      // 추가
  cellType: string;       // 셀 종류
  cellTypeId: number;      // 추가
  cellCount: number;      // 직렬 셀개수
  parallelCount: number;  // 배터리 온도 개수
  systemCount: number;    // 시스템 온도 개수
  capacity: number;       // 팩 공칭 용량
  voltage: number;        // 팩 공칭 전압
  cellUpperVoltage: number;  // 셀 상한 전압
  cellLowerVoltage: number;  // 셀 하한 전압
  batteryUpperTemp: number;  // 배터리 상한 온도
  batteryLowerTemp: number;  // 배터리 하한 온도
  registrationDate: number; // optional 제거
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

interface ManufacturerData {
  id: number;
  name: string;
  businessNumber: string;
  type: '제조업' | '서비스업';
}

interface BatteryModelRegistrationPopupProps {
  onClose: () => void;
  onSave: (data: BatteryModelFormData) => Promise<void>;
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
  const { storeBatteryModelCreate, storeBatteryModelEdit } = useAdmBetteryModel();
  const [formData, setFormData] = useState<BatteryModelFormData>(initialData || {
    id: 0,
    manufacturer: '',
    manufacturerId: Number(localStorage.getItem("customer_id")) || 0,
    modelGroup: '',
    modelGroupId: 0,
    modelName: '',
    category: '',
    categoryId: 0,
    cellType: '',
    cellTypeId: 0,
    cellCount: 0,
    parallelCount: 0,
    systemCount: 0,
    capacity: 0,
    voltage: 0,
    cellUpperVoltage: 0,
    cellLowerVoltage: 0,
    batteryUpperTemp: 0,
    batteryLowerTemp: 0,
    registrationDate: 0,
    maxChargeAmp: 0,
    maxDischargeAmp: 0,
    cellNominalVoltage: 0,
    systemUpperTemp: 0,
    systemLowerTemp: 0,
    parallelCellCount: 0,
    packResistance: 0,
    cellCycleCount: 0,
    packPrice: 0,
    firmwareVersion: '',
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

  const [isDeviceTypeSearchOpen, setIsDeviceTypeSearchOpen] = useState(false);
  const [isCellTypeSearchOpen, setIsCellTypeSearchOpen] = useState(false);
  const [isModelNameSearchOpen, setIsModelNameSearchOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const modelData = {
        model_name: formData.modelName,
        device_type: formData.categoryId,
        model_group: formData.modelGroupId,
        cell_type: formData.cellTypeId,
        pack_manufacturer: Number(localStorage.getItem("customer_id")) || 0,
        series_cell_cnt: formData.cellCount,
        batt_temp_cnt: formData.parallelCount,
        sys_temp_cnt: formData.systemCount,
        pack_nominal_capacity: formData.capacity,
        pack_nominal_voltage: formData.voltage,
        high_cell_v_limit: formData.cellUpperVoltage,
        low_cell_v_limit: formData.cellLowerVoltage,
        high_batt_temp_limit: formData.batteryUpperTemp,
        low_batt_temp_limit: formData.batteryLowerTemp,
        max_chg_current: formData.maxChargeAmp,
        max_dchg_current: formData.maxDischargeAmp,
        cell_nominal_voltage: formData.cellNominalVoltage,
        high_sys_temp_limit: formData.systemUpperTemp,
        low_sys_temp_limit: formData.systemLowerTemp,
        can_id: formData.canId,
        parallel_cell_cnt: formData.parallelCellCount,
        pack_nominal_resistance: formData.packResistance,
        cell_avail_cycle: formData.cellCycleCount,
        pack_init_price: formData.packPrice,
        fuel_efficiency: Number(formData.firmwareVersion)
      };

      if (mode === 'create') {
        await storeBatteryModelCreate(modelData, trans);
      } else {
        await storeBatteryModelEdit({ ...modelData, id: formData.id }, trans);
      }

      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving battery model:', error);
    }
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

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-[1400px] max-h-[900px] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg text-white">신규 등록</h2>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6">
            <div className="py-2 px-4">
              <h2 className="text-lg text-white">필수 입력 정보</h2>
            </div>

            <div className="grid grid-cols-6 gap-6 px-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">모델그룹 종류</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="modelGroup"
                    value={formData.modelGroup}
                    onChange={handleChange}
                    className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                    required
                  />
                  <button
                    type="button"
                    className="h-9 px-4 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition-colors flex items-center justify-center whitespace-nowrap"
                    onClick={() => setIsModelNameSearchOpen(true)}
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
                  className="w-full h-9 px-4 bg-hw-dark-1 rounded text-white"
                  required
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
                    required
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
                    required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-600 mt-4"></div>

            {/* CustomState 부분 제거 */}
            {/* <div className="py-2 px-4">
              <h2 className="text-lg text-white">커스텀 데이터 정의</h2>
            </div>

            {[1, 2, 3, 4, 5].map(section => renderCustomSection(section as 1 | 2 | 3 | 4 | 5))} */}
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
        {isDeviceTypeSearchOpen && (
          <DeviceTypeSearchPopup
            isOpen={isDeviceTypeSearchOpen}
            onClose={() => setIsDeviceTypeSearchOpen(false)}
            onSelect={(deviceType) => {
              setFormData(prev => ({
                ...prev,
                category: deviceType.name,
                categoryId: deviceType.id
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
                cellType: cellType.name,
                cellTypeId: cellType.id
              }));
              setIsCellTypeSearchOpen(false);
            }}
          />
        )}

        {isModelNameSearchOpen && (
          <ModelGroupSearchPopup
            isOpen={isModelNameSearchOpen}
            onClose={() => setIsModelNameSearchOpen(false)}
            onSelect={(model) => {
              setFormData(prev => ({
                ...prev,
                modelGroup: model.name,
                modelGroupId: model.id
              }));
              setIsModelNameSearchOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
} 