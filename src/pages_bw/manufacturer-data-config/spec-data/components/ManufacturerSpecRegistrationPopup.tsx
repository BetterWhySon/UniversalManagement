import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { typeAdmModelCustomSpecList } from '@/api/types/admin/typeAdmModelCustomSpec';
import useCustomerId from '@/hooks/useCustomerId';

interface Props {
  onClose: () => void;
  onSave: (data: typeAdmModelCustomSpecList) => void;
  initialData?: typeAdmModelCustomSpecList;
}

export default function ManufacturerSpecRegistrationPopup({ onClose, onSave, initialData }: Props) {
  const { t: trans } = useTranslation('translation');
  const customerId = useCustomerId();
  const [formData, setFormData] = useState<Partial<typeAdmModelCustomSpecList>>({
    name: '',
    type: 0,
    unit: '',
    referred_manufacturer: Number(customerId),
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert(trans('모든 필수 항목을 입력해주세요.'));
      return;
    }
    onSave({
      ...formData,
      referred_manufacturer: Number(customerId)
    } as typeAdmModelCustomSpecList);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-full max-w-[500px] mx-4">
        <div className="p-6">
          <h2 className="text-xl text-white mb-6">
            {initialData ? trans('제원 데이터 수정') : trans('제원 데이터 등록')}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">{trans('제원 데이터명')} *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-[38px] px-3 bg-hw-dark-1 border border-hw-dark-4 rounded text-white focus:outline-none focus:border-hw-dark-5"
                  placeholder={trans('제원 데이터명을 입력하세요')}
                />
              </div>
              <div>
                <label className="block text-white mb-2">{trans('데이터단위')} *</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full h-[38px] px-3 bg-hw-dark-1 border border-hw-dark-4 rounded text-white focus:outline-none focus:border-hw-dark-5"
                  placeholder={trans('예: %, °C, V, A')}
                />
              </div>
              <div>
                <label className="block text-white mb-2">{trans('데이터 타입')} *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: Number(e.target.value) })}
                  className="w-full h-[38px] px-3 bg-hw-dark-1 border border-hw-dark-4 rounded text-white focus:outline-none focus:border-hw-dark-5"
                >
                  <option value={0}>INT</option>
                  <option value={1}>FLOAT</option>
                  <option value={2}>BOOLEAN</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 h-[38px] border border-hw-dark-4 text-white rounded hover:bg-hw-dark-4/30 transition-colors"
              >
                {trans('취소')}
              </button>
              <button
                type="submit"
                className="px-4 h-[38px] bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors"
              >
                {trans('저장')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 