import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';

interface ServiceStatus {
  id: number;
  company: string;
  group: string;
  deviceId: string;
  status: string;
  registrationDate: string;
  lastUpdate: string;
}

const ServiceStatusPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  const data: ServiceStatus[] = [
    { id: 1, company: '신일운수', group: '영업1팀', deviceId: '배터리1호', status: '운영중', registrationDate: '2024-01-15', lastUpdate: '2024-03-10' },
    { id: 2, company: '신일운수', group: '영업2팀', deviceId: '배터리2호', status: '운영중', registrationDate: '2024-01-16', lastUpdate: '2024-03-11' },
    // ... 더 많은 데이터
  ];

  const columns = [
    { 
      name: '사업장', 
      dataIndex: 'company', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '150px',
    },
    { 
      name: '그룹명', 
      dataIndex: 'group', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '150px',
    },
    { 
      name: '기기명', 
      dataIndex: 'deviceId', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '150px',
    },
    { 
      name: '상태', 
      dataIndex: 'status', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '100px',
    },
    { 
      name: '등록일', 
      dataIndex: 'registrationDate', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '150px',
    },
    { 
      name: '최종 수정일', 
      dataIndex: 'lastUpdate', 
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
      fixedWidth: '150px',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            관제서비스 신청현황
          </h1>
        </div>

        <div className='w-full bg-hw-dark-2 p-4 rounded-lg text-hw-white-1'>
          <div className='flex flex-row items-start gap-8'>
            <div className='relative'>
              <h3 className='absolute -top-2 left-4 bg-hw-dark-2 px-2 text-sm'>
                {trans('검색 조건')}
              </h3>
              <div className='border border-hw-gray-4 rounded-lg p-4 pt-5'>
                <div className='flex flex-wrap gap-2 h-10 items-center'>
                  <select 
                    className="bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full border-none outline-none min-w-[120px]"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="">{trans('사업장')}</option>
                    <option value="신일운수">신일운수</option>
                  </select>
                  <select 
                    className="bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full border-none outline-none min-w-[120px]"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                  >
                    <option value="">{trans('그룹명')}</option>
                    <option value="영업1팀">영업1팀</option>
                    <option value="영업2팀">영업2팀</option>
                  </select>
                </div>
              </div>
            </div>

            <button className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center h-10 mt-[26px]'>
              <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>
                {trans('조회')}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<ServiceStatus>
            data={data}
            columns={columns}
            isPagination
            pagination={{
              total: data.length,
              pageSize: 15,
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

export default ServiceStatusPage; 