import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import AdminRegistrationPopup from './components/AdminRegistrationPopup';
import DeleteConfirmPopup from '@/pages/setting/standard-info/components/DeleteConfirmPopup';
import useAdmUser from '@/api/admin/admUser';
import { typeAdmUserList } from '@/api/types/admin/typeAdmUser';

interface AdminUserData {
  id: number;
  companyName: string;    // 업체명
  userId: string;         // 아이디
  password: string;       // 비밀번호
  name: string;          // 이름
  contact: string;       // 연락처
  email: string;         // e-mail
  role: string;          // 권한
  registrationDate: string; // 등록일자
}

export interface AdminFormData {
  id?: number;
  username: string;      // userId -> username
  password: string;
  customer_id: number;   // 추가
  phonenumber: string;   // contact -> phonenumber
  email: string;
  is_staff: boolean;     // role -> is_staff
  customer: string;      // companyName -> customer
}

export default function AdminUserPage() {
  const { t: trans } = useTranslation('translation');
  const { dataListUser, storeUserList, storeUserDelete, storeUserEdit, storeUserCreate } = useAdmUser();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [editData, setEditData] = useState<typeAdmUserList | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<typeAdmUserList | null>(null);

  useEffect(() => {
    storeUserList(trans);
  }, []);

  const columns = useMemo(() => [
    {
      name: '업체명',
      dataIndex: 'customer',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: typeAdmUserList) => (
        <span className="text-yellow-400">{row.customer}</span>
      )
    },
    {
      name: '아이디',
      dataIndex: 'user_id',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: '이름',
      dataIndex: 'username',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '연락처',
      dataIndex: 'phonenumber',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: 'e-mail',
      dataIndex: 'email',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '180px'
    },
    {
      name: '권한',
      dataIndex: 'is_staff',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: typeAdmUserList) => (
        <span>{row.is_staff ? '관리자' : '일반'}</span>
      )
    },
    {
      name: '등록일자',
      dataIndex: 'registrationDate',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '수정/삭제',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: typeAdmUserList) => (
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
    if (!dataListUser) return [];
    
    if (!searchKeyword) return dataListUser;
    
    return dataListUser.filter(item => 
      item.customer.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.username.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, dataListUser]);

  const handleSave = async (data: typeAdmUserList) => {
    try {
      if (editData) {
        await storeUserEdit(
          editData.id.toString(),
          data.username,
          data.password,
          data.customer_id.toString(),
          data.phonenumber,
          data.email,
          data.is_staff,
          trans
        );
      } else {
        await storeUserCreate(
          data.user_id,
          data.username,
          data.password,
          data.customer_id.toString(),
          data.phonenumber,
          data.email,
          data.is_staff,
          trans
        );
      }
      await storeUserList(trans);
      setIsRegistrationPopupOpen(false);
      setEditData(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (row: typeAdmUserList) => {
    const editFormData: typeAdmUserList = {
      id: row.id,
      user_id: row.user_id,
      username: row.username,
      password: '',
      customer_id: row.customer_id,
      customer: row.customer,
      phonenumber: row.phonenumber,
      email: row.email,
      is_staff: row.is_staff
    };
    
    setEditData(editFormData);
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: typeAdmUserList) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      try {
        await storeUserDelete(deleteTarget.id.toString(), trans);
        await storeUserList(trans);  // 리스트 갱신
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            관리자 등록
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
                  {trans('관리자 등록')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<typeAdmUserList>
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

      {deleteTarget && (
        <DeleteConfirmPopup
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          title="관리자 삭제"
          message="해당 관리자를 삭제하시겠습니까?"
        />
      )}

      {isRegistrationPopupOpen && (
        <AdminRegistrationPopup
          onClose={() => {
            setIsRegistrationPopupOpen(false);
            setEditData(null);
          }}
          onSuccess={() => storeUserList(trans)}
          initialData={editData || undefined}
          mode={editData ? 'edit' : 'create'}
        />
      )}
    </div>
  );
} 