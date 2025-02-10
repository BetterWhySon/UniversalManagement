import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import AdminRegistrationPopup from './components/AdminRegistrationPopup';
import DeleteConfirmPopup from '@/pages/setting/standard-info/components/DeleteConfirmPopup';

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
  companyName: string;
  userId: string;
  password: string;
  name: string;
  contact: string;
  email: string;
  role: 'admin' | 'user';
}

export default function AdminUserPage() {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [editData, setEditData] = useState<AdminFormData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUserData | null>(null);

  const columns = useMemo(() => [
    {
      name: '업체명',
      dataIndex: 'companyName',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: AdminUserData) => (
        <span className="text-yellow-400">{row.companyName}</span>
      )
    },
    {
      name: '아이디',
      dataIndex: 'userId',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: '비밀번호',
      dataIndex: 'password',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '이름',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '연락처',
      dataIndex: 'contact',
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
      dataIndex: 'role',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
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
      render: (row: AdminUserData) => (
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

  const dummyData: AdminUserData[] = [
    {
      id: 1,
      companyName: 'FF캠핑카',
      userId: 'bank123',
      password: '1234',
      name: '윤수근',
      contact: '054-123-4567',
      email: 'ff@ffcamp.com',
      role: '관리자',
      registrationDate: '2020.5.4'
    },
    {
      id: 2,
      companyName: '배터리웨이',
      userId: 'saykim6588',
      password: '1234',
      name: '김경각',
      contact: '010-5551-6158',
      email: 'saykim6588@betterwhy.com',
      role: '관리자',
      registrationDate: '2022.5.4'
    },
    {
      id: 3,
      companyName: '배터리웨이',
      userId: 'hyjo1234',
      password: '1234',
      name: '조훈영',
      contact: '010-5464-1234',
      email: 'hyjo1234@betterwhy.com',
      role: '관리자',
      registrationDate: '2022.5.4'
    },
    {
      id: 4,
      companyName: '배터리웨이',
      userId: 'jykim5678',
      password: '1234',
      name: '김진용',
      contact: '010-5516-1548',
      email: 'jykim5678@betterwhy.com',
      role: '일반',
      registrationDate: '2020.5.4'
    },
    {
      id: 5,
      companyName: 'LG엔솔',
      userId: '',
      password: '',
      name: '',
      contact: '',
      email: '',
      role: '',
      registrationDate: '2020.5.4'
    }
  ];

  const getFilteredData = useMemo(() => {
    if (!searchKeyword) return dummyData;
    return dummyData.filter(item => 
      item.companyName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.userId.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, dummyData]);

  const handleSave = (data: AdminFormData) => {
    console.log('Save:', data);
    // TODO: API 연동
    setIsRegistrationPopupOpen(false);
    setEditData(null);
  };

  const handleEdit = (row: AdminUserData) => {
    const editFormData: AdminFormData = {
      companyName: row.companyName,
      userId: row.userId,
      password: row.password,
      name: row.name,
      contact: row.contact,
      email: row.email,
      role: row.role === '관리자' ? 'admin' : 'user'
    };
    
    setEditData(editFormData);
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: AdminUserData) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      console.log('Delete confirmed:', deleteTarget);
      // TODO: 실제 삭제 API 호출
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
          <TableData<AdminUserData>
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
          onSave={handleSave}
          initialData={editData || undefined}
          mode={editData ? 'edit' : 'create'}
        />
      )}
    </div>
  );
} 