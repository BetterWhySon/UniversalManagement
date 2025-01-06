import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';

interface BatteryData {
  id: number;
  company: string;
  group: string;
  user: string;
  contact: string;
  address: string;
  itemCategory: string;
  batteryStatus: string;
  packId: string;
  approvalStatus: string;
  registrationDate: string;
}

const BatteryRegistrationStatusPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  // 더미 데이터
  const dummyData: BatteryData[] = [
    { id: 1, company: '유니캠프', group: 'Bayrun 560', user: '홍길동', contact: '010-1234-5678', address: '서울시 강남구 테헤란로 123', itemCategory: '캠핑카', batteryStatus: '드론', packId: 'PACK001', approvalStatus: 'O', registrationDate: '2024.11.08' },
    { id: 2, company: '유니캠프', group: '미지정', user: '이울곡', contact: '010-2345-6789', address: '서울시 서초구 서초대로 456', itemCategory: '캠핑카', batteryStatus: '드론', packId: 'PACK002', approvalStatus: 'O', registrationDate: '2024.11.08' },
    { id: 3, company: '캠핑월드', group: '그룹A', user: '김캠핑', contact: '010-3456-7890', address: '경기도 성남시 분당구 판교로 789', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK003', approvalStatus: 'O', registrationDate: '2024.11.07' },
    { id: 4, company: '캠핑월드', group: '그룹B', user: '박드론', contact: '010-4567-8901', address: '경기도 용인시 수지구 포은대로 101', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK004', approvalStatus: 'O', registrationDate: '2024.11.07' },
    { id: 5, company: '아웃도어파크', group: '그룹1', user: '정아웃', contact: '010-5678-9012', address: '인천시 연수구 컨벤시아대로 234', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK005', approvalStatus: 'X', registrationDate: '2024.11.06' },
    { id: 6, company: '아웃도어파크', group: '그룹2', user: '이도어', contact: '010-6789-0123', address: '인천시 중구 공항로 567', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK006', approvalStatus: 'O', registrationDate: '2024.11.06' },
    { id: 7, company: '드론테크', group: '드론A', user: '최드론', contact: '010-7890-1234', address: '부산시 해운대구 마린시티로 890', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK007', approvalStatus: 'O', registrationDate: '2024.11.05' },
    { id: 8, company: '드론테크', group: '드론B', user: '강테크', contact: '010-8901-2345', address: '부산시 수영구 광안해변로 112', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK008', approvalStatus: 'O', registrationDate: '2024.11.05' },
    { id: 9, company: '캠핑파크', group: '캠핑A', user: '윤캠핑', contact: '010-9012-3456', address: '대구시 동구 동대구로 345', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK009', approvalStatus: 'O', registrationDate: '2024.11.04' },
    { id: 10, company: '캠핑파크', group: '캠핑B', user: '조파크', contact: '010-0123-4567', address: '대구시 수성구 수성로 678', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK010', approvalStatus: 'X', registrationDate: '2024.11.04' },
    { id: 11, company: '유니캠프', group: 'Bayrun 570', user: '한유니', contact: '010-1111-2222', address: '광주시 서구 상무중앙로 901', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK011', approvalStatus: 'O', registrationDate: '2024.11.03' },
    { id: 12, company: '유니캠프', group: 'Bayrun 580', user: '임캠프', contact: '010-2222-3333', address: '광주시 북구 첨단과기로 234', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK012', approvalStatus: 'O', registrationDate: '2024.11.03' },
    { id: 13, company: '드론월드', group: '드론1', user: '신드론', contact: '010-3333-4444', address: '대전시 유성구 대학로 567', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK013', approvalStatus: 'O', registrationDate: '2024.11.02' },
    { id: 14, company: '드론월드', group: '드론2', user: '권월드', contact: '010-4444-5555', address: '대전시 중구 대종로 890', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK014', approvalStatus: 'O', registrationDate: '2024.11.02' },
    { id: 15, company: '캠핑존', group: '존A', user: '황캠핑', contact: '010-5555-6666', address: '울산시 남구 삼산로 123', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK015', approvalStatus: 'X', registrationDate: '2024.11.01' },
    { id: 16, company: '캠핑존', group: '존B', user: '류존', contact: '010-6666-7777', address: '울산시 동구 방어진순환도로 456', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK016', approvalStatus: 'O', registrationDate: '2024.11.01' },
    { id: 17, company: '드론파크', group: '파크1', user: '고드론', contact: '010-7777-8888', address: '강원도 춘천시 춘천로 789', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK017', approvalStatus: 'O', registrationDate: '2024.10.31' },
    { id: 18, company: '드론파크', group: '파크2', user: '배파크', contact: '010-8888-9999', address: '강원도 원주시 원주로 012', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK018', approvalStatus: 'O', registrationDate: '2024.10.31' },
    { id: 19, company: '아웃도어월드', group: '월드A', user: '노아웃', contact: '010-9999-0000', address: '경기도 수원시 팔달구 팔달로 345', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK019', approvalStatus: 'O', registrationDate: '2024.10.30' },
    { id: 20, company: '아웃도어월드', group: '월드B', user: '남도어', contact: '010-1234-5678', address: '경기도 안양시 동안구 관평로 678', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK020', approvalStatus: 'O', registrationDate: '2024.10.30' },
    { id: 21, company: '캠핑테크', group: '테크A', user: '진캠핑', contact: '010-2345-6789', address: '충북 청주시 상당구 상당로 901', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK021', approvalStatus: 'X', registrationDate: '2024.10.29' },
    { id: 22, company: '캠핑테크', group: '테크B', user: '안테크', contact: '010-3456-7890', address: '충북 충주시 중앙로 234', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK022', approvalStatus: 'O', registrationDate: '2024.10.29' },
    { id: 23, company: '드론존', group: '존1', user: '염드론', contact: '010-4567-8901', address: '충남 천안시 동남구 천안대로 567', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK023', approvalStatus: 'O', registrationDate: '2024.10.28' },
    { id: 24, company: '드론존', group: '존2', user: '추존', contact: '010-5678-9012', address: '충남 아산시 배방읍 희망로 890', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK024', approvalStatus: 'O', registrationDate: '2024.10.28' },
    { id: 25, company: '캠핑프로', group: '프로A', user: '설캠핑', contact: '010-6789-0123', address: '전북 전주시 완산구 전주로 123', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK025', approvalStatus: 'O', registrationDate: '2024.10.27' },
    { id: 26, company: '캠핑프로', group: '프로B', user: '방프로', contact: '010-7890-1234', address: '전북 익산시 익산대로 456', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK026', approvalStatus: 'O', registrationDate: '2024.10.27' },
    { id: 27, company: '드론프로', group: '프로1', user: '변드론', contact: '010-8901-2345', address: '전남 여수시 여수로 789', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK027', approvalStatus: 'X', registrationDate: '2024.10.26' },
    { id: 28, company: '드론프로', group: '프로2', user: '서프로', contact: '010-9012-3456', address: '전남 순천시 순천로 012', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK028', approvalStatus: 'O', registrationDate: '2024.10.26' },
    { id: 29, company: '캠핑마스터', group: '마스터A', user: '석캠핑', contact: '010-0123-4567', address: '경북 포항시 남구 포항로 345', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK029', approvalStatus: 'O', registrationDate: '2024.10.25' },
    { id: 30, company: '캠핑마스터', group: '마스터B', user: '성마스터', contact: '010-1111-2222', address: '경북 구미시 구미대로 678', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK030', approvalStatus: 'O', registrationDate: '2024.10.25' },
    { id: 31, company: '드론마스터', group: '마스터1', user: '소드론', contact: '010-2222-3333', address: '경남 창원시 성산구 창원대로 901', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK031', approvalStatus: 'O', registrationDate: '2024.10.24' },
    { id: 32, company: '드론마스터', group: '마스터2', user: '송마스터', contact: '010-3333-4444', address: '경남 김해시 김해대로 234', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK032', approvalStatus: 'O', registrationDate: '2024.10.24' },
    { id: 33, company: '캠핑킹', group: '킹A', user: '신캠핑', contact: '010-4444-5555', address: '제주시 노형동 노연로 567', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK033', approvalStatus: 'X', registrationDate: '2024.10.23' },
    { id: 34, company: '캠핑킹', group: '킹B', user: '심킹', contact: '010-5555-6666', address: '제주시 연동 연동로 890', itemCategory: '캠핑카', batteryStatus: '캠핑', packId: 'PACK034', approvalStatus: 'O', registrationDate: '2024.10.23' },
    { id: 35, company: '드론킹', group: '킹1', user: '오드론', contact: '010-6666-7777', address: '서귀포시 서귀동 서귀로 123', itemCategory: '드론', batteryStatus: '드론', packId: 'PACK035', approvalStatus: 'O', registrationDate: '2024.10.22' }
  ];

  const columns = useMemo(() => [
    {
      name: '사업장',
      dataIndex: 'company',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '그룹',
      dataIndex: 'group',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '사용자',
      dataIndex: 'user',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '연락처',
      dataIndex: 'contact',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px'
    },
    {
      name: '주소',
      dataIndex: 'address',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '300px'
    },
    {
      name: '아이템카테고리',
      dataIndex: 'itemCategory',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '배터리생산처',
      dataIndex: 'batteryStatus',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '팩 모델정보',
      dataIndex: 'packId',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '개인(위치)정보제공 동의',
      dataIndex: 'approvalStatus',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '180px'
    },
    {
      name: '등록일자',
      dataIndex: 'registrationDate',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    }
  ], []);

  const getFilteredData = useMemo(() => {
    return dummyData.filter(item => {
      const matchesKeyword = !searchKeyword || 
        item.user.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.contact.includes(searchKeyword);
      
      const matchesCompany = !selectedCompany || item.company === selectedCompany;
      const matchesGroup = !selectedGroup || item.group === selectedGroup;

      return matchesKeyword && matchesCompany && matchesGroup;
    });
  }, [searchKeyword, selectedCompany, selectedGroup, dummyData]);

  // 사업장 목록 (중복 제거)
  const companies = [...new Set(dummyData.map(item => item.company))];
  // 그룹 목록 (중복 제거)
  const groups = [...new Set(dummyData.map(item => item.group))];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            배터리 등록 현황
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 py-3 px-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <select
                className="h-8 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="">사업장</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>

              <select
                className="h-8 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">그룹명</option>
                {groups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>

              <input 
                type="text" 
                className="h-8 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[200px]"
                placeholder="검색어를 입력하세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<BatteryData>
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
    </div>
  );
};

export default BatteryRegistrationStatusPage; 