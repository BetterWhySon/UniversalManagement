import React, { useState, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';
import useAdmBatteryMapModel from '@/api/admin/admBatteryMapModel';
import { typeAdmBatteryMapModelList } from '@/api/types/admin/typeAdmBatteryMapModel';
import { TableColumn } from '@/types/table.type';
import useCustomerId from '@/hooks/useCustomerId';
import BatteryMapModelRegistrationPopup from './components/BatteryMapModelRegistrationPopup';

export default function BatteryMapModelPage() {
  const { t: trans } = useTranslation('translation');
  const { dataListBatteryMapModel, storeBatteryMapModelList, storeBatteryMapModelDelete, storeBatteryMapModelEdit, storeBatteryMapModelCreate } = useAdmBatteryMapModel();
  const customerId = useCustomerId();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<typeAdmBatteryMapModelList | null>(null);
  const [editData, setEditData] = useState<typeAdmBatteryMapModelList | null>(null);

  useEffect(() => {
    storeBatteryMapModelList(Number(customerId), trans);
  }, []);

  const handleEdit = (row: typeAdmBatteryMapModelList) => {
    setEditData(row);
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: typeAdmBatteryMapModelList) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await storeBatteryMapModelDelete(deleteTarget.id.toString(), trans);
      await storeBatteryMapModelList(Number(customerId), trans);
      setDeleteTarget(null);
    }
  };

  const handleSave = async (data: typeAdmBatteryMapModelList) => {
    if (editData) {
      await storeBatteryMapModelEdit(
        data.id.toString(),
        data.name,
        data.referred_manufacturer,
        data.referred_model_object,
        data.referred_model_data_config,
        data.referred_model_custom,
        trans
      );
    } else {
      await storeBatteryMapModelCreate(
        data.name,
        data.referred_manufacturer,
        data.referred_model_object,
        data.referred_model_data_config,
        data.referred_model_custom,
        trans
      );
    }
    await storeBatteryMapModelList(Number(customerId), trans);
    setIsRegistrationPopupOpen(false);
    setEditData(null);
  };

  const filteredData = dataListBatteryMapModel?.filter(item =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  ) || [];

  const columns: TableColumn<typeAdmBatteryMapModelList>[] = [
    {
      name: '번호',
      dataIndex: 'id',
      align: TEXT_ALIGN.CENTER,
      width: '80px'
    },
    {
      name: '모델명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      width: '150px',
      render: (row: typeAdmBatteryMapModelList) => (
        <button
          onClick={() => handleEdit(row)}
          className="font-bold underline cursor-pointer"
        >
          {row.name}
        </button>
      )
    },
    {
      name: '배터리(모빌리티) 제원',
      dataIndex: 'referred_model_object_name',
      align: TEXT_ALIGN.CENTER,
      width: '150px'
    },
    {
      name: '표준 데이터',
      dataIndex: 'referred_model_data_config_name',
      align: TEXT_ALIGN.CENTER,
      width: '150px'
    },
    {
      name: '제조자 지정 데이터',
      dataIndex: 'referred_model_custom_name',
      align: TEXT_ALIGN.CENTER,
      width: '150px'
    },
    {
      name: '소속 배터리 수',
      dataIndex: 'object_count',
      align: TEXT_ALIGN.CENTER,
      width: '120px'
    },
    {
      name: '등록일자',
      dataIndex: 'registration_date',
      align: TEXT_ALIGN.CENTER,
      width: '150px',
      render: (row: typeAdmBatteryMapModelList) => {
        if (!row.registration_date) return '-';
        const date = new Date(row.registration_date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
      }
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
      render: (row: typeAdmBatteryMapModelList) => (
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
            배터리(모빌리티) 모델
          </h1>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 justify-between'>
          <div className='flex gap-2'>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder={trans('배터리(모빌리티) 모델 검색')}
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
            {trans('배터리 매핑 모델 등록')}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<typeAdmBatteryMapModelList>
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
          title="배터리 매핑 모델 삭제"
          message={`"${deleteTarget.name}" 모델을\n삭제하시겠습니까?`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isRegistrationPopupOpen && (
        <BatteryMapModelRegistrationPopup
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