import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import EditIcon from '@/assets/images/icons/edit.svg';
import DeleteIcon from '@/assets/images/icons/delete.svg';
import CompanyRegistrationPopup from './components/CompanyRegistrationPopup';
import DeleteConfirmPopup from './components/DeleteConfirmPopup';

interface CompanyData {
  id: number;
  code: string;
  company: string;
  postcode: string;
  address: string;
  detailAddress: string;
  description: string;
}

const CompanyRegistrationPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [editData, setEditData] = useState<CompanyData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CompanyData | null>(null);

  // 더미 데이터
  const dummyData: CompanyData[] = [
    { id: 1, code: 'Site1', company: 'FF캠핑카', postcode: '06234', address: '서울시 강남구 테헤란로 123', detailAddress: '7층 701호', description: '캠핑카 제조 및 판매' },
    { id: 2, code: 'Site2', company: '캠핑홈', postcode: '13494', address: '경기도 남시 분당구 판교로 234', detailAddress: '판교테크원타워 5층', description: '캠핑용품 도소매' },
    { id: 3, code: 'Site3', company: '일산업', postcode: '21994', address: '인천시 연수구 송도문화로 345', detailAddress: '송도빌딩 3층', description: '자동차 부품 제조' },
    { id: 4, code: 'Site4', company: '유니캠프', postcode: '48058', address: '부산시 해운대구 센텀중앙로 456', detailAddress: '센텀프라자 8층', description: '캠핑장 운영' },
    { id: 5, code: 'Site5', company: '스타모빌', postcode: '41585', address: '대구시 동구 동대구로 567', detailAddress: '동대구빌딩 2층', description: '모빌하우스 제작' },
    { id: 6, code: 'Site6', company: '케이원캠핑', postcode: '61947', address: '광주시 서구 상무중앙로 678', detailAddress: '상무플라자 4층', description: '캠핑카 렌탈' },
    { id: 7, code: 'Site7', company: '마린아웃도어', postcode: '34126', address: '대전시 유성구 대학로 789', detailAddress: '유성빌딩 6층', description: '아웃도어 용품 제조' },
    { id: 8, code: 'Site8', company: '블루오션', postcode: '44677', address: '울산시 남구 삼산로 890', detailAddress: '삼산타워 9층', description: '해양레저 장비' },
    { id: 9, code: 'Site9', company: '마운틴캠프', postcode: '24347', address: '강원도 춘천시 춘천로 901', detailAddress: '춘천빌딩 1층', description: '등산용품 제조' },
    { id: 10, code: 'Site10', company: '레저월드', postcode: '10364', address: '경기도 고양시 일산동구 중앙로 112', detailAddress: '일산타워 7층', description: '레저용품 도매' },
    { id: 11, code: 'Site11', company: '네이처라이프', postcode: '28525', address: '충북 청주시 상당구 상당로 223', detailAddress: '상당빌딩 3층', description: '자연친화적 캠핑용품' },
    { id: 12, code: 'Site12', company: '캠핑파크', postcode: '54932', address: '전북 전주시 완산구 전주로 334', detailAddress: '완산프라자 5층', description: '캠핑장 체인점' },
    { id: 13, code: 'Site13', company: '아웃도어플러스', postcode: '51524', address: '경남 창원시 성산구 창원대로 445', detailAddress: '성산빌딩 4층', description: '아웃도어 용품' },
    { id: 14, code: 'Site14', company: '캠핑메이트', postcode: '63122', address: '제주시 노형동 노연로 556', detailAddress: '노형프라자 2층', description: '캠핑용품 유통' },
    { id: 15, code: 'Site15', company: '레저테크', postcode: '05502', address: '서울시 송파구 올림픽로 667', detailAddress: '송파타워 10층', description: '레저장비 기술개발' },
    { id: 16, code: 'Site16', company: '캠핑존', postcode: '16476', address: '경기도 수원시 팔달구 팔달로 778', detailAddress: '팔달빌딩 6층', description: '캠핑용품 전문점' },
    { id: 17, code: 'Site17', company: '아웃도어랜드', postcode: '21353', address: '인천시 부평구 부평대로 889', detailAddress: '부평타워 8층', description: '아웃도어 전문' },
    { id: 18, code: 'Site18', company: '네이처캠프', postcode: '48267', address: '부산시 수영구 수영로 990', detailAddress: '수영빌딩 3층', description: '자연친화 캠핑' },
    { id: 19, code: 'Site19', company: '캠핑타운', postcode: '42173', address: '대구시 수성구 수성로 101', detailAddress: '수성타워 5층', description: '캠핑용품 할인점' },
    { id: 20, code: 'Site20', company: '레저킹', postcode: '61184', address: '광주시 북구 첨단과기로 212', detailAddress: '첨단빌딩 7층', description: '레저용품 전문' },
    { id: 21, code: 'Site21', company: '캠핑프로', postcode: '34939', address: '대전시 중구 대종로 323', detailAddress: '대종타워 4층', description: '프로페셔널 캠핑' },
    { id: 22, code: 'Site22', company: '아웃도어마스터', postcode: '44676', address: '울산시 중구 번영로 434', detailAddress: '번영빌딩 2층', description: '아웃도어 전문가' },
    { id: 23, code: 'Site23', company: '캠핑라이프', postcode: '26384', address: '강원도 원주시 원주로 545', detailAddress: '원주프라자 6층', description: '캠핑 라이프스타일' },
    { id: 24, code: 'Site24', company: '레저플레이', postcode: '31157', address: '충남 천안시 동남구 천안대로 656', detailAddress: '천안타워 9층', description: '레저 활동 전문' },
    { id: 25, code: 'Site25', company: '캠핑월드', postcode: '59638', address: '전남 여수시 여수로 767', detailAddress: '여수빌딩 3층', description: '캠핑용품 도소매' },
    { id: 26, code: 'Site26', company: '아웃도어존', postcode: '37673', address: '경북 포항시 남구 포항로 878', detailAddress: '포항타워 5층', description: '아웃도어 라이프' },
    { id: 27, code: 'Site27', company: '캠핑하우스', postcode: '50926', address: '경남 김해시 김해대로 989', detailAddress: '김해프라자 7층', description: '캠핑용품 전문' },
    { id: 28, code: 'Site28', company: '레저타임', postcode: '63123', address: '제주시 삼도일동 삼도로 135', detailAddress: '삼도빌딩 4층', description: '레저 시설 운영' },
    { id: 29, code: 'Site29', company: '캠핑스토리', postcode: '04108', address: '서울시 마포구 마포대로 246', detailAddress: '마포타워 8층', description: '캠핑용품 유통' },
    { id: 30, code: 'Site30', company: '아웃도어시티', postcode: '16827', address: '경기도 용인시 수지구 포은대로 357', detailAddress: '수지빌딩 2층', description: '아웃도어 몰' },
    { id: 31, code: 'Site31', company: '캠핑클럽', postcode: '22734', address: '인천시 서구 서곶로 468', detailAddress: '서구프라자 6층', description: '캠핑 커뮤니티' },
    { id: 32, code: 'Site32', company: '레저라이프', postcode: '46973', address: '부산시 사상구 사상로 579', detailAddress: '사상타워 3층', description: '레저 라이프스타일' },
    { id: 33, code: 'Site33', company: '아웃도어파크', postcode: '42718', address: '대구시 달서구 달서대로 680', detailAddress: '달서빌딩 5층', description: '아웃도어 파크 운영' },
  ];

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
    if (!searchKeyword) return dummyData;
    return dummyData.filter(item => 
      item.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.code.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, dummyData]);

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
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      console.log('Delete confirmed:', deleteTarget);
      // TODO: 실제 삭제 로직 구현
    }
    setDeleteTarget(null);
  };

  const handleSaveCompany = (data: {
    code: string;
    company: string;
    postcode: string;
    address: string;
    detailAddress: string;
    description: string;
  }) => {
    if (editData) {
      // 수정 로직
      console.log('Edit company data:', { ...data, id: editData.id });
    } else {
      // 신규 등록 로직
      const newCompany = {
        id: dummyData.length + 1,
        ...data
      };
      console.log('New company data:', newCompany);
    }
    setIsRegistrationPopupOpen(false);
    setEditData(null);
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
            headerClassName="h-12 bg-hw-dark-2"
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