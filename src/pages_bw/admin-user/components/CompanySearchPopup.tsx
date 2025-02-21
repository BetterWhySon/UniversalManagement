import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import useAdmCustomer from '@/api/admin/admCustomer';
import { typeAdmCustomerList } from '@/api/types/admin/typeAdmCustomer';

interface CompanySearchPopupProps {
  onClose: () => void;
  onSelect: (company: { id: number; name: string }) => void;
}

export default function CompanySearchPopup({ onClose, onSelect }: CompanySearchPopupProps) {
  const { t: trans } = useTranslation('translation');
  const { dataListCustomer, storeCustomerList } = useAdmCustomer();
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    storeCustomerList(trans);
  }, []);

  const columns = useMemo(() => [
    {
      name: '회사명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: typeAdmCustomerList) => (
        <span className="text-yellow-400">{row.name}</span>
      )
    },
    {
      name: '사업자번호',
      dataIndex: 'identity_number',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: '업종',
      dataIndex: 'business_field',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    }
  ], []);

  const getFilteredData = useMemo(() => {
    if (!dataListCustomer) return [];
    if (!searchKeyword) return dataListCustomer;
    
    return dataListCustomer.filter(item => 
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, dataListCustomer]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-[600px]">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg text-white">관리 업체 선택</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <input 
              type="text" 
              className="h-8 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white w-full"
              placeholder="회사명을 입력하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="max-h-[400px] overflow-auto">
            <TableData<typeAdmCustomerList>
              data={getFilteredData}
              columns={columns}
              onClick={(row) => onSelect({ id: row.id, name: row.name })}
              className="cursor-pointer hover:bg-hw-dark-1"
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-hw-orange-1 text-hw-orange-1 rounded hover:bg-hw-orange-1/10"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 