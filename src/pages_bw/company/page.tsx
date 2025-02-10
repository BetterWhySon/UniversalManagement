import React, { useState, useMemo, useEffect } from 'react';
import useAdmCustomer from '@/api/admin/admCustomer';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import CompanyRegistrationPopup from './components/CompanyRegistrationPopup';
import DeleteConfirmPopup from '@/pages/setting/standard-info/components/DeleteConfirmPopup';
import { typeAdmCustomerList } from '@/api/types/admin/typeAdmCustomer';

interface CompanyFormData {
  id?: number;  // optional id 추가
  name: string;
  identity_number: string;
  address: string;
  representative: string;
  business_field?: string;
  phonenumber: string;
  email?: string;
}

interface CompanyData extends CompanyFormData {
  id: number;
  registrationDate: string;
}

export default function CompanyPage() {
  const { t: trans } = useTranslation('translation');
  const { dataListCustomer, storeCustomerList, storeCustomerDelete, storeCustomerEdit, storeCustomerCreate } = useAdmCustomer();
  const [deleteTarget, setDeleteTarget] = useState<typeAdmCustomerList | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [editData, setEditData] = useState<CompanyFormData | null>(null);
  

  useEffect(() => {
    storeCustomerList(trans);
  }, []);

//   useEffect(() => {
//       console.log(location);
//       const token = localStorage.getItem("token");
//       if (token === null) {
//           navigate('/login');
//           return;
//       }
//       const parts = location.pathname.split('/');
//       storeDiagnostics2Data(Number(parts[2]), trans)
//   }, [location]);

 


  const columns = useMemo(() => [
    {
      name: '업체명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: '사업자등록번호',
      dataIndex: 'identity_number',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: '주소',
      dataIndex: 'address',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '250px'
    },
    {
      name: '대표자',
      dataIndex: 'representative',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '업종',
      dataIndex: 'business_field',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '전화번호',
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
      name: '수정/삭제',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: typeAdmCustomerList) => (
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
    if (!dataListCustomer) return [];
    
    // 검색어가 없을 때는 전체 데이터 반환
    if (!searchKeyword) return dataListCustomer;
    
    // 검색어가 있을 때는 필터링된 데이터 반환
    return dataListCustomer.filter(item => 
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.identity_number.includes(searchKeyword) ||
      item.representative.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, dataListCustomer]);

  const handleSave = async (data: CompanyFormData) => {
    try {
      if (editData) {
        await storeCustomerEdit(
          editData.id?.toString() || '',
          data.name,
          data.address,
          data.identity_number,
          data.representative,
          data.phonenumber,
          data.business_field || '',
          data.email || '',
          trans
        );
      } else {
        await storeCustomerCreate(
          data.name,
          data.address,
          data.identity_number,
          data.business_field || '',
          data.phonenumber,
          data.email || '',
          data.representative,
          trans
        );
      }
      await storeCustomerList(trans);
      setIsRegistrationPopupOpen(false);
      setEditData(null);
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleEdit = (row: typeAdmCustomerList) => {
    const editFormData = {
      id: row.id,  // id 추가
      name: row.name,
      identity_number: row.identity_number,
      address: row.address,
      representative: row.representative,
      business_field: row.business_field,
      phonenumber: row.phonenumber,
      email: row.email
    };
    
    setEditData(editFormData);
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: typeAdmCustomerList) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      try {
        await storeCustomerDelete(deleteTarget.id.toString(), trans);
        await storeCustomerList(trans);  // 리스트 갱신
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
    setDeleteTarget(null);
  };

  const handleOpenRegistration = () => {
    // setIsRegistrationPopupOpen(true);  // 기존 코드 주석 처리
    
    // EVcheck 커스텀 스키마 호출
    window.location.href = 'EVcheck://';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            관리 업체 등록
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
                onClick={handleOpenRegistration}
              >
                <span className='text-hw-white-1 font-light text-sm leading-[125%] whitespace-nowrap'>
                  {trans('업체 등록')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<typeAdmCustomerList>
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
          title="업체 삭제"
          message="해당 업체를 삭제하시겠습니까?"
        />
      )}

      {isRegistrationPopupOpen && (
        <CompanyRegistrationPopup
          onClose={() => {
            setIsRegistrationPopupOpen(false);
            setEditData(null);
          }}
          onSave={handleSave}
          onSuccess={() => storeCustomerList(trans)}
          initialData={editData || undefined}
          mode={editData ? 'edit' : 'create'}
        />
      )}
    </div>
  );
} 