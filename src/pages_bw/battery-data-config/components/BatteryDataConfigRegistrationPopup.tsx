import React, { useState } from 'react';
import { typeAdmBetteryDataConfigList } from '@/api/types/admin/typeAdmBetteryDataConfig';
import BatteryModelSearchPopup from './BatteryModelSearchPopup';

interface BatteryDataConfigRegistrationPopupProps {
    onClose: () => void;
    onSave: (data: typeAdmBetteryDataConfigList) => void;
    initialData?: typeAdmBetteryDataConfigList;
}

const BatteryDataConfigRegistrationPopup: React.FC<BatteryDataConfigRegistrationPopupProps> = ({
    onClose,
    onSave,
    initialData
}) => {
    const [formData, setFormData] = useState<typeAdmBetteryDataConfigList>({
        id: initialData?.id || 0,
        device_name: initialData?.device_name || '',
        object_type: initialData?.object_type || 0,
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
        rpm: initialData?.rpm || false
    });

    const [isModelSearchOpen, setIsModelSearchOpen] = useState(false);

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
                    <h2 className="text-lg text-white">배터리 Data Config {initialData ? '수정' : '등록'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-1">배터리 모델명</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={formData.device_name}
                                readOnly
                                placeholder="배터리 모델을 검색해주세요"
                                className="flex-1 px-3 py-2 bg-hw-dark-1 text-white rounded border border-gray-600 cursor-not-allowed"
                            />
                            <button
                                className="px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
                                onClick={() => setIsModelSearchOpen(true)}
                                type="button"
                            >
                                <span className='text-sm whitespace-nowrap'>검색</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-hw-dark-1 rounded-lg p-6 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <h3 className="text-lg text-white">데이터 구성</h3>
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
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {Object.entries(formData)
                                .filter(([key]) => key !== 'id' && key !== 'device_name' && key !== 'object_type')
                                .map(([key, value]) => (
                                    <label key={key} className="flex items-center gap-2 text-sm text-gray-400">
                                        <input
                                            type="checkbox"
                                            checked={value as boolean}
                                            onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.checked }))}
                                            className="w-4 h-4 accent-blue-500"
                                        />
                                        {key}
                                    </label>
                                ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-hw-orange-1 text-hw-orange-1 rounded hover:bg-hw-orange-1/10"
                        >
                            취소
                        </button>
                        <button
                            onClick={() => onSave(formData)}
                            className="px-6 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>

            {isModelSearchOpen && (
                <BatteryModelSearchPopup
                    isOpen={isModelSearchOpen}
                    onClose={() => setIsModelSearchOpen(false)}
                    onSelect={(model) => {
                        setFormData(prev => ({
                            ...prev,
                            device_name: model.model_name,
                            object_type: model.id
                        }));
                        setIsModelSearchOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default BatteryDataConfigRegistrationPopup; 