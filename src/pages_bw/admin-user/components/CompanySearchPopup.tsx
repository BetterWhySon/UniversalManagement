import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';

interface CompanySearchPopupProps {
  onClose: () => void;
  onSelect: (company: CompanyData) => void;
}

interface CompanyData {
  id: number;
  name: string;
  businessNumber: string;
  businessType: string;
}

export default function CompanySearchPopup({ onClose, onSelect }: CompanySearchPopupProps) {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const dummyData: CompanyData[] = [
    {
      id: 1,
      name: 'FF캠핑카',
      businessNumber: '656-41-31231',
      businessType: '제조업'
    },
    {
      id: 2,
      name: '신일운수',
      businessNumber: '754-41-1231',
      businessType: '서비스업'
    },
    {
      id: 3,
      name: '캠핑콜',
      businessNumber: '546-72-4412',
      businessType: '제조업'
    },
    {
      id: 4,
      name: '케이원캠핑',
      businessNumber: '456-81-8411',
      businessType: '서비스업'
    },
    {
      id: 5,
      name: '유니캠프',
      businessNumber: '951-74-1111',
      businessType: '서비스업'
    },
    {
      id: 6,
      name: '배터와이',
      businessNumber: '656-87-0171',
      businessType: '제조업'
    }
  ];

  const columns = useMemo(() => [
    {
      name: '회사명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: CompanyData) => (
        <span className="text-yellow-400">{row.name}</span>
      )
    },
    {
      name: '사업자번호',
      dataIndex: 'businessNumber',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: '업종',
      dataIndex: 'businessType',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    }
  ], []);

  const getFilteredData = useMemo(() => {
    if (!searchKeyword) return dummyData;
    return dummyData.filter(item => 
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword]);

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
            <TableData<CompanyData>
              data={getFilteredData}
              columns={columns}
              onClick={onSelect}
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