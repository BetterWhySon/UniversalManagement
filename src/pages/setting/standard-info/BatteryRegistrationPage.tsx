import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import CompanySelectPopup from './components/CompanySelectPopup';
import AlertPopup from './components/AlertPopup';
import GroupSelectPopup from './components/GroupSelectPopup';
import BatteryEditPopup from './components/BatteryEditPopup';

interface BatteryData {
  id: number;
  company: string;
  group: string;
  user: string;
  contact: string;
  address: string;
  itemCategory: string;
  batteryStatus: string;
  packId: string;
  approvalStatus: string;
  registrationDate: string;
}

const BatteryRegistrationPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isCompanySelectOpen, setIsCompanySelectOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isGroupSelectOpen, setIsGroupSelectOpen] = useState(false);
  const [editData, setEditData] = useState<BatteryData | null>(null);

  // 이벤트 핸들러 수정
  const handleCompanyAssign = () => {
    if (selectedRows.length === 0) {
      setShowAlert(true);
      return;
    }
    setIsCompanySelectOpen(true);
  };

  const handleGroupAssign = () => {
    if (selectedRows.length === 0) {
      setShowAlert(true);
      return;
    }
    setIsGroupSelectOpen(true);
  };

  const handleAssignReset = () => {
    if (selectedRows.length === 0) {
      setShowAlert(true);
      return;
    }
    // TODO: 사업장/그룹 지정해제 로직 구현
  };

  // 전체 선택 핸들러 추가
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(getFilteredData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  // 개별 선택 핸들러 추가
  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  // 더미 데이터 수정
  const dummyData: BatteryData[] = [
    // 서울지점
    { id: 1, company: '서울지점', group: 'FF캠핑카', user: 'BAT-001', contact: '010-1234-5678', address: '서울시 강남구', itemCategory: '캠핑카', batteryStatus: '정상', packId: 'ff-001', approvalStatus: 'O', registrationDate: '2024.11.08' },
    { id: 2, company: '서울지점', group: '베이런전동바이크', user: 'BAT-101', contact: '010-2345-6789', address: '서울시 서초구', itemCategory: '전동바이크', batteryStatus: '정상', packId: 'bayrun-001', approvalStatus: 'O', registrationDate: '2024.11.08' },
    
    // 부산지점
    { id: 3, company: '부산지점', group: '캠핑존', user: 'BAT-001', contact: '010-3456-7890', address: '부산시 해운대구', itemCategory: '캠핑카', batteryStatus: '정상', packId: 'camp-001', approvalStatus: 'O', registrationDate: '2024.11.07' },
    { id: 4, company: '부산지점', group: '드론파크', user: 'BAT-001', contact: '010-4567-8901', address: '부산시 수영구', itemCategory: '드론', batteryStatus: '정상', packId: 'drone-001', approvalStatus: 'O', registrationDate: '2024.11.07' },
    
    // 대구지점
    { id: 5, company: '대구지점', group: '아웃도어파크', user: 'BAT-001', contact: '010-5678-9012', address: '대구시 중구', itemCategory: '아웃도어', batteryStatus: '정상', packId: 'outdoor-001', approvalStatus: 'O', registrationDate: '2024.11.06' },
    { id: 6, company: '대구지점', group: '대구전동바이크', user: 'BAT-001', contact: '010-6789-0123', address: '대구시 수성구', itemCategory: '전동바이크', batteryStatus: '정상', packId: 'bike-001', approvalStatus: 'O', registrationDate: '2024.11.06' },
    { id: 7, company: '대구지점', group: '캠핑존원', user: 'BAT-001', contact: '010-7890-1234', address: '대구시 동구', itemCategory: '캠핑카', batteryStatus: '정상', packId: 'camp1-001', approvalStatus: 'O', registrationDate: '2024.11.05' },
    { id: 8, company: '대구지점', group: '캠핑존투', user: 'BAT-001', contact: '010-8901-2345', address: '대구시 서구', itemCategory: '캠핑카', batteryStatus: '정상', packId: 'camp2-001', approvalStatus: 'O', registrationDate: '2024.11.05' },
    
    // 광주지점
    { id: 9, company: '광주지점', group: '아웃도어파크', user: 'BAT-001', contact: '010-9012-3456', address: '광주시 서구', itemCategory: '아웃도어', batteryStatus: '정상', packId: 'gwangju-out-001', approvalStatus: 'O', registrationDate: '2024.11.04' },
    { id: 10, company: '광주지점', group: '전동바이크', user: 'BAT-001', contact: '010-0123-4567', address: '광주시 남구', itemCategory: '전동바이크', batteryStatus: '정상', packId: 'gwangju-bike-001', approvalStatus: 'O', registrationDate: '2024.11.04' },
    
    // 인천지점
    { id: 11, company: '인천지점', group: '마린스포츠', user: 'BAT-001', contact: '010-1111-2222', address: '인천시 연수구', itemCategory: '수상레저', batteryStatus: '정상', packId: 'incheon-mar-001', approvalStatus: 'O', registrationDate: '2024.11.03' },
    { id: 12, company: '인천지점', group: '드론파크', user: 'BAT-001', contact: '010-2222-3333', address: '인천시 중구', itemCategory: '드론', batteryStatus: '정상', packId: 'incheon-drone-001', approvalStatus: 'O', registrationDate: '2024.11.03' }
  ];

  const getFilteredData = useMemo(() => {
    return dummyData.filter(item => {
      const matchesKeyword = !searchKeyword || 
        item.user.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.contact.includes(searchKeyword);
      
      const matchesCompany = !selectedCompany || item.company === selectedCompany;
      const matchesGroup = !selectedGroup || item.group === selectedGroup;
      
      const matchesUnassigned = !showUnassignedOnly || 
        (item.company === '미지정' && item.group === '미지정');

      return matchesKeyword && matchesCompany && matchesGroup && matchesUnassigned;
    });
  }, [searchKeyword, selectedCompany, selectedGroup, showUnassignedOnly, dummyData]);

  const columns = useMemo(() => [
    {
      name: '',
      dataIndex: 'checkbox',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '50px',
      render: (row: BatteryData) => (
        <div className="px-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={() => handleSelectRow(row.id)}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
        </div>
      ),
      title: (
        <div className="px-3">
          <input
            type="checkbox"
            checked={selectedRows.length === getFilteredData.length && getFilteredData.length > 0}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
        </div>
      )
    },
    {
      name: '사업장',
      dataIndex: 'company',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: BatteryData) => (
        <div 
          className="cursor-pointer"
          onDoubleClick={() => {
            setSelectedRows([row.id]);  // 해당 행만 선택
            setIsCompanySelectOpen(true);  // 사업장 지정 팝업 열기
          }}
        >
          {row.company}
        </div>
      )
    },
    {
      name: '그룹',
      dataIndex: 'group',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: BatteryData) => (
        <div 
          className="cursor-pointer"
          onDoubleClick={() => {
            setSelectedRows([row.id]);
            setIsGroupSelectOpen(true);
          }}
        >
          {row.group}
        </div>
      )
    },
    {
      name: '기기명',
      dataIndex: 'user',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: BatteryData) => (
        <div 
          className="cursor-pointer"
          onDoubleClick={() => handleEdit(row.id)}
        >
          {row.user}
        </div>
      )
    },
    {
      name: '사용자',
      dataIndex: 'contact',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: '주소',
      dataIndex: 'address',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '300px'
    },
    {
      name: '아이템카테고리',
      dataIndex: 'itemCategory',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '배터리생산처',
      dataIndex: 'batteryStatus',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '팩 모델정보',
      dataIndex: 'packId',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '개인(위치)정보제공 동의',
      dataIndex: 'approvalStatus',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '180px'
    },
    {
      name: '등록일자',
      dataIndex: 'registrationDate',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '관리',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: BatteryData) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="수정"
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
              />
            </svg>
          </button>
          <button
            onClick={() => handleReset(row.id)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="해제"
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      )
    }
  ], [selectedRows, getFilteredData]);

  // 사업장 목록 (중복 제거)
  const companies = [...new Set(dummyData.map(item => item.company))];
  // 그룹 목록 (중복 제거)
  const groups = [...new Set(dummyData.map(item => item.group))];

  const handleCompanySelect = (companyName: string) => {
    // 선택된 사업장 처리 로직
    setIsCompanySelectOpen(false);
  };

  const handleGroupSelect = (selectedGroups: number[]) => {
    // 선택된 그룹 처리 로직
    setIsGroupSelectOpen(false);
  };

  // 수정, 해제 핸들러 추가
  const handleEdit = (id: number) => {
    const batteryToEdit = dummyData.find(item => item.id === id);
    if (batteryToEdit) {
      setEditData(batteryToEdit);
    }
  };

  const handleSaveEdit = (data: BatteryData) => {
    // TODO: 수정된 데이터 저장 로직 구현
    console.log('Saved:', data);
    setEditData(null);
  };

  const handleReset = (id: number) => {
    // TODO: 해제 로직 구현
    console.log('Reset:', id);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            배터리 등록
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 py-3 px-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-center gap-4'>
            <button
              className="h-8 px-4 text-sm bg-[#363B46] text-white rounded hover:bg-opacity-80 transition-colors"
              onClick={handleCompanyAssign}
            >
              사업장 지정
            </button>

            <button
              className="h-8 px-4 text-sm bg-[#363B46] text-white rounded hover:bg-opacity-80 transition-colors"
              onClick={handleGroupAssign}
            >
              그룹 지정
            </button>

            <button
              className="h-8 px-4 text-sm bg-[#363B46] text-white rounded hover:bg-opacity-80 transition-colors"
              onClick={handleAssignReset}
            >
              사업장/그룹 지정해제
            </button>

            <input 
              type="text" 
              className="h-8 text-sm px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[200px] placeholder-white/40"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="unassignedOnly"
                checked={showUnassignedOnly}
                onChange={(e) => setShowUnassignedOnly(e.target.checked)}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <label htmlFor="unassignedOnly" className="text-sm text-white cursor-pointer">
                미지정 사업장/그룹만
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<BatteryData>
            data={getFilteredData}
            columns={columns}
            isPagination
            pagination={{
              total: getFilteredData.length,
              pageSize: 14,
            }}
            paginationMarginTop='32px'
            emptyMessage={trans('데이터가 없습니다.')}
          />
        </div>

        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 구현 */}
        </div>
      </div>

      {isCompanySelectOpen && (
        <CompanySelectPopup
          onClose={() => setIsCompanySelectOpen(false)}
          onConfirm={handleCompanySelect}
        />
      )}

      {isGroupSelectOpen && (
        <GroupSelectPopup
          onClose={() => setIsGroupSelectOpen(false)}
          onConfirm={handleGroupSelect}
        />
      )}

      {showAlert && (
        <AlertPopup
          message="배터리를 선택해주세요."
          onClose={() => setShowAlert(false)}
        />
      )}

      {editData && (
        <BatteryEditPopup
          onClose={() => setEditData(null)}
          onSave={handleSaveEdit}
          initialData={editData}
        />
      )}
    </div>
  );
};

export default BatteryRegistrationPage; 