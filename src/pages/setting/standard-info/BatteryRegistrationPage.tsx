import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import CompanySelectPopup from './components/CompanySelectPopup';
import AlertPopup from './components/AlertPopup';
import GroupSelectPopup from './components/GroupSelectPopup';
import BatteryEditPopup from './components/BatteryEditPopup';
import DeleteConfirmPopup from './components/DeleteConfirmPopup';
import CompanyGroupAssignPopup from './components/CompanyGroupAssignPopup';

interface BatteryData {
  id: number;
  company: string;
  group: string;
  deviceName: string;
  application: string;
  manufacturer: string;
  packId: string;
  packModel: string;
  user: string;
  contact: string;
  address: string;
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
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState('배터리를 선택해주세요.');
  const [isCompanyGroupAssignOpen, setIsCompanyGroupAssignOpen] = useState(false);
  const [tempSelectedCompany, setTempSelectedCompany] = useState<string>('');
  const [tempSelectedGroup, setTempSelectedGroup] = useState<string>('');

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

    if (!tempSelectedCompany) {
      setAlertMessage('사업장을 먼저 지정해주세요.');
      setShowAlert(true);
      return;
    }

    // 선택된 데이터들의 사업장 확인
    const selectedItems = getFilteredData.filter(item => selectedRows.includes(item.id));
    const companies = new Set(selectedItems.map(item => item.company));

    if (companies.size > 1) {
      setShowAlert(true);
      setAlertMessage('같은 사업장만 선택 가능합니다.');
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
    { 
      id: 1, 
      company: '서울지점', 
      group: 'FF캠핑카', 
      deviceName: 'BAT-001',
      application: '캠핑카',
      manufacturer: '삼성SDI',
      packId: 'PACK-001',
      packModel: 'MODEL-A1',
      user: '홍길동',
      contact: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123', 
      registrationDate: '2024.03.19'
    },
    { 
      id: 2, 
      company: '부산지점', 
      group: '마린스포츠', 
      deviceName: 'BAT-002',
      application: '수상레저',
      manufacturer: 'LG에너지솔루션',
      packId: 'PACK-002',
      packModel: 'MODEL-B2',
      user: '김철수',
      contact: '010-2345-6789',
      address: '부산시 해운대구 마린시티로 456', 
      registrationDate: '2024.03.18'
    }
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
      fixedWidth: '40px',
      render: (row: BatteryData) => (
        <div className="px-3">
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={() => handleSelectRow(row.id)}
            className="w-4 h-4 accent-blue-500"
          />
        </div>
      )
    },
    {
      name: '사업장',
      dataIndex: 'company',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '그룹명',
      dataIndex: 'group',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '기기명',
      dataIndex: 'deviceName',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '어플리케이션',
      dataIndex: 'application',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '배터리 제조사',
      dataIndex: 'manufacturer',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '팩 ID',
      dataIndex: 'packId',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '팩 모델정보',
      dataIndex: 'packModel',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '사용자',
      dataIndex: 'user',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '연락처',
      dataIndex: 'contact',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '주소',
      dataIndex: 'address',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px'
    },
    {
      name: '등록일자',
      dataIndex: 'registrationDate',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '관리',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: BatteryData) => (
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={() => setEditData(row)}
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <svg 
              className="w-5 h-5 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
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
            onClick={() => handleDelete(row.id)}
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <svg 
              className="w-5 h-5 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
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
    setTempSelectedCompany(companyName);
    setIsCompanySelectOpen(false);
  };

  const handleGroupSelect = (selectedGroups: string) => {
    // 선택된 그룹 처리 로직
    setTempSelectedGroup(selectedGroups);
    setIsGroupSelectOpen(false);
  };

  const handleCompanyGroupConfirm = (type: 'company' | 'group', value: string) => {
    if (type === 'company') {
      // TODO: 실제 사업장 저장 로직 구현
      console.log('Assigned company:', value);
    } else {
      // TODO: 실제 그룹 저장 로직 구현
      console.log('Assigned group:', value);
    }
    setIsCompanyGroupAssignOpen(false);
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

  const handleDelete = (id: number) => {
    setDeleteTarget(id);
  };

  const handleCompanyGroupAssign = () => {
    if (selectedRows.length === 0) {
      setShowAlert(true);
      return;
    }
    setIsCompanyGroupAssignOpen(true);
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
              onClick={handleCompanyGroupAssign}
            >
              사업장/그룹 지정
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
            // emptyMessage={trans('데이터가 없습니다.')}
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
          isSingleSelect={isCompanyGroupAssignOpen}
        />
      )}

      {showAlert && (
        <AlertPopup
          message={alertMessage}
          onClose={() => {
            setShowAlert(false);
            setAlertMessage('배터리를 선택해주세요.');  // 기본 메시지로 초기화
          }}
        />
      )}

      {editData && (
        <BatteryEditPopup
          onClose={() => setEditData(null)}
          onSave={handleSaveEdit}
          initialData={editData}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmPopup
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            // TODO: 삭제 로직 구현
            console.log('Deleted:', deleteTarget);
            setDeleteTarget(null);
          }}
          title="배터리 삭제"
          message="해당 배터리를 삭제하시겠습니까?"
        />
      )}

      {isCompanyGroupAssignOpen && (
        <CompanyGroupAssignPopup
          onClose={() => setIsCompanyGroupAssignOpen(false)}
          onCompanyAssign={() => setIsCompanySelectOpen(true)}
          onGroupAssign={() => setIsGroupSelectOpen(true)}
          onConfirm={handleCompanyGroupConfirm}
          selectedCompany={tempSelectedCompany}
          selectedGroup={tempSelectedGroup}
        />
      )}
    </div>
  );
};

export default BatteryRegistrationPage; 