import React, { useState, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';
import useAdmModelCustomDeviceControl from '@/api/admin/admModelCustomDeviceControl';
import { typeAdmModelCustomDeviceControlList } from '@/api/types/admin/typeAdmModelCustomDeviceControl';
import { TableColumn } from '@/types/table.type';
import useCustomerId from '@/hooks/useCustomerId';
import ManufacturerDeviceControlRegistrationPopup from './components/ManufacturerDeviceControlRegistrationPopup';

export default function ManufacturerDeviceControlPage() {
  const { t: trans } = useTranslation('translation');
  const { dataListModelCustomDeviceControl, storeModelCustomDeviceControlList, storeModelCustomDeviceControlDelete, storeModelCustomDeviceControlEdit, storeModelCustomDeviceControlCreate } = useAdmModelCustomDeviceControl();
  const customerId = useCustomerId();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<typeAdmModelCustomDeviceControlList | null>(null);
  const [editData, setEditData] = useState<typeAdmModelCustomDeviceControlList | null>(null);

  useEffect(() => {
    storeModelCustomDeviceControlList(Number(customerId), trans);
  }, []);

  const handleEdit = (row: typeAdmModelCustomDeviceControlList) => {
    setEditData(row);
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: typeAdmModelCustomDeviceControlList) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await storeModelCustomDeviceControlDelete(deleteTarget.id.toString(), trans);
      await storeModelCustomDeviceControlList(Number(customerId), trans);
      setDeleteTarget(null);
    }
  };

  const handleSave = async (data: typeAdmModelCustomDeviceControlList) => {
    if (editData) {
      await storeModelCustomDeviceControlEdit(
        data.id.toString(),
        data.name,
        data.referred_manufacturer,
        data.device_type,
        data.state_type,
        data.control_type,
        data.control_id,
        data.icon_id,
        trans
      );
    } else {
      await storeModelCustomDeviceControlCreate(
        data.name,
        data.referred_manufacturer,
        data.device_type,
        data.state_type,
        data.control_type,
        data.control_id,
        data.icon_id,
        trans
      );
    }
    await storeModelCustomDeviceControlList(Number(customerId), trans);
    setIsRegistrationPopupOpen(false);
    setEditData(null);
  };

  const filteredData = dataListModelCustomDeviceControl?.filter(item =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  ) || [];

  const getDeviceType = (type: number) => {
    switch(type) {
      case 0: return '상태';
      case 1: return '상태&제어';
      case 2: return '제어';
      default: return '-';
    }
  };

  const getDataType = (type: number) => {
    switch(type) {
      case 0: return 'int';
      case 1: return 'float';
      case 2: return 'boolean';
      default: return '-';
    }
  };

  const columns: TableColumn<typeAdmModelCustomDeviceControlList>[] = [
    {
      name: '번호',
      dataIndex: 'id',
      align: TEXT_ALIGN.CENTER,
      width: '80px'
    },
    {
      name: '데이터명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      width: '150px',
      render: (row: typeAdmModelCustomDeviceControlList) => (
        <button
          onClick={() => handleEdit(row)}
          className="font-bold underline cursor-pointer"
        >
          {row.name}
        </button>
      )
    },
    {
      name: '기기 타입',
      dataIndex: 'device_type',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomDeviceControlList) => getDeviceType(row.device_type)
    },
    {
      name: '상태 데이터 타입',
      dataIndex: 'state_type',
      align: TEXT_ALIGN.CENTER,
      width: '140px',
      render: (row: typeAdmModelCustomDeviceControlList) => getDataType(row.state_type)
    },
    {
      name: '제어 데이터',
      dataIndex: 'control_type',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomDeviceControlList) => getDataType(row.control_type)
    },
    {
      name: '제어 아이디',
      dataIndex: 'control_id',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '아이콘 아이디',
      dataIndex: 'icon_id',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '연계 기기 그룹',
      dataIndex: 'group_custom_device_count',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
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
      render: (row: typeAdmModelCustomDeviceControlList) => (
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
            기기 상태, 제어 데이터
          </h1>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 justify-between'>
          <div className='flex gap-2'>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder={trans('장치 제어 데이터 검색')}
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
            {trans('등록')}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<typeAdmModelCustomDeviceControlList>
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
          title="장치 제어 데이터 삭제"
          message={`"${deleteTarget.name}" 데이터를\n삭제하시겠습니까?`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isRegistrationPopupOpen && (
        <ManufacturerDeviceControlRegistrationPopup
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