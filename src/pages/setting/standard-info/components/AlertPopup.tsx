import React from 'react';

interface AlertPopupProps {
  message: string;
  onClose: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#2A2F3A] rounded-lg w-[400px]">
        <div className="flex flex-col">
          <div className="p-6 text-center">
            <p className="text-white text-base">{message}</p>
          </div>
          <div className="flex justify-center p-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-500/80 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup; 