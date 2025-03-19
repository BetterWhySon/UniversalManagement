import React from 'react';
import AlarmHistory from '@/pages/setting/battery/components/AlarmHistory';

const AlarmHistoryPage: React.FC = () => {
    return (
        <div className="px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
            <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
                <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
                    알람이력 조회
                </h1>
            </div>
            <AlarmHistory pageSize={14} showDeviceSelect={true} />
        </div>
    );
};

export default AlarmHistoryPage; 