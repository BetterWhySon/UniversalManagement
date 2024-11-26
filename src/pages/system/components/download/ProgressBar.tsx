import React, { useState, useEffect } from 'react';

const ProgressBar = ({ duration }) => {
    const [progress, setProgress] = useState(0);
    const [duration1, setDuration] = useState(0); // 사용자로부터 입력 받은 지속 시간
    useEffect(() => {
        // setDuration(duration);
        // console.log('useEffect')
        // console.log(duration)
        // setProgress(0);
    }, [])
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        console.log('useEffect duration')
        console.log(duration)
        // setDuration(duration);
        setProgress(0);
        if (duration > 0) {
            const intervalDuration = duration / 10_000_000; // 전체 시간을 100개의 스텝으로 나눔

            interval = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress < 95) {
                        return prevProgress + 1;
                    }
                    clearInterval(interval!);
                    return 95;
                });
            }, intervalDuration);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [duration]);

    return (
        <div className='ml-auto flex items-center gap-[16px] relative'>
            <span className='text-hw-white-2 text-[14px] leading-[18px] font-bold sm:font-light'>다운로드 준비 진행률</span>
            <div className='w-[300px] h-[24px] bg-hw-gray-7.25 rounded-[4px] relative'>
                <div className='absolute h-[24px] bg-hw-green-6 rounded-[4px] left-0' style={{ width: `${progress}%` }}></div>
                {/* <div className='absolute h-[24px] bg-hw-green-6 rounded-[4px] left-0 w-[200px]'></div> */}
            </div>
            <p className='absolute right-[8px] text-[16px] leading-[12px] font-normal text-hw-white-1'>{progress}%</p>
        </div>
    );
};

export default ProgressBar;
