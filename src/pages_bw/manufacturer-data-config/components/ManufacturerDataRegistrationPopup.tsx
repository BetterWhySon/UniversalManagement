import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { typeAdmModelCustomList } from '@/api/types/admin/typeAdmModelCustom';
import useCustomerId from '@/hooks/useCustomerId';
import useAdmModelCustomRealTime from '@/api/admin/admModelCustomRealTime';
import useAdmModelCustomDeviceGroup from '@/api/admin/admModelCustomDeviceGroup';
import useAdmModelCustomAlarm from '@/api/admin/admModelCustomAlarm';
import useAdmModelCustomSpec from '@/api/admin/admModelCustomSpec';
import SelectionPopup from './SelectionPopup';

interface Props {
    onClose: () => void;
    onSave: (data: typeAdmModelCustomList) => void;
    initialData?: typeAdmModelCustomList;
}

export default function ManufacturerDataRegistrationPopup({ onClose, onSave, initialData }: Props) {
    const { t: trans } = useTranslation('translation');
    const customerId = useCustomerId();
    const { dataListModelCustomRealTime, storeModelCustomRealTimeList } = useAdmModelCustomRealTime();
    const { dataListModelCustomDeviceGroup, storeModelCustomDeviceGroupList } = useAdmModelCustomDeviceGroup();
    const { dataListModelCustomAlarm, storeModelCustomAlarmList } = useAdmModelCustomAlarm();
    const { dataListModelCustomSpec, storeModelCustomSpecList } = useAdmModelCustomSpec();

    const [formData, setFormData] = useState<Partial<typeAdmModelCustomList>>({
        name: '',
        referred_manufacturer: Number(customerId),
        realtime_item: [],
        alarm_item: [],
        device_item: [],
        configuration_item: [],
        ...initialData
    });

    const [isRealtimePopupOpen, setIsRealtimePopupOpen] = useState(false);
    const [isDevicePopupOpen, setIsDevicePopupOpen] = useState(false);
    const [isAlarmPopupOpen, setIsAlarmPopupOpen] = useState(false);
    const [isSpecPopupOpen, setIsSpecPopupOpen] = useState(false);

    useEffect(() => {
        storeModelCustomRealTimeList(Number(customerId), trans);
        storeModelCustomDeviceGroupList(Number(customerId), trans);
        storeModelCustomAlarmList(Number(customerId), trans);
        storeModelCustomSpecList(Number(customerId), trans);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) {
            alert(trans('제조자 지정 데이터명을 입력해주세요.'));
            return;
        }
        onSave({
            ...formData,
            referred_manufacturer: Number(customerId)
        } as typeAdmModelCustomList);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-hw-dark-2 rounded-lg p-6 w-full max-w-[1000px] max-h-[90vh] overflow-auto">
                <h2 className="text-xl text-white mb-4">
                    {initialData ? trans('제조자 지정 데이터 수정') : trans('제조자 지정 데이터 등록')}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-white mb-2">{trans('제조자 지정 데이터명')} *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white"
                                placeholder={trans('제조자 지정 데이터명을 입력하세요')}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* 실시간 데이터 리스트 */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <label className="text-white">{trans('실시간 데이터')}</label>
                                        <span className="text-gray-400 text-[13px]">
                                            ({trans('선택된 항목')}: {formData.realtime_item?.length || 0})
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsRealtimePopupOpen(true)}
                                        className="px-2 py-1 bg-hw-orange-1 text-white text-[13px] rounded hover:bg-hw-orange-1/90 transition-colors"
                                    >
                                        {trans('선택')}
                                    </button>
                                </div>
                                <div className="bg-hw-dark-1 border border-hw-dark-4 rounded-none">
                                    <div className="h-[150px] overflow-y-auto">
                                        {dataListModelCustomRealTime?.length && formData.realtime_item?.length ? (
                                            <>
                                                <div className="grid grid-cols-[40px_160px_80px_80px] gap-x-2 text-[13px] sticky top-0 bg-hw-dark-1 z-10 border-b border-hw-dark-4">
                                                    <div className="px-2 py-1 text-gray-400 font-medium">선택</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">데이터명</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">타입</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">단위</div>
                                                </div>
                                                <div>
                                                    {dataListModelCustomRealTime.filter(item => formData.realtime_item?.includes(item.id)).map(item => (
                                                        <div
                                                            key={item.id}
                                                            className="grid grid-cols-[40px_160px_80px_80px] gap-x-2 hover:bg-hw-dark-2/50 cursor-pointer"
                                                            onClick={() => {
                                                                const newItems = formData.realtime_item?.filter(id => id !== item.id);
                                                                setFormData({ ...formData, realtime_item: newItems });
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-center h-[30px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={true}
                                                                    readOnly
                                                                    className="w-4 h-4 rounded border-gray-400 text-hw-orange-1 focus:ring-hw-orange-1"
                                                                />
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.name}
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.type === 0 ? 'INT' : item.type === 1 ? 'FLOAT' : 'BOOLEAN'}
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.unit || '-'}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                                                {trans('선택된 데이터가 없습니다.')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 기기 그룹 리스트 */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <label className="text-white">{trans('기기 그룹')}</label>
                                        <span className="text-gray-400 text-[13px]">
                                            ({trans('선택된 항목')}: {formData.device_item?.length || 0})
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsDevicePopupOpen(true)}
                                        className="px-2 py-1 bg-hw-orange-1 text-white text-[13px] rounded hover:bg-hw-orange-1/90 transition-colors"
                                    >
                                        {trans('선택')}
                                    </button>
                                </div>
                                <div className="bg-hw-dark-1 border border-hw-dark-4 rounded-none">
                                    <div className="h-[150px] overflow-y-auto">
                                        {dataListModelCustomDeviceGroup?.length && formData.device_item?.length ? (
                                            <>
                                                <div className="grid grid-cols-[40px_160px_160px] gap-x-2 text-[13px] sticky top-0 bg-hw-dark-1 z-10 border-b border-hw-dark-4">
                                                    <div className="px-2 py-1 text-gray-400 font-medium">선택</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">그룹명</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">설명</div>
                                                </div>
                                                <div>
                                                    {dataListModelCustomDeviceGroup.filter(item => formData.device_item?.includes(item.id)).map(item => (
                                                        <div
                                                            key={item.id}
                                                            className="grid grid-cols-[40px_160px_160px] gap-x-2 hover:bg-hw-dark-2/50 cursor-pointer"
                                                            onClick={() => {
                                                                const newItems = formData.device_item?.filter(id => id !== item.id);
                                                                setFormData({ ...formData, device_item: newItems });
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-center h-[30px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={true}
                                                                    readOnly
                                                                    className="w-4 h-4 rounded border-gray-400 text-hw-orange-1 focus:ring-hw-orange-1"
                                                                />
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.name}
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.description || '-'}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                                                {trans('선택된 데이터가 없습니다.')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 알람 데이터 리스트 */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <label className="text-white">{trans('알람 데이터')}</label>
                                        <span className="text-gray-400 text-[13px]">
                                            ({trans('선택된 항목')}: {formData.alarm_item?.length || 0})
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsAlarmPopupOpen(true)}
                                        className="px-2 py-1 bg-hw-orange-1 text-white text-[13px] rounded hover:bg-hw-orange-1/90 transition-colors"
                                    >
                                        {trans('선택')}
                                    </button>
                                </div>
                                <div className="bg-hw-dark-1 border border-hw-dark-4 rounded-none">
                                    <div className="h-[150px] overflow-y-auto">
                                        {dataListModelCustomAlarm?.length && formData.alarm_item?.length ? (
                                            <>
                                                <div className="grid grid-cols-[40px_160px_160px] gap-x-2 text-[13px] sticky top-0 bg-hw-dark-1 z-10 border-b border-hw-dark-4">
                                                    <div className="px-2 py-1 text-gray-400 font-medium">선택</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">알람명</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">데이터 타입</div>
                                                </div>
                                                <div>
                                                    {dataListModelCustomAlarm.filter(item => formData.alarm_item?.includes(item.id)).map(item => (
                                                        <div
                                                            key={item.id}
                                                            className="grid grid-cols-[40px_160px_160px] gap-x-2 hover:bg-hw-dark-2/50 cursor-pointer"
                                                            onClick={() => {
                                                                const newItems = formData.alarm_item?.filter(id => id !== item.id);
                                                                setFormData({ ...formData, alarm_item: newItems });
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-center h-[30px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={true}
                                                                    readOnly
                                                                    className="w-4 h-4 rounded border-gray-400 text-hw-orange-1 focus:ring-hw-orange-1"
                                                                />
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.name}
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.type === 0 ? 'INT' : item.type === 1 ? 'FLOAT' : 'BOOLEAN'}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                                                {trans('선택된 데이터가 없습니다.')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 제원 데이터 리스트 */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <label className="text-white">{trans('제원 데이터')}</label>
                                        <span className="text-gray-400 text-[13px]">
                                            ({trans('선택된 항목')}: {formData.configuration_item?.length || 0})
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsSpecPopupOpen(true)}
                                        className="px-2 py-1 bg-hw-orange-1 text-white text-[13px] rounded hover:bg-hw-orange-1/90 transition-colors"
                                    >
                                        {trans('선택')}
                                    </button>
                                </div>
                                <div className="bg-hw-dark-1 border border-hw-dark-4 rounded-none">
                                    <div className="h-[150px] overflow-y-auto">
                                        {dataListModelCustomSpec?.length && formData.configuration_item?.length ? (
                                            <>
                                                <div className="grid grid-cols-[40px_160px_80px_80px] gap-x-2 text-[13px] sticky top-0 bg-hw-dark-1 z-10 border-b border-hw-dark-4">
                                                    <div className="px-2 py-1 text-gray-400 font-medium">선택</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">제원명</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">타입</div>
                                                    <div className="px-2 py-1 text-gray-400 font-medium">단위</div>
                                                </div>
                                                <div>
                                                    {dataListModelCustomSpec.filter(item => formData.configuration_item?.includes(item.id)).map(item => (
                                                        <div
                                                            key={item.id}
                                                            className="grid grid-cols-[40px_160px_80px_80px] gap-x-2 hover:bg-hw-dark-2/50 cursor-pointer"
                                                            onClick={() => {
                                                                const newItems = formData.configuration_item?.filter(id => id !== item.id);
                                                                setFormData({ ...formData, configuration_item: newItems });
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-center h-[30px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={true}
                                                                    readOnly
                                                                    className="w-4 h-4 rounded border-gray-400 text-hw-orange-1 focus:ring-hw-orange-1"
                                                                />
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.name}
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.type === 0 ? 'INT' : item.type === 1 ? 'FLOAT' : 'BOOLEAN'}
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {item.unit || '-'}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                                                {trans('선택된 데이터가 없습니다.')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-hw-dark-4 text-white rounded hover:bg-hw-dark-5 transition-colors"
                        >
                            {trans('취소')}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors"
                        >
                            {initialData ? trans('수정') : trans('등록')}
                        </button>
                    </div>
                </form>
            </div>

            {/* 실시간 데이터 선택 팝업 */}
            <SelectionPopup
                isOpen={isRealtimePopupOpen}
                onClose={() => setIsRealtimePopupOpen(false)}
                title={trans('실시간 데이터 선택')}
                data={dataListModelCustomRealTime || []}
                selectedItems={formData.realtime_item || []}
                onItemToggle={(selectedIds) => {
                    setFormData(prev => ({ ...prev, realtime_item: selectedIds }));
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

            {/* 기기 그룹 선택 팝업 */}
            <SelectionPopup
                isOpen={isDevicePopupOpen}
                onClose={() => setIsDevicePopupOpen(false)}
                title={trans('기기 그룹 선택')}
                data={dataListModelCustomDeviceGroup || []}
                selectedItems={formData.device_item || []}
                onItemToggle={(selectedIds) => {
                    setFormData(prev => ({ ...prev, device_item: selectedIds }));
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

            {/* 알람 데이터 선택 팝업 */}
            <SelectionPopup
                isOpen={isAlarmPopupOpen}
                onClose={() => setIsAlarmPopupOpen(false)}
                title={trans('알람 데이터 선택')}
                data={dataListModelCustomAlarm || []}
                selectedItems={formData.alarm_item || []}
                onItemToggle={(selectedIds) => {
                    setFormData(prev => ({ ...prev, alarm_item: selectedIds }));
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

            {/* 제원 데이터 선택 팝업 */}
            <SelectionPopup
                isOpen={isSpecPopupOpen}
                onClose={() => setIsSpecPopupOpen(false)}
                title={trans('제원 데이터 선택')}
                data={dataListModelCustomSpec || []}
                selectedItems={formData.configuration_item || []}
                onItemToggle={(selectedIds) => {
                    setFormData(prev => ({ ...prev, configuration_item: selectedIds }));
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
        </div>
    );
} 