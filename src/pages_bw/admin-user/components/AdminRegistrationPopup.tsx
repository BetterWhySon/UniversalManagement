import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminFormData } from '../page';
import CompanySearchPopup from './CompanySearchPopup';

interface AdminRegistrationPopupProps {
  onClose: () => void;
  onSave: (data: AdminFormData) => void;
  initialData?: AdminFormData;  // 수정 시 초기 데이터
  mode?: 'create' | 'edit';     // 생성/수정 모드
}

export default function AdminRegistrationPopup({ 
  onClose, 
  onSave, 
  initialData,
  mode = 'create' 
}: AdminRegistrationPopupProps) {
  const { t: trans } = useTranslation('translation');
  const [formData, setFormData] = useState<AdminFormData>(initialData || {
    companyName: '',
    userId: '',
    password: '',
    name: '',
    contact: '',
    email: '',
    role: 'admin'
  });
  const [isCompanySearchOpen, setIsCompanySearchOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCompanySelect = (company: { name: string }) => {
    setFormData(prev => ({ ...prev, companyName: company.name }));
    setIsCompanySearchOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-hw-dark-2 rounded-lg w-[500px]">
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            <h2 className="text-lg text-white">
              {mode === 'create' ? '관리자 등록' : '관리자 수정'}
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
                <label className="w-32 text-white">관리 업체명:</label>
                <div className="flex-1" style={{ maxWidth: '338px' }}>
                  <div className="flex items-center justify-between w-full">
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-[250px] h-8 px-3 bg-hw-dark-1 rounded text-white border border-gray-600"
                    />
                    <button
                      type="button"
                      className="h-8 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      onClick={() => setIsCompanySearchOpen(true)}
                    >
                      검색
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-white">아이디:</label>
                <div className="flex-1" style={{ maxWidth: '338px' }}>
                  <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
                    className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white border border-gray-600"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-white">비밀번호:</label>
                <div className="flex-1" style={{ maxWidth: '338px' }}>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white border border-gray-600"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-white">이름:</label>
                <div className="flex-1" style={{ maxWidth: '338px' }}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white border border-gray-600"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-white">연락처:</label>
                <div className="flex-1" style={{ maxWidth: '338px' }}>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white border border-gray-600"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-white">email:</label>
                <div className="flex-1" style={{ maxWidth: '338px' }}>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white border border-gray-600"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-white">권한:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.role === 'admin'}
                      onChange={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-white">관리자(등록,조회)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.role === 'user'}
                      onChange={() => setFormData(prev => ({ ...prev, role: 'user' }))}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-white">일반(조회)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-hw-orange-1 text-hw-orange-1 rounded hover:bg-hw-orange-1/10"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>

      {isCompanySearchOpen && (
        <CompanySearchPopup
          onClose={() => setIsCompanySearchOpen(false)}
          onSelect={handleCompanySelect}
        />
      )}
    </>
  );
} 