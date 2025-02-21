import React, { useState, useEffect, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import ModelGroupAddPopup from './ModelGroupAddPopup';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';
import useAdmBatteryModel from '@/api/admin/admBetteryModel';
import { typeAdmBetteryModelGroupList } from '@/api/types/admin/typeAdmBetteryModel';

interface ModelGroupSearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (model: { id: number; name: string }) => void;
}

interface ModelGroup {
  id: number;
  name: string;
}

export default function ModelGroupSearchPopup({ isOpen, onClose, onSelect }: ModelGroupSearchPopupProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const { t: trans } = useTranslation('translation');
  const [editData, setEditData] = useState<ModelGroup | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ModelGroup | null>(null);
  const { dataListBetteryModelGroup, storeBetteryModelGroupList, storeBetteryModelGroupDelete } = useAdmBatteryModel();

  useEffect(() => {
    storeBetteryModelGroupList(trans);
  }, []);

  const columns = [
    {
      name: '모델그룹명',
      dataIndex: 'group_name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '300px',
      render: (row: typeAdmBetteryModelGroupList) => (
        <span className="text-yellow-400">{row.group_name}</span>
      )
    },
    {
      name: '수정/삭제',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: typeAdmBetteryModelGroupList) => (
        <div className="flex items-center justify-center gap-2">
          <button 
            className="w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setEditData({ id: row.id, name: row.group_name });
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
              handleDelete({ id: row.id, name: row.group_name });
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
    if (!dataListBetteryModelGroup) return [];
    return dataListBetteryModelGroup.filter(group => 
      group.group_name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [dataListBetteryModelGroup, searchKeyword]);

  const handleAddSubmit = (name: string, id?: number) => {
    storeBetteryModelGroupList(trans);
  };

  const handleDelete = (row: ModelGroup) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await storeBetteryModelGroupDelete(deleteTarget.id, trans);
      setDeleteTarget(null);
      storeBetteryModelGroupList(trans);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-[600px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white">모델그룹 선택</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">모델그룹명</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="h-9 px-4 bg-hw-dark-1 text-white border border-hw-gray-7 rounded flex-1"
                placeholder="검색어를 입력하세요"
                required
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
            <TableData<typeAdmBetteryModelGroupList>
              data={getFilteredData}
              columns={columns}
              onClick={(row) => onSelect({ id: row.id, name: row.group_name })}
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
        <ModelGroupAddPopup
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
          title="모델그룹 삭제"
          message="해당 모델그룹을 삭제하시겠습니까?"
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
} 