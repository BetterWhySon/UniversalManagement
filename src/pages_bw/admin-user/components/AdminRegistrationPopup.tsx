import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAdmUser from '@/api/admin/admUser';
import { typeAdmUserList } from '@/api/types/admin/typeAdmUser';

interface Props {
  onClose: () => void;
  onSuccess?: () => void;  // 성공 시 리스트 갱신을 위한 콜백
  initialData?: typeAdmUserList;
  mode?: 'create' | 'edit';
  customerId: string;
}

export default function AdminRegistrationPopup({ 
  onClose, 
  onSuccess,
  initialData,
  mode = 'create',
  customerId
}: Props) {
  const { t: trans } = useTranslation('translation');
  const { storeUserCreate, storeUserEdit, storeUserList } = useAdmUser();
  const isSuperUser = localStorage.getItem("is_admin_superuser") === "true";

  const [formData, setFormData] = useState<typeAdmUserList>({
    id: initialData?.id || 0,
    user_id: initialData?.user_id || '',
    username: initialData?.username || '',
    password: '',
    customer_id: initialData?.customer_id || 0,
    customer_name: initialData?.customer_name || '',
    phonenumber: initialData?.phonenumber || '',
    email: initialData?.email || '',
    is_staff: mode === 'create' ? false : (initialData?.is_staff ?? false)
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'edit') {
        await storeUserEdit(
          formData.id.toString(),
          formData.username,
          formData.password,
          formData.customer_id.toString(),
          formData.phonenumber,
          formData.email,
          isSuperUser ? formData.is_staff : false,
          trans
        );
      } else {
        await storeUserCreate(
          formData.user_id,
          formData.username,
          formData.password,
          customerId,
          formData.phonenumber,
          formData.email,
          isSuperUser ? formData.is_staff : false,
          trans
        );
      }
      await storeUserList(customerId, trans);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-[500px]">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg text-white">
            {mode === 'create' ? '소속 직원 등록' : '소속 직원 수정'}
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
              <label className="w-32 text-white">아이디:</label>
              <div className="flex-1" style={{ maxWidth: '338px' }}>
                <input
                  type="text"
                  value={formData.user_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, user_id: e.target.value }))}
                  disabled={mode === 'edit'}
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
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full h-8 px-3 bg-hw-dark-1 rounded text-white border border-gray-600"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-white">연락처:</label>
              <div className="flex-1" style={{ maxWidth: '338px' }}>
                <input
                  type="text"
                  value={formData.phonenumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phonenumber: e.target.value }))}
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

            {isSuperUser && (
              <div className="flex items-center">
                <label className="w-32 text-white">권한:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.is_staff === true}
                      onChange={() => setFormData(prev => ({ ...prev, is_staff: true }))}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-white">관리자(등록,조회)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.is_staff === false}
                      onChange={() => setFormData(prev => ({ ...prev, is_staff: false }))}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-white">일반(조회)</span>
                  </label>
                </div>
              </div>
            )}
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
  );
} 