import './style.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocketStore from '@/api/socketStore';
import { websocketURL } from '@/api/URLs';

import BatteryAlarm from '@/pages/dashboard/components/status-overview/BatteryAlarm';
import PolicyCompliance from '@/pages/dashboard/components/status-overview/PolicyCompliance';
import ServiceRequirement from '@/pages/dashboard/components/status-overview/ServiceRequirement';
import ChargingSummary from '@/pages/dashboard/components/status-overview/ChargingSummary';

import BatteryDetailTable from '@/pages/dashboard/components/detail-tables/BatteryDetailTable';
import ChargingDetailTable from '@/pages/dashboard/components/detail-tables/ChargingDetailTable';

import BatteryUsageChart from '@/pages/dashboard/components/charts/BatteryUsageChart';
import SocLevelChart from '@/pages/dashboard/components/charts/SocLevelChart';
import ChargingLevelChart from '@/pages/dashboard/components/charts/ChargingLevelChart';
import ChargingTimeChart from '@/pages/dashboard/components/charts/ChargingTimeChart';
import LongTermParkingChart from '@/pages/dashboard/components/charts/LongTermParkingChart';

export default function DashboardPage() {
    const navigate = useNavigate();
    const { connect, disconnect, setNavigateCB } = useWebSocketStore();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            setTimeout(() => {
                navigate('/login');
            }, 1);
            return;
        }

        // setNavigateCB(() => navigate('/login'));
        // const url = websocketURL + 'dashboard/?token=' + token;
        // connect(url);

        // return () => {
        //     disconnect(false);
        // };

    }, []);

    return (
        <div className='dashboard-content bg-hw-dark-1 p-2 h-[calc(100vh-65px)]'>
            <div className='flex flex-col h-full space-y-1'> {/* space-y-2를 space-y-1로 변경 */}
                {/* 상태 개요 섹션 - 4개의 박스로 구성, 3:3:3:4 비율 */}
                <div className='flex h-1/3 space-x-1'>
                    <div className='w-[23%]'>
                        <BatteryAlarm />
                    </div>
                    <div className='w-[23%]'>
                        <PolicyCompliance />
                    </div>
                    <div className='w-[23%]'>
                        <ServiceRequirement />
                    </div>
                    <div className='w-[31%]'>
                        <ChargingSummary />
                    </div>
                </div>

                {/* 배터리 상세 정보 테이블과 충전 상세 정보 테이블 */}
                <div className='flex h-1/3 space-x-1'>
                    <div className='w-1/2'>
                        <BatteryDetailTable />
                    </div>
                    <div className='w-1/2'>
                        <ChargingDetailTable />
                    </div>
                </div>

                {/* 차트 섹션 - 각 차트가 1/5씩 차지 */}
                <div className='flex h-1/3 space-x-1'>
                    <div className='w-1/5'>
                        <BatteryUsageChart />
                    </div>
                    <div className='w-1/5'>
                        <SocLevelChart />
                    </div>
                    <div className='w-1/5'>
                        <ChargingLevelChart />
                    </div>
                    <div className='w-1/5'>
                        <ChargingTimeChart />
                    </div>
                    <div className='w-1/5'>
                        <LongTermParkingChart />
                    </div>
                </div>
            </div>
        </div>
    );
}