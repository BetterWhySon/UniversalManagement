import React, { useState } from 'react';
import ChargingHistory from '@/pages/setting/battery/components/ChargingHistory';

const UsageHistoryPage: React.FC = () => {
  return (
    <div className="px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
      <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
        <div className='flex items-center'>
          <h1 className='text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none mr-2'>
            사용이력 조회
          </h1>
        </div>
      </div>
      <ChargingHistory pageSize={14} showDeviceSelect={true} />
    </div>
  );
};

export default UsageHistoryPage;