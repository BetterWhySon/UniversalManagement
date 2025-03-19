import React, { useState, useEffect } from 'react';
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
  pageType?: 'item' | 'device';
  selectedDeviceIds?: string[];
  allowInfiniteSelection?: boolean;
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
  },
  { 
    company: '인천지점', 
    group: '전동킥보드', 
    device: 'BAT-004',
    application: '전동킥보드',
    packId: 'PACK-004',
    packModel: 'MODEL-D4',
    user: '박민준',
    contact: '010-4567-8901'
  },
  { 
    company: '광주지점', 
    group: '전기스쿠터', 
    device: 'BAT-005',
    application: '전기스쿠터',
    packId: 'PACK-005',
    packModel: 'MODEL-E5',
    user: '정수민',
    contact: '010-5678-9012'
  },
  { 
    company: '대구지점', 
    group: '전기골프카트', 
    device: 'BAT-006',
    application: '골프카트',
    packId: 'PACK-006',
    packModel: 'MODEL-F6',
    user: '최지원',
    contact: '010-6789-0123'
  }
];

const columns = [
  {
    name: '',
    dataIndex: 'checkbox',
    align: TEXT_ALIGN.CENTER,
  },
  {
    name: '사업장',
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
  title = '기기 선택',
  pageType = 'item',
  selectedDeviceIds = [],
  allowInfiniteSelection = false
}) => {
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<{[company: string]: string[]}>({});
  const [selections, setSelections] = useState<Selection[]>([]);
  const [checkedDevices, setCheckedDevices] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      // 이미 동일한 기기가 선택되어 있는지 확인
      const alreadySelectedDevicesEqual = 
        checkedDevices.length === selectedDeviceIds.length && 
        checkedDevices.every(device => selectedDeviceIds.includes(device));
      
      // 이미 같은 기기가 선택되어 있으면 상태를 업데이트하지 않음
      if (!alreadySelectedDevicesEqual && selectedDeviceIds.length > 0) {
        setCheckedDevices(selectedDeviceIds);
        
        // 선택된 기기들의 회사별 매핑 정보 구성
        const deviceMap = mockData.reduce((acc, item) => {
          if (selectedDeviceIds.includes(item.device)) {
            acc[item.company] = acc[item.company] || [];
            acc[item.company].push(item.device);
          }
          return acc;
        }, {} as {[company: string]: string[]});
        
        setSelectedDevices(deviceMap);
        
        // selections 상태 업데이트
        const newSelections = mockData
          .filter(item => selectedDeviceIds.includes(item.device))
          .map(item => ({
            company: item.company,
            groups: [item.group],
            device: item.device
          }));
        
        setSelections(newSelections);
        
        // item 페이지 타입인 경우 첫 번째 선택된 기기를 current로 설정
        if (pageType === 'item' && selectedDeviceIds.length > 0) {
          setSelectedDevice(selectedDeviceIds[0]);
        }
      }
    } else {
      // 팝업이 닫힐 때 상태 초기화 (기존 로직 유지)
      setCheckedDevices([]);
      setSelectedDevice('');
      setSelectedDevices({});
      setSelections([]);
    }
  }, [isOpen, selectedDeviceIds, pageType]);

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

  const handleCheckboxClick = (e: React.MouseEvent, device: string, company: string, group: string) => {
    if (pageType === 'device') {
      const isChecked = checkedDevices.includes(device);
      
      if (isChecked) {
        setCheckedDevices(prev => prev.filter(d => d !== device));
        
        const newSelectedDevices = { ...selectedDevices };
        if (newSelectedDevices[company]) {
          newSelectedDevices[company] = newSelectedDevices[company].filter(d => d !== device);
          if (newSelectedDevices[company].length === 0) {
            delete newSelectedDevices[company];
          }
        }
        setSelectedDevices(newSelectedDevices);
        updateSelections(newSelectedDevices);
      } else {
        // 무한선택 허용 여부 확인
        if (!allowInfiniteSelection && checkedDevices.length >= 3) {
          return;
        }
        
        setCheckedDevices(prev => [...prev, device]);
        
        const newSelectedDevices = { ...selectedDevices };
        if (!newSelectedDevices[company]) {
          newSelectedDevices[company] = [];
        }
        newSelectedDevices[company] = [...newSelectedDevices[company], device];
        setSelectedDevices(newSelectedDevices);
        updateSelections(newSelectedDevices);
      }
    } else {
      setSelectedDevice(device);
    }
  };

  const handleApply = () => {
    if (pageType === 'device') {
      const newSelections = mockData
        .filter(item => checkedDevices.includes(item.device))
        .map(item => ({
          company: item.company,
          groups: [item.group],
          device: item.device
        }));

      const newSelectedDevices = mockData.reduce((acc, item) => {
        if (checkedDevices.includes(item.device)) {
          acc[item.company] = acc[item.company] || [];
          acc[item.company].push(item.device);
        }
        return acc;
      }, {} as {[company: string]: string[]});

      onSelect(newSelections, newSelectedDevices);
    } else {
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
    }
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
    if (pageType === 'device') {
      handleCheckboxClick({} as React.MouseEvent, device, company, group);
    } else {
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
    }
  };

  const updateSelections = (newSelectedDevices: {[company: string]: string[]}) => {
    const newSelections: Selection[] = [];
    
    Object.entries(newSelectedDevices).forEach(([company, devices]) => {
      devices.forEach(device => {
        const deviceData = mockData.find(item => item.device === device);
        if (deviceData) {
          newSelections.push({
            company,
            groups: [deviceData.group],
            device
          });
        }
      });
    });
    
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
                {pageType === 'device' && (
                  <th className="border-b border-gray-600 p-2 bg-gray-700 w-10">
                    
                  </th>
                )}
                {columns.slice(pageType === 'device' ? 1 : 0).map((column) => (
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
                  onClick={(e) => {
                    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
                      return;
                    }
                    
                    if (pageType === 'device') {
                      handleDeviceClick(item.company, item.group, item.device);
                    } else {
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
                    }
                  }}
                >
                  {pageType === 'device' && (
                    <td className="border-b border-gray-600 p-2 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={checkedDevices.includes(item.device)}
                        onChange={() => {}}
                        onClick={(e) => {
                          handleCheckboxClick(e, item.device, item.company, item.group);
                        }}
                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      />
                    </td>
                  )}
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
          {pageType === 'device' && (
            <button
              onClick={handleApply}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={checkedDevices.length === 0}
            >
              확인 {!allowInfiniteSelection ? `(${checkedDevices.length}/3)` : `(${checkedDevices.length})`}
            </button>
          )}
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