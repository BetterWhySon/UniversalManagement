import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import DeleteConfirmPopup from './components/DeleteConfirmPopup';
import GroupSelectPopup from './components/GroupSelectPopup';
import useCstCompanyGroupMapping from '@/api/customer/cstCompanyGroupMapping';
import { typeCstGroup } from '@/api/types/customer/typeCstCompanyGroupMapping';

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
  const { t: trans } = useTranslation('translation');
  const [selectedCompany, setSelectedCompany] = useState<number | undefined>(undefined);
  const [searchCompany, setSearchCompany] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<GroupData | null>(null);
  const [showGroupSelect, setShowGroupSelect] = useState(false);

  const { 
    dataListCompanyGroup, 
    storeCompanyGroupList, 
    storeGroupAssign, 
    storeGroupRelease
  } = useCstCompanyGroupMapping();

  useEffect(() => {
    storeCompanyGroupList(trans);
  }, [trans]);

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
      )
    }
  ];

  // API 데이터를 UI에 맞게 변환
  const companyData = useMemo(() => {
    if (!dataListCompanyGroup) return [];
    return dataListCompanyGroup.map(item => ({
      id: item.site_id,
      code: item.code,
      name: item.site_name,
      description: item.description
    }));
  }, [dataListCompanyGroup]);

  const groupData = useMemo(() => {
    if (!dataListCompanyGroup || !selectedCompany) return {};
    const selectedCompanyData = dataListCompanyGroup.find(item => item.site_id === selectedCompany);
    if (!selectedCompanyData) return {};
    
    return {
      [selectedCompanyData.code]: selectedCompanyData.groups.map(group => ({
        id: group.group_id,
        code: group.code,
        name: group.group_name,
        description: group.description
      }))
    };
  }, [dataListCompanyGroup, selectedCompany]);

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

  const handleConfirmDelete = async () => {
    if (deleteTarget && selectedCompany) {
      await storeGroupRelease(selectedCompany, [Number(deleteTarget.id)], trans);
      await storeCompanyGroupList(trans);
      setDeleteTarget(null);
    }
  };

  const handleGroupAssign = async (selectedGroups: number[]) => {
    if (selectedCompany) {
      await storeGroupAssign(selectedCompany, selectedGroups, trans);
      await storeCompanyGroupList(trans);
      setShowGroupSelect(false);
    }
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
            <div className='w-full bg-hw-dark-2 py-3 px-4 rounded-lg text-hw-white-1 mb-4'>
              <div className='flex flex-row items-center justify-between'>
                <h2 className="text-white text-lg font-medium">사업장 현황</h2>
                <div className='flex items-center'>
                  <input 
                    type="text" 
                    placeholder="검색어를 입력하세요"
                    value={searchCompany}
                    onChange={(e) => setSearchCompany(e.target.value)}
                    className="h-8 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[200px]"
                  />
                </div>
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
            <div className='w-full bg-hw-dark-2 py-3 px-4 rounded-lg text-hw-white-1 mb-4'>
              <div className='flex flex-row items-center justify-between'>
                <div className="flex items-center gap-2">
                  <h2 className="text-white text-lg font-medium">그룹 지정</h2>
                  <span className="text-sm text-gray-400">(최대 12개까지 선택가능)</span>
                </div>
                <button 
                  className='h-8 px-4 rounded-lg bg-blue-500 flex gap-2 items-center justify-center'
                  onClick={() => setShowGroupSelect(true)}
                >
                  <span className='text-hw-white-1 font-light text-sm leading-[125%] whitespace-nowrap'>
                    지정
                  </span>
                </button>
              </div>
            </div>
            <div className="h-[calc(100vh-220px)] overflow-auto">
              <TableData<GroupData>
                data={selectedCompany ? (groupData[companyData.find(c => c.id === selectedCompany)?.code || ''] || []) : []}
                columns={groupColumns}
                emptyMessage="사업장을 클릭하면, 해당 사업장에 지정된 그룹이 표시됩니다."
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
          site_id={selectedCompany || 0}
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