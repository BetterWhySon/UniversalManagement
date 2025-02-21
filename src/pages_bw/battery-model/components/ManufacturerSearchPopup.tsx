import React, { useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import { TableColumn } from '@/types/table.type';

interface ManufacturerData {
  id: number;
  name: string;
  businessNumber: string;
  type: '제조업' | '서비스업';
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (manufacturer: ManufacturerData) => void;
}

export default function ManufacturerSearchPopup({ isOpen, onClose, onSelect }: Props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // 임시 데이터
  const manufacturers: ManufacturerData[] = [
    { id: 1, name: 'FF캠핑카', businessNumber: '656-41-31231', type: '제조업' },
    { id: 2, name: '신일은수', businessNumber: '754-41-1231', type: '서비스업' },
    { id: 3, name: '캠핑홈', businessNumber: '546-72-4412', type: '제조업' },
    { id: 4, name: '케이원캠핑', businessNumber: '456-81-8411', type: '서비스업' },
    { id: 5, name: '유니캠프', businessNumber: '951-74-1111', type: '서비스업' },
    { id: 6, name: '배터와이', businessNumber: '656-87-01711', type: '제조업' },
  ];

  const columns: TableColumn<ManufacturerData>[] = [
    {
      name: '회사명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: ManufacturerData) => (
        <span className="text-yellow-400">{row.name}</span>
      )
    },
    {
      name: '사업자번호',
      dataIndex: 'businessNumber',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    },
    {
      name: '업종',
      dataIndex: 'type',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
  ];

  const filteredManufacturers = manufacturers.filter(m => 
    m.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-[800px] max-h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white">제조 업체 선택</h2>
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
            placeholder="회사명 입력"
            className="w-full px-4 py-2 bg-hw-dark-1 text-white border border-hw-gray-7 rounded"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <TableData<ManufacturerData>
            data={filteredManufacturers}
            columns={columns}
            onClick={(row) => {
              onSelect(row);
              onClose();
            }}
            className="cursor-pointer hover:bg-hw-dark-1"
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