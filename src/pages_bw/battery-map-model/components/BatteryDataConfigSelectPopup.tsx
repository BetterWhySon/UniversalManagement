import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import useAdmBetteryDataConfig from '@/api/admin/admBetteryDataConfig';
import { typeAdmBetteryDataConfigList } from '@/api/types/admin/typeAdmBetteryDataConfig';
import useCustomerId from '@/hooks/useCustomerId';
import BatteryDataConfigRegistrationPopup from '@/pages_bw/battery-data-config/components/BatteryDataConfigRegistrationPopup';

interface Props {
  onClose: () => void;
  onSelect: (data: { id: string; name: string }) => void;
}

export default function BatteryDataConfigSelectPopup({ onClose, onSelect }: Props) {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { dataListBetteryDataConfig, storeBetteryDataConfigList } = useAdmBetteryDataConfig();
  const customerId = useCustomerId();
  const [selectedConfig, setSelectedConfig] = useState<typeAdmBetteryDataConfigList | null>(null);

  useEffect(() => {
    storeBetteryDataConfigList(trans, Number(customerId));
  }, [storeBetteryDataConfigList, trans, customerId]);

  const filteredData = (dataListBetteryDataConfig || []).filter(item =>
    item.device_name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleRowClick = (row: typeAdmBetteryDataConfigList) => {
    onSelect({ id: row.id.toString(), name: row.device_name });
  };

  const handleDeviceNameClick = (e: React.MouseEvent, row: typeAdmBetteryDataConfigList) => {
    e.stopPropagation();
    setSelectedConfig(row);
  };

  const columns = [
    {
      name: '번호',
      dataIndex: 'id',
      align: TEXT_ALIGN.CENTER,
      width: '80px'
    },
    {
      name: '표준데이터명',
      dataIndex: 'device_name',
      align: TEXT_ALIGN.CENTER,
      width: '150px',
      render: (row: typeAdmBetteryDataConfigList) => (
        <button
          onClick={(e) => handleDeviceNameClick(e, row)}
          className="text-blue-400 hover:text-blue-300"
        >
          {row.device_name}
        </button>
      )
    },
    {
      name: '셀 전압',
      dataIndex: 'cell',
      align: TEXT_ALIGN.CENTER,
      width: '100px',
      render: (row: typeAdmBetteryDataConfigList) => row.cell ? 'O' : 'X'
    },
    {
      name: '전류',
      dataIndex: 'current',
      align: TEXT_ALIGN.CENTER,
      width: '100px',
      render: (row: typeAdmBetteryDataConfigList) => row.current ? 'O' : 'X'
    },
    {
      name: '배터리 온도',
      dataIndex: 'batt_temp',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmBetteryDataConfigList) => row.batt_temp ? 'O' : 'X'
    },
    {
      name: '시스템온도',
      dataIndex: 'sys_temp',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmBetteryDataConfigList) => row.sys_temp ? 'O' : 'X'
    },
    {
      name: 'SOC',
      dataIndex: 'soc',
      align: TEXT_ALIGN.CENTER,
      width: '100px',
      render: (row: typeAdmBetteryDataConfigList) => row.soc ? 'O' : 'X'
    },
    {
      name: 'SOH',
      dataIndex: 'soh',
      align: TEXT_ALIGN.CENTER,
      width: '100px',
      render: (row: typeAdmBetteryDataConfigList) => row.soh ? 'O' : 'X'
    },
    {
      name: 'can_id',
      dataIndex: 'can_id',
      align: TEXT_ALIGN.CENTER,
      width: '100px',
      render: (row: typeAdmBetteryDataConfigList) => row.can_id || '-'
    },
    {
      name: '등록일자',
      dataIndex: 'registration_date',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmBetteryDataConfigList) => {
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
            {trans('표준 데이터 선택')}
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
            placeholder={trans('데이터명 검색')}
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
          onClick={(row: typeAdmBetteryDataConfigList) => handleRowClick(row)}
          className="cursor-pointer hover:bg-hw-dark-4"
        />

        {selectedConfig && (
          <BatteryDataConfigRegistrationPopup
            onClose={() => setSelectedConfig(null)}
            onSave={() => {}}
            initialData={selectedConfig}
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