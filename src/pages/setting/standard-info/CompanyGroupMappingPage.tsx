import React, { useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import DeleteConfirmPopup from './components/DeleteConfirmPopup';
import GroupSelectPopup from './components/GroupSelectPopup';

interface CompanyData {
  id: number;
  code: string;
  name: string;
  description?: string;
}

interface GroupData {
  id: number;
  code: string;
  name: string;
  description?: string;
}

const CompanyGroupMappingPage: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<number | undefined>(undefined);
  const [searchCompany, setSearchCompany] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<GroupData | null>(null);
  const [showGroupSelect, setShowGroupSelect] = useState(false);

  // 더미 데이터
  const companyData: CompanyData[] = [
    { id: 1, code: 'seoul', name: '서울지점' },
    { id: 2, code: 'busan', name: '부산지점' },
    { id: 3, code: 'daegu', name: '대구지점' },
    { id: 4, code: 'incheon', name: '인천지점' },
    { id: 5, code: 'gwangju', name: '광주지점' }
  ];

  // 더미 그룹 데이터
  const groupData: { [key: string]: GroupData[] } = {
    'seoul': [
      { id: 1, code: 'seoul-ff', name: 'FF캠핑카' },
      { id: 2, code: 'seoul-bayrun', name: '베이런전동바이크' },
      { id: 3, code: 'seoul-camp', name: '서울캠핑존' }
    ],
    'busan': [
      { id: 4, code: 'busan-camping', name: '캠핑존' },
      { id: 5, code: 'busan-drone', name: '드론파크' },
      { id: 6, code: 'busan-bike', name: '부산바이크' }
    ],
    'daegu': [
      { id: 7, code: 'daegu-outdoor', name: '아웃도어파크' },
      { id: 8, code: 'daegu-bike', name: '대구전동바이크' },
      { id: 9, code: 'daegu-camp1', name: '캠핑존1호점' },
      { id: 10, code: 'daegu-camp2', name: '캠핑존2호점' },
      { id: 11, code: 'daegu-drone1', name: '드론파크1호점' },
      { id: 12, code: 'daegu-drone2', name: '드론파크2호점' },
      { id: 13, code: 'daegu-leisure', name: '레저스포츠' },
      { id: 14, code: 'daegu-marine', name: '마린스포츠' },
      { id: 15, code: 'daegu-extreme', name: '익스트림스포츠' },
      { id: 16, code: 'daegu-adventure', name: '어드벤처' },
      { id: 17, code: 'daegu-eco', name: '에코투어' },
      { id: 18, code: 'daegu-nature', name: '네이처파크' },
      { id: 19, code: 'daegu-urban', name: '어반레저' },
      { id: 20, code: 'daegu-family', name: '패밀리파크' },
      { id: 21, code: 'daegu-sports', name: '스포츠센터' },
      { id: 22, code: 'daegu-water', name: '워터파크' },
      { id: 23, code: 'daegu-racing', name: '레이싱파크' },
      { id: 24, code: 'daegu-climbing', name: '클라이밍센터' },
      { id: 25, code: 'daegu-flying', name: '플라잉존' },
      { id: 26, code: 'daegu-riding', name: '라이딩파크' }
    ],
    'incheon': [
      { id: 9, code: 'incheon-marine', name: '마린스포츠' },
      { id: 10, code: 'incheon-camping', name: '인천캠핑존' },
      { id: 11, code: 'incheon-leisure', name: '레저파크' }
    ],
    'gwangju': [
      { id: 12, code: 'gwangju-bike', name: '광주바이크' },
      { id: 13, code: 'gwangju-camp', name: '광주캠핑존' },
      { id: 14, code: 'gwangju-drone', name: '드론체험장' }
    ]
  };

  const companyColumns = [
    {
      name: 'CODE',
      dataIndex: 'code',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '사업장',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: 'Description',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
    }
  ];

  const groupColumns = [
    {
      name: 'CODE',
      dataIndex: 'code',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '그룹명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: 'Description',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: '해제',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px',
      render: (row: GroupData) => (
        <div className="flex items-center justify-center">
          <button 
            className="w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => handleDelete(row)}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )
    }
  ];

  const filteredCompanies = companyData.filter(company => 
    company.name.toLowerCase().includes(searchCompany.toLowerCase()) ||
    company.code.toLowerCase().includes(searchCompany.toLowerCase())
  );

  const handleCompanyClick = (record: CompanyData) => {
    setSelectedCompany(record.id);
  };

  const handleDelete = (row: GroupData) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      console.log('Delete confirmed:', deleteTarget);
      // TODO: 실제 삭제 로직 구현
    }
    setDeleteTarget(null);
  };

  const handleGroupAssign = (selectedGroups: number[]) => {
    console.log('Selected groups:', selectedGroups);
    // TODO: 실제 그룹 지정 로직 구현
    setShowGroupSelect(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-[18px] lg:px-[55px] pt-3 lg:pt-5">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            사업장/그룹 맵핑
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 사업장 현황 */}
          <div className="w-full hidden xs:block">
            <div className="mb-2 flex justify-between items-center">
              <h2 className="text-white text-lg font-medium">사업장 현황</h2>
              <div className="w-[200px]">
                <input 
                  type="text" 
                  placeholder="검색어를 입력하세요"
                  value={searchCompany}
                  onChange={(e) => setSearchCompany(e.target.value)}
                  className="w-full h-7 text-sm px-3 bg-hw-dark-1 rounded-lg outline-none border border-white/20 text-white"
                />
              </div>
            </div>
            <div className="h-[calc(100vh-220px)] overflow-auto">
              <TableData<CompanyData>
                data={filteredCompanies}
                columns={companyColumns}
                onClick={handleCompanyClick}
                selectedRow={selectedCompany}
                className="min-h-0"
              />
            </div>
          </div>

          {/* 그룹 지정 */}
          <div className="w-full hidden xs:block">
            <div className="mb-2 flex justify-between items-center">
              <h2 className="text-white text-lg font-medium">그룹 지정</h2>
              <button 
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                onClick={() => setShowGroupSelect(true)}
              >
                지정
              </button>
            </div>
            <div className="h-[calc(100vh-220px)] overflow-auto">
              <TableData<GroupData>
                data={selectedCompany ? (groupData[companyData.find(c => c.id === selectedCompany)?.code || ''] || []) : []}
                columns={groupColumns}
                emptyMessage="등록된 사업장을 클릭하면, 해당 사업장의 지정된 그룹이 표시됩니다."
                className="min-h-0"
              />
            </div>
          </div>
        </div>
      </div>

      {showGroupSelect && (
        <GroupSelectPopup
          onClose={() => setShowGroupSelect(false)}
          onConfirm={handleGroupAssign}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmPopup
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          title="그룹 해제"
          message="해당 그룹을 해제 하시겠습니까?"
        />
      )}
    </div>
  );
};

export default CompanyGroupMappingPage; 