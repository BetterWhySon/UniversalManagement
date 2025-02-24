import React, { useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';

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
  { 
    company: '서울지점', 
    group: 'FF캠핑카', 
    device: 'BAT-001',
    application: '캠핑카',
    packId: 'PACK-001',
    packModel: 'MODEL-A1',
    user: '홍길동',
    contact: '010-1234-5678'
  },
  { 
    company: '부산지점', 
    group: '마린스포츠', 
    device: 'BAT-002',
    application: '수상레저',
    packId: 'PACK-002',
    packModel: 'MODEL-B2',
    user: '김철수',
    contact: '010-2345-6789'
  },
  { 
    company: '대전지점', 
    group: '전기자전거', 
    device: 'BAT-003',
    application: '전기자전거',
    packId: 'PACK-003',
    packModel: 'MODEL-C3',
    user: '이영희',
    contact: '010-3456-7890'
  }
];

const columns = [
  {
    name: 'CODE',
    dataIndex: 'code',
    align: TEXT_ALIGN.CENTER,
  },
  {
    name: '그룹명',
    dataIndex: 'name',
    align: TEXT_ALIGN.CENTER,
  },
  {
    name: '기기명',
    dataIndex: 'device',
    align: TEXT_ALIGN.CENTER
  },
  {
    name: '어플리케이션',
    dataIndex: 'application',
    align: TEXT_ALIGN.CENTER
  },
  {
    name: '팩 ID',
    dataIndex: 'packId',
    align: TEXT_ALIGN.CENTER
  },
  {
    name: '팩 모델',
    dataIndex: 'packModel',
    align: TEXT_ALIGN.CENTER
  },
  {
    name: '사용자',
    dataIndex: 'user',
    align: TEXT_ALIGN.CENTER
  },
  {
    name: '연락처',
    dataIndex: 'contact',
    align: TEXT_ALIGN.CENTER
  }
];

const DeviceSelectPopup: React.FC<DeviceSelectPopupProps> = ({
  isOpen,
  onClose,
  onSelect,
  conditionType,
  title = '기기 선택'
}) => {
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<{[company: string]: string[]}>({});
  const [selections, setSelections] = useState<Selection[]>([]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheck = (itemName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDevice(itemName === selectedDevice ? '' : itemName);
  };

  const handleApply = () => {
    const selections = mockData
      .filter(item => selectedDevice === item.device)
      .map(item => ({
        company: item.company,
        groups: [item.group],
        device: item.device
      }));

    const selectedDevices = mockData.reduce((acc, item) => {
      if (selectedDevice === item.device) {
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

  const handleDeviceClick = (company: string, group: string, device: string) => {
    const newSelectedDevices = { ...selectedDevices };
    const deviceList = newSelectedDevices[company] || [];

    if (deviceList.includes(device)) {
      newSelectedDevices[company] = deviceList.filter(d => d !== device);
      if (newSelectedDevices[company].length === 0) {
        delete newSelectedDevices[company];
      }
    } else {
      newSelectedDevices[company] = [...deviceList, device];
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
        className="bg-slate-800 p-6 rounded-lg border border-white w-[1000px]"
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
          <table className="w-full text-white">
            <thead>
              <tr>
                <th className="border-b border-gray-600 p-2 bg-gray-700">
                  {/* 전체 선택 체크박스 제거 */}
                </th>
                {columns.map((column) => (
                  <th 
                    key={column.dataIndex} 
                    className="border-b border-gray-600 p-2 whitespace-nowrap bg-gray-700"
                  >
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData.map((item) => (
                <tr 
                  key={item.device}
                  className="cursor-pointer hover:bg-slate-700"
                  onClick={() => {
                    const selections = [{
                      company: item.company,
                      groups: [item.group],
                      device: item.device
                    }];
                    
                    const selectedDevices = {
                      [item.company]: [item.device]
                    };
                    
                    onSelect(selections, selectedDevices);
                    onClose();
                  }}
                >
                  <td className="border-b border-gray-600 p-2 whitespace-nowrap text-center">{highlightText(item.company)}</td>
                  <td className="border-b border-gray-600 p-2 whitespace-nowrap text-center">{highlightText(item.group)}</td>
                  <td className="border-b border-gray-600 p-2 whitespace-nowrap text-center">{highlightText(item.device)}</td>
                  <td className="border-b border-gray-600 p-2 whitespace-nowrap text-center">{highlightText(item.application)}</td>
                  <td className="border-b border-gray-600 p-2 whitespace-nowrap text-center">{highlightText(item.packId)}</td>
                  <td className="border-b border-gray-600 p-2 whitespace-nowrap text-center">{highlightText(item.packModel)}</td>
                  <td className="border-b border-gray-600 p-2 whitespace-nowrap text-center">{highlightText(item.user)}</td>
                  <td className="border-b border-gray-600 p-2 whitespace-nowrap text-center">{highlightText(item.contact)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-2 p-5 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-[#363B46] text-white rounded hover:bg-[#363B46]/80 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceSelectPopup; 