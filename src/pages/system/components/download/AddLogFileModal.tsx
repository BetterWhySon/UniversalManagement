import { backendURL } from "@/api/URLs";
import { api_formData } from "@/api/api";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ModalPram {
    onClose: () => void;
    refresh: () => void;
}
export default function AddLogFileModal({ onClose, refresh }: ModalPram) {
    const methods = useForm();
    const { t: trans } = useTranslation('translation');
    const token = localStorage.getItem("token");
    const pathnameParts = location.pathname.split('/');
    const bmsid = pathnameParts.length > 2 ? pathnameParts[2] : null;
    const [progress, setProgress] = useState(0);
    const onSubmit = async (e: any) => {
        console.log('AddLogFileModal', e);
        const formData = new FormData();
        formData.append('logFile', e.logFile[0]);
        formData.append('bms_id', bmsid ?? '');
        try {
            const response = await api_formData.post(backendURL + 'user_upload_log_file/', formData,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            setProgress(Math.floor((progressEvent.loaded / progressEvent.total) * 100));
                        }
                    }
                });

            if (response.status === 200) {
                alert(trans('successFileUpload'))
                onClose();
                refresh();
            } else {
                alert(trans('failFileUpload'));
            }
        } catch (error) {
            alert(trans('failFileUpload'));

        }
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        const MAX_SIZE = 500 * 1024 * 1024;
        if (file && file.size > MAX_SIZE) {
            alert(trans('fileSizeExceed'));
            e.target.value = "";
            return;
        }
    };

    return (
        <FormProvider {...methods}>
            <div className='fixed w-full h-full top-0 right-0 left-0 flex items-center justify-center z-50'>
                <div onClick={onClose} className='relative z-50 w-full h-full bg-black bg-opacity-60'></div>
                <div className={`w-full max-w-[922px] absolute z-50 px-[18px]`}>
                    <div className={`bg-hw-dark-2 rounded-2xl xs:rounded-3xl p-4 pb-6 xs:pt-12 xs:px-10 xs:pb-10 max-w-[886px] w-full transition-all relative`}>
                        <div className='add-user__modal'>
                            <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
                                {trans('addLogFile')}
                            </h2>
                            <div className='flex flex-col gap-4 xs:gap-8 w-full'>
                                <input type="file" id="file" {...methods.register("logFile")} name='logFile' onChange={handleFileChange} />
                            </div>
                            {progress > 0 && (
                                <div className='progress-bar'>
                                    <div className='progress' style={{ width: `${progress}%` }}>
                                        {progress}%
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='flex justify-end items-center w-full mt-8 xs:mt-12'>

                            <div className='w-full xs:w-fit flex items-center gap-2'>
                                <button
                                    type='button'
                                    onClick={onClose}
                                    className='py-2 px-6 w-full xs:w-[128px] rounded-lg text-hw-orange-1 font-light text-base leading-[125%] border border-[#E2E2E2]'>
                                    {trans('close')}
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        methods.handleSubmit(onSubmit)();
                                    }}
                                    className='py-2 px-6 w-full xs:w-[128px] rounded-lg text-hw-white-1 font-light text-base leading-[125%] bg-hw-orange-1'>
                                    {trans('save')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormProvider>
    );

}
