import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import EditIcon from '@/assets/images/icons/edit.svg';
import DeleteIcon from '@/assets/images/icons/delete.svg';
import CompanyRegistrationPopup from './components/CompanyRegistrationPopup';
import DeleteConfirmPopup from './components/DeleteConfirmPopup';
import useCstCompany from '@/api/customer/cstCompany';
import { typeCstCompany } from '@/api/types/customer/typeCstCompany';

interface CompanyData {
  id: number;
  code: string;
  company: string;
  postcode: string;
  address: string;
  detailAddress: string;
  description: string;
}

const mapApiDataToCompanyData = (apiData: typeCstCompany): CompanyData => ({
  id: apiData.site_id,
  code: apiData.code,
  company: apiData.site_name,
  postcode: apiData.zipno,
  address: apiData.address_main,
  detailAddress: apiData.address_sub,
  description: apiData.description
});

const CompanyRegistrationPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [editData, setEditData] = useState<CompanyData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CompanyData | null>(null);
  const { dataListCompany, storeCompanyList, storeCompanyUpdate, storeCompanyCreate, storeCompanyDelete } = useCstCompany();

  useEffect(() => {
    storeCompanyList(trans);
  }, [trans]);

  const columns = useMemo(() => [
    {
      name: 'CODE',
      dataIndex: 'code',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '사업장',
      dataIndex: 'company',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '180px'
    },
    {
      name: '우편번호',
      dataIndex: 'postcode',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '주소',
      dataIndex: 'address',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '300px'
    },
    {
      name: '상세주소',
      dataIndex: 'detailAddress',
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
      render: (row: CompanyData) => (
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
    if (!dataListCompany) return [];
    const mappedData = dataListCompany.map(mapApiDataToCompanyData);
    if (!searchKeyword) return mappedData;
    return mappedData.filter(item => 
      item.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.code.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, dataListCompany]);

  // 수정 버튼 핸들러
  const handleEdit = (row: CompanyData) => {
    setEditData(row);
    setIsRegistrationPopupOpen(true);
  };

  // 삭제 버튼 핸들러
  const handleDelete = (row: CompanyData) => {
    setDeleteTarget(row);
  };

  // 삭제 확인 핸들러
  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await storeCompanyDelete(deleteTarget.id, trans);
      storeCompanyList(trans); // 목록 새로고침
    }
    setDeleteTarget(null);
  };

  const handleSaveCompany = async (data: {
    code: string;
    company: string;
    postcode: string;
    address: string;
    detailAddress: string;
    description: string;
  }) => {
    try {
      if (editData) {
        // 수정 로직
        await storeCompanyUpdate(
          editData.id,
          data.company,
          data.postcode,
          data.address,  // 우편번호를 제외한 순수 주소
          data.detailAddress,
          data.description,
          trans
        );
      } else {
        // 신규 등록 로직
        await storeCompanyCreate(
          data.company,
          data.postcode,
          data.address,  // 우편번호를 제외한 순수 주소
          data.detailAddress,
          data.description,
          trans
        );
      }
      setIsRegistrationPopupOpen(false);
      setEditData(null);
      await storeCompanyList(trans); // 목록 새로고침
    } catch (error) {
      console.error('저장 중 오류가 발생했습니다:', error);
      throw error; // 에러를 상위로 전파하여 팝업에서 처리할 수 있도록 함
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            사업장 등록
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
                  {trans('사업장 등록')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<CompanyData>
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
        <CompanyRegistrationPopup
          onClose={() => {
            setIsRegistrationPopupOpen(false);
            setEditData(null);
          }}
          onSave={handleSaveCompany}
          initialData={editData || undefined}
          mode={editData ? 'edit' : 'create'}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmPopup
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          title="사업장 삭제"
          message="해당 사업장을 삭제하시겠습니까?"
        />
      )}
    </div>
  );
};

export default CompanyRegistrationPage; 