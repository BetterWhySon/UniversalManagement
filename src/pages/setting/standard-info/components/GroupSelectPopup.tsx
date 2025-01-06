import React, { useState } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';

interface GroupSelectPopupProps {
  onClose: () => void;
  onConfirm: (selectedGroup: string) => void;
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
  const [selectedGroupCode, setSelectedGroupCode] = useState<string>('');

  const groups: GroupItem[] = [
    { id: 1, code: 'Group1', name: 'FF캠핑카', address: '', description: '' },
    { id: 2, code: 'Group2', name: '베이런전동바이크', address: '', description: '' },
    { id: 3, code: 'Group3', name: '캠핑존', address: '', description: '' },
    { id: 4, code: 'Group4', name: '드론파크', address: '', description: '' },
    { id: 5, code: 'Group5', name: '아웃도어파크', address: '', description: '' },
    { id: 6, code: 'Group6', name: '마린스포츠', address: '', description: '' },
  ];

  const columns = [
    {
      name: '',
      dataIndex: 'checkbox',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '50px',
      render: (row: GroupItem) => (
        <input
          type="radio"
          name="groupSelect"
          checked={selectedGroupCode === row.code}
          onChange={() => setSelectedGroupCode(row.code)}
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
            <h2 className="text-white text-lg font-medium">그룹 지정</h2>
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
                const selectedGroup = groups.find(g => g.code === selectedGroupCode);
                if (selectedGroup) {
                  onConfirm(selectedGroup.name);
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

export default GroupSelectPopup; 