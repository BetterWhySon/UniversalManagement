import React, { useState } from 'react';

interface TextEditPopupProps {
  title: string;
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

const TextEditPopup: React.FC<TextEditPopupProps> = ({ title, initialText, onSave, onCancel }) => {
  const [text, setText] = useState(initialText);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 p-4 rounded-lg w-full max-w-lg">
        <h2 className="text-hw-white-1 text-lg font-semibold mb-4">{title}</h2>
        <textarea
          className="w-full h-40 p-2 bg-hw-dark-1 text-hw-white-1 border border-hw-gray-5 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-hw-gray-5 text-hw-white-1 rounded mr-2"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-hw-blue text-hw-white-1 rounded"
            onClick={() => onSave(text)}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditPopup;
