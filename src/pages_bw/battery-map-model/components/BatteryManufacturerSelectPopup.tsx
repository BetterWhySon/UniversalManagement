import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import useAdmBetteryModel from '@/api/admin/admBetteryModel';
import { typeAdmBatteryModelList } from '@/api/types/admin/typeAdmBetteryModel';
import useCustomerId from '@/hooks/useCustomerId';
import BatteryModelRegistrationPopup from '@/pages_bw/battery-model/components/BatteryModelRegistrationPopup';

interface Props {
  onClose: () => void;
  onSelect: (data: { id: string; name: string }) => void;
}

export default function BatteryManufacturerSelectPopup({ onClose, onSelect }: Props) {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { dataListBatteryModel, storeBatteryModelList } = useAdmBetteryModel();
  const customerId = useCustomerId();
  const [selectedModel, setSelectedModel] = useState<typeAdmBatteryModelList | null>(null);

  useEffect(() => {
    storeBatteryModelList(trans, customerId);
  }, [storeBatteryModelList, trans, customerId]);

  const filteredData = (dataListBatteryModel || []).filter(item =>
    item.model_name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleRowClick = (row: typeAdmBatteryModelList) => {
    onSelect({ id: row.id.toString(), name: row.model_name });
  };

  const handleModelNameClick = (e: React.MouseEvent, row: typeAdmBatteryModelList) => {
    e.stopPropagation();
    setSelectedModel(row);
  };

  const columns = [
    {
      name: '번호',
      dataIndex: 'id',
      align: TEXT_ALIGN.CENTER,
      width: '80px'
    },
    {
      name: '제원명',
      dataIndex: 'model_name',
      align: TEXT_ALIGN.CENTER,
      width: '150px',
      render: (row: typeAdmBatteryModelList) => (
        <button
          onClick={(e) => handleModelNameClick(e, row)}
          className="text-blue-400 hover:text-blue-300"
        >
          {row.model_name}
        </button>
      )
    },
    {
      name: '기기 종류',
      dataIndex: 'device_type_name',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '셀 종류',
      dataIndex: 'cell_type_name',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '팩 공칭 전압',
      dataIndex: 'pack_nominal_voltage',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '공칭 용량',
      dataIndex: 'pack_nominal_capacity',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '등록일자',
      dataIndex: 'registration_date',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmBatteryModelList) => {
        if (!row.registration_date) return '-';
        const date = new Date(row.registration_date);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
      }
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-full max-w-[1000px] max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-white">
            {trans('배터리(모빌리티) 제원 선택')}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder={trans('제원명 검색')}
            className="w-[240px] h-[38px] px-3 bg-hw-dark-1 border border-hw-dark-4 rounded text-white placeholder-gray-500 focus:outline-none focus:border-hw-dark-5"
          />
        </div>

        <TableData
          data={filteredData}
          columns={columns}
          isPagination
          pagination={{
            total: filteredData.length,
            pageSize: 10,
          }}
          emptyMessage={trans('데이터가 없습니다.')}
          onClick={(row: typeAdmBatteryModelList) => handleRowClick(row)}
          className="cursor-pointer hover:bg-hw-dark-4"
        />

        {selectedModel && (
          <BatteryModelRegistrationPopup
            onClose={() => setSelectedModel(null)}
            onSave={async () => {}}
            initialData={{
              id: selectedModel.id,
              manufacturer: selectedModel.pack_manufacturer_name || '',
              manufacturerId: selectedModel.pack_manufacturer,
              modelGroup: selectedModel.model_group_name || '',
              modelGroupId: selectedModel.model_group,
              modelName: selectedModel.model_name,
              category: selectedModel.device_type_name || '',
              categoryId: selectedModel.device_type,
              cellType: selectedModel.cell_type_name || '',
              cellTypeId: selectedModel.cell_type,
              cellCount: selectedModel.series_cell_cnt,
              parallelCount: selectedModel.batt_temp_cnt,
              systemCount: selectedModel.sys_temp_cnt,
              capacity: selectedModel.pack_nominal_capacity,
              voltage: selectedModel.pack_nominal_voltage,
              cellUpperVoltage: selectedModel.high_cell_v_limit,
              cellLowerVoltage: selectedModel.low_cell_v_limit,
              batteryUpperTemp: selectedModel.high_batt_temp_limit,
              batteryLowerTemp: selectedModel.low_batt_temp_limit,
              registrationDate: selectedModel.registration_date ? new Date(selectedModel.registration_date).getTime() : 0,
              maxChargeAmp: selectedModel.max_chg_current,
              maxDischargeAmp: selectedModel.max_dchg_current,
              cellNominalVoltage: selectedModel.cell_nominal_voltage,
              systemUpperTemp: selectedModel.high_sys_temp_limit,
              systemLowerTemp: selectedModel.low_sys_temp_limit,
              parallelCellCount: selectedModel.parallel_cell_cnt,
              packResistance: selectedModel.pack_nominal_resistance,
              cellCycleCount: selectedModel.cell_avail_cycle,
              packPrice: selectedModel.pack_init_price,
              firmwareVersion: selectedModel.fuel_efficiency?.toString() || '0',
              dataTime: 0,
              customDataDefinitions: []
            }}
            mode="view"
          />
        )}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-hw-dark-4 text-white rounded hover:bg-hw-dark-5 transition-colors"
          >
            {trans('닫기')}
          </button>
        </div>
      </div>
    </div>
  );
} 