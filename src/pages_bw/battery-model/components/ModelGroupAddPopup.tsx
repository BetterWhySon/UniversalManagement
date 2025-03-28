import React, { useState, useEffect } from 'react';
import useAdmBatteryModel from '@/api/admin/admBetteryModel';
import { useTranslation } from 'react-i18next';
import useCustomerId from '@/hooks/useCustomerId';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, id?: number) => void;
  mode?: 'create' | 'edit';
  initialData?: { id: number; name: string };
}

export default function ModelGroupAddPopup({ isOpen, onClose, onSubmit, mode = 'create', initialData }: Props) {
  const [name, setName] = useState('');
  const { t: trans } = useTranslation('translation');
  const { storeBetteryModelGroupCreate, storeBetteryModelGroupEdit } = useAdmBatteryModel();
  const customerId = useCustomerId();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
    } else {
      setName('');
    }
  }, [mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'edit' && initialData) {
        await storeBetteryModelGroupEdit(initialData.id, name, trans, customerId);
      } else {
        await storeBetteryModelGroupCreate(name, trans, customerId);
      }
      onSubmit(name, initialData?.id);
      setName('');
      onClose();
    } catch (error) {
      console.error('Error saving model group:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white">
            {mode === 'create' ? '모델그룹 추가' : '모델그룹 수정'}
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">모델그룹명</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-hw-dark-1 text-white border border-hw-gray-7 rounded"
                required
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
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {mode === 'create' ? '추가' : '수정'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 