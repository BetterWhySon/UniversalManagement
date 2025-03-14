import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import useAdmModelCustom from '@/api/admin/admModelCustom';
import { typeAdmModelCustomList } from '@/api/types/admin/typeAdmModelCustom';
import useCustomerId from '@/hooks/useCustomerId';
import SelectionPopup from '@/pages_bw/manufacturer-data-config/components/SelectionPopup';
import useAdmModelCustomRealTime from '@/api/admin/admModelCustomRealTime';
import useAdmModelCustomDeviceGroup from '@/api/admin/admModelCustomDeviceGroup';
import useAdmModelCustomAlarm from '@/api/admin/admModelCustomAlarm';
import useAdmModelCustomSpec from '@/api/admin/admModelCustomSpec';
import ManufacturerDeviceGroupRegistrationPopup from '@/pages_bw/manufacturer-data-config/device-group/components/ManufacturerDeviceGroupRegistrationPopup';

interface Props {
  onClose: () => void;
  onSelect: (data: { id: string; name: string }) => void;
  referred_manufacturer: string;
}

export default function BatteryModelCustomSelectPopup({ onClose, onSelect, referred_manufacturer }: Props) {
  const { t: trans } = useTranslation('translation');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { dataListModelCustom, storeModelCustomList } = useAdmModelCustom();
  const customerId = useCustomerId();
  const [selectedRow, setSelectedRow] = useState<typeAdmModelCustomList | null>(null);
  const [isRealtimePopupOpen, setIsRealtimePopupOpen] = useState(false);
  const [isDevicePopupOpen, setIsDevicePopupOpen] = useState(false);
  const [isAlarmPopupOpen, setIsAlarmPopupOpen] = useState(false);
  const [isSpecPopupOpen, setIsSpecPopupOpen] = useState(false);
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useState<any>(null);
  const [isDeviceGroupDetailOpen, setIsDeviceGroupDetailOpen] = useState(false);

  const { dataListModelCustomRealTime, storeModelCustomRealTimeList } = useAdmModelCustomRealTime();
  const { dataListModelCustomDeviceGroup, storeModelCustomDeviceGroupList } = useAdmModelCustomDeviceGroup();
  const { dataListModelCustomAlarm, storeModelCustomAlarmList } = useAdmModelCustomAlarm();
  const { dataListModelCustomSpec, storeModelCustomSpecList } = useAdmModelCustomSpec();

  useEffect(() => {
    storeModelCustomList(Number(customerId), trans);
    storeModelCustomRealTimeList(Number(customerId), trans);
    storeModelCustomDeviceGroupList(Number(customerId), trans);
    storeModelCustomAlarmList(Number(customerId), trans);
    storeModelCustomSpecList(Number(customerId), trans);
  }, [storeModelCustomList, trans, customerId]);

  const filteredData = (dataListModelCustom || []).filter(item =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const columns = [
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
      width: '200px'
    },
    {
      name: '실시간 데이터',
      dataIndex: 'realtime_item_cnt',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomList) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRow(row);
            setIsRealtimePopupOpen(true);
          }}
          className="w-full text-center text-blue-500 hover:text-blue-400 transition-colors"
        >
          {row.realtime_item_cnt || '-'}
        </button>
      )
    },
    {
      name: '기기 그룹(상태,제어)',
      dataIndex: 'device_item_cnt',
      align: TEXT_ALIGN.CENTER,
      width: '180px',
      render: (row: typeAdmModelCustomList) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRow(row);
            setIsDevicePopupOpen(true);
          }}
          className="w-full text-center text-blue-500 hover:text-blue-400 transition-colors"
        >
          {row.device_item_cnt || '-'}
        </button>
      )
    },
    {
      name: '알람',
      dataIndex: 'alarm_item_cnt',
      align: TEXT_ALIGN.CENTER,
      width: '100px',
      render: (row: typeAdmModelCustomList) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRow(row);
            setIsAlarmPopupOpen(true);
          }}
          className="w-full text-center text-blue-500 hover:text-blue-400 transition-colors"
        >
          {row.alarm_item_cnt || '-'}
        </button>
      )
    },
    {
      name: '제원',
      dataIndex: 'specification_item_cnt',
      align: TEXT_ALIGN.CENTER,
      width: '100px',
      render: (row: typeAdmModelCustomList) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRow(row);
            setIsSpecPopupOpen(true);
          }}
          className="w-full text-center text-blue-500 hover:text-blue-400 transition-colors"
        >
          {row.specification_item_cnt || '-'}
        </button>
      )
    },
    {
      name: '등록일자',
      dataIndex: 'registration_date',
      align: TEXT_ALIGN.CENTER,
      width: '120px',
      render: (row: typeAdmModelCustomList) => {
        if (!row.registration_date) return '-';
        const date = new Date(row.registration_date);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
      }
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg p-6 w-full max-w-[1000px] max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-white">
            {trans('제조자 지정 데이터 선택')}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder={trans('데이터명 검색')}
            className="w-[240px] h-[38px] px-3 bg-hw-dark-1 border border-hw-dark-4 rounded text-white placeholder-gray-500 focus:outline-none focus:border-hw-dark-5"
          />
        </div>

        <TableData
          data={filteredData}
          columns={columns}
          isPagination
          pagination={{
            total: filteredData.length,
            pageSize: 10,
          }}
          emptyMessage={trans('데이터가 없습니다.')}
          onClick={(row: typeAdmModelCustomList) => onSelect({ id: row.id.toString(), name: row.name })}
          className="cursor-pointer hover:bg-hw-dark-4"
        />

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-hw-dark-4 text-white rounded hover:bg-hw-dark-5 transition-colors"
          >
            {trans('닫기')}
          </button>
        </div>

        {selectedRow && (
          <>
            <SelectionPopup
              isOpen={isRealtimePopupOpen}
              onClose={() => setIsRealtimePopupOpen(false)}
              title={trans('실시간 데이터 선택')}
              data={dataListModelCustomRealTime || []}
              selectedItems={selectedRow.realtime_item || []}
              onItemToggle={() => {}}
              readOnly={true}
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
              onItemToggle={() => {}}
              readOnly={true}
              onRowClick={(item) => {
                setSelectedDeviceGroup(item);
                setIsDeviceGroupDetailOpen(true);
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

            {isDeviceGroupDetailOpen && selectedDeviceGroup && (
              <ManufacturerDeviceGroupRegistrationPopup
                onClose={() => setIsDeviceGroupDetailOpen(false)}
                onSave={() => {}}
                initialData={selectedDeviceGroup}
                mode="view"
              />
            )}

            <SelectionPopup
              isOpen={isAlarmPopupOpen}
              onClose={() => setIsAlarmPopupOpen(false)}
              title={trans('알람 데이터 선택')}
              data={dataListModelCustomAlarm || []}
              selectedItems={selectedRow.alarm_item || []}
              onItemToggle={() => {}}
              readOnly={true}
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
              onItemToggle={() => {}}
              readOnly={true}
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
    </div>
  );
} 