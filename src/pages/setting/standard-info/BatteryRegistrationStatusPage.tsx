import React, { useState, useMemo, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import useCstBattery from '@/api/customer/cstBattery';
import type { typeCstBattery } from '@/api/types/customer/typeCstBattery';

interface BatteryData extends typeCstBattery {
  id: number;
  deviceName: string;
  application: string;
  packId: string;
  packModel: string;
  user: string;
  contact: string;
  address: string;
  registrationDate: string;
  company: string;
  group: string;
}

const BatteryRegistrationStatusPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const { dataListBattery, storeBatteryList } = useCstBattery();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedApplication, setSelectedApplication] = useState<string>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [selectedPackModel, setSelectedPackModel] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    storeBatteryList(trans);
  }, [storeBatteryList, trans]);

  const batteryData = useMemo(() => {
    if (!dataListBattery) return [];
    
    return dataListBattery.map(item => ({
      ...item,
      id: item.battery_id,
      deviceName: item.device_name,
      application: item.category,
      packId: item.battery_id.toString(),
      packModel: item.model_name,
      user: item.user_name,
      contact: item.phonenumber,
      address: item.address_main,
      registrationDate: item.registration_date,
      company: item.site_name || '미지정',
      group: item.group_name || '미지정'
    })) as BatteryData[];
  }, [dataListBattery]);

  // 사업장 목록 (중복 제거)
  const companies = [...new Set(batteryData.map(item => item.company))];
  // 그룹 목록 (중복 제거)
  const groups = [...new Set(batteryData.map(item => item.group))];
  // 어플리케이션 목록 (중복 제거)
  const applications = [...new Set(batteryData.map(item => item.application))];
  // 제조사 목록 (중복 제거)
  const manufacturers = [...new Set(batteryData.map(item => item.manufacturer))];
  // 팩 모델정보 목록 (중복 제거)
  const packModels = [...new Set(batteryData.map(item => item.packModel))];

  const getFilteredData = useMemo(() => {
    return batteryData.filter(item => {
      const searchTarget = [
        item.company,
        item.group,
        item.deviceName,
        item.application,
        item.manufacturer,
        item.packId,
        item.packModel,
        item.user,
        item.contact,
        item.address,
        item.registrationDate
      ].join(' ').toLowerCase();

      const matchesKeyword = !searchKeyword || searchTarget.includes(searchKeyword.toLowerCase());
      const matchesCompany = !selectedCompany || item.company === selectedCompany;
      const matchesGroup = !selectedGroup || item.group === selectedGroup;
      const matchesApplication = !selectedApplication || item.application === selectedApplication;
      const matchesManufacturer = !selectedManufacturer || item.manufacturer === selectedManufacturer;
      const matchesPackModel = !selectedPackModel || item.packModel === selectedPackModel;

      const itemDate = new Date(item.registrationDate.replace(/\./g, '-'));
      const matchesStartDate = !startDate || itemDate >= new Date(startDate);
      const matchesEndDate = !endDate || itemDate <= new Date(endDate);

      return matchesKeyword && matchesCompany && matchesGroup && 
             matchesApplication && matchesManufacturer && matchesPackModel &&
             matchesStartDate && matchesEndDate;
    });
  }, [searchKeyword, selectedCompany, selectedGroup, selectedApplication, 
      selectedManufacturer, selectedPackModel, startDate, endDate, batteryData]);

  const columns = useMemo(() => [
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
      dataIndex: 'deviceName',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '어플리케이션',
      dataIndex: 'application',
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
      dataIndex: 'packId',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '팩 모델정보',
      dataIndex: 'packModel',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '사용자',
      dataIndex: 'user',
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
      dataIndex: 'address',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px'
    },
    {
      name: '등록일자',
      dataIndex: 'registrationDate',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    }
  ], []);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            배터리 등록 현황
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 py-3 px-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-center gap-4 flex-wrap'>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="h-8 text-sm px-2 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[120px]"
            >
              <option value="">사업장 전체</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="h-8 text-sm px-2 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[120px]"
            >
              <option value="">그룹 전체</option>
              {groups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>

            <select
              value={selectedApplication}
              onChange={(e) => setSelectedApplication(e.target.value)}
              className="h-8 text-sm px-2 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[120px]"
            >
              <option value="">어플리케이션 전체</option>
              {applications.map(app => (
                <option key={app} value={app}>{app}</option>
              ))}
            </select>

            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="h-8 text-sm px-2 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[120px]"
            >
              <option value="">배터리 제조사 전체</option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
              ))}
            </select>

            <select
              value={selectedPackModel}
              onChange={(e) => setSelectedPackModel(e.target.value)}
              className="h-8 text-sm px-2 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[120px]"
            >
              <option value="">팩 모델정보 전체</option>
              {packModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-8 text-sm px-2 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[130px]"
              />
              <span className="text-white">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-8 text-sm px-2 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[130px]"
              />
            </div>

            <input 
              type="text" 
              className="h-8 text-sm px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white min-w-[200px] placeholder-white/40"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
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
            // emptyMessage={trans('데이터가 없습니다.')}
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