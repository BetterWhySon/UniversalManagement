import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import CompanySelectPopup from './components/CompanySelectPopup';
import AlertPopup from './components/AlertPopup';
import GroupSelectPopup from './components/GroupSelectPopup';
import BatteryEditPopup from './components/BatteryEditPopup';
import DeleteConfirmPopup from './components/DeleteConfirmPopup';
import CompanyGroupAssignPopup from './components/CompanyGroupAssignPopup';
import useCstBattery from '@/api/customer/cstBattery';
import useCstCompanyGroupMapping from '@/api/customer/cstCompanyGroupMapping';
import type { typeCstBattery } from '@/api/types/customer/typeCstBattery';

interface BatteryData extends typeCstBattery {
  company: string;
  group: string;
  id: number; // battery_id를 id로 매핑
  user_name: string; // phonenumber를 user_name으로 매핑
  contact: string; // phonenumber를 contact로 매핑
}

const BatteryRegistrationPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const { dataListBattery, storeBatteryList, storeBatteryAssign, storeBatteryRelease } = useCstBattery();
  const { storeCompanyGroupList, dataListCompanyGroup } = useCstCompanyGroupMapping();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isCompanySelectOpen, setIsCompanySelectOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isGroupSelectOpen, setIsGroupSelectOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('배터리를 선택해주세요.');
  const [isCompanyGroupAssignOpen, setIsCompanyGroupAssignOpen] = useState(false);
  const [tempSelectedCompany, setTempSelectedCompany] = useState<string>('');
  const [tempSelectedGroup, setTempSelectedGroup] = useState<string>('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<number>(0);
  const [isReleaseConfirmOpen, setIsReleaseConfirmOpen] = useState(false);

  useEffect(() => {
    storeBatteryList(trans);
  }, [storeBatteryList, trans]);

  // 이벤트 핸들러 수정
  const handleCompanyAssign = () => {
    if (selectedRows.length === 0) {
      setShowAlert(true);
      return;
    }
    setIsCompanySelectOpen(true);
  };

  const handleGroupAssign = () => {
    if (!tempSelectedCompany) {
      setAlertMessage('사업장을 먼저 지정해주세요.');
      setShowAlert(true);
      return;
    }

    // 선택된 데이터들의 사업장 확인
    const selectedItems = getFilteredData.filter(item => selectedRows.includes(item.id));
    const companies = new Set(selectedItems.map(item => item.company));

    if (companies.size > 1) {
      setAlertMessage('같은 사업장만 선택 가능합니다.');
      setShowAlert(true);
      return;
    }

    // 선택된 사업장의 groups 데이터를 가져옴
    const selectedCompanyData = dataListCompanyGroup?.find(company => company.site_id === selectedCompanyId);
    if (!selectedCompanyData || !selectedCompanyData.groups) {
      setAlertMessage('선택된 사업장의 그룹 데이터가 없습니다.');
      setShowAlert(true);
      return;
    }

    setIsGroupSelectOpen(true);
  };

  const handleAssignReset = () => {
    if (selectedRows.length === 0) {
      setShowAlert(true);
      return;
    }
    setIsReleaseConfirmOpen(true);
  };

  const handleConfirmRelease = async () => {
    try {
      // 배터리 지정해제 API 호출
      await storeBatteryRelease(selectedRows, trans);

      // 성공 시 상태 초기화
      setSelectedRows([]);
      setIsReleaseConfirmOpen(false);

      // 배터리 목록 새로고침
      await storeBatteryList(trans);
    } catch (error) {
      console.error('배터리 지정해제 중 오류 발생:', error);
      setAlertMessage('배터리 지정해제 중 오류가 발생했습니다.');
      setShowAlert(true);
    }
  };

  // 전체 선택 핸들러 추가
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(getFilteredData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  // 개별 선택 핸들러 추가
  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const getFilteredData = useMemo(() => {
    if (!dataListBattery) return [];
    
    let filteredData = dataListBattery.map(item => ({
      ...item,
      id: item.battery_id,
      company: item.site_name || '미지정',
      group: item.group_name || '미지정',
      user_name: item.user_name,
      contact: item.phonenumber
    })) as BatteryData[];

    // 검색어가 있는 경우 모든 필드에서 검색
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filteredData = filteredData.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(keyword)
        )
      );
    }

    // 사업장 필터링
    if (selectedCompany) {
      filteredData = filteredData.filter(item => item.company === selectedCompany);
    }

    // 그룹 필터링
    if (selectedGroup) {
      filteredData = filteredData.filter(item => item.group === selectedGroup);
    }

    // 미지정 사업장/그룹만 보기
    if (showUnassignedOnly) {
      filteredData = filteredData.filter(item => 
        item.company === '미지정' || item.group === '미지정'
      );
    }

    return filteredData;
  }, [searchKeyword, selectedCompany, selectedGroup, showUnassignedOnly, dataListBattery]);

  const columns = useMemo(() => [
    {
      name: '',
      dataIndex: 'checkbox',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '40px',
      render: (row: BatteryData) => (
        <div className="px-3" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={() => handleSelectRow(row.id)}
            className="w-4 h-4 accent-blue-500"
          />
        </div>
      )
    },
    {
      name: '사업장',
      dataIndex: 'company',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '그룹명',
      dataIndex: 'group',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '기기명',
      dataIndex: 'device_name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '어플리케이션',
      dataIndex: 'category',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '배터리 제조사',
      dataIndex: 'manufacturer',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '팩 ID',
      dataIndex: 'pack_id',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '팩 모델정보',
      dataIndex: 'model_name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '사용자',
      dataIndex: 'user_name',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '연락처',
      dataIndex: 'contact',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '주소',
      dataIndex: 'address_main',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px'
    },
    {
      name: '등록일자',
      dataIndex: 'registration_date',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    }
  ], [selectedRows, getFilteredData]);

  // 사업장 목록 (중복 제거)
  const companies = [...new Set(getFilteredData.map(item => item.company))];
  // 그룹 목록 (중복 제거)
  const groups = [...new Set(getFilteredData.map(item => item.group))];

  const handleCompanySelect = (selectedCompany: { name: string; id: number }) => {
    setTempSelectedCompany(selectedCompany.name);
    setSelectedCompanyId(selectedCompany.id);
    setIsCompanySelectOpen(false);
  };

  const handleGroupSelect = (selectedGroups: number[]) => {
    if (selectedGroups.length > 0) {
      const selectedCompanyData = dataListCompanyGroup?.find(company => company.site_id === selectedCompanyId);
      if (selectedCompanyData) {
        const selectedGroup = selectedCompanyData.groups.find(group => group.group_id === selectedGroups[0]);
        if (selectedGroup) {
          setTempSelectedGroup(selectedGroup.group_name);
        }
      }
    }
    setIsGroupSelectOpen(false);
  };

  const handleCompanyGroupConfirm = async (type: 'company' | 'group', value: string) => {
    if (selectedRows.length === 0) {
      setShowAlert(true);
      return;
    }

    if (type === 'company') {
      // 사업장만 선택된 경우
      if (!tempSelectedCompany) {
        setAlertMessage('사업장을 선택해주세요.');
        setShowAlert(true);
        return;
      }
    }

    try {
      // 선택된 그룹 ID 찾기 (그룹이 선택된 경우에만)
      let groupId = null;
      if (tempSelectedGroup) {
        const selectedCompanyData = dataListCompanyGroup?.find(company => company.site_id === selectedCompanyId);
        if (!selectedCompanyData) {
          setAlertMessage('선택된 사업장의 그룹 데이터가 없습니다.');
          setShowAlert(true);
          return;
        }

        const selectedGroupData = selectedCompanyData.groups.find(group => group.group_name === tempSelectedGroup);
        if (!selectedGroupData) {
          setAlertMessage('선택된 그룹 데이터가 없습니다.');
          setShowAlert(true);
          return;
        }
        groupId = selectedGroupData.group_id;
      }

      // 배터리 등록 API 호출
      await storeBatteryAssign(
        selectedCompanyId,
        groupId || 0, // 그룹이 선택되지 않은 경우 0으로 전달
        selectedRows,
        trans
      );

      // 성공 시 상태 초기화
      setTempSelectedCompany('');
      setTempSelectedGroup('');
      setSelectedCompanyId(0);
      setSelectedRows([]);
      setIsCompanyGroupAssignOpen(false);

      // 배터리 목록 새로고침
      await storeBatteryList(trans);
    } catch (error) {
      console.error('배터리 등록 중 오류 발생:', error);
      setAlertMessage('배터리 등록 중 오류가 발생했습니다.');
      setShowAlert(true);
    }
  };

  const handleCompanyGroupAssign = async () => {
    if (selectedRows.length === 0) {
      setShowAlert(true);
      return;
    }
    // 선택된 사업장과 그룹 초기화
    setTempSelectedCompany('');
    setTempSelectedGroup('');
    setSelectedCompanyId(0);
    
    await storeCompanyGroupList(trans);
    console.log('Company Group Data:', dataListCompanyGroup); // 데이터 확인용
    setIsCompanyGroupAssignOpen(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            배터리 등록
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 py-3 px-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-center gap-4'>
            <button
              className="h-8 px-4 text-sm bg-[#363B46] text-white rounded hover:bg-opacity-80 transition-colors"
              onClick={handleCompanyGroupAssign}
            >
              사업장/그룹 지정
            </button>

            <button
              className="h-8 px-4 text-sm bg-[#363B46] text-white rounded hover:bg-opacity-80 transition-colors"
              onClick={handleAssignReset}
            >
              사업장/그룹 지정해제
            </button>

            <input 
              type="text" 
              className="h-8 text-sm px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[200px] placeholder-white/40"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="unassignedOnly"
                checked={showUnassignedOnly}
                onChange={(e) => setShowUnassignedOnly(e.target.checked)}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <label htmlFor="unassignedOnly" className="text-sm text-white cursor-pointer">
                미지정 사업장/그룹만
              </label>
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
              pageSize: 12,
            }}
            paginationMarginTop='32px'
            emptyMessage={trans('데이터가 없습니다.')}
            onClick={(row) => handleSelectRow(row.id)}
            className="cursor-pointer"
          />
        </div>

        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 구현 */}
        </div>
      </div>

      {isCompanySelectOpen && (
        <CompanySelectPopup
          onClose={() => setIsCompanySelectOpen(false)}
          onConfirm={handleCompanySelect}
        />
      )}

      {isGroupSelectOpen && (
        <GroupSelectPopup
          onClose={() => setIsGroupSelectOpen(false)}
          onConfirm={handleGroupSelect}
          isSingleSelect={isCompanyGroupAssignOpen}
          site_id={selectedCompanyId}
          groups={dataListCompanyGroup?.find(company => company.site_id === selectedCompanyId)?.groups || []}
        />
      )}

      {showAlert && (
        <AlertPopup
          message={alertMessage}
          onClose={() => {
            setShowAlert(false);
            setAlertMessage('배터리를 선택해주세요.');  // 기본 메시지로 초기화
          }}
        />
      )}

      {isCompanyGroupAssignOpen && (
        <CompanyGroupAssignPopup
          onClose={() => setIsCompanyGroupAssignOpen(false)}
          onCompanyAssign={() => setIsCompanySelectOpen(true)}
          onGroupAssign={handleGroupAssign}
          onConfirm={handleCompanyGroupConfirm}
          selectedCompany={tempSelectedCompany}
          selectedGroup={tempSelectedGroup}
        />
      )}

      {isReleaseConfirmOpen && (
        <DeleteConfirmPopup
          onClose={() => setIsReleaseConfirmOpen(false)}
          onConfirm={handleConfirmRelease}
          title="사업장/그룹 지정해제"
          message="선택한 배터리의 사업장/그룹 지정을 해제하시겠습니까?"
        />
      )}
    </div>
  );
};

export default BatteryRegistrationPage; 