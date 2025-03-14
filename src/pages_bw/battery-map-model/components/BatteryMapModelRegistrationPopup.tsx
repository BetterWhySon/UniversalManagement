import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BatteryManufacturerSelectPopup from './BatteryManufacturerSelectPopup';
import BatteryDataConfigSelectPopup from './BatteryDataConfigSelectPopup';
import BatteryModelCustomSelectPopup from './BatteryModelCustomSelectPopup';
import useCustomerId from '@/hooks/useCustomerId';
import useAdmBatteryMapModel from '@/api/admin/admBatteryMapModel';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function BatteryMapModelRegistrationPopup({ onClose, onSave, initialData }: Props) {
  const { t: trans } = useTranslation('translation');
  const customerId = useCustomerId();
  const { storeBatteryMapModelCreate, storeBatteryMapModelEdit, storeBatteryMapModelList } = useAdmBatteryMapModel();
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    referred_model_object: initialData?.referred_model_object || '',
    referred_model_data_config: initialData?.referred_model_data_config || '',
    referred_model_custom: initialData?.referred_model_custom || '',
    referred_model_object_name: initialData?.referred_model_object_name || '',
    referred_model_data_config_name: initialData?.referred_model_data_config_name || '',
    referred_model_custom_name: initialData?.referred_model_custom_name || '',
  });

  const [isManufacturerSelectOpen, setIsManufacturerSelectOpen] = useState(false);
  const [isDataConfigSelectOpen, setIsDataConfigSelectOpen] = useState(false);
  const [isModelCustomSelectOpen, setIsModelCustomSelectOpen] = useState(false);

  useEffect(() => {
    console.log('formData changed:', formData);
  }, [formData]);

  const handleManufacturerSelect = (data: { id: string; name: string }) => {
    console.log('Manufacturer selected:', data);
    setFormData(prev => ({
      ...prev,
      referred_model_object: data.id,
      referred_model_object_name: data.name
    }));
    setIsManufacturerSelectOpen(false);
  };

  const handleDataConfigSelect = (data: { id: string; name: string }) => {
    setFormData(prev => ({
      ...prev,
      referred_model_data_config: data.id,
      referred_model_data_config_name: data.name
    }));
    setIsDataConfigSelectOpen(false);
  };

  const handleModelCustomSelect = (data: { id: string; name: string }) => {
    setFormData(prev => ({
      ...prev,
      referred_model_custom: data.id,
      referred_model_custom_name: data.name
    }));
    setIsModelCustomSelectOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await storeBatteryMapModelEdit(
          initialData.id,
          formData.name,
          Number(customerId),
          Number(formData.referred_model_object),
          Number(formData.referred_model_data_config),
          Number(formData.referred_model_custom),
          trans
        );
      } else {
        await storeBatteryMapModelCreate(
          formData.name,
          Number(customerId),
          Number(formData.referred_model_object),
          Number(formData.referred_model_data_config),
          Number(formData.referred_model_custom),
          trans
        );
      }
      await storeBatteryMapModelList(Number(customerId), trans);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-full max-w-[600px] max-h-[90vh] overflow-auto">
        <h2 className="text-xl text-white mb-4">
          {initialData ? trans('배터리 매핑 모델 수정') : trans('배터리 매핑 모델 등록')}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">
                {trans('모델명')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={trans('모델명을 입력하세요.')}
                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white">
                  {trans('배터리(모빌리티) 제원')} <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsManufacturerSelectOpen(true)}
                  className="px-3 py-1 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors text-sm"
                >
                  {trans('선택')}
                </button>
              </div>
              <input
                type="text"
                value={formData.referred_model_object_name || ''}
                readOnly
                placeholder={trans('선택해주세요')}
                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white cursor-not-allowed"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white">
                  {trans('표준 데이터')} <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsDataConfigSelectOpen(true)}
                  className="px-3 py-1 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors text-sm"
                >
                  {trans('선택')}
                </button>
              </div>
              <input
                type="text"
                value={formData.referred_model_data_config_name || ''}
                readOnly
                placeholder={trans('선택해주세요')}
                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white cursor-not-allowed"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white">
                  {trans('제조자 지정 데이터')} <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsModelCustomSelectOpen(true)}
                  className="px-3 py-1 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors text-sm"
                >
                  {trans('선택')}
                </button>
              </div>
              <input
                type="text"
                value={formData.referred_model_custom_name || ''}
                readOnly
                placeholder={trans('선택해주세요')}
                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-hw-dark-4 text-white rounded hover:bg-hw-dark-5 transition-colors"
            >
              {trans('취소')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors"
            >
              {initialData ? trans('수정') : trans('등록')}
            </button>
          </div>
        </form>
      </div>

      {isManufacturerSelectOpen && (
        <BatteryManufacturerSelectPopup
          onClose={() => setIsManufacturerSelectOpen(false)}
          onSelect={handleManufacturerSelect}
        />
      )}

      {isDataConfigSelectOpen && (
        <BatteryDataConfigSelectPopup
          onClose={() => setIsDataConfigSelectOpen(false)}
          onSelect={handleDataConfigSelect}
        />
      )}

      {isModelCustomSelectOpen && (
        <BatteryModelCustomSelectPopup
          onClose={() => setIsModelCustomSelectOpen(false)}
          onSelect={handleModelCustomSelect}
          referred_manufacturer={formData.referred_model_object}
        />
      )}
    </div>
  );
} 