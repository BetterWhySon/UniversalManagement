import React, { useState, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import DeleteConfirmPopup from '@/components/popup/DeleteConfirmPopup';
import useAdmModelCustom from '@/api/admin/admModelCustom';
import { typeAdmModelCustomList } from '@/api/types/admin/typeAdmModelCustom';
import { TableColumn } from '@/types/table.type';
import useCustomerId from '@/hooks/useCustomerId';
import ManufacturerDataRegistrationPopup from './components/ManufacturerDataRegistrationPopup';
import SelectionPopup from './components/SelectionPopup';
import useAdmModelCustomRealTime from '@/api/admin/admModelCustomRealTime';
import useAdmModelCustomDeviceGroup from '@/api/admin/admModelCustomDeviceGroup';
import useAdmModelCustomAlarm from '@/api/admin/admModelCustomAlarm';
import useAdmModelCustomSpec from '@/api/admin/admModelCustomSpec';

export default function ManufacturerDataConfigPage() {
  const { t: trans } = useTranslation('translation');
  const { dataListModelCustom, storeModelCustomList, storeModelCustomDelete, storeModelCustomEdit, storeModelCustomCreate } = useAdmModelCustom();
  const customerId = useCustomerId();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<typeAdmModelCustomList | null>(null);
  const [editData, setEditData] = useState<typeAdmModelCustomList | null>(null);
  const { dataListModelCustomRealTime, storeModelCustomRealTimeList } = useAdmModelCustomRealTime();
  const { dataListModelCustomDeviceGroup, storeModelCustomDeviceGroupList } = useAdmModelCustomDeviceGroup();
  const { dataListModelCustomAlarm, storeModelCustomAlarmList } = useAdmModelCustomAlarm();
  const { dataListModelCustomSpec, storeModelCustomSpecList } = useAdmModelCustomSpec();
  const [selectedRow, setSelectedRow] = useState<typeAdmModelCustomList | null>(null);
  const [isRealtimePopupOpen, setIsRealtimePopupOpen] = useState(false);
  const [isDevicePopupOpen, setIsDevicePopupOpen] = useState(false);
  const [isAlarmPopupOpen, setIsAlarmPopupOpen] = useState(false);
  const [isSpecPopupOpen, setIsSpecPopupOpen] = useState(false);

  useEffect(() => {
    storeModelCustomList(Number(customerId), trans);
    storeModelCustomRealTimeList(Number(customerId), trans);
    storeModelCustomDeviceGroupList(Number(customerId), trans);
    storeModelCustomAlarmList(Number(customerId), trans);
    storeModelCustomSpecList(Number(customerId), trans);
  }, []);

  const handleEdit = (row: typeAdmModelCustomList) => {
    setEditData(row);
    setIsRegistrationPopupOpen(true);
  };

  const handleDelete = (row: typeAdmModelCustomList) => {
    setDeleteTarget(row);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await storeModelCustomDelete(deleteTarget.id.toString(), trans);
      await storeModelCustomList(Number(customerId), trans);
      setDeleteTarget(null);
    }
  };

  const handleSave = async (data: typeAdmModelCustomList) => {
    if (editData) {
      await storeModelCustomEdit(
        data.id.toString(),
        data.name,
        data.referred_manufacturer,
        data.realtime_item,
        data.alarm_item,
        data.device_item,
        data.configuration_item,
        trans
      );
    } else {
      await storeModelCustomCreate(
        data.name,
        data.referred_manufacturer,
        data.realtime_item,
        data.alarm_item,
        data.device_item,
        data.configuration_item,
        trans
      );
    }
    await storeModelCustomList(Number(customerId), trans);
    setIsRegistrationPopupOpen(false);
    setEditData(null);
  };

  const handleDataUpdate = async (row: typeAdmModelCustomList, updatedData: Partial<typeAdmModelCustomList>) => {
    await storeModelCustomEdit(
      row.id.toString(),
      row.name,
      row.referred_manufacturer,
      updatedData.realtime_item || row.realtime_item || [],
      updatedData.alarm_item || row.alarm_item || [],
      updatedData.device_item || row.device_item || [],
      updatedData.configuration_item || row.configuration_item || [],
      trans
    );
    await storeModelCustomList(Number(customerId), trans);
  };

  const filteredData = dataListModelCustom?.filter(item =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  ) || [];

  const columns: TableColumn<typeAdmModelCustomList>[] = [
    {
      name: '번호',
      dataIndex: 'id',
      align: TEXT_ALIGN.CENTER,
      width: '80px'
    },
    {
      name: '제조자 지정 데이터명',
      dataIndex: 'name',
      align: TEXT_ALIGN.CENTER,
      width: '150px',
      render: (row: typeAdmModelCustomList) => (
        <button
          onClick={() => handleEdit(row)}
          className="font-bold underline cursor-pointer"
        >
          {row.name}
        </button>
      )
    },
    {
      name: '실시간 데이터',
      dataIndex: 'realtime_item_cnt',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomList) => (
        <button
          onClick={() => {
            setSelectedRow(row);
            setIsRealtimePopupOpen(true);
          }}
          className="w-full text-center text-white hover:text-hw-orange-1 transition-colors"
        >
          {row.realtime_item_cnt || '0'}
        </button>
      )
    },
    {
      name: '기기 그룹(상태, 제어)',
      dataIndex: 'device_item_cnt',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomList) => (
        <button
          onClick={() => {
            setSelectedRow(row);
            setIsDevicePopupOpen(true);
          }}
          className="w-full text-center text-white hover:text-hw-orange-1 transition-colors"
        >
          {row.device_item_cnt || '0'}
        </button>
      )
    },
    {
      name: '알람 데이터',
      dataIndex: 'alarm_item_cnt',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomList) => (
        <button
          onClick={() => {
            setSelectedRow(row);
            setIsAlarmPopupOpen(true);
          }}
          className="w-full text-center text-white hover:text-hw-orange-1 transition-colors"
        >
          {row.alarm_item_cnt || '0'}
        </button>
      )
    },
    {
      name: '제원 데이터',
      dataIndex: 'configuration_item_cnt',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomList) => (
        <button
          onClick={() => {
            setSelectedRow(row);
            setIsSpecPopupOpen(true);
          }}
          className="w-full text-center text-white hover:text-hw-orange-1 transition-colors"
        >
          {row.configuration_item_cnt || '0'}
        </button>
      )
    },
    {
      name: '연계 모델 수',
      dataIndex: 'map_model_count',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomList) => row.map_model_count || '0'
    },
    {
      name: '등록일자',
      dataIndex: 'registration_date',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomList) => {
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
      render: (row: typeAdmModelCustomList) => (
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
            제조자 지정 데이터
          </h1>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 justify-between'>
          <div className='flex gap-2'>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder={trans('제조자 지정 데이터 검색')}
              className='w-full sm:w-[240px] h-[38px] px-3 bg-hw-dark-1 border border-hw-dark-4 rounded text-white placeholder-gray-500 focus:outline-none focus:border-hw-dark-5'
            />
          </div>
          <button
            onClick={() => setIsRegistrationPopupOpen(true)}
            className='h-[38px] px-4 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors'
          >
            {trans('제조자 지정 데이터 등록')}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[18px] lg:px-[55px]">
        <div className='w-full hidden xs:block'>
          <TableData<typeAdmModelCustomList>
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
          title="제조자 지정 데이터 삭제"
          message={`"${deleteTarget.name}" 모델의\n제조자 지정 데이터를 삭제하시겠습니까?`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isRegistrationPopupOpen && (
        <ManufacturerDataRegistrationPopup
          onClose={() => {
            setIsRegistrationPopupOpen(false);
            setEditData(null);
          }}
          onSave={handleSave}
          initialData={editData || undefined}
        />
      )}

      {selectedRow && (
        <>
          <SelectionPopup
            isOpen={isRealtimePopupOpen}
            onClose={() => setIsRealtimePopupOpen(false)}
            title={trans('실시간 데이터 선택')}
            data={dataListModelCustomRealTime || []}
            selectedItems={selectedRow.realtime_item || []}
            onItemToggle={(selectedIds) => {
              handleDataUpdate(selectedRow, { realtime_item: selectedIds });
              setIsRealtimePopupOpen(false);
            }}
            columnHeaders={[
              { text: trans('선택'), width: '40px' },
              { text: trans('데이터명'), width: '1fr' },
              { text: trans('타입'), width: '120px' },
              { text: trans('단위'), width: '120px' }
            ]}
            renderItem={(item) => ({
              id: item.id,
              columns: [
                { text: item.name, width: '1fr' },
                { text: item.type === 0 ? 'INT' : item.type === 1 ? 'FLOAT' : 'BOOLEAN', width: '120px' },
                { text: item.unit || '-', width: '120px' }
              ]
            })}
          />

          <SelectionPopup
            isOpen={isDevicePopupOpen}
            onClose={() => setIsDevicePopupOpen(false)}
            title={trans('기기 그룹 선택')}
            data={dataListModelCustomDeviceGroup || []}
            selectedItems={selectedRow.device_item || []}
            onItemToggle={(selectedIds) => {
              handleDataUpdate(selectedRow, { device_item: selectedIds });
              setIsDevicePopupOpen(false);
            }}
            columnHeaders={[
              { text: trans('선택'), width: '40px' },
              { text: trans('그룹명'), width: '1fr' },
              { text: trans('설명'), width: '1fr' }
            ]}
            renderItem={(item) => ({
              id: item.id,
              columns: [
                { text: item.name, width: '1fr' },
                { text: item.description || '-', width: '1fr' }
              ]
            })}
          />

          <SelectionPopup
            isOpen={isAlarmPopupOpen}
            onClose={() => setIsAlarmPopupOpen(false)}
            title={trans('알람 데이터 선택')}
            data={dataListModelCustomAlarm || []}
            selectedItems={selectedRow.alarm_item || []}
            onItemToggle={(selectedIds) => {
              handleDataUpdate(selectedRow, { alarm_item: selectedIds });
              setIsAlarmPopupOpen(false);
            }}
            columnHeaders={[
              { text: trans('선택'), width: '40px' },
              { text: trans('알람명'), width: '1fr' },
              { text: trans('데이터 타입'), width: '120px' }
            ]}
            renderItem={(item) => ({
              id: item.id,
              columns: [
                { text: item.name, width: '1fr' },
                { text: item.type === 0 ? 'INT' : item.type === 1 ? 'FLOAT' : 'BOOLEAN', width: '120px' }
              ]
            })}
          />

          <SelectionPopup
            isOpen={isSpecPopupOpen}
            onClose={() => setIsSpecPopupOpen(false)}
            title={trans('제원 데이터 선택')}
            data={dataListModelCustomSpec || []}
            selectedItems={selectedRow.configuration_item || []}
            onItemToggle={(selectedIds) => {
              handleDataUpdate(selectedRow, { configuration_item: selectedIds });
              setIsSpecPopupOpen(false);
            }}
            columnHeaders={[
              { text: trans('선택'), width: '40px' },
              { text: trans('제원명'), width: '1fr' },
              { text: trans('타입'), width: '120px' },
              { text: trans('단위'), width: '120px' }
            ]}
            renderItem={(item) => ({
              id: item.id,
              columns: [
                { text: item.name, width: '1fr' },
                { text: item.type === 0 ? 'INT' : item.type === 1 ? 'FLOAT' : 'BOOLEAN', width: '120px' },
                { text: item.unit || '-', width: '120px' }
              ]
            })}
          />
        </>
      )}
    </div>
  );
} 