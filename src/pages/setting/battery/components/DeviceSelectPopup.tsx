import React, { useState } from 'react';

interface Selection {
  company: string;
  groups: string[];
  device?: string;
}

interface DeviceSelectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selections: Selection[], selectedDevices: {[company: string]: string[]}) => void;
  conditionType: '사업장' | '그룹' | '기기';
  title?: string;
}

const mockData = [
  { company: '사업장1', group: '그룹명1', device: '기기명1', packId: '팩ID 1', packInfo: 'PACK_01' },
  { company: '사업장1', group: '그룹명1', device: '기기명2', packId: 'ID2', packInfo: 'PACK_01' },
  { company: '사업장1', group: '그룹명1', device: '기기명5', packId: 'ID5', packInfo: 'PACK_01' },
  { company: '사업장1', group: '그룹명2', device: '기기명6', packId: 'ID6', packInfo: 'PACK_01' },
  { company: '사업장1', group: '그룹명2', device: '기기명7', packId: 'ID7', packInfo: 'PACK_02' },
  { company: '사업장2', group: '그룹명7', device: '기기명32', packId: 'ID32', packInfo: 'PACK_02' },
  { company: '사업장2', group: '그룹명7', device: '기기명33', packId: 'ID33', packInfo: 'PACK_02' },
  { company: '사업장2', group: '그룹명8', device: '기기명34', packId: 'ID34', packInfo: 'PACK_03' },
  { company: '사업장2', group: '그룹명8', device: '기기명35', packId: 'ID35', packInfo: 'PACK_03' },
  { company: '사업장2', group: '그룹명8', device: '기기명36', packId: 'ID36', packInfo: 'PACK_04' },
  { company: '사업장2', group: '그룹명8', device: '기기명37', packId: 'ID37', packInfo: 'PACK_04' }
];

const DeviceSelectPopup: React.FC<DeviceSelectPopupProps> = ({
  isOpen,
  onClose,
  onSelect,
  conditionType,
  title = '기기 선택'
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<{[company: string]: string[]}>({});
  const [selections, setSelections] = useState<Selection[]>([]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheck = (itemName: string) => {
    if (conditionType === '기기') {
      // 기기 단위 선택일 경우 단일 선택만 가능
      setCheckedItems([itemName]);
    } else {
      // 다른 조건일 경우 기존 로직 유지
      setCheckedItems(prev => {
        if (prev.includes(itemName)) {
          return prev.filter(item => item !== itemName);
        }
        return [...prev, itemName];
      });
    }
  };

  const handleApply = () => {
    const selections = mockData
      .filter(item => checkedItems.includes(item.device))
      .map(item => ({
        company: item.company,
        groups: [item.group],
        device: item.device
      }));

    const selectedDevices = mockData.reduce((acc, item) => {
      if (checkedItems.includes(item.device)) {
        acc[item.company] = acc[item.company] || [];
        acc[item.company].push(item.device);
      }
      return acc;
    }, {} as {[company: string]: string[]});

    onSelect(selections, selectedDevices);
    onClose();
  };

  const highlightText = (text: string) => {
    if (!searchText) return <span>{text}</span>;
    
    return text.toLowerCase().includes(searchText.toLowerCase()) ? (
      <span className="text-green-400">{text}</span>
    ) : (
      <span>{text}</span>
    );
  };

  const handleAllCheck = () => {
    if (conditionType === '기기') return; // 기기 단위 선택일 때는 전체 선택 불가

    if (checkedItems.length === mockData.length) {
      setCheckedItems([]);
    } else {
      const allDevices = mockData.map(item => item.device);
      setCheckedItems(allDevices);
    }
  };

  const handleDeviceClick = (company: string, group: string, device: string) => {
    // 기기 단위 선택이고 이미 다른 기기가 선택되어 있을 경우, 기존 선택을 모두 해제
    if (conditionType === '기기' && selectedDevices[company]?.length > 0) {
      setSelectedDevices({});
      setSelections([]);
    }

    const newSelectedDevices = { ...selectedDevices };
    const deviceList = newSelectedDevices[company] || [];

    if (deviceList.includes(device)) {
      // 선택 해제 로직
      newSelectedDevices[company] = deviceList.filter(d => d !== device);
      if (newSelectedDevices[company].length === 0) {
        delete newSelectedDevices[company];
      }
    } else {
      // 기기 단위 선택일 경우 단일 선택만 허용
      if (conditionType === '기기') {
        newSelectedDevices[company] = [device];
      } else {
        newSelectedDevices[company] = [...deviceList, device];
      }
    }

    setSelectedDevices(newSelectedDevices);
    updateSelections(newSelectedDevices);
  };

  const updateSelections = (newSelectedDevices: {[company: string]: string[]}) => {
    const newSelections = Object.entries(newSelectedDevices).map(([company, devices]) => ({
      company,
      groups: [],
      device: devices[0]
    }));
    setSelections(newSelections);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-slate-800 p-6 rounded-lg border border-white w-[800px]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">{title}</h2>
          <div className="flex items-center">
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
        </div>

        <div className="border border-gray-600 rounded h-[400px] overflow-auto">
          <table className="w-full text-white border-collapse">
            <colgroup>
              <col className="w-[50px]" />
              <col className="w-[200px]" />
              <col className="w-[200px]" />
              <col className="w-[200px]" />
              <col className="w-[200px]" />
              <col />
            </colgroup>
            <thead className="bg-gray-700 sticky top-0">
              <tr>
                <th className="p-2 border-b border-r border-gray-600 text-center">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={checkedItems.length === mockData.length}
                      onChange={handleAllCheck}
                      className={`
                        ${checkedItems.length === mockData.length ? 'accent-blue-500' : ''}
                      `}
                    />
                  </div>
                </th>
                <th className="p-2 text-left border-b border-r border-gray-600">사업장</th>
                <th className="p-2 text-left border-b border-r border-gray-600">그룹명</th>
                <th className="p-2 text-left border-b border-r border-gray-600">기기명</th>
                <th className="p-2 text-left border-b border-r border-gray-600">팩ID</th>
                <th className="p-2 text-left border-b border-gray-600">팩정보</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, index) => (
                <tr 
                  key={item.device}
                  className="cursor-pointer hover:bg-slate-700"
                  onClick={() => handleDeviceClick(item.company, item.group, item.device)}
                >
                  <td className="border-b border-gray-600 p-2">
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(item.device)}
                      onChange={() => handleCheck(item.device)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="border-b border-gray-600 p-2">{highlightText(item.company)}</td>
                  <td className="border-b border-gray-600 p-2">{highlightText(item.group)}</td>
                  <td className="border-b border-gray-600 p-2">{highlightText(item.device)}</td>
                  <td className="border-b border-gray-600 p-2">{highlightText(item.packId)}</td>
                  <td className="border-b border-gray-600 p-2">{highlightText(item.packInfo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-6">
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
            선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceSelectPopup; 