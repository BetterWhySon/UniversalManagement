import React, { useState, useEffect } from 'react';

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  maxChecked?: number;
  exactCount?: boolean;
  onApply: (selectedItems: string[]) => void;
  selectedItems: string[];
  mode?: 'default' | 'chart';
}

const FilterPopup: React.FC<FilterPopupProps> = ({ 
  isOpen, 
  onClose, 
  maxChecked = 6, 
  exactCount = false, 
  onApply, 
  selectedItems,
  mode = 'default'
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>(selectedItems);
  const [showMaxAlert, setShowMaxAlert] = useState(false);
  const [searchText, setSearchText] = useState('');

  // 섹션별 아이템 정의
  const sections = {
    '사용관리': [
      '사용관리 점수', '스트레스 지수', '운용 시간', '사용 시간', '충전 시간', '미사용 시간', 
      '충전 시간당 사용시간', '사용 횟수', '사용량', '고속 사용량', '고속 사용 횟수', '충전 횟수', 
      '급속 충전 횟수', '완속 충전 횟수', '사용시 평균 파워', '충전시 평균 파워', '배터리 심방전 횟수', 
      '배터리 심충전 횟수', '완전 방전 횟수', '완전 충전 횟수', '회생제동', '고속 회생 횟수', '전비', 
      '주행속도', '주행거리'
    ],
    '수명관리': [
      '수명관리 지수', '잔존수명(예상)', '내용연수', '에너지 효율', '용량효율', '감가상각비', 
      '에너지당 배터리 상각비', '고속 사용시 상각비', '완속 사용시 상각비', '급속 충전시 상각비', 
      '완속 충전시 상각비'
    ],
    '배터리정보': [
      '배터리 관리 지수', '배터리 팩 실제 용량', '배터리 팩 저항', '셀 최대 용량', '셀 평균 용량', 
      '셀 최소 용량', '셀 최대 저항', '셀 평균 저항', '셀 최소 저항', '용량손실률 - 노화', 
      '용량손실률 - 잔량편차', '용량손실률 - 용량편차', '용량손실률 - 저항', '셀 밸런스'
    ],
    '알람이력': [
      '과전류(방전)', '과전류(충전)', '셀 과방전', '셀 과충전', '셀 저항 편차', '셀 저항 분포', 
      '셀 용량 편차', '셀 용량 분포', '팩 용량', '셀 용량', '셀 전압', '셀 잔량 편차', '낮은 SOC', 
      '높은 스트레스', '충전 비상 정지', '충전 원격 정지'
    ],
    '차트 항목': [
      '운영 시간 (%)', '충전/방전 파워 (%)', '고속/완속 사용 (%)', '급속/완속 충전 (%)', 'SOC 사용 구간 (%)'
    ]
  };

  // 모든 아이템 목록 생성
  const allItems = Object.values(sections).flat();

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

  const handleSectionCheck = (sectionName: string, checked: boolean) => {
    const sectionItems = sections[sectionName as keyof typeof sections] || [];
    
    if (checked) {
      // 선택 가능한 최대 개수 확인
      const currentChecked = new Set(checkedItems);
      const newItems = sectionItems.filter(item => !currentChecked.has(item));
      
      if (checkedItems.length + newItems.length > maxChecked) {
        setShowMaxAlert(true);
        setTimeout(() => setShowMaxAlert(false), 2000);
        return;
      }
      
      // 섹션의 모든 아이템 선택
      const newCheckedItems = [...checkedItems, ...newItems];
      setCheckedItems(newCheckedItems);
    } else {
      // 섹션의 모든 아이템 선택 해제
      setCheckedItems(checkedItems.filter(item => !sectionItems.includes(item)));
    }
  };

  const handleSelectAll = () => {
    if (allItems.length <= maxChecked) {
      setCheckedItems(allItems);
    } else {
      setShowMaxAlert(true);
      setTimeout(() => setShowMaxAlert(false), 2000);
    }
  };

  const isSectionChecked = (sectionName: string) => {
    const sectionItems = sections[sectionName as keyof typeof sections] || [];
    return sectionItems.length > 0 && sectionItems.every(item => checkedItems.includes(item));
  };

  const isSectionPartiallyChecked = (sectionName: string) => {
    const sectionItems = sections[sectionName as keyof typeof sections] || [];
    const checkedCount = sectionItems.filter(item => checkedItems.includes(item)).length;
    return checkedCount > 0 && checkedCount < sectionItems.length;
  };

  const handleApply = () => {
    if (exactCount && checkedItems.length !== maxChecked) {
      setShowMaxAlert(true);
      setTimeout(() => setShowMaxAlert(false), 2000);
      return;
    }
    onApply(checkedItems);
  };

  const handleClearAll = () => {
    setCheckedItems([]);
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

  const renderSectionHeader = (sectionName: string) => {
    const isChecked = isSectionChecked(sectionName);
    const isPartiallyChecked = isSectionPartiallyChecked(sectionName);
    
    return (
      <div className="flex items-center space-x-2 w-[120px]">
        <input
          type="checkbox"
          id={`section-${sectionName}`}
          className="accent-orange-500"
          checked={isChecked}
          ref={el => {
            if (el) {
              el.indeterminate = isPartiallyChecked && !isChecked;
            }
          }}
          onChange={(e) => handleSectionCheck(sectionName, e.target.checked)}
        />
        <label 
          htmlFor={`section-${sectionName}`} 
          className="text-white cursor-pointer whitespace-nowrap"
        >
          {sectionName}
        </label>
      </div>
    );
  };

  const renderChartMode = () => {
    return (
      <div>
        <div className="flex mb-2">
          {renderSectionHeader('차트 항목')}
          <div className="flex-1 grid grid-cols-7 gap-y-2 gap-x-2 ml-4">
            {sections['차트 항목'].map(item => (
              <CheckboxItem key={item} name={item} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDefaultMode = () => {
    return (
      <>
        <div>
          <div className="flex mb-2">
            {renderSectionHeader('사용관리')}
            <div className="flex-1 grid grid-cols-7 gap-y-2 gap-x-2 ml-4">
              {sections['사용관리'].map(item => (
                <CheckboxItem key={item} name={item} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex mb-2">
            {renderSectionHeader('수명관리')}
            <div className="flex-1 grid grid-cols-7 gap-y-2 gap-x-2 ml-4">
              {sections['수명관리'].map(item => (
                <CheckboxItem key={item} name={item} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex mb-2">
            {renderSectionHeader('배터리정보')}
            <div className="flex-1 grid grid-cols-7 gap-y-2 gap-x-2 ml-4">
              {sections['배터리정보'].map(item => (
                <CheckboxItem key={item} name={item} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex mb-2">
            {renderSectionHeader('알람이력')}
            <div className="flex-1 grid grid-cols-7 gap-y-2 gap-x-2 ml-4">
              {sections['알람이력'].map(item => (
                <CheckboxItem key={item} name={item} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-800 p-6 rounded-lg border border-white w-[1500px] max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">조회 항목 선택</h2>
          <span className="text-gray-400 text-sm">
            <span className="text-hw-orange-1">{checkedItems.length}</span>개 선택됨
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
          {maxChecked >= allItems.length && (
            <button 
              onClick={handleSelectAll}
              className="text-gray-400 hover:text-white px-3 py-0.5 text-sm ml-2"
            >
              전체 선택
            </button>
          )}
          <button 
            onClick={handleClearAll}
            className="text-gray-400 hover:text-white px-3 py-0.5 text-sm ml-2"
          >
            전체 선택해제
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
          {mode === 'chart' ? renderChartMode() : renderDefaultMode()}
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
    </div>
  );
};

export default FilterPopup;