import React, { useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import { TableColumn } from '@/types/table.type';
import DeviceTypeAddPopup from './DeviceTypeAddPopup';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';

export interface DeviceTypeData {
  id: number;
  name: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (deviceType: DeviceTypeData) => void;
}

export default function DeviceTypeSearchPopup({ isOpen, onClose, onSelect }: Props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [deviceTypes, setDeviceTypes] = useState<DeviceTypeData[]>([
    { id: 1, name: '캠핑카', description: '캠핑용 차량' },
    { id: 2, name: '전기차', description: '전기 자동차' },
    { id: 3, name: 'E-bike', description: '전기 자전거' },
    { id: 4, name: '골프카트', description: '골프장용 카트' },
    { id: 5, name: '내연차량', description: '내연기관 차량' },
    { id: 6, name: 'ESS', description: '에너지 저장 장치' },
  ]);
  const [editData, setEditData] = useState<DeviceTypeData | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeviceTypeData | null>(null);

  const handleEdit = (row: DeviceTypeData) => {
    setEditData(row);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (row: DeviceTypeData) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setDeviceTypes(prev => prev.filter(item => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const handleSubmit = (name: string, description: string, id?: number) => {
    if (id) {
      // 수정
      setDeviceTypes(prev => prev.map(item => 
        item.id === id ? { ...item, name, description } : item
      ));
    } else {
      // 추가
      const newDevice = {
        id: deviceTypes.length + 1,
        name,
        description
      };
      setDeviceTypes([...deviceTypes, newDevice]);
    }
  };

  const columns: TableColumn<DeviceTypeData>[] = [
    {
      name: '기종',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    },
    {
      name: '설명',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '250px',
    },
    {
      name: '수정/삭제',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: DeviceTypeData) => (
        <div className="flex items-center justify-center gap-2 h-full">
          <button 
            className="w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
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
          <button 
            className="w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        </div>
      )
    }
  ];

  const filteredDeviceTypes = deviceTypes.filter(d => 
    d.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    d.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-[800px] h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white">기기 종류 선택</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="기종명 입력"
            className="flex-1 px-4 py-2 bg-hw-dark-1 text-white border border-hw-gray-7 rounded"
          />
          <button
            onClick={() => setIsAddPopupOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            추가
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            <TableData
              data={filteredDeviceTypes}
              columns={columns}
              onClick={(row) => onSelect(row as DeviceTypeData)}
              maxHeight="none"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 pt-4 border-t border-hw-gray-7">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-hw-dark-1 text-white rounded hover:bg-hw-dark-3"
          >
            닫기
          </button>
        </div>

        <DeviceTypeAddPopup
          isOpen={isAddPopupOpen || isEditPopupOpen}
          onClose={() => {
            setIsAddPopupOpen(false);
            setIsEditPopupOpen(false);
            setEditData(null);
          }}
          onSubmit={handleSubmit}
          mode={isEditPopupOpen ? 'edit' : 'create'}
          initialData={editData || undefined}
        />

        {deleteTarget && (
          <DeleteConfirmPopup
            title="기기 종류 삭제"
            message="해당 기기 종류를 삭제하시겠습니까?"
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
} 