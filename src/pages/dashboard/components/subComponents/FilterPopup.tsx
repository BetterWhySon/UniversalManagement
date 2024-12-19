import React, { useState, useEffect } from 'react';

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  maxChecked?: number;
  exactCount?: boolean;
  onApply: (selectedItems: string[]) => void;
  selectedItems: string[];
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose, maxChecked = 6, exactCount = false, onApply, selectedItems }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>(selectedItems);
  const [showMaxAlert, setShowMaxAlert] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setCheckedItems(selectedItems);
  }, [selectedItems]);

  const handleCheck = (itemName: string, checked: boolean) => {
    if (checked) {
      if (checkedItems.length >= maxChecked) {
        setShowMaxAlert(true);
        setTimeout(() => setShowMaxAlert(false), 2000);
        return;
      }
      setCheckedItems([...checkedItems, itemName]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== itemName));
    }
  };

  const handleApply = () => {
    if (exactCount && checkedItems.length !== maxChecked) {
      setShowMaxAlert(true);
      setTimeout(() => setShowMaxAlert(false), 2000);
      return;
    }
    onApply(checkedItems);
  };

  const CheckboxItem = ({ name }: { name: string }) => {
    const isMatched = searchText && name.toLowerCase().includes(searchText.toLowerCase());
    
    return (
      <label className="flex items-center space-x-2 text-gray-300">
        <input
          type="checkbox"
          className="accent-orange-500"
          checked={checkedItems.includes(name)}
          onChange={(e) => handleCheck(name, e.target.checked)}
        />
        <span className={isMatched ? "text-green-400" : ""}>
          {name}
        </span>
      </label>
    );
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 p-6 rounded-lg border border-white w-[1500px] max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">조회 항목 선택</h2>
          <span className="text-gray-400 text-sm">
            {checkedItems.length} / {maxChecked} 선택됨
          </span>
        </div>

        <div className="flex items-center mb-6">
          <input 
            type="text" 
            placeholder="검색어를 입력하세요." 
            className="bg-white px-2 py-0.5 rounded mr-2 text-sm w-[200px]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-3 py-0.5 rounded text-sm">
            확인
          </button>
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
          {/* 사용관리 섹션 */}
          <div>
            <div className="flex mb-2">
              <h3 className="text-white w-[100px] pt-1">사용관리</h3>
              <div className="flex-1 grid grid-cols-7 gap-y-1.5 gap-x-2 h-[108px]">
                <CheckboxItem name="사용관리 점수" />
                <CheckboxItem name="스트레스 지수" />
                <CheckboxItem name="운용 시간" />
                <CheckboxItem name="사용 시간" />
                <CheckboxItem name="충전 시간" />
                <CheckboxItem name="미사용 시간" />
                <CheckboxItem name="충전시간당 사용시간" />
                <CheckboxItem name="사용 횟수" />
                <CheckboxItem name="사용량" />
                <CheckboxItem name="고속 사용량" />
                <CheckboxItem name="고속 사용 횟수" />
                <CheckboxItem name="사용시 평균 파워" />
                <CheckboxItem name="전시 평균 파워" />
                <CheckboxItem name="배터리 심방전 횟수" />
                <CheckboxItem name="배터리 심충전 횟수" />
                <CheckboxItem name="완전 방전 횟수" />
                <CheckboxItem name="완전 충전 횟수" />
                <CheckboxItem name="화성재동" />
              </div>
            </div>
          </div>

          {/* 수명관리 섹션 */}
          <div>
            <div className="flex mb-2">
              <h3 className="text-white w-[100px] pt-1">수명관리</h3>
              <div className="flex-1 grid grid-cols-7 gap-y-1.5 gap-x-2 h-[72px]">
                <CheckboxItem name="수명관리 지수" />
                <CheckboxItem name="잔존수명(예상)" />
                <CheckboxItem name="내용연수" />
                <CheckboxItem name="에너지 효율" />
                <CheckboxItem name="용량효율" />
                <CheckboxItem name="감가상각비" />
                <CheckboxItem name="에너지당 배터리 상각비" />
                <CheckboxItem name="고속 사용시 상각비" />
                <CheckboxItem name="완속 사용시 상각비" />
                <CheckboxItem name="급속 충전시 상각비" />
                <CheckboxItem name="완속 충전시 상각비" />
              </div>
            </div>
          </div>

          {/* 배터리정보 섹션 */}
          <div>
            <div className="flex mb-2">
              <h3 className="text-white w-[100px] pt-1">배터리정보</h3>
              <div className="flex-1 grid grid-cols-7 gap-y-1.5 gap-x-2 h-[72px]">
                <CheckboxItem name="배터리 관리 지수" />
                <CheckboxItem name="배터리 팩 실제 용량" />
                <CheckboxItem name="배터리 팩 저항" />
                <CheckboxItem name="셀 최대 용량" />
                <CheckboxItem name="셀 평균 용량" />
                <CheckboxItem name="셀 최소 용량" />
                <CheckboxItem name="셀 최대 저항" />
                <CheckboxItem name="셀 평 저항" />
                <CheckboxItem name="셀 최소 저항" />
                <CheckboxItem name="용량손실률 - 노화" />
                <CheckboxItem name="용량손실률 - 잔량편차" />
                <CheckboxItem name="용량손실률 - 용량편차" />
                <CheckboxItem name="용량손실률 - 저항" />
                <CheckboxItem name="셀 밸런스" />
              </div>
            </div>
          </div>

          {/* 알람이력 섹션 */}
          <div>
            <div className="flex mb-2">
              <h3 className="text-white w-[100px] pt-1">알람이력</h3>
              <div className="flex-1 grid grid-cols-7 gap-y-1.5 gap-x-2 h-[72px]">
                <CheckboxItem name="전류(방전)" />
                <CheckboxItem name="과전류(충전)" />
                <CheckboxItem name="셀 과방전" />
                <CheckboxItem name="셀 과충전" />
                <CheckboxItem name="셀 저항 편차" />
                <CheckboxItem name="셀 저항 분포" />
                <CheckboxItem name="셀 용량 편차" />
                <CheckboxItem name="셀 용량 분포" />
                <CheckboxItem name="셀 용량" />
                <CheckboxItem name="셀 전압" />
                <CheckboxItem name="낮은 SOC" />
                <CheckboxItem name="높은 스트레스" />
                <CheckboxItem name="충전 비상 정지" />
                <CheckboxItem name="셀 용량 분포" />
                <CheckboxItem name="충전 비상 정지" />
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 영역 추가 */}
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
    </div>
  );
};

export default FilterPopup; 