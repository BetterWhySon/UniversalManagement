import React, { useState } from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

interface GroupRegistrationPopupProps {
  onClose: () => void;
  onSave: (data: {
    code: string;
    group: string;
    postcode: string;
    address: string;
    detailAddress: string;
    description: string;
  }) => void;
  initialData?: {
    code: string;
    group: string;
    postcode: string;
    address: string;
    detailAddress: string;
    description: string;
  };
  mode?: 'create' | 'edit';
}

const GroupRegistrationPopup: React.FC<GroupRegistrationPopupProps> = ({ 
  onClose, 
  onSave, 
  initialData,
  mode = 'create' 
}) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    group: initialData?.group || '',
    postcode: initialData?.postcode || '',
    address: initialData?.address || '',
    detailAddress: initialData?.detailAddress || '',
    description: initialData?.description || ''
  });

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
          addr += extraAddr;
        }

        setFormData(prev => ({
          ...prev,
          postcode: data.zonecode,
          address: addr
        }));
      }
    }).open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-[600px]">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg text-white">{mode === 'create' ? '신규 등록' : '그룹 수정'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-32 text-white">CODE :</label>
                <input
                  type="text"
                  className="flex-1 h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="w-32 text-white">그룹명 :</label>
                <input
                  type="text"
                  className="flex-1 h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                  value={formData.group}
                  onChange={(e) => setFormData({...formData, group: e.target.value})}
                  required
                />
              </div>

              <div className="flex">
                <label className="w-32 text-white mt-2">그룹 주소 :</label>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="w-32 h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                      placeholder="우편번호"
                      value={formData.postcode}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handlePostcode}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      우편번호 검색
                    </button>
                  </div>
                  <input
                    type="text"
                    className="w-full h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                    value={formData.address}
                    readOnly
                    placeholder="주소"
                  />
                  <input
                    type="text"
                    className="w-full h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                    value={formData.detailAddress}
                    onChange={(e) => setFormData({...formData, detailAddress: e.target.value})}
                    placeholder="상세주소"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-white">Description :</label>
                <input
                  type="text"
                  className="flex-1 h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 p-6 border-t border-gray-600">
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
};

export default GroupRegistrationPopup; 