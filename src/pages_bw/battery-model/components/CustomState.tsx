import React from 'react';

interface CustomDataDefinition {
  id: string;
  name: string;
  unit: string;
  dataType: string;
  section: 1 | 2 | 3 | 4 | 5;
}

interface CustomStateProps {
  customDataDefinitions: CustomDataDefinition[];
  onAddCustomData: (section: 1 | 2 | 3 | 4 | 5) => void;
  onRemoveCustomData: (id: string) => void;
  onCustomDataChange: (id: string, field: keyof CustomDataDefinition, value: string) => void;
}

export default function CustomState({
  customDataDefinitions,
  onAddCustomData,
  onRemoveCustomData,
  onCustomDataChange
}: CustomStateProps) {
  const getSectionTitle = (section: number) => {
    switch (section) {
      case 1: return "실시간성 데이터";
      case 2: return "동작, 제어상태";
      case 3: return "알람상태";
      case 4: return "제어신호";
      case 5: return "모델의 추가 사양, 구성값";
      default: return "";
    }
  };

  const getDataTypeOptions = (section: number) => {
    switch (section) {
      case 2:
        return <option value="float">float</option>;
      case 3:
      case 4:
      case 5:
        return <option value="int">int</option>;
      default:
        return (
          <>
            <option value="int">int</option>
            <option value="float">float</option>
          </>
        );
    }
  };

  const renderCustomSection = (sectionNumber: number) => {
    const hasUnitField = sectionNumber === 1 || sectionNumber === 5;
    
    return (
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base text-gray-300">커스텀 {sectionNumber}: {getSectionTitle(sectionNumber)}</h3>
          <button
            type="button"
            onClick={() => onAddCustomData(sectionNumber as 1 | 2 | 3 | 4 | 5)}
            className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            추가
          </button>
        </div>
        {/* ... 나머지 구현 내용 */}
      </div>
    );
  };

  return (
    <div>
      <div className="py-2 px-4">
        <h2 className="text-lg text-white">커스텀 데이터 정의</h2>
      </div>
      {[1, 2, 3, 4, 5].map(section => renderCustomSection(section as 1 | 2 | 3 | 4 | 5))}
    </div>
  );
} 