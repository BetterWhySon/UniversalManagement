import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import GroupRegistrationPopup from './components/GroupRegistrationPopup';
import DeleteConfirmPopup from './components/DeleteConfirmPopup';

interface GroupData {
  id: number;
  code: string;
  group: string;
  postcode: string;
  address: string;
  detailAddress: string;
  description: string;
  belongCompany: string;
}

const GroupRegistrationPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [editData, setEditData] = useState<GroupData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GroupData | null>(null);

  // 더미 데이터
  const dummyData: GroupData[] = [
    { id: 1, code: 'Group1', group: '서울권역', postcode: '06234', address: '서울시 강남구 테헤란로 123', detailAddress: '7층 701호', description: '서울 지역 그룹', belongCompany: '서울본사' },
    { id: 2, code: 'Group2', group: '경기권역', postcode: '13494', address: '경기도 성남시 분당구 판교로 234', detailAddress: '판교테크원타워 5층', description: '경기도 지역 그룹', belongCompany: '-' },
    { id: 3, code: 'Group3', group: '인천권역', postcode: '21994', address: '인천시 연수구 송도문화로 345', detailAddress: '송도빌딩 3층', description: '인천 지역 그룹', belongCompany: '인천지사' },
    { id: 4, code: 'Group4', group: '부산권역', postcode: '48058', address: '부산시 해운대구 센텀중앙로 456', detailAddress: '센텀프라자 8층', description: '부산 지역 그룹', belongCompany: '부산본부' },
    { id: 5, code: 'Group5', group: '대구권역', postcode: '41585', address: '대구시 동구 동대구로 567', detailAddress: '동대구빌딩 2층', description: '대구 지역 그룹', belongCompany: '-' },
    { id: 6, code: 'Group6', group: '광주권역', postcode: '61947', address: '광주시 서구 상무중앙로 678', detailAddress: '상무플라자 4층', description: '광주 지역 그룹', belongCompany: '광주사업소' },
    { id: 7, code: 'Group7', group: '대전권역', postcode: '34126', address: '대전시 유성구 대학로 789', detailAddress: '유성빌딩 6층', description: '대전 지역 그룹', belongCompany: '대전지사' },
    { id: 8, code: 'Group8', group: '울산권역', postcode: '44677', address: '울산시 남구 삼산로 890', detailAddress: '삼산타워 9층', description: '울산 지역 그룹', belongCompany: '-' },
    { id: 9, code: 'Group9', group: '강원권역', postcode: '24347', address: '강원도 춘천시 춘천로 901', detailAddress: '춘천빌딩 1층', description: '강원 지역 그룹', belongCompany: '강원본부' },
    { id: 10, code: 'Group10', group: '경기북부권역', postcode: '10364', address: '경기도 고양시 일산동구 중앙로 112', detailAddress: '일산타워 7층', description: '경기 북부 지역 그룹', belongCompany: '경기북부지사' },
    { id: 11, code: 'Group11', group: '충북권역', postcode: '28525', address: '충북 청주시 상당구 상당로 223', detailAddress: '상당빌딩 3층', description: '충북 지역 그룹', belongCompany: '-' },
    { id: 12, code: 'Group12', group: '전북권역', postcode: '54932', address: '전북 전주시 완산구 전주로 334', detailAddress: '완산프라자 5층', description: '전북 지역 그룹', belongCompany: '전북사업소' },
    { id: 13, code: 'Group13', group: '경남권역', postcode: '51524', address: '경남 창원시 성산구 창원대로 445', detailAddress: '성산빌딩 4층', description: '경남 지역 그룹', belongCompany: '경남지사' },
    { id: 14, code: 'Group14', group: '제주권역', postcode: '63122', address: '제주시 노형동 노연로 556', detailAddress: '노형프라자 2층', description: '제주 지역 그룹', belongCompany: '-' },
    { id: 15, code: 'Group15', group: '서울강남권역', postcode: '05502', address: '서울시 송파구 올림픽로 667', detailAddress: '송타워 10층', description: '서울 강남 지역 그룹', belongCompany: '서울본사' },
    { id: 16, code: 'Group16', group: '경기남부권역', postcode: '16476', address: '경기도 수원시 팔달구 팔달로 778', detailAddress: '팔달빌딩 6층', description: '경기 남부 지역 그룹', belongCompany: '경기남부지사' },
    { id: 17, code: 'Group17', group: '인천서부권역', postcode: '21353', address: '인천시 부평구 부평대로 889', detailAddress: '부평타워 8층', description: '인천 서부 지역 그룹', belongCompany: '인천지사' },
    { id: 18, code: 'Group18', group: '부산해운대권역', postcode: '48267', address: '부산시 수영구 수영로 990', detailAddress: '수영빌딩 3층', description: '부산 해운대 지역 그룹', belongCompany: '부산본부' },
    { id: 19, code: 'Group19', group: '대구수성권역', postcode: '42173', address: '대구시 수성구 수성로 101', detailAddress: '수성타워 5층', description: '대구 수성 지역 그룹', belongCompany: '-' },
    { id: 20, code: 'Group20', group: '광주북구권역', postcode: '61184', address: '광주시 북구 첨단과기로 212', detailAddress: '첨단빌딩 7층', description: '광주 북구 지역 그룹', belongCompany: '광주사업소' },
    { id: 21, code: 'Group21', group: '대전중구권역', postcode: '34939', address: '대전시 중구 대종로 323', detailAddress: '대종타워 4층', description: '대전 중구 지역 그룹', belongCompany: '대전지사' },
    { id: 22, code: 'Group22', group: '울산중구권역', postcode: '44676', address: '울산시 중구 번영로 434', detailAddress: '번영빌딩 2층', description: '울산 중구 지역 그룹', belongCompany: '-' },
    { id: 23, code: 'Group23', group: '강원원주권역', postcode: '26384', address: '강원도 원주시 원주로 545', detailAddress: '원주프라자 6층', description: '강원 원주 지역 그룹', belongCompany: '강원본부' },
    { id: 24, code: 'Group24', group: '충남권역', postcode: '31157', address: '충남 천안시 동남구 천안대로 656', detailAddress: '천안타워 9층', description: '충남 지역 그룹', belongCompany: '충남사업소' },
    { id: 25, code: 'Group25', group: '전남권역', postcode: '59638', address: '전남 여수시 여수로 767', detailAddress: '여수빌딩 3층', description: '전남 지역 그룹', belongCompany: '-' },
    { id: 26, code: 'Group26', group: '경북권역', postcode: '37673', address: '경북 포항시 남구 포항로 878', detailAddress: '포항타워 5층', description: '경북 지역 그룹', belongCompany: '경북지사' },
    { id: 27, code: 'Group27', group: '경남김해권역', postcode: '50926', address: '경남 김해시 김해대로 989', detailAddress: '김해프라자 7층', description: '경남 김해 지역 그룹', belongCompany: '경남지사' },
    { id: 28, code: 'Group28', group: '제주서귀포권역', postcode: '63123', address: '제주시 삼도일동 삼도로 135', detailAddress: '삼도빌딩 4층', description: '제주 서귀포 지역 그룹', belongCompany: '-' },
    { id: 29, code: 'Group29', group: '서울마포권역', postcode: '04108', address: '서울시 마포구 마포대로 246', detailAddress: '마포타워 8층', description: '서울 마포 지역 그룹', belongCompany: '서울본사' },
    { id: 30, code: 'Group30', group: '경기용인권역', postcode: '16827', address: '경기도 용인시 수지구 포은대로 357', detailAddress: '수지빌딩 2층', description: '경기 용인 지역 그룹', belongCompany: '경기남부지사' },
    { id: 31, code: 'Group31', group: '인천계양권역', postcode: '22734', address: '인천시 서구 서곶로 468', detailAddress: '서구프라자 6층', description: '인천 계양 지역 그룹', belongCompany: '인천지사' },
    { id: 32, code: 'Group32', group: '부산사상권역', postcode: '46973', address: '부산시 사상구 사상로 579', detailAddress: '사상타워 3층', description: '부산 사상 지역 그룹', belongCompany: '부산본부' },
    { id: 33, code: 'Group33', group: '대구달서권역', postcode: '42718', address: '대구시 달서구 달서대로 680', detailAddress: '달서빌딩 5층', description: '대구 달서 지역 그룹', belongCompany: '-' },
    { id: 34, code: 'Group34', group: '광주서구권역', postcode: '61947', address: '광주시 서구 상무중앙로 791', detailAddress: '상무타워 7층', description: '광주 서구 지역 그룹', belongCompany: '광주사업소' },
    { id: 35, code: 'Group35', group: '대전유성권역', postcode: '34126', address: '대전시 유성구 대학로 892', detailAddress: '유성타워 4층', description: '대전 유성 지역 그룹', belongCompany: '대전지사' },
    { id: 36, code: 'Group36', group: '울산남구권역', postcode: '44677', address: '울산시 남구 삼산로 993', detailAddress: '삼산빌딩 6층', description: '울산 남구 지역 그룹', belongCompany: '-' }
  ];

  const columns = useMemo(() => [
    {
      name: 'CODE',
      dataIndex: 'code',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '그룹명',
      dataIndex: 'group',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '180px'
    },
    {
      name: '귀속사업장',
      dataIndex: 'belongCompany',
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
    if (!searchKeyword) return dummyData;
    return dummyData.filter(item => 
      item.group.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.code.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, dummyData]);

  const handleEdit = (row: GroupData) => {
    setEditData(row);
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: GroupData) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      console.log('Delete confirmed:', deleteTarget);
      // TODO: 실제 삭제 로직 구현
    }
    setDeleteTarget(null);
  };

  const handleSaveGroup = (data: {
    code: string;
    group: string;
    postcode: string;
    address: string;
    detailAddress: string;
    description: string;
    belongCompany: string;
  }) => {
    if (editData) {
      console.log('Edit group data:', { ...data, id: editData.id });
    } else {
      const newGroup = {
        id: dummyData.length + 1,
        ...data
      };
      console.log('New group data:', newGroup);
    }
    setIsRegistrationPopupOpen(false);
    setEditData(null);
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
            code: editData.code,
            group: editData.group,
            postcode: editData.postcode,
            address: editData.address,
            detailAddress: editData.detailAddress,
            description: editData.description,
            belongCompany: editData.belongCompany
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