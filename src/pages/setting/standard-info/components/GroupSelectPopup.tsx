import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import AlertPopup from './AlertPopup';
import { useTranslation } from 'react-i18next';

interface GroupSelectPopupProps {
  onClose: () => void;
  onConfirm: (selectedGroups: number[]) => void;
  isSingleSelect?: boolean;
  site_id: number;
  groups: Array<{
    group_id: number;
    code: string;
    group_name: string;
    address_main: string;
    description: string;
  }>;
}

interface GroupData {
  id: number;
  code: string;
  name: string;
  description?: string;
}

const GroupSelectPopup: React.FC<GroupSelectPopupProps> = ({ onClose, onConfirm, isSingleSelect = false, site_id, groups }) => {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  
  const MAX_SELECTIONS = 12;

  const handleCheckboxChange = (checked: boolean, group_id: number) => {
    if (isSingleSelect) {
      setSelectedGroupId(checked ? group_id : null);
      return;
    }

    if (checked && selectedGroupIds.length >= MAX_SELECTIONS) {
      setShowAlert(true);
      return;
    }

    if (checked) {
      setSelectedGroupIds([...selectedGroupIds, group_id]);
    } else {
      setSelectedGroupIds(selectedGroupIds.filter(id => id !== group_id));
    }
  };

  const handleRowClick = (row: GroupData) => {
    if (isSingleSelect) {
      handleCheckboxChange(selectedGroupId !== row.id, row.id);
    } else {
      handleCheckboxChange(!selectedGroupIds.includes(row.id), row.id);
    }
  };

  const columns = [
    {
      name: '',
      dataIndex: 'checkbox',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '50px',
      render: (row: GroupData) => (
        isSingleSelect ? (
          <input
            type="radio"
            name="groupSelect"
            checked={selectedGroupId === row.id}
            onChange={(e) => handleCheckboxChange(e.target.checked, row.id)}
            className="w-4 h-4 accent-blue-500"
          />
        ) : (
          <input
            type="checkbox"
            checked={selectedGroupIds.includes(row.id)}
            onChange={(e) => handleCheckboxChange(e.target.checked, row.id)}
            className="w-4 h-4 accent-blue-500"
          />
        )
      )
    },
    {
      name: 'CODE',
      dataIndex: 'code',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '그룹명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
    },
    {
      name: 'Description',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
    }
  ];

  const filteredGroups = useMemo(() => {
    if (!groups) return [];
    return groups.map(group => ({
      id: group.group_id,
      code: group.code,
      name: group.group_name,
      description: group.description
    })).filter(group => 
      group.code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      group.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [groups, searchKeyword]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
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
              <TableData<GroupData>
                data={filteredGroups}
                columns={columns}
                className="min-h-0 cursor-pointer"
                emptyMessage={trans('데이터가 없습니다.')}
                onClick={handleRowClick}
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
                if (isSingleSelect) {
                  onConfirm(selectedGroupId ? [selectedGroupId] : []);
                } else {
                  onConfirm(selectedGroupIds);
                }
              }}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-500/80 transition-colors"
              disabled={isSingleSelect ? !selectedGroupId : selectedGroupIds.length === 0}
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