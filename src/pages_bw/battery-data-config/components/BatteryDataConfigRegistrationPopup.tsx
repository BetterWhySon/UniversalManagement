import React, { useState } from 'react';
import { typeAdmBetteryDataConfigList } from '@/api/types/admin/typeAdmBetteryDataConfig';
import useCustomerId from '@/hooks/useCustomerId';

interface BatteryDataConfigRegistrationPopupProps {
    onClose: () => void;
    onSave: (data: typeAdmBetteryDataConfigList) => void;
    initialData?: typeAdmBetteryDataConfigList;
    mode?: 'create' | 'edit' | 'view';
}

const BatteryDataConfigRegistrationPopup: React.FC<BatteryDataConfigRegistrationPopupProps> = ({
    onClose,
    onSave,
    initialData,
    mode = 'create'
}) => {
    const customerId = useCustomerId();
    const [formData, setFormData] = useState<typeAdmBetteryDataConfigList>({
        id: initialData?.id || 0,
        device_name: initialData?.device_name || '',
        pack_manufacturer: Number(customerId) || 0,
        cell: initialData?.cell || false,
        current: initialData?.current || false,
        batt_temp: initialData?.batt_temp || false,
        sys_temp: initialData?.sys_temp || false,
        soc: initialData?.soc || false,
        sac: initialData?.sac || false,
        soh: initialData?.soh || false,
        pack_v: initialData?.pack_v || false,
        chg_sac: initialData?.chg_sac || false,
        dchg_sac: initialData?.dchg_sac || false,
        saac: initialData?.saac || false,
        speed: initialData?.speed || false,
        mileage: initialData?.mileage || false,
        car_state: initialData?.car_state || false,
        acc_pedal_loc: initialData?.acc_pedal_loc || false,
        sub_batt_volt: initialData?.sub_batt_volt || false,
        brake_state: initialData?.brake_state || false,
        shift_state: initialData?.shift_state || false,
        outside_temp: initialData?.outside_temp || false,
        fuel_state: initialData?.fuel_state || false,
        chg_state: initialData?.chg_state || false,
        disp_soc: initialData?.disp_soc || false,
        gps_lat: initialData?.gps_lat || false,
        gps_lon: initialData?.gps_lon || false,
        rpm: initialData?.rpm || false,
        can_id: initialData?.can_id || 0
    });

    const handleSelectAll = () => {
        setFormData(prev => ({
            ...prev,
            cell: true,
            current: true,
            batt_temp: true,
            sys_temp: true,
            soc: true,
            sac: true,
            soh: true,
            pack_v: true,
            chg_sac: true,
            dchg_sac: true,
            saac: true,
            speed: true,
            mileage: true,
            car_state: true,
            acc_pedal_loc: true,
            sub_batt_volt: true,
            brake_state: true,
            shift_state: true,
            outside_temp: true,
            fuel_state: true,
            chg_state: true,
            disp_soc: true,
            gps_lat: true,
            gps_lon: true,
            rpm: true
        }));
    };

    const handleUnselectAll = () => {
        setFormData(prev => ({
            ...prev,
            cell: false,
            current: false,
            batt_temp: false,
            sys_temp: false,
            soc: false,
            sac: false,
            soh: false,
            pack_v: false,
            chg_sac: false,
            dchg_sac: false,
            saac: false,
            speed: false,
            mileage: false,
            car_state: false,
            acc_pedal_loc: false,
            sub_batt_volt: false,
            brake_state: false,
            shift_state: false,
            outside_temp: false,
            fuel_state: false,
            chg_state: false,
            disp_soc: false,
            gps_lat: false,
            gps_lon: false,
            rpm: false
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-hw-dark-2 rounded-lg w-[800px] max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center p-4 border-b border-gray-600">
                    <h2 className="text-lg text-white">
                        {mode === 'view' ? '표준 데이터 상세' : mode === 'edit' ? '표준 데이터 수정' : '표준 데이터 등록'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-2 flex items-center gap-4">
                        <label className="text-white text-[16px] font-medium whitespace-nowrap">표준데이터명</label>
                        <input
                            type="text"
                            value={formData.device_name}
                            onChange={(e) => setFormData(prev => ({ ...prev, device_name: e.target.value }))}
                            placeholder="표준데이터명을 입력하세요"
                            className="flex-1 h-[28px] px-3 bg-hw-dark-1 border border-hw-dark-4 rounded text-white text-sm placeholder:text-xs placeholder:text-gray-500 focus:outline-none focus:border-hw-dark-5"
                            disabled={mode === 'view'}
                        />
                    </div>

                    <div className="bg-hw-dark-1 rounded-lg p-6 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <h3 className="text-lg text-white">데이터 구성</h3>
                            {mode !== 'view' && (
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={handleSelectAll}
                                        className="text-sm text-blue-500 hover:text-blue-400"
                                    >
                                        전체 선택
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleUnselectAll}
                                        className="text-sm text-blue-500 hover:text-blue-400"
                                    >
                                        전체 해제
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {Object.entries(formData)
                                .filter(([key]) => key !== 'id' && key !== 'device_name' && key !== 'pack_manufacturer' && key !== 'can_id' && key !== 'rpm')
                                .map(([key, value]) => (
                                    <label key={key} className={`flex items-center gap-2 text-sm text-gray-400 ${mode === 'view' ? 'pointer-events-none' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={value as boolean}
                                            onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.checked }))}
                                            className="w-4 h-4 accent-blue-500"
                                        />
                                        {key}
                                    </label>
                                ))}
                            <label className={`flex items-center gap-2 text-sm text-gray-400 ${mode === 'view' ? 'pointer-events-none' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={formData.rpm}
                                    onChange={(e) => setFormData(prev => ({ ...prev, rpm: e.target.checked }))}
                                    className="w-4 h-4 accent-blue-500"
                                />
                                rpm
                            </label>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="min-w-[50px]">Can ID</span>
                                <input
                                    type="text"
                                    value={formData.can_id}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        setFormData(prev => ({ ...prev, can_id: Number(value) || 0 }));
                                    }}
                                    className="w-16 h-[24px] px-2 bg-hw-dark-2 border border-hw-dark-4 rounded text-white text-sm focus:outline-none focus:border-hw-dark-5"
                                    disabled={mode === 'view'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-hw-orange-1 text-hw-orange-1 rounded hover:bg-hw-orange-1/10"
                        >
                            {mode === 'view' ? '닫기' : '취소'}
                        </button>
                        {mode !== 'view' && (
                            <button
                                onClick={() => onSave(formData)}
                                className="px-6 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90"
                            >
                                확인
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BatteryDataConfigRegistrationPopup; 