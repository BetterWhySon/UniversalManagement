import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { typeAdmModelCustomDeviceGroupList } from '@/api/types/admin/typeAdmModelCustomDeviceGroup';
import useCustomerId from '@/hooks/useCustomerId';
import useAdmModelCustomDeviceControl from '@/api/admin/admModelCustomDeviceControl';
import { typeAdmModelCustomDeviceControlList } from '@/api/types/admin/typeAdmModelCustomDeviceControl';
import DeviceTypeSelectionPopup from './DeviceTypeSelectionPopup';

interface Props {
    onClose: () => void;
    onSave: (data: typeAdmModelCustomDeviceGroupList) => void;
    initialData?: typeAdmModelCustomDeviceGroupList;
    mode?: 'edit' | 'view';
}

export default function ManufacturerDeviceGroupRegistrationPopup({ onClose, onSave, initialData, mode = 'edit' }: Props) {
    const { t: trans } = useTranslation('translation');
    const customerId = useCustomerId();
    const { dataListModelCustomDeviceControl, storeModelCustomDeviceControlList } = useAdmModelCustomDeviceControl();
    const [formData, setFormData] = useState<Partial<typeAdmModelCustomDeviceGroupList>>({
        name: '',
        description: '',
        device_list: [],
        referred_manufacturer: Number(customerId),
        ...initialData
    });
    const [selectedDevices, setSelectedDevices] = useState<number[]>(initialData?.device_list || []);
    const [isTypeSelectionOpen, setIsTypeSelectionOpen] = useState(false);
    const [selectedDeviceType, setSelectedDeviceType] = useState<'state' | 'state_control' | 'control' | null>(null);

    useEffect(() => {
        storeModelCustomDeviceControlList(Number(customerId), trans);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            device_list: selectedDevices,
        } as typeAdmModelCustomDeviceGroupList);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeviceToggle = (deviceId: number) => {
        setSelectedDevices(prev => {
            if (prev.includes(deviceId)) {
                return prev.filter(id => id !== deviceId);
            } else {
                return [...prev, deviceId];
            }
        });
    };

    const handleTypeSelect = (type: 'state' | 'state_control' | 'control', selectedIds: number[]) => {
        setSelectedDeviceType(type);
        setIsTypeSelectionOpen(false);
        setSelectedDevices(selectedIds);
    };

    const getDeviceTypeText = () => {
        switch(selectedDeviceType) {
            case 'state':
                return '상태 표시 기기';
            case 'state_control':
                return '상태 표시 & 제어 기기';
            case 'control':
                return '제어 기기';
            default:
                return '기기 타입 선택';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
            <div className="bg-hw-dark-2 rounded-lg p-6 w-full max-w-[1000px] max-h-[90vh] overflow-auto">
                <h2 className="text-xl text-white mb-4">
                    {mode === 'view' ? trans('기기 그룹 상세') : initialData ? trans('기기 그룹 수정') : trans('기기 그룹 등록')}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-white mb-2">{trans('그룹명')}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white"
                                required
                                readOnly={mode === 'view'}
                            />
                        </div>
                        <div>
                            <label className="block text-white mb-2">{trans('그룹 설명')}</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white h-24 resize-none"
                                required
                                readOnly={mode === 'view'}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-white">{trans('기기 선택')}</label>
                                {mode !== 'view' && (
                                    <button
                                        type="button"
                                        onClick={() => setIsTypeSelectionOpen(true)}
                                        className="px-3 py-1 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors text-sm"
                                    >
                                        {trans('선택')}
                                    </button>
                                )}
                            </div>
                            <div className="bg-hw-dark-1 border border-hw-dark-4 rounded">
                                <div className="h-[250px] overflow-y-auto">
                                    {selectedDevices.length > 0 ? (
                                        <>
                                            <div className="grid grid-cols-[40px_200px_120px_520px] gap-x-2 text-[13px] sticky top-0 bg-hw-dark-1 z-10 border-b border-hw-dark-4">
                                                <div className="px-2 py-1 text-gray-400 font-medium">선택</div>
                                                <div className="px-2 py-1 text-gray-400 font-medium">기기명</div>
                                                <div className="px-2 py-1 text-gray-400 font-medium">기기 타입</div>
                                                <div className="px-2 py-1 text-gray-400 font-medium">데이터 타입</div>
                                            </div>
                                            <div>
                                                {dataListModelCustomDeviceControl
                                                    ?.filter(device => selectedDevices.includes(device.id))
                                                    .map(device => (
                                                        <div key={device.id} className="grid grid-cols-[40px_200px_120px_520px] gap-x-2 hover:bg-hw-dark-2/50">
                                                            <div className="flex items-center justify-center h-[30px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedDevices.includes(device.id)}
                                                                    onChange={() => handleDeviceToggle(device.id)}
                                                                    className="w-4 h-4 rounded border-gray-400 text-hw-orange-1 focus:ring-hw-orange-1"
                                                                />
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {device.name}
                                                            </div>
                                                            <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                                                {device.device_type === 0 ? '상태' : 
                                                                 device.device_type === 1 ? '상태&제어' : 
                                                                 device.device_type === 2 ? '제어' : '-'}
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-1.5 text-gray-400 py-1">
                                                                <div className="bg-hw-dark-2 px-2 py-1 rounded text-center truncate text-[13px]">
                                                                    상태: {device.state_type === 0 ? 'INT' : device.state_type === 1 ? 'FLOAT' : device.state_type === 2 ? 'BOOLEAN' : '-'}
                                                                </div>
                                                                <div className="bg-hw-dark-2 px-2 py-1 rounded text-center truncate text-[13px]">
                                                                    제어: {device.control_type === 0 ? 'INT' : device.control_type === 1 ? 'FLOAT' : device.control_type === 2 ? 'BOOLEAN' : '-'}
                                                                </div>
                                                                <div className="bg-hw-dark-2 px-2 py-1 rounded text-center truncate text-[13px]">
                                                                    ID: {device.control_id > 0 ? device.control_id : '-'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-500 text-[13px]">
                                            {trans('선택된 기기가 없습니다.')}
                                        </div>
                                    )}
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
                            {mode === 'view' ? trans('닫기') : trans('취소')}
                        </button>
                        {mode !== 'view' && (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors"
                            >
                                {initialData ? trans('수정') : trans('등록')}
                            </button>
                        )}
                    </div>
                </form>
            </div>
            {isTypeSelectionOpen && mode !== 'view' && (
                <DeviceTypeSelectionPopup
                    onClose={() => setIsTypeSelectionOpen(false)}
                    onSelect={(type, selectedIds) => handleTypeSelect(type, selectedIds)}
                    initialSelectedDevices={selectedDevices}
                />
            )}
        </div>
    );
} 