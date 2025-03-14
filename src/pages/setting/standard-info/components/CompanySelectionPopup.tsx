import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';

interface CompanyData {
  id: number;
  code: string;
  company: string;
  address: string;
  detailAddress: string;
  description: string;
  belongCompany: string;
}

interface CompanySelectionPopupProps {
  onClose: () => void;
  onSelect: (company: CompanyData) => void;
}

const CompanySelectionPopup: React.FC<CompanySelectionPopupProps> = ({ onClose, onSelect }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // 더미 데이터 (실제로는 API에서 받아와야 함)
  const dummyData: CompanyData[] = [
    { id: 1, code: 'Site1', company: 'FF캠핑카', address: '서울시 강남구 테헤란로 123', detailAddress: '7층 701호', description: '캠핑카 제조 및 판매', belongCompany: 'FF캠핑카' },
    { id: 2, code: 'Site2', company: '캠핑홈', address: '경기도 성남시 분당구 판교로 234', detailAddress: '판교테크원타워 5층', description: '캠핑용품 도소매', belongCompany: '캠핑홈' },
    { id: 3, code: 'Site3', company: '일산업', address: '인천시 연수구 송도문화로 345', detailAddress: '송도빌딩 3층', description: '자동차 부품 제조', belongCompany: '일산업' },
    { id: 4, code: 'Site4', company: '유니캠프', address: '부산시 해운대구 센텀중앙로 456', detailAddress: '센텀프라자 8층', description: '캠핑장 운영', belongCompany: '유니캠프' },
    { id: 5, code: 'Site5', company: '스타모빌', address: '대구시 동구 동대구로 567', detailAddress: '동대구빌딩 2층', description: '모빌하우스 제작', belongCompany: '스타모빌' },
    { id: 6, code: 'Site6', company: '케이원캠핑', address: '광주시 서구 상무중앙로 678', detailAddress: '상무플라자 4층', description: '캠핑카 렌탈', belongCompany: '케이원캠핑' },
    { id: 7, code: 'Site7', company: '마린아웃도어', address: '대전시 유성구 대학로 789', detailAddress: '유성빌딩 6층', description: '아웃도어 용품 제조', belongCompany: '마린아웃도어' },
    { id: 8, code: 'Site8', company: '블루오션', address: '울산시 남구 삼산로 890', detailAddress: '삼산타워 9층', description: '해양레저 장비', belongCompany: '블루오션' },
    { id: 9, code: 'Site9', company: '마운틴캠프', address: '강원도 춘천시 춘천로 901', detailAddress: '춘천빌딩 1층', description: '등산용품 제조', belongCompany: '마운틴캠프' },
    { id: 10, code: 'Site10', company: '레저월드', address: '경기도 고양시 일산동구 중앙로 112', detailAddress: '일산타워 7층', description: '레저용품 도매', belongCompany: '레저월드' },
    { id: 11, code: 'Site11', company: '네이처라이프', address: '충북 청주시 상당구 상당로 223', detailAddress: '상당빌딩 3층', description: '자연친화적 캠핑용품', belongCompany: '네이처라이프' },
    { id: 12, code: 'Site12', company: '캠핑파크', address: '전북 전주시 완산구 전주로 334', detailAddress: '완산프라자 5층', description: '캠핑장 체인점', belongCompany: '캠핑파크' }
  ];

  const columns = useMemo(() => [
    {
      name: 'CODE',
      dataIndex: 'code',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: '사업장명',
      dataIndex: 'company',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px'
    },
    {
      name: '귀속사업장',
      dataIndex: 'belongCompany',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px'
    },
    {
      name: '주소',
      dataIndex: 'address',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '350px'
    },
    {
      name: '상세주소',
      dataIndex: 'detailAddress',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '250px'
    },
    {
      name: 'Description',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '250px'
    },
    {
      name: '선택',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px',
      render: (row: CompanyData) => (
        <button
          className="px-3 py-1 bg-hw-orange-1 text-white text-sm rounded hover:bg-hw-orange-1/90"
          onClick={() => onSelect(row)}
        >
          선택
        </button>
      )
    }
  ], [onSelect]);

  const getFilteredData = useMemo(() => {
    if (!searchKeyword) return dummyData;
    return dummyData.filter(item => 
      item.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.code.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-[1200px]">
        <div className="flex justify-between items-center p-6 border-b border-gray-600">
          <h2 className="text-lg text-white">사업장 선택</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 pt-4 mb-6">
          <div className="mb-4">
            <input 
              type="text" 
              className="h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[300px]"
              placeholder="사업장명 또는 코드로 검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="max-h-[650px] overflow-auto [&_tr]:!h-9">
            <TableData<CompanyData>
              data={getFilteredData}
              columns={columns}
              isPagination
              pagination={{
                total: getFilteredData.length,
                pageSize: 8,
              }}
              paginationMarginTop='32px'
              emptyMessage="데이터가 없습니다."
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 p-6 border-t border-gray-600">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-hw-orange-1 text-hw-orange-1 rounded hover:bg-hw-orange-1/10"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanySelectionPopup; 