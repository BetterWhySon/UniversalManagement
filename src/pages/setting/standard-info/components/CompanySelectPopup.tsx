import React, { useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';

interface CompanySelectPopupProps {
  onClose: () => void;
  onConfirm: (selectedCompany: string) => void;
}

interface CompanyItem {
  id: number;
  code: string;
  name: string;
  address: string;
  description: string;
}

const CompanySelectPopup: React.FC<CompanySelectPopupProps> = ({ onClose, onConfirm }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCompanyCode, setSelectedCompanyCode] = useState<string>('');

  const companies: CompanyItem[] = [
    { id: 1, code: 'Site1', name: 'FF캠핑카', address: '', description: '' },
    { id: 2, code: 'Site2', name: '캠핑홈', address: '', description: '' },
    { id: 3, code: 'Site3', name: '광일산업', address: '', description: '' },
    { id: 4, code: 'Site4', name: '유니캠프', address: '', description: '' },
    { id: 5, code: 'Site5', name: '스타모빌', address: '', description: '' },
    { id: 6, code: 'Site6', name: '케이원캠핑', address: '', description: '' },
  ];

  const columns = [
    {
      name: '',
      dataIndex: 'checkbox',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '50px',
      render: (row: CompanyItem) => (
        <input
          type="radio"
          name="companySelect"
          checked={selectedCompanyCode === row.code}
          onChange={() => setSelectedCompanyCode(row.code)}
          className="w-4 h-4 accent-blue-500"
        />
      )
    },
    {
      name: 'CODE',
      dataIndex: 'code',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '사업장',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px'
    },
    {
      name: '사업장 주소',
      dataIndex: 'address',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: 'Description',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
    }
  ];

  const filteredCompanies = companies.filter(company => 
    company.code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    company.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[#2A2F3A] rounded-lg w-[1000px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h2 className="text-white text-lg font-medium">사업장 지정</h2>
            <button 
              onClick={onClose}
              className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-5">
            <div className="mb-5">
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full h-9 text-sm px-4 bg-[#363B46] rounded-lg outline-none border border-white/10 text-white placeholder-white/40"
              />
            </div>

            <div className="h-[400px] overflow-auto">
              <TableData
                data={filteredCompanies}
                columns={columns}
                className="min-h-0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 p-5 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-[#363B46] text-white rounded hover:bg-[#363B46]/80 transition-colors"
            >
              취소
            </button>
            <button
              onClick={() => {
                const selectedCompany = companies.find(c => c.code === selectedCompanyCode);
                if (selectedCompany) {
                  onConfirm(selectedCompany.name);
                }
              }}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-500/80 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySelectPopup; 