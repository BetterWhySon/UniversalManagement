import React, { useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import AlertPopup from './AlertPopup';

interface GroupSelectPopupProps {
  onClose: () => void;
  onConfirm: (selectedGroups: number[]) => void;
}

interface GroupItem {
  id: number;
  code: string;
  name: string;
  address: string;
  description: string;
}

const GroupSelectPopup: React.FC<GroupSelectPopupProps> = ({ onClose, onConfirm }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedGroupCodes, setSelectedGroupCodes] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  
  const MAX_SELECTIONS = 12;

  const groups: GroupItem[] = [
    { id: 1, code: 'Group1', name: 'FF캠핑카', address: '서울시 강남구 테헤란로 123', description: '캠핑카 렌탈 및 정비' },
    { id: 2, code: 'Group2', name: '베이런전동바이크', address: '서울시 송파구 올림픽로 456', description: '전동바이크 판매점' },
    { id: 3, code: 'Group3', name: '캠핑존', address: '경기도 고양시 일산동구 중앙로 789', description: '캠핑용품 전문점' },
    { id: 4, code: 'Group4', name: '드론파크', address: '인천시 연수구 컨벤시아대로 234', description: '드론 체험장' },
    { id: 5, code: 'Group5', name: '아웃도어파크', address: '경기도 성남시 분당구 판교로 567', description: '아웃도어 용품점' },
    { id: 6, code: 'Group6', name: '마린스포츠', address: '부산시 해운대구 마린시티로 890', description: '수상레저 장비' },
    { id: 7, code: 'Group7', name: '어드벤처클럽', address: '강원도 춘천시 남산면 창촌길 111', description: '레저스포츠 센터' },
    { id: 8, code: 'Group8', name: '바이크월드', address: '대구시 수성구 들안로 222', description: '자전거 전문점' },
    { id: 9, code: 'Group9', name: '레저타임', address: '광주시 서구 상무중앙로 333', description: '레저용품 대여' },
    { id: 10, code: 'Group10', name: '캠핑파크', address: '대전시 유성구 대학로 444', description: '캠핑장 운영' },
    { id: 11, code: 'Group11', name: '서핑스테이션', address: '제주시 구좌읍 해맞이해안로 555', description: '서핑 강습' },
    { id: 12, code: 'Group12', name: '산악레저', address: '강원도 홍천군 서면 한치골길 666', description: '등산용품점' },
    { id: 13, code: 'Group13', name: '워터파크', address: '경기도 용인시 처인구 포곡읍 777', description: '수영장 시설' },
    { id: 14, code: 'Group14', name: '익스트림스포츠', address: '충북 청주시 상당구 상당로 888', description: '익스트림 스포츠' },
    { id: 15, code: 'Group15', name: '레저킹', address: '전북 전주시 완산구 전주로 999', description: '종합 레저용품' },
    { id: 16, code: 'Group16', name: '스포츠파크', address: '경남 창원시 성산구 창원대로 1010', description: '스포츠 시설' },
    { id: 17, code: 'Group17', name: '캠핑스토어', address: '울산시 남구 삼산로 1111', description: '캠핑용품 판매' },
    { id: 18, code: 'Group18', name: '레저월드', address: '경북 포항시 남구 포항로 1212', description: '레저용품 도매' },
    { id: 19, code: 'Group19', name: '아웃도어존', address: '충남 천안시 동남구 천안대로 1313', description: '아웃도어 매장' },
    { id: 20, code: 'Group20', name: '스포츠클럽', address: '전남 여수시 여수엑스포대로 1414', description: '스포츠 클럽' }
  ];

  const handleCheckboxChange = (checked: boolean, code: string) => {
    if (checked && selectedGroupCodes.length >= MAX_SELECTIONS) {
      setShowAlert(true);
      return;
    }

    if (checked) {
      setSelectedGroupCodes([...selectedGroupCodes, code]);
    } else {
      setSelectedGroupCodes(selectedGroupCodes.filter(c => c !== code));
    }
  };

  const columns = [
    {
      name: '',
      dataIndex: 'checkbox',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '50px',
      render: (row: GroupItem) => (
        <input
          type="checkbox"
          checked={selectedGroupCodes.includes(row.code)}
          onChange={(e) => handleCheckboxChange(e.target.checked, row.code)}
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
      name: '그룹명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px'
    },
    {
      name: '주소',
      dataIndex: 'address',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: 'Description',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
    }
  ];

  const filteredGroups = groups.filter(group => 
    group.code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    group.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#2A2F3A] rounded-lg w-[1000px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <h2 className="text-white text-lg font-medium">그룹 지정</h2>
              <span className="text-sm text-gray-400">(최대 12개까지 선택가능)</span>
            </div>
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
                data={filteredGroups}
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
                const selectedGroups = groups
                  .filter(g => selectedGroupCodes.includes(g.code))
                  .map(g => g.id);
                onConfirm(selectedGroups);
              }}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-500/80 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>

      {showAlert && (
        <AlertPopup
          message="그룹은 최대 12개까지 선택 가능합니다."
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default GroupSelectPopup; 