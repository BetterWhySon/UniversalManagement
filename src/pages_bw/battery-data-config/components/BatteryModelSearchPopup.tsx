import React, { useState, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import { TableColumn } from '@/types/table.type';
import { useTranslation } from 'react-i18next';
import useAdmBetteryModel from '@/api/admin/admBetteryModel';
import { typeAdmBatteryModelList } from '@/api/types/admin/typeAdmBetteryModel';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (model: typeAdmBatteryModelList) => void;
}

export default function BatteryModelSearchPopup({ isOpen, onClose, onSelect }: Props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { t: trans } = useTranslation('translation');
  const { dataListBatteryModel, storeBatteryModelList } = useAdmBetteryModel();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 표시할 아이템 수

  // 컴포넌트 마운트 시 배터리 모델 목록 조회
  useEffect(() => {
    storeBatteryModelList(trans);
  }, []);

  const columns: TableColumn<typeAdmBatteryModelList>[] = [
    {
      name: '모델명',
      dataIndex: 'model_name',
      align: TEXT_ALIGN.CENTER,
      render: (row: typeAdmBatteryModelList) => (
        <span className="text-yellow-400">{row.model_name}</span>
      )
    },
    {
      name: '제조사',
      dataIndex: 'pack_manufacturer_name',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: '기기종류',
      dataIndex: 'device_type_name',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: '셀종류',
      dataIndex: 'cell_type_name',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: '용량(Ah)',
      dataIndex: 'pack_nominal_capacity',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: '전압(V)',
      dataIndex: 'pack_nominal_voltage',
      align: TEXT_ALIGN.CENTER,
    }
  ];

  const filteredModels = dataListBatteryModel?.filter(model => 
    model.model_name?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    model.pack_manufacturer_name?.toLowerCase().includes(searchKeyword.toLowerCase())
  ) || [];

  // 페이지네이션을 위한 데이터 슬라이싱
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredModels.slice(indexOfFirstItem, indexOfLastItem);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-[1000px] max-h-[800px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white">배터리 모델 선택</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="모델명 또는 제조사 입력"
            className="w-full px-4 py-2 bg-hw-dark-1 text-white border border-hw-gray-7 rounded"
          />
        </div>

        <div className="flex-1 overflow-auto">
          <TableData<typeAdmBatteryModelList>
            data={filteredModels}
            columns={columns}
            onClick={(row) => {
              onSelect(row);
              onClose();
            }}
            className="cursor-pointer hover:bg-hw-dark-1"
            isPagination
            pagination={{
              total: filteredModels.length,
              pageSize: itemsPerPage
            }}
            paginationMarginTop="32px"
            emptyMessage={trans('데이터가 없습니다.')}
          />
        </div>

        <div className="flex justify-end mt-4 pt-4 border-t border-hw-gray-7">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-hw-dark-1 text-white rounded hover:bg-hw-dark-3"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
} 