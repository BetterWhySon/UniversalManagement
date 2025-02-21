import React, { useState, useEffect, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import CellTypeAddPopup from './CellTypeAddPopup';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';
import useAdmBetteryModel from '@/api/admin/admBetteryModel';
import { typeAdmBetteryCellTypeList } from '@/api/types/admin/typeAdmBetteryModel';

interface CellTypeSearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cell: { id: number; name: string }) => void;
}

export default function CellTypeSearchPopup({ isOpen, onClose, onSelect }: CellTypeSearchPopupProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const { t: trans } = useTranslation('translation');
  const [editData, setEditData] = useState<{ id: number; name: string; description: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const { dataListBetteryCellType, storeBetteryCellTypeList, storeBetteryCellTypeDelete } = useAdmBetteryModel();

  useEffect(() => {
    storeBetteryCellTypeList(trans);
  }, []);

  const columns = [
    {
      name: '셀 종류',
      dataIndex: 'cell_name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px',
      render: (row: typeAdmBetteryCellTypeList) => (
        <span className="text-yellow-400">{row.cell_name}</span>
      )
    },
    {
      name: '설명',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '300px'
    },
    {
      name: '수정/삭제',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: typeAdmBetteryCellTypeList) => (
        <div className="flex items-center justify-center gap-2">
          <button 
            className="w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setEditData({ id: row.id, name: row.cell_name, description: row.description });
              setIsAddPopupOpen(true);
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
              handleDelete({ id: row.id, name: row.cell_name });
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

  const getFilteredData = useMemo(() => {
    if (!dataListBetteryCellType) return [];
    return dataListBetteryCellType.filter(cell => 
      (cell.cell_name?.toLowerCase() || '').includes(searchKeyword.toLowerCase()) ||
      (cell.description?.toLowerCase() || '').includes(searchKeyword.toLowerCase())
    );
  }, [dataListBetteryCellType, searchKeyword]);

  const handleAddSubmit = () => {
    storeBetteryCellTypeList(trans);
  };

  const handleDelete = (row: { id: number; name: string }) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await storeBetteryCellTypeDelete(deleteTarget.id, trans);
      setDeleteTarget(null);
      storeBetteryCellTypeList(trans);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-[800px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white">셀 종류 선택</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">검색</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="h-9 px-4 bg-hw-dark-1 text-white border border-hw-gray-7 rounded flex-1"
                placeholder="셀 종류나 설명을 입력하세요"
              />
              <button
                type="button"
                className="h-9 px-4 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 whitespace-nowrap"
                onClick={() => setIsAddPopupOpen(true)}
              >
                추가
              </button>
            </div>
          </div>

          <div className="max-h-[400px] overflow-auto">
            <TableData<typeAdmBetteryCellTypeList>
              data={getFilteredData}
              columns={columns}
              onClick={(row) => onSelect({ id: row.id, name: row.cell_name })}
              className="cursor-pointer hover:bg-hw-dark-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-hw-dark-1 text-white rounded hover:bg-hw-dark-3"
          >
            취소
          </button>
        </div>
      </div>

      {isAddPopupOpen && (
        <CellTypeAddPopup
          isOpen={isAddPopupOpen}
          onClose={() => {
            setIsAddPopupOpen(false);
            setEditData(null);
          }}
          onSubmit={handleAddSubmit}
          mode={editData ? 'edit' : 'create'}
          initialData={editData || undefined}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmPopup
          title="셀 종류 삭제"
          message="해당 셀 종류를 삭제하시겠습니까?"
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
} 