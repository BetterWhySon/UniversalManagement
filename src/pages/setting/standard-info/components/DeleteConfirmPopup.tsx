import React from 'react';

interface DeleteConfirmPopupProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const DeleteConfirmPopup: React.FC<DeleteConfirmPopupProps> = ({ onClose, onConfirm, title, message }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-[400px]">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 text-center">
          <p className="text-white text-lg">{message}</p>
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
            onClick={onConfirm}
            className="px-6 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup; 