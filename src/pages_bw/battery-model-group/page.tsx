import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BatteryModelGroupPage() {
  const { t: trans } = useTranslation('translation');

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            배터리(모빌리티) 모델
          </h1>
        </div>
      </div>
    </div>
  );
} 