import React, { useState } from 'react';
import { cn } from '@/helpers/class-name.helper';
import { useTranslation } from 'react-i18next';
import useAdmCustomer from '@/api/admin/admCustomer';

interface CompanyFormData {
  name: string;
  identity_number: string;
  address: string;
  representative: string;
  business_field?: string;
  phonenumber: string;
  email?: string;
}

interface Props {
  onClose: () => void;
  onSave: (data: CompanyFormData) => void;
  onSuccess?: () => void;
  initialData?: CompanyFormData;
  mode?: 'create' | 'edit';
}

export default function CompanyRegistrationPopup({ 
  onClose, 
  onSave, 
  onSuccess,
  initialData,
  mode = 'create' 
}: Props) {
  const { t: trans } = useTranslation('translation');
  const { storeCustomerCreate } = useAdmCustomer();

  const [formData, setFormData] = useState<CompanyFormData>(initialData || {
    name: '',
    identity_number: '',
    address: '',
    representative: '',
    business_field: '',
    phonenumber: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);  // API 호출은 부모 컴포넌트에서만 처리
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-[600px]">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg text-white">
            {mode === 'create' ? '관리 업체 등록' : '관리 업체 수정'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-32 text-white">관리 업체명 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="flex-1 h-8 px-3 bg-hw-dark-1 rounded text-white"
                required
              />
            </div>
            <div className="flex items-center">
              <label className="w-32 text-white">사업자 등록 번호 *</label>
              <input
                type="text"
                value={formData.identity_number}
                onChange={(e) => setFormData({ ...formData, identity_number: e.target.value })}
                className="flex-1 h-8 px-3 bg-hw-dark-1 rounded text-white"
                required
              />
            </div>
            <div className="flex items-center">
              <label className="w-32 text-white">주소 *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="flex-1 h-8 px-3 bg-hw-dark-1 rounded text-white"
                required
              />
            </div>
            <div className="flex items-center">
              <label className="w-32 text-white">대표자명 *</label>
              <input
                type="text"
                value={formData.representative}
                onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
                className="flex-1 h-8 px-3 bg-hw-dark-1 rounded text-white"
                required
              />
            </div>
            <div className="flex items-center">
              <label className="w-32 text-white">업종</label>
              <input
                type="text"
                value={formData.business_field}
                onChange={(e) => setFormData({ ...formData, business_field: e.target.value })}
                className="flex-1 h-8 px-3 bg-hw-dark-1 rounded text-white"
              />
            </div>
            <div className="flex items-center">
              <label className="w-32 text-white">전화번호 *</label>
              <input
                type="text"
                value={formData.phonenumber}
                onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                className="flex-1 h-8 px-3 bg-hw-dark-1 rounded text-white"
                required
              />
            </div>
            <div className="flex items-center">
              <label className="w-32 text-white">e-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1 h-8 px-3 bg-hw-dark-1 rounded text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-hw-orange-1 border border-hw-orange-1 rounded hover:bg-hw-orange-1/10"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 