import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import BatteryModelRegistrationPopup from './components/BatteryModelRegistrationPopup';
import { cn } from '@/helpers/class-name.helper';
import useAdmBetteryModel from '@/api/admin/admBetteryModel';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';
import useCustomerId from '@/hooks/useCustomerId';

interface CustomDataDefinition {
  id: string;
  name: string;
  unit: string;
  dataType: string;
  section: 1 | 2 | 3 | 4 | 5;
}

interface BatteryModelData {
  id: number;
  manufacturer: string;    // 제조업체명 (화면 표시용)
  manufacturerId: number;  // 제조업체 ID (서버 전송용)
  modelGroup: string;      // 모델그룹 종류
  modelGroupId: number;    // 모델그룹 ID
  modelName: string;       // 배터리 모델명
  category: string;       // 기기 종류
  categoryId: number;      // 기기 종류 ID
  cellType: string;       // 셀 종류
  cellTypeId: number;      // 셀 종류 ID
  cellCount: number;      // 직렬 셀개수
  parallelCount: number;  // 배터리 온도 개수
  systemCount: number;    // 시스템 온도 개수
  capacity: number;       // 팩 공칭 용량
  voltage: number;        // 팩 공칭 전압
  cellUpperVoltage: number;  // 셀 상한 전압
  cellLowerVoltage: number;  // 셀 하한 전압
  batteryUpperTemp: number;  // 배터리 상한 온도
  batteryLowerTemp: number;  // 배터리 하한 온도
  registrationDate: number; // 등록일자
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
  dataTime: number;       // 데이터 입력주기
  customDataDefinitions: CustomDataDefinition[];
}

type BatteryModelFormData = BatteryModelData;  // 동일한 타입으로 정의

export default function BatteryModelPage() {
  const { t: trans } = useTranslation('translation');
  const customerId = useCustomerId();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [viewMode, setViewMode] = useState<'summary' | 'detail'>('summary');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [editData, setEditData] = useState<BatteryModelData | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BatteryModelData | null>(null);
  
  const { dataListBatteryModel, storeBatteryModelList, storeBatteryModelDelete } = useAdmBetteryModel();

  // 컴포넌트 마운트 시 리스트 조회
  useEffect(() => {
    storeBatteryModelList(trans, customerId);
  }, [customerId]);

  const handleSave = async (formData: BatteryModelData) => {
    // 저장 후 리스트 갱신
    await storeBatteryModelList(trans, customerId);
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
      firmwareVersion: item.fuel_efficiency !== null && item.fuel_efficiency !== undefined ? String(item.fuel_efficiency) : '',  // 공정 연비 매핑 수정
      dataTime: 0,
      registrationDate: new Date().getTime(),
      customDataDefinitions: []
    })).filter(item => 
      item.modelName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [dataListBatteryModel, searchKeyword]);

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
        name: '제원명',
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
        fixedWidth: '120px',
        render: (row: BatteryModelData) => {
          if (!row.registrationDate) return '-';
          const date = new Date(row.registrationDate);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
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

    const detailColumns = [
      // 필수 입력 정보
      { name: '제조업체명', dataIndex: 'manufacturer', ...columnStyle, fixedWidth: '120px' },
      { name: '제원명', dataIndex: 'modelName', ...columnStyle, fixedWidth: '100px' },
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
      { name: '등록일자', dataIndex: 'registrationDate', ...columnStyle, fixedWidth: '120px' },
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
      customDataDefinitions: row.customDataDefinitions || []
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
      await storeBatteryModelList(trans, customerId); // 리스트 갱신
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
                    pageSize: 14,
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