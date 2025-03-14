import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { typeAdmModelCustomDeviceControlList } from '@/api/types/admin/typeAdmModelCustomDeviceControl';
import useCustomerId from '@/hooks/useCustomerId';

interface Props {
    onClose: () => void;
    onSave: (data: typeAdmModelCustomDeviceControlList) => void;
    initialData?: typeAdmModelCustomDeviceControlList;
}

export default function ManufacturerDeviceControlRegistrationPopup({ onClose, onSave, initialData }: Props) {
    const { t: trans } = useTranslation('translation');
    const customerId = useCustomerId();
    const [formData, setFormData] = useState<Partial<typeAdmModelCustomDeviceControlList>>({
        name: '',
        device_type: 0,
        state_type: 0,
        control_type: 0,
        control_id: 0,
        icon_id: 0,
        referred_manufacturer: Number(customerId),
        ...initialData
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as typeAdmModelCustomDeviceControlList);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'name' ? value : Number(value)
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-hw-dark-2 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl text-white mb-4">
                    {initialData ? trans('장치 제어 데이터 수정') : trans('장치 제어 데이터 등록')}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-white mb-2">{trans('데이터명 *')}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white"
                                placeholder={trans('데이터명을 입력해주세요')}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white mb-2">{trans('기기 타입 * ')}</label>
                            <select
                                name="device_type"
                                value={formData.device_type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white"
                            >
                                <option value={0}>{trans('상태')}</option>
                                <option value={1}>{trans('상태&제어')}</option>
                                <option value={2}>{trans('제어')}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-white mb-2">{trans('상태 데이터 타입')}</label>
                            <select
                                name="state_type"
                                value={formData.state_type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white"
                            >
                                <option value={0}>int</option>
                                <option value={1}>float</option>
                                <option value={2}>boolean</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-white mb-2">{trans('제어 데이터 타입')}</label>
                            <select
                                name="control_type"
                                value={formData.control_type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white"
                            >
                                <option value={0}>int</option>
                                <option value={1}>float</option>
                                <option value={2}>boolean</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-white mb-2">{trans('제어 아이디')}</label>
                            <input
                                type="number"
                                name="control_id"
                                value={formData.control_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white mb-2">{trans('아이콘 아이디')}</label>
                            <input
                                type="number"
                                name="icon_id"
                                value={formData.icon_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-hw-dark-1 border border-hw-dark-4 rounded text-white"
                                required
                            />
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
        </div>
    );
} 