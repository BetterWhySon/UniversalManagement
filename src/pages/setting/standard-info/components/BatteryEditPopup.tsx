import React, { useState } from 'react';

interface BatteryEditPopupProps {
  onClose: () => void;
  onSave: (data: BatteryEditData) => void;
  initialData: BatteryEditData;
}

interface BatteryEditData {
  id: number;
  company: string;
  group: string;
  user: string;
  contact: string;
  address: string;
  itemCategory: string;
  batteryStatus: string;
  packId: string;
  approvalStatus: string;
  registrationDate: string;
}

const BatteryEditPopup: React.FC<BatteryEditPopupProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // 수정 불가능한 필드 (어두운 배경)
  const readOnlyStyle = "w-full h-10 text-base px-4 bg-[#1C1F27] rounded-lg outline-none border-none text-white/70";
  // 수정 가능한 필드 (더 밝은 배경)
  const editableStyle = "w-full h-10 text-base px-4 bg-[#454C5C] rounded-lg outline-none border-none text-white";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#2A2F3A] rounded-lg w-[800px]">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h2 className="text-white text-lg font-medium">배터리 정보 수정</h2>
            <button 
              type="button"
              onClick={onClose}
              className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-1">사업장</label>
                <input
                  type="text"
                  value={formData.company}
                  className={readOnlyStyle}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-white mb-1">그룹</label>
                <input
                  type="text"
                  value={formData.group}
                  className={readOnlyStyle}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-white mb-1">기기명</label>
                <input
                  type="text"
                  value={formData.user}
                  onChange={(e) => setFormData({...formData, user: e.target.value})}
                  className={editableStyle}
                />
              </div>
              <div>
                <label className="block text-white mb-1">사용자</label>
                <input
                  type="text"
                  value={formData.contact}
                  className={readOnlyStyle}
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-1">주소</label>
              <input
                type="text"
                value={formData.address}
                className={readOnlyStyle}
                readOnly
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-1">아이템카테고리</label>
                <input
                  type="text"
                  value={formData.itemCategory}
                  className={readOnlyStyle}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-white mb-1">배터리생산처</label>
                <input
                  type="text"
                  value={formData.batteryStatus}
                  className={readOnlyStyle}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-white mb-1">팩 모델정보</label>
                <input
                  type="text"
                  value={formData.packId}
                  className={readOnlyStyle}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-white mb-1">개인정보제공 동의</label>
                <input
                  type="text"
                  value={formData.approvalStatus}
                  className={readOnlyStyle}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 p-5 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-[#363B46] text-white rounded hover:bg-[#363B46]/80 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-500/80 transition-colors"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BatteryEditPopup; 