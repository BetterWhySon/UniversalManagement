import React, { useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import CellTypeAddPopup from './CellTypeAddPopup';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';

export interface CellTypeData {
  id: number;
  name: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cellType: CellTypeData) => void;
}

export default function CellTypeSearchPopup({ isOpen, onClose, onSelect }: Props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editData, setEditData] = useState<CellTypeData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CellTypeData | null>(null);
  const [cellTypes, setCellTypes] = useState<CellTypeData[]>([
    { id: 1, name: 'NCM(energy)', description: '리튬 니켈 코발트 망간 산화물- 에너지' },
    { id: 2, name: 'NCM(power)', description: '리튬 니켈 코발트 망간 산화물- 파워' },
    { id: 3, name: 'NCM-polymer', description: '리튬 니켈 코발트 망간 산화물- 폴리머' },
    { id: 4, name: 'LFP', description: '리튬 인산철' },
    { id: 5, name: 'LCO', description: '리튬 코발트 산화물' },
    { id: 6, name: 'LMO', description: '리튬 망간 산화물' },
    { id: 7, name: 'NCA', description: '리튬 니켈 코발트 알루미늄 산화물' },
    { id: 8, name: 'LTO', description: '리튬 티타네이트' },
  ]);

  const handleAdd = (name: string, description: string) => {
    const newCellType = {
      id: cellTypes.length + 1,
      name,
      description
    };
    setCellTypes([...cellTypes, newCellType]);
  };

  const handleEdit = (cellType: CellTypeData) => {
    setEditData(cellType);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (cellType: CellTypeData) => {
    setDeleteTarget(cellType);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setCellTypes(prev => prev.filter(item => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const filteredCellTypes = cellTypes.filter(
    (cellType) =>
      cellType.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      cellType.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const columns = [
    {
      name: '셀 종류',
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
      fixedWidth: '150px',
      render: (row: CellTypeData) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="p-1 hover:bg-white/10 rounded"
          >
            <svg 
              className="w-5 h-5 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
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
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
            className="p-1 hover:bg-white/10 rounded"
          >
            <svg 
              className="w-5 h-5 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-[800px] h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white">셀 종류 선택</h2>
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
            placeholder="셀 종류 입력"
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
              data={filteredCellTypes}
              columns={columns}
              onClick={(row) => onSelect(row as CellTypeData)}
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

        <CellTypeAddPopup
          isOpen={isAddPopupOpen || isEditPopupOpen}
          onClose={() => {
            setIsAddPopupOpen(false);
            setIsEditPopupOpen(false);
            setEditData(null);
          }}
          onAdd={(name, description) => {
            if (editData) {
              // 수정 모드
              setCellTypes(prev => prev.map(item => 
                item.id === editData.id ? { ...item, name, description } : item
              ));
              setEditData(null);
              setIsEditPopupOpen(false);
            } else {
              // 추가 모드
              handleAdd(name, description);
              setIsAddPopupOpen(false);
            }
          }}
          initialData={editData || undefined}
          mode={isEditPopupOpen ? 'edit' : 'create'}
        />

        {deleteTarget && (
          <DeleteConfirmPopup
            title="셀 종류 삭제"
            message="해당 셀 종류를 삭제하시겠습니까?"
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
} 