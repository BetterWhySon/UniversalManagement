import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import BatteryModelRegistrationPopup from './components/BatteryModelRegistrationPopup';
import { cn } from '@/helpers/class-name.helper';
import useAdmBetteryModel from '@/api/admin/admBetteryModel';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';

interface BatteryModelData {
  id: number;
  manufacturer: string;    // 제조업체명
  modelGroup: string;        // 추가
  modelName: string;       // 모델명
  category: string;        // 기기종류
  cellType: string;        // 셀 종류
  cellCount: number;       // 직렬 셀개수
  parallelCount: number;   // 온도 개수
  systemCount: number;     // 추가
  capacity: number;        // 팩 공칭용량(Ah)
  voltage: number;         // 팩 공칭 전압(V)
  
  dataTime?: number;        // 데이터 입력주기(s)
  cellUpperVoltage: number;  // 추가
  cellLowerVoltage: number;  // 추가
  batteryUpperTemp: number;  // 추가
  batteryLowerTemp: number;  // 추가
  registrationDate: number; // 등록일자
  maxChargeAmp: number;
  maxDischargeAmp: number;
  cellNominalVoltage: number;
  // 선택 입력 정보 
  systemUpperTemp: number;
  systemLowerTemp: number;
  parallelCellCount: number;
  packResistance: number;
  cellCycleCount: number;
  packPrice: number;
  firmwareVersion: string;
  canId: number;
  // 데이터 유무  
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
  // 커스텀 데이터
  customDataDefinitions: any[];
  manufacturerId: number;
  modelGroupId: number;
  categoryId: number;
  cellTypeId: number;
}

export default function BatteryModelPage() {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [viewMode, setViewMode] = useState<'summary' | 'detail'>('summary');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [editData, setEditData] = useState<BatteryModelData | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BatteryModelData | null>(null);
  
  const { dataListBatteryModel, storeBatteryModelList, storeBatteryModelDelete } = useAdmBetteryModel();

  // 컴포넌트 마운트 시 리스트 조회
  useEffect(() => {
    storeBatteryModelList(trans);
  }, []);

  const handleSave = async (formData: BatteryModelData) => {
    // 저장 후 리스트 갱신
    await storeBatteryModelList(trans);
    setIsRegistrationPopupOpen(false);
    setEditData(null);
  };

  const getFilteredData = useMemo(() => {
    if (!dataListBatteryModel) return [];
    
    return dataListBatteryModel.map(item => ({
      id: item.id,
      manufacturer: item.pack_manufacturer_name || '',
      manufacturerId: Number(item.pack_manufacturer || 0),
      modelGroup: item.model_group_name || '',
      modelGroupId: Number(item.model_group || 0),
      modelName: item.model_name || '',
      category: item.device_type_name || '',
      categoryId: Number(item.device_type || 0),
      cellType: item.cell_type_name || '',
      cellTypeId: Number(item.cell_type || 0),
      cellCount: item.series_cell_cnt || 0,
      parallelCount: item.batt_temp_cnt || 0,
      systemCount: item.sys_temp_cnt || 0,
      capacity: item.pack_nominal_capacity || 0,
      voltage: item.pack_nominal_voltage || 0,
      cellUpperVoltage: item.high_cell_v_limit || 0,
      cellLowerVoltage: item.low_cell_v_limit || 0,
      batteryUpperTemp: item.high_batt_temp_limit || 0,
      batteryLowerTemp: item.low_batt_temp_limit || 0,
      maxChargeAmp: item.max_chg_current || 0,
      maxDischargeAmp: item.max_dchg_current || 0,
      cellNominalVoltage: item.cell_nominal_voltage || 0,
      systemUpperTemp: item.high_sys_temp_limit || 0,
      systemLowerTemp: item.low_sys_temp_limit || 0,
      parallelCellCount: item.parallel_cell_cnt || 0,
      packResistance: item.pack_nominal_resistance || 0,
      cellCycleCount: item.cell_avail_cycle || 0,
      packPrice: item.pack_init_price || 0,
      firmwareVersion: String(item.fuel_efficiency || ''),  // 공정 연비 매핑 추가
      canId: item.can_id || 0,
      dataTime: 0,
      registrationDate: new Date().getTime(),
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
    })).filter(item => 
      item.modelName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [dataListBatteryModel, searchKeyword]);

  // 더미 데이터
//   const dummyData: BatteryModelData[] = [
//     { id: 1, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-105', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 105, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: new Date('2020-05-04').getTime(), maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 2, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-220', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 220, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: new Date('2022-05-04').getTime(), maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 1, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-105', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 105, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2020.5.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 2, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-220', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 220, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.5.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 3, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-230', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 230, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.5.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 4, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-280', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 280, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2020.5.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 5, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-560', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 560, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2020.5.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 6, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-1010', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 1010, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2021.5.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 7, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-1050', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 1050, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2021.5.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 8, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-1150', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 1150, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2021.5.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 9, manufacturer: 'FF캠핑카', modelGroup: '', modelName: 'FR-1200', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 1200, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.5.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 10, manufacturer: '신일운수', modelGroup: '', modelName: 'SL-100', category: '전동스쿠터', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 100, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.6.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 11, manufacturer: '신일운수', modelGroup: '', modelName: 'SL-150', category: '전동스쿠터', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 150, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.6.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 12, manufacturer: '신일운수', modelGroup: '', modelName: 'SL-200', category: '전동스쿠터', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 200, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.6.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 13, manufacturer: '캠핑콜', modelGroup: '', modelName: 'CC-300', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 300, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.7.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 14, manufacturer: '캠핑콜', modelGroup: '', modelName: 'CC-400', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 400, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.7.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 15, manufacturer: '캠핑콜', modelGroup: '', modelName: 'CC-500', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 500, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.7.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 16, manufacturer: '케이원캠핑', modelGroup: '', modelName: 'K1-100', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 100, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.8.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 17, manufacturer: '케이원캠핑', modelGroup: '', modelName: 'K1-200', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 200, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.8.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 18, manufacturer: '케이원캠핑', modelGroup: '', modelName: 'K1-300', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 300, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.8.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 19, manufacturer: '유니캠프', modelGroup: '', modelName: 'UC-150', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 150, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.9.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 20, manufacturer: '유니캠프', modelGroup: '', modelName: 'UC-250', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 250, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.9.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 21, manufacturer: '유니캠프', modelGroup: '', modelName: 'UC-350', category: '캠핑카', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 350, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.9.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 22, manufacturer: '배터와이', modelGroup: '', modelName: 'BW-100', category: '드론', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 100, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.10.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 23, manufacturer: '배터와이', modelGroup: '', modelName: 'BW-200', category: '드론', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 200, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.10.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 24, manufacturer: '배터와이', modelGroup: '', modelName: 'BW-300', category: '드론', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 300, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.10.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 25, manufacturer: '배터와이', modelGroup: '', modelName: 'BW-400', category: '드론', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 400, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.10.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 26, manufacturer: '배터와이', modelGroup: '', modelName: 'BW-500', category: '드론', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 500, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.10.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 27, manufacturer: '배터와이', modelGroup: '', modelName: 'BW-600', category: '드론', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 600, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.10.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 28, manufacturer: '배터와이', modelGroup: '', modelName: 'BW-700', category: '드론', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 700, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.10.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 29, manufacturer: '배터와이', modelGroup: '', modelName: 'BW-800', category: '드론', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 800, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.10.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 },
//     { id: 30, manufacturer: '배터와이', modelGroup: '', modelName: 'BW-900', category: '드론', cellType: 'LFP', cellCount: 4, parallelCount: 2, systemCount: 2, capacity: 900, voltage: 12.8, dataTime: 0.5, cellUpperVoltage: 13.2, cellLowerVoltage: 12.4, batteryUpperTemp: 40, batteryLowerTemp: 20, registrationDate: '2022.10.4', maxChargeAmp: 0, maxDischargeAmp: 0, cellNominalVoltage: 0, systemUpperTemp: 0, systemLowerTemp: 0, parallelCellCount: 0, packResistance: 0, cellCycleCount: 0, packPrice: 0, firmwareVersion: '', canId: 0, customDataDefinitions: [], dataExists: { cellV: false, current: false, battTemp: false, sysTemp: false, soc: false, sac: false, seperatedSac: false, packV: false, soh: false, saac: false, speed: false, mileage: false, evState: false, accPedalLoc: false, subBattVolt: false, breakState: false, shiftState: false, outsideTemp: false, fuelState: false, chgState: false, dispSoc: false }, manufacturerId: 0, modelGroupId: 0, categoryId: 0, cellTypeId: 0 }
//   ];

  const columns = useMemo(() => {
    // 기본 컬럼 스타일
    const columnStyle = {
      align: TEXT_ALIGN.CENTER,
      paddingInline: '16px'
    };

    // dataExists 컬럼들의 공통 스타일
    const dataExistsStyle = {
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      paddingInline: '8px'
    };

    const summaryColumns = [
      {
        name: '제조업체명',
        dataIndex: 'manufacturer',
        ...columnStyle,
        fixedWidth: '120px',
        render: (row: BatteryModelData) => (
          <span className="text-yellow-400">{row.manufacturer ?? '-'}</span>
        )
      },
      {
        name: '모델명',
        dataIndex: 'modelName',
        ...columnStyle,
        fixedWidth: '100px',
        render: (row: BatteryModelData) => <span>{row.modelName ?? '-'}</span>
      },
      {
        name: '기기종류',
        dataIndex: 'category',
        ...columnStyle,
        fixedWidth: '100px',
        render: (row: BatteryModelData) => <span>{row.category ?? '-'}</span>
      },
      {
        name: '셀 종류',
        dataIndex: 'cellType',
        ...columnStyle,
        fixedWidth: '100px',
        render: (row: BatteryModelData) => <span>{row.cellType ?? '-'}</span>
      },
      {
        name: '직렬 셀개수',
        dataIndex: 'cellCount',
        ...columnStyle,
        fixedWidth: '100px',
        render: (row: BatteryModelData) => <span>{row.cellCount !== null && row.cellCount !== undefined ? row.cellCount : '-'}</span>
      },
      {
        name: '온도 개수',
        dataIndex: 'parallelCount',
        ...columnStyle,
        fixedWidth: '100px',
        render: (row: BatteryModelData) => <span>{row.parallelCount !== null && row.parallelCount !== undefined ? row.parallelCount : '-'}</span>
      },
      {
        name: '팩 공칭용량(Ah)',
        dataIndex: 'capacity',
        ...columnStyle,
        fixedWidth: '130px',
        render: (row: BatteryModelData) => <span>{row.capacity !== null && row.capacity !== undefined ? row.capacity : '-'}</span>
      },
      {
        name: '팩 공칭 전압(V)',
        dataIndex: 'voltage',
        ...columnStyle,
        fixedWidth: '130px',
        render: (row: BatteryModelData) => <span>{row.voltage !== null && row.voltage !== undefined ? row.voltage : '-'}</span>
      },
      {
        name: '데이터 입력주기(s)',
        dataIndex: 'dataTime',
        ...columnStyle,
        fixedWidth: '140px',
        render: (row: BatteryModelData) => <span>{row.dataTime ?? '-'}</span>
      },
      {
        name: '등록일자',
        dataIndex: 'registrationDate',
        ...columnStyle,
        fixedWidth: '100px',
        render: (row: BatteryModelData) => <span>{row.registrationDate ?? '-'}</span>
      },
      {
        name: '수정',  // 수정/삭제에서 수정으로 변경
        dataIndex: 'actions',
        align: TEXT_ALIGN.CENTER,
        width: '100px',
        fixed: 'right' as const,
        className: 'bg-transparent',
        style: { 
            position: 'sticky' as const,
            right: 0, 
            backgroundColor: '#2A2F3A', 
            zIndex: 2,
            boxShadow: '-4px 0 8px rgba(0,0,0,0.2)'
        },
        render: (row: BatteryModelData) => (
            <div className="flex items-center justify-center gap-2 h-full">
                <button
                    className="w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                    onClick={() => handleEdit(row)}
                >
                    <svg 
                        className="w-5 h-5 text-white"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 22 22"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                        />
                    </svg>
                </button>
            </div>
        )
      }
    ];

    const detailColumns = [
      // 필수 입력 정보
      { name: '제조업체명', dataIndex: 'manufacturer', ...columnStyle, fixedWidth: '120px' },
      { name: '모델명', dataIndex: 'modelName', ...columnStyle, fixedWidth: '100px' },
      { name: '기기종류', dataIndex: 'category', ...columnStyle, fixedWidth: '100px' },
      { name: '셀 종류', dataIndex: 'cellType', ...columnStyle, fixedWidth: '100px' },
      { name: '직렬 셀개수', dataIndex: 'cellCount', ...columnStyle, fixedWidth: '100px' },
      { name: '온도 개수', dataIndex: 'parallelCount', ...columnStyle, fixedWidth: '100px' },
      { name: '시스템 개수', dataIndex: 'systemCount', ...columnStyle, fixedWidth: '100px' },
      { name: '팩 공칭용량(Ah)', dataIndex: 'capacity', ...columnStyle, fixedWidth: '130px' },
      { name: '팩 공칭 전압(V)', dataIndex: 'voltage', ...columnStyle, fixedWidth: '130px' },
      { name: '데이터 입력주기(s)', dataIndex: 'dataTime', ...columnStyle, fixedWidth: '140px' },
      { name: '셀 상한 전압', dataIndex: 'cellUpperVoltage', ...columnStyle, fixedWidth: '110px' },
      { name: '셀 하한 전압', dataIndex: 'cellLowerVoltage', ...columnStyle, fixedWidth: '110px', render: (row: BatteryModelData) => <span>{row.cellLowerVoltage ?? '-'}</span> },
      { name: '배터리 상한 온도', dataIndex: 'batteryUpperTemp', ...columnStyle, fixedWidth: '130px' },
      { name: '배터리 하한 온도', dataIndex: 'batteryLowerTemp', ...columnStyle, fixedWidth: '130px' },
      { name: '최대 충전전류', dataIndex: 'maxChargeAmp', ...columnStyle, fixedWidth: '110px' },
      { name: '최대 방전전류', dataIndex: 'maxDischargeAmp', ...columnStyle, fixedWidth: '110px' },
      { name: '셀 공칭 전압', dataIndex: 'cellNominalVoltage', ...columnStyle, fixedWidth: '110px' },
      // 선택 입력 정보
      { name: '시스템 상한 온도', dataIndex: 'systemUpperTemp', ...columnStyle, fixedWidth: '130px' },
      { name: '시스템 하한 온도', dataIndex: 'systemLowerTemp', ...columnStyle, fixedWidth: '130px' },
      { name: '병렬 셀 개수', dataIndex: 'parallelCellCount', ...columnStyle, fixedWidth: '110px' },
      { name: '팩 공칭 저항', dataIndex: 'packResistance', ...columnStyle, fixedWidth: '110px' },
      { name: '셀 가용 싸이클 수', dataIndex: 'cellCycleCount', ...columnStyle, fixedWidth: '130px' },
      { name: '팩 출고가', dataIndex: 'packPrice', ...columnStyle, fixedWidth: '100px' },
      { name: '공정 연비', dataIndex: 'firmwareVersion', ...columnStyle, fixedWidth: '100px' },
      { name: 'Can ID', dataIndex: 'canId', ...columnStyle, fixedWidth: '80px' },
      { name: '등록일자', dataIndex: 'registrationDate', ...columnStyle, fixedWidth: '100px' },
      
      // dataExists 컬럼들
      {
        name: 'cell_v',
        dataIndex: 'dataExists.cellV',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.cellV;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'current',
        dataIndex: 'dataExists.current',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.current;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'batt_temp',
        dataIndex: 'dataExists.battTemp',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.battTemp;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'sys_temp',
        dataIndex: 'dataExists.sysTemp',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.sysTemp;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'soc',
        dataIndex: 'dataExists.soc',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.soc;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'sac',
        dataIndex: 'dataExists.sac',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.sac;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'seperated_sac',
        dataIndex: 'dataExists.seperatedSac',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.seperatedSac;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'pack_v',
        dataIndex: 'dataExists.packV',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.packV;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'soh',
        dataIndex: 'dataExists.soh',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.soh;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'saac',
        dataIndex: 'dataExists.saac',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.saac;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'speed',
        dataIndex: 'dataExists.speed',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.speed;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'mileage',
        dataIndex: 'dataExists.mileage',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.mileage;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'ev_state',
        dataIndex: 'dataExists.evState',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.evState;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'acc_pedal_loc',
        dataIndex: 'dataExists.accPedalLoc',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.accPedalLoc;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'sub_batt_volt',
        dataIndex: 'dataExists.subBattVolt',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.subBattVolt;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'break_state',
        dataIndex: 'dataExists.breakState',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.breakState;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'shift_state',
        dataIndex: 'dataExists.shiftState',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.shiftState;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'outside_temp',
        dataIndex: 'dataExists.outsideTemp',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.outsideTemp;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'fuel_state',
        dataIndex: 'dataExists.fuelState',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.fuelState;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'chg_state',
        dataIndex: 'dataExists.chgState',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.chgState;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: 'disp_soc',
        dataIndex: 'dataExists.dispSoc',
        ...dataExistsStyle,
        render: (row: BatteryModelData) => {
          const value = row.dataExists?.dispSoc;
          return <span>{value === undefined || value === null ? '-' : value ? 'O' : 'X'}</span>;
        }
      },
      {
        name: '수정',  // 수정/삭제에서 수정으로 변경
        dataIndex: 'actions',
        align: TEXT_ALIGN.CENTER,
        width: '100px',
        fixed: 'right' as const,
        className: 'bg-transparent',
        style: { 
            position: 'sticky' as const,
            right: 0, 
            backgroundColor: '#2A2F3A', 
            zIndex: 2,
            boxShadow: '-4px 0 8px rgba(0,0,0,0.2)'
        },
        render: (row: BatteryModelData) => (
            <div className="flex items-center justify-center gap-2 h-full">
                <button
                    className="w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                    onClick={() => handleEdit(row)}
                >
                    <svg 
                        className="w-5 h-5 text-white"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 22 22"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                        />
                    </svg>
                </button>
            </div>
        )
      }
    ];

    return viewMode === 'summary' ? summaryColumns : detailColumns;
  }, [viewMode]);

  const handleEdit = (row: BatteryModelData) => {
    setEditData({
      ...row,
      manufacturerId: Number(row.manufacturerId),  // manufacturerId 사용
      modelGroupId: Number(row.modelGroupId),      // modelGroupId 사용
      categoryId: Number(row.categoryId),          // categoryId 사용
      cellTypeId: Number(row.cellTypeId),         // cellTypeId 사용
      // 누락된 필드들 추가
      maxChargeAmp: row.maxChargeAmp || 0,
      maxDischargeAmp: row.maxDischargeAmp || 0, 
      cellNominalVoltage: row.cellNominalVoltage || 0,
      systemUpperTemp: row.systemUpperTemp || 0,
      systemLowerTemp: row.systemLowerTemp || 0,
      parallelCellCount: row.parallelCellCount || 0,
      packResistance: row.packResistance || 0,
      cellCycleCount: row.cellCycleCount || 0,
      packPrice: row.packPrice || 0,
      firmwareVersion: row.firmwareVersion || '',  // 공정 연비 추가
      canId: row.canId || 0,
      customDataDefinitions: row.customDataDefinitions || [],
      dataExists: row.dataExists || { 
        cellV: false, 
        current: false, 
        // ... 나머지 기본값
      }
    });
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: BatteryModelData) => {
    setDeleteTarget(row);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await storeBatteryModelDelete(deleteTarget.id, trans);
      await storeBatteryModelList(trans); // 리스트 갱신
      setIsDeletePopupOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error('Error deleting battery model:', error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            배터리(모빌리티) 제원
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 py-3 px-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center gap-6'>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="viewMode"
                    value="summary"
                    checked={viewMode === 'summary'}
                    onChange={(e) => setViewMode(e.target.value as 'summary' | 'detail')}
                    className="accent-blue-500"
                  />
                  <span className="text-sm">요약보기</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="viewMode"
                    value="detail"
                    checked={viewMode === 'detail'}
                    onChange={(e) => setViewMode(e.target.value as 'summary' | 'detail')}
                    className="accent-blue-500"
                  />
                  <span className="text-sm">상세보기</span>
                </label>
              </div>
              <div className='flex items-center'>
                <input 
                  type="text" 
                  className="h-8 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[200px]"
                  placeholder="검색어를 입력하세요"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button 
                className='h-8 px-4 rounded-lg bg-blue-500 flex gap-2 items-center justify-center'
                onClick={() => setIsRegistrationPopupOpen(true)}
              >
                <span className='text-hw-white-1 font-light text-sm leading-[125%] whitespace-nowrap'>
                  {trans('신규 등록')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <div className='relative'>
            <div className='overflow-x-auto'>
              <div className="relative">
                <TableData<BatteryModelData>
                  data={getFilteredData}
                  columns={[
                    ...columns.slice(0, -1),
                    {
                      ...columns[columns.length - 1],
                      fixed: 'right',
                      fixedWidth: '100px',
                      style: { 
                        position: 'sticky' as const,  // position 타입 명시
                        right: 0, 
                        backgroundColor: '#2A2F3A', 
                        zIndex: 2,
                        boxShadow: '-4px 0 8px rgba(0,0,0,0.2)'
                      }
                    }
                  ]}
                  isPagination
                  pagination={{
                    total: getFilteredData.length,
                    pageSize: 16,
                  }}
                  paginationMarginTop='32px'
                  emptyMessage={trans('데이터가 없습니다.')}
                  className="min-w-[1400px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 구현 */}
        </div>
      </div>

      {isRegistrationPopupOpen && (
        <BatteryModelRegistrationPopup
          onClose={() => {
            setIsRegistrationPopupOpen(false);
            setEditData(null);
          }}
          onSave={handleSave}
          initialData={editData || undefined}
          mode={editData ? 'edit' : 'create'}
        />
      )}

      {isDeletePopupOpen && deleteTarget && (
        <DeleteConfirmPopup
          title="배터리 모델 삭제"
          message={`"${deleteTarget.modelName}" 모델을 삭제하시겠습니까?`}
          onClose={() => {
            setIsDeletePopupOpen(false);
            setDeleteTarget(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
} 