import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import GroupRegistrationPopup from './components/GroupRegistrationPopup';
import DeleteConfirmPopup from './components/DeleteConfirmPopup';
import useCstGroup from '@/api/customer/cstGroup';

interface GroupData {
  id: number;
  group_id: number;
  site_id: number;
  code: string;
  group_name: string;
  site_name: string;
  zipno: string;
  address_main: string;
  address_sub: string;
  description: string;
  belongCompany: string;
}

const GroupRegistrationPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [editData, setEditData] = useState<GroupData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GroupData | null>(null);
  
  const { dataListGroup, storeGroupList, storeGroupCreate, storeGroupUpdate, storeGroupDelete } = useCstGroup();

  useEffect(() => {
    storeGroupList(trans);
  }, [trans]);

  const columns = useMemo(() => [
    {
      name: 'CODE',
      dataIndex: 'code',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '그룹명',
      dataIndex: 'group_name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '180px'
    },
    {
      name: '사업장',
      dataIndex: 'site_name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '180px'
    },
    {
      name: '우편번호',
      dataIndex: 'zipno',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '주소',
      dataIndex: 'address_main',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '300px'
    },
    {
      name: '상세주소',
      dataIndex: 'address_sub',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px'
    },
    {
      name: 'Description',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px'
    },
    {
      name: '수정 삭제',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: GroupData) => (
        <div className="flex items-center justify-center gap-2">
          <button 
            className="w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => handleEdit(row)}
          >
            <svg 
              className="w-5 h-5 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 22 22"
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
            className="w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => handleDelete(row)}
          >
            <svg 
              className="w-5 h-5 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 22 22"
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
  ], []);

  const getFilteredData = useMemo(() => {
    if (!dataListGroup) return [];
    if (!searchKeyword) return dataListGroup.map(item => ({
      ...item,
      id: item.group_id,
      site_id: item.site_id,
      site_name: item.site_name,
      belongCompany: ''
    }));
    return dataListGroup
      .filter(item => 
        item.group_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.code.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      .map(item => ({
        ...item,
        id: item.group_id,
        site_id: item.site_id,
        site_name: item.site_name,
        belongCompany: ''
      }));
  }, [searchKeyword, dataListGroup]);

  const handleEdit = (row: GroupData) => {
    setEditData(row);
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: GroupData) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await storeGroupDelete(deleteTarget.group_id, trans);
      await storeGroupList(trans);
      setDeleteTarget(null);
    }
  };

  const handleSaveGroup = async (data: {
    site_id: number;
    code: string;
    group_name: string;
    zipno: string;
    address_main: string;
    address_sub: string;
    description: string;
    belongCompany: string;
    site_name: string;
  }) => {
    try {
      if (editData) {
        await storeGroupUpdate(
          editData.group_id,
          data.group_name,
          data.zipno,
          data.address_main,
          data.address_sub,
          data.description,
          data.site_id,
          trans
        );
      } else {
        await storeGroupCreate(
          data.site_id,
          data.group_name,
          data.zipno,
          data.address_main,
          data.address_sub,
          data.description,
          trans
        );
      }
      setIsRegistrationPopupOpen(false);
      setEditData(null);
      await storeGroupList(trans);
    } catch (error) {
      console.error('저장 중 오류가 발생했습니다:', error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            그룹 등록
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 py-3 px-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center'>
                <input 
                  type="text" 
                  className="h-8 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[200px]"
                  placeholder="검색어를 입력하세요"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button 
                className='h-8 px-4 rounded-lg bg-blue-500 flex gap-2 items-center justify-center'
                onClick={() => setIsRegistrationPopupOpen(true)}
              >
                <span className='text-hw-white-1 font-light text-sm leading-[125%] whitespace-nowrap'>
                  {trans('그룹 등록')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<GroupData>
            data={getFilteredData}
            columns={columns}
            isPagination
            pagination={{
              total: getFilteredData.length,
              pageSize: 12,
            }}
            paginationMarginTop='32px'
            emptyMessage={trans('데이터가 없습니다.')}
          />
        </div>

        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 구현 */}
        </div>
      </div>

      {isRegistrationPopupOpen && (
        <GroupRegistrationPopup
          onClose={() => {
            setIsRegistrationPopupOpen(false);
            setEditData(null);
          }}
          onSave={handleSaveGroup}
          initialData={editData ? {
            site_id: editData.site_id,
            code: editData.code,
            group_name: editData.group_name,
            zipno: editData.zipno,
            address_main: editData.address_main,
            address_sub: editData.address_sub,
            description: editData.description,
            belongCompany: editData.belongCompany,
            site_name: editData.site_name
          } : undefined}
          mode={editData ? 'edit' : 'create'}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmPopup
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          title="그룹 삭제"
          message="해당 그룹을 삭제하시겠습니까?"
        />
      )}
    </div>
  );
};

export default GroupRegistrationPage; 