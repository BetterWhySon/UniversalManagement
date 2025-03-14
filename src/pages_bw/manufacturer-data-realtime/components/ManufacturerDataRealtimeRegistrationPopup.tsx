import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { typeAdmModelCustomRealTimeList } from '@/api/types/admin/typeAdmModelCustomRealTime';
import useCustomerId from '@/hooks/useCustomerId';

interface Props {
  onClose: () => void;
  onSave: (data: typeAdmModelCustomRealTimeList) => void;
  initialData?: typeAdmModelCustomRealTimeList;
}

export default function ManufacturerDataRealtimeRegistrationPopup({ onClose, onSave, initialData }: Props) {
  const { t: trans } = useTranslation('translation');
  const customerId = useCustomerId();
  const [name, setName] = useState('');
  const [type, setType] = useState<number>(0); // 기본값: INT
  const [unit, setUnit] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setUnit(initialData.unit);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) {
      newErrors.name = trans('데이터명을 입력해주세요.');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const data: typeAdmModelCustomRealTimeList = {
      id: initialData?.id || 0,
      name,
      referred_manufacturer: Number(customerId),
      referred_manufacturer_name: '',  // API 호출 시 필요하지 않음
      type,
      unit,
      model_custom_count: initialData?.model_custom_count || 0,
      registration_date: initialData?.registration_date
    };
    
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-[500px] max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white">
            {initialData ? trans('제조자 지정 실시간 데이터 수정') : trans('제조자 지정 실시간 데이터 등록')}
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto">
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">
              {trans('데이터명')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 bg-hw-dark-1 text-white border ${errors.name ? 'border-red-500' : 'border-hw-gray-7'} rounded`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">
              {trans('데이터 타입')} <span className="text-red-500">*</span>
            </label>
            <select
              value={type}
              onChange={(e) => setType(Number(e.target.value))}
              className="w-full px-3 py-2 bg-hw-dark-1 text-white border border-hw-gray-7 rounded"
            >
              <option value={0}>INT</option>
              <option value={1}>FLOAT</option>
              <option value={2}>BOOLEAN</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">
              {trans('단위')}
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 bg-hw-dark-1 text-white border border-hw-gray-7 rounded"
              placeholder={trans('예: V, A, °C')}
            />
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-hw-dark-1 text-white rounded hover:bg-hw-dark-3"
            >
              {trans('취소')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90"
            >
              {trans('저장')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 