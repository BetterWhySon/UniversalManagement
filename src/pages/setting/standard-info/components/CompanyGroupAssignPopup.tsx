import React, { useState } from 'react';
import AlertPopup from './AlertPopup';

interface CompanyGroupAssignPopupProps {
  onClose: () => void;
  onCompanyAssign: () => void;
  onGroupAssign: () => void;
  onConfirm: (type: 'company' | 'group', value: string) => void;
  selectedCompany: string;
  selectedGroup: string;
}

const CompanyGroupAssignPopup: React.FC<CompanyGroupAssignPopupProps> = ({
  onClose,
  onCompanyAssign,
  onGroupAssign,
  onConfirm,
  selectedCompany,
  selectedGroup
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleConfirm = () => {
    if (selectedCompany) {
      onConfirm('company', selectedCompany);
    } else if (selectedGroup) {
      onConfirm('group', selectedGroup);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[40]">
        <div className="bg-hw-dark-2 rounded-lg w-[400px]">
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            <h2 className="text-lg text-white">사업장/그룹 지정</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex flex-col gap-4">
              <div>
                <button
                  onClick={onCompanyAssign}
                  className="w-full h-10 bg-[#363B46] text-white rounded hover:bg-opacity-80 transition-colors"
                >
                  사업장 지정
                </button>
                {selectedCompany && (
                  <div className="mt-2 p-3 bg-hw-dark-1 rounded">
                    <div className="text-white text-sm">
                      <span className="text-gray-400">선택된 사업장: </span>
                      {selectedCompany}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => {
                    if (!selectedCompany) {
                      setShowAlert(true);
                      return;
                    }
                    onGroupAssign();
                  }}
                  className="w-full h-10 bg-[#363B46] text-white rounded hover:bg-opacity-80 transition-colors"
                >
                  그룹 지정
                </button>
                {selectedGroup && (
                  <div className="mt-2 p-3 bg-hw-dark-1 rounded">
                    <div className="text-white text-sm">
                      <span className="text-gray-400">선택된 그룹: </span>
                      {selectedGroup}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 p-6 border-t border-gray-600">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-hw-orange-1 text-hw-orange-1 rounded hover:bg-hw-orange-1/10"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90"
              disabled={!selectedCompany && !selectedGroup}
            >
              확인
            </button>
          </div>
        </div>
      </div>

      {showAlert && (
        <AlertPopup
          message="사업장을 먼저 지정해주세요."
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default CompanyGroupAssignPopup; 