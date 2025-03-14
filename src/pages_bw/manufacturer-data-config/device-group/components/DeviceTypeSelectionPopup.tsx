import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAdmModelCustomDeviceControl from '@/api/admin/admModelCustomDeviceControl';
import useCustomerId from '@/hooks/useCustomerId';

interface Props {
    onClose: () => void;
    onSelect: (type: 'state' | 'state_control' | 'control', selectedIds: number[]) => void;
    initialSelectedDevices: number[];
}

export default function DeviceTypeSelectionPopup({ onClose, onSelect, initialSelectedDevices }: Props) {
    const { t: trans } = useTranslation('translation');
    const customerId = useCustomerId();
    const { dataListModelCustomDeviceControl, storeModelCustomDeviceControlList } = useAdmModelCustomDeviceControl();
    const [selectedDevices, setSelectedDevices] = useState<number[]>(initialSelectedDevices);

    useEffect(() => {
        storeModelCustomDeviceControlList(Number(customerId), trans);
    }, []);

    const handleDeviceSelect = (deviceId: number) => {
        setSelectedDevices(prev => 
            prev.includes(deviceId) 
                ? prev.filter(id => id !== deviceId)
                : [...prev, deviceId]
        );
    };

    const getDataTypeName = (type: number) => {
        switch (type) {
            case 0:
                return 'INT';
            case 1:
                return 'FLOAT';
            case 2:
                return 'BOOLEAN';
            default:
                return '-';
        }
    };

    // 기기 타입별로 데이터 분류
    const stateDevices = dataListModelCustomDeviceControl?.filter(device => device.device_type === 0) || [];
    const stateControlDevices = dataListModelCustomDeviceControl?.filter(device => device.device_type === 1) || [];
    const controlDevices = dataListModelCustomDeviceControl?.filter(device => device.device_type === 2) || [];

    const renderDeviceList = (devices: any[], title: string) => (
        <div className="rounded overflow-hidden">
            <div className="bg-hw-dark-4 p-2">
                <div className="text-white font-bold text-[14px]">{trans(title)}</div>
            </div>
            <div className="bg-hw-dark-1 p-2">
                {devices.length > 0 ? (
                    <div className="max-h-[180px] overflow-y-auto">
                        <div className="grid grid-cols-[40px_160px_380px] gap-x-2 text-[13px] sticky top-0 bg-hw-dark-1 z-10 border-b border-hw-dark-4">
                            <div className="px-2 py-1 text-gray-400 font-medium">선택</div>
                            <div className="px-2 py-1 text-gray-400 font-medium">기기명</div>
                            <div className="px-2 py-1 text-gray-400 font-medium">데이터 타입</div>
                        </div>
                        <div>
                            {devices.map(device => (
                                <div 
                                    key={device.id} 
                                    className="grid grid-cols-[40px_160px_380px] gap-x-2 hover:bg-hw-dark-2/50 cursor-pointer"
                                    onClick={() => handleDeviceSelect(device.id)}
                                >
                                    <div className="flex items-center justify-center h-[30px]" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={selectedDevices.includes(device.id)}
                                            onChange={() => handleDeviceSelect(device.id)}
                                            className="w-4 h-4 rounded border-gray-400 text-hw-orange-1 focus:ring-hw-orange-1"
                                        />
                                    </div>
                                    <div className="flex items-center text-white truncate text-[13px] h-[30px]">
                                        {device.name}
                                    </div>
                                    <div className="grid grid-cols-3 gap-1.5 text-gray-400 py-1">
                                        <div className="bg-hw-dark-2 px-2 py-1 rounded text-center truncate text-[13px]">
                                            상태: {getDataTypeName(device.state_type)}
                                        </div>
                                        <div className="bg-hw-dark-2 px-2 py-1 rounded text-center truncate text-[13px]">
                                            제어: {getDataTypeName(device.control_type)}
                                        </div>
                                        {device.control_id > 0 ? (
                                            <div className="bg-hw-dark-2 px-2 py-1 rounded text-center truncate text-[13px]">
                                                ID: {device.control_id}
                                            </div>
                                        ) : (
                                            <div className="bg-hw-dark-2 px-2 py-1 rounded text-center text-gray-500 truncate text-[13px]">
                                                ID: -
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-500 text-[13px]">{trans('데이터가 없습니다.')}</div>
                )}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <div className="bg-hw-dark-2 rounded-lg p-4 w-full max-w-2xl">
                <h3 className="text-lg text-white mb-3">{trans('기기 타입')}</h3>
                <div className="space-y-3">
                    {renderDeviceList(stateDevices, '상태 표시 기기')}
                    {renderDeviceList(stateControlDevices, '상태 표시 & 제어 기기')}
                    {renderDeviceList(controlDevices, '제어 기기')}
                </div>
                <div className="flex justify-end space-x-2 mt-3">
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 bg-hw-dark-4 text-white text-sm rounded hover:bg-hw-dark-5 transition-colors"
                    >
                        {trans('취소')}
                    </button>
                    <button
                        onClick={() => {
                            if (selectedDevices.length > 0) {
                                // 선택된 기기 ID들을 함께 전달
                                onSelect('state', selectedDevices);
                            }
                        }}
                        className="px-3 py-1.5 bg-hw-orange-1 text-white text-sm rounded hover:bg-hw-orange-1/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={selectedDevices.length === 0}
                    >
                        {trans('선택')}
                    </button>
                </div>
            </div>
        </div>
    );
} 