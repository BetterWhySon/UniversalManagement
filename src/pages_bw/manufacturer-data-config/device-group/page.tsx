import React, { useState, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';
import useAdmModelCustomDeviceGroup from '@/api/admin/admModelCustomDeviceGroup';
import { typeAdmModelCustomDeviceGroupList } from '@/api/types/admin/typeAdmModelCustomDeviceGroup';
import { TableColumn } from '@/types/table.type';
import useCustomerId from '@/hooks/useCustomerId';
import ManufacturerDeviceGroupRegistrationPopup from './components/ManufacturerDeviceGroupRegistrationPopup';

export default function ManufacturerDeviceGroupPage() {
  const { t: trans } = useTranslation('translation');
  const { dataListModelCustomDeviceGroup, storeModelCustomDeviceGroupList, storeModelCustomDeviceGroupDelete, storeModelCustomDeviceGroupEdit, storeModelCustomDeviceGroupCreate } = useAdmModelCustomDeviceGroup();
  const customerId = useCustomerId();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<typeAdmModelCustomDeviceGroupList | null>(null);
  const [editData, setEditData] = useState<typeAdmModelCustomDeviceGroupList | null>(null);

  useEffect(() => {
    storeModelCustomDeviceGroupList(Number(customerId), trans);
  }, []);

  const handleEdit = (row: typeAdmModelCustomDeviceGroupList) => {
    setEditData(row);
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: typeAdmModelCustomDeviceGroupList) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await storeModelCustomDeviceGroupDelete(deleteTarget.id.toString(), trans);
      await storeModelCustomDeviceGroupList(Number(customerId), trans);
      setDeleteTarget(null);
    }
  };

  const handleSave = async (data: typeAdmModelCustomDeviceGroupList) => {
    if (editData) {
      await storeModelCustomDeviceGroupEdit(
        data.id.toString(),
        data.name,
        data.referred_manufacturer,
        data.device_list,
        data.description,
        trans
      );
    } else {
      await storeModelCustomDeviceGroupCreate(
        data.name,
        data.referred_manufacturer,
        data.device_list,
        data.description,
        trans
      );
    }
    await storeModelCustomDeviceGroupList(Number(customerId), trans);
    setIsRegistrationPopupOpen(false);
    setEditData(null);
  };

  const filteredData = dataListModelCustomDeviceGroup?.filter(item =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  ) || [];

  const formatDeviceList = (devices: { name: string }[]) => {
    const deviceNames = devices.map(device => device.name).join(', ');
    if (deviceNames.length > 50) {
      return deviceNames.substring(0, 47) + '...';
    }
    return deviceNames;
  };

  const columns: TableColumn<typeAdmModelCustomDeviceGroupList>[] = [
    {
      name: '번호',
      dataIndex: 'id',
      align: TEXT_ALIGN.CENTER,
      width: '80px'
    },
    {
      name: '그룹명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      width: '150px',
      render: (row: typeAdmModelCustomDeviceGroupList) => (
        <button
          onClick={() => handleEdit(row)}
          className="font-bold underline cursor-pointer"
        >
          {row.name}
        </button>
      )
    },
    {
      name: '그룹 설명',
      dataIndex: 'description',
      align: TEXT_ALIGN.CENTER,
      width: '200px'
    },
    {
      name: '선택된 기기',
      dataIndex: 'device_info',
      align: TEXT_ALIGN.LEFT,
      width: '400px',
      render: (row: typeAdmModelCustomDeviceGroupList) => formatDeviceList(row.device_info)
    },
    {
      name: '연계 제조자 지정 데이터',
      dataIndex: 'model_custom_count',
      align: TEXT_ALIGN.CENTER,
      width: '180px'
    },
    {
      name: '수정/삭제',
      dataIndex: 'actions',
      align: TEXT_ALIGN.CENTER,
      width: '100px',
      fixed: 'right' as const,
      className: 'bg-transparent',
      style: { 
        position: 'sticky' as const,
        right: 0, 
        backgroundColor: '#2A2F3A', 
        zIndex: 2,
        boxShadow: '-4px 0 8px rgba(0,0,0,0.2)'
      },
      render: (row: typeAdmModelCustomDeviceGroupList) => (
        <div className="flex items-center justify-center gap-2 h-full">
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
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            기기 그룹
          </h1>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 justify-between'>
          <div className='flex gap-2'>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder={trans('기기 그룹 검색')}
              className='w-full sm:w-[240px] h-[38px] px-3 bg-hw-dark-1 border border-hw-dark-4 rounded text-white placeholder-gray-500 focus:outline-none focus:border-hw-dark-5'
            />
          </div>
          <button
            onClick={() => {
              setEditData(null);
              setIsRegistrationPopupOpen(true);
            }}
            className='h-[38px] px-4 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors'
          >
            {trans('기기 그룹 등록')}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<typeAdmModelCustomDeviceGroupList>
            data={filteredData}
            columns={[
              ...columns.slice(0, -1),
              {
                ...columns[columns.length - 1],
                fixed: 'right',
                fixedWidth: '100px',
                style: { 
                  position: 'sticky', 
                  right: 0, 
                  backgroundColor: '#2A2F3A', 
                  zIndex: 2,
                  boxShadow: '-4px 0 8px rgba(0,0,0,0.2)'
                }
              }
            ]}
            isPagination
            pagination={{
              total: filteredData.length,
              pageSize: 14,
            }}
            paginationMarginTop='32px'
            emptyMessage={trans('데이터가 없습니다.')}
            className="min-w-[1400px]"
          />
        </div>

        <div className='w-full block xs:hidden'>
          {/* 모바일 테이블 구현 */}
        </div>
      </div>

      {deleteTarget && (
        <DeleteConfirmPopup
          title="기기 그룹 삭제"
          message={`"${deleteTarget.name}" 그룹을\n삭제하시겠습니까?`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isRegistrationPopupOpen && (
        <ManufacturerDeviceGroupRegistrationPopup
          onClose={() => {
            setIsRegistrationPopupOpen(false);
            setEditData(null);
          }}
          onSave={handleSave}
          initialData={editData || undefined}
        />
      )}
    </div>
  );
} 