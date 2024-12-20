import React, { useState } from 'react';
import Modal from '@/components/popup/Modal';

interface DeviceSelectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  maxChecked?: number;
  exactCount?: boolean;
  onApply: (selectedItems: string[]) => void;
  selectedItems: string[];
}

const DeviceSelectPopup: React.FC<DeviceSelectPopupProps> = ({
  isOpen,
  onClose,
  maxChecked = 3,
  exactCount = false,
  onApply,
  selectedItems
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>(selectedItems);
  const [showMaxAlert, setShowMaxAlert] = useState(false);
  const [searchText, setSearchText] = useState('');

  // 예시 데이터 - 실제로는 props로 받거나 API로 가져와야 함
  const items = [
    { title: '사용관리 지수', items: ['운영 시간', '평균 파워', '운영 횟수'] },
    { title: '스트레스 지수', items: ['고속/완속 사용시간', '급속/완속 충전시간', 'SOC 사용 구간'] },
    { title: '운용시간', items: ['운영 시간 비율(%)', '평균 파워 비율(%)', '운영 횟수 비율(%)'] },
    { title: '사용 시간', items: ['고속/완속 사용비율(%)', '급속/완속 충전 비율(%)', 'SOC 사용 구간비율(%)'] }
  ];

  const handleCheck = (itemName: string) => {
    setCheckedItems(prev => {
      if (prev.includes(itemName)) {
        return prev.filter(item => item !== itemName);
      }
      if (prev.length >= maxChecked) {
        setShowMaxAlert(true);
        setTimeout(() => setShowMaxAlert(false), 2000);
        return prev;
      }
      return [...prev, itemName];
    });
  };

  const handleApply = () => {
    if (exactCount && checkedItems.length !== maxChecked) {
      setShowMaxAlert(true);
      setTimeout(() => setShowMaxAlert(false), 2000);
      return;
    }
    onApply(checkedItems);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="기기 선택">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <input 
            type="text" 
            placeholder="검색어를 입력하세요." 
            className="bg-white px-2 py-0.5 rounded mr-2 text-sm w-[200px]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {showMaxAlert && (
          <div className="fixed left-1/2 bottom-48 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[1000] transition-opacity duration-300">
            {exactCount 
              ? `${maxChecked}개를 선택해야 합니다.`
              : `최대 ${maxChecked}개까지 선택 가능합니다.`
            }
          </div>
        )}

        <div className="space-y-6">
          {items.map((section, idx) => (
            <div key={idx}>
              <div className="flex mb-2">
                <h3 className="text-white w-[100px] pt-1">{section.title}</h3>
                <div className="flex-1 grid grid-cols-7 gap-y-1.5 gap-x-2">
                  {section.items.map((item, itemIdx) => (
                    <label key={itemIdx} className="flex items-center space-x-2 text-gray-300">
                      <input
                        type="checkbox"
                        className="accent-orange-500"
                        checked={checkedItems.includes(item)}
                        onChange={() => handleCheck(item)}
                      />
                      <span className={searchText && item.toLowerCase().includes(searchText.toLowerCase()) ? "text-green-400" : ""}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 left-0 right-0 bg-slate-800 pt-4 mt-6 border-t border-gray-600 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white border border-gray-400 rounded hover:border-white"
          >
            취소
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            적용
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeviceSelectPopup; 