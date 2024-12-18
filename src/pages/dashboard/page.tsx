import './style.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocketStore from '@/api/socketStore';
import MapArea from './components/MapArea';
import BatteryAbnormalAlarm from './components/BatteryAbnormalAlarm';
import EVPolicyComplianceRate from './components/EVPolicyComplianceRate';
import BatteryAlarmDetail from './components/BatteryAlarmDetail';
import OperationSummary from './components/OperationSummary';
import MetricChart from './components/MetricChart';
import UnusedVehicleList from './components/UnusedVehicleList';
import ChargingSummary from './components/ChargingSummary';
import ChargingDetail from './components/ChargingDetail';

export default function DashboardPage() {
    const navigate = useNavigate();
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>(() => {
        const saved = localStorage.getItem('selectedMetrics');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            setTimeout(() => {
                navigate('/login');
            }, 1);
            return;
        }
    }, []);

    const handleMetricsSelect = (items: string[]) => {
        console.log('Selected items:', items);
        setSelectedMetrics([...items]);
        localStorage.setItem('selectedMetrics', JSON.stringify(items));
    };

    return (
        <div className='dashboard-content bg-hw-dark-1 p-2 h-[calc(100vh-65px)]'>
            <div className='flex flex-col h-full space-y-1'>
                {/* 첫 번째 & 두 번째 행 통합 */}
                <div className='flex h-2/3 space-x-1'>
                    {/* 왼쪽 지도 영역 (2행 차지) */}
                    <div className='w-[22.2%] bg-slate-800 rounded-lg border border-white p-0'>
                        <MapArea />
                    </div>

                    {/* 오른쪽 영역 flex-col로 구성 */}
                    <div className='w-[77.8%] flex flex-col space-y-1'>
                        {/* 첫 번째 행 */}
                        <div className='flex h-1/2 space-x-1'>
                            <div className='w-[46.4%] flex space-x-1'>
                                <div className='w-1/2'>
                                    <BatteryAbnormalAlarm />
                                </div>
                                <div className='w-1/2'>
                                    <EVPolicyComplianceRate />
                                </div>
                            </div>
                            <div className='w-[53.6%]'>
                                <BatteryAlarmDetail />
                            </div>
                        </div>
                        {/* 두 번째 행 */}
                        <div className='flex h-1/2 space-x-1'>
                            <div className='w-[46.4%] bg-slate-800 rounded-lg border border-white'>
                                <OperationSummary />
                            </div>
                            <div className='w-[53.6%] flex space-x-1'>
                                <div className='w-1/3'>
                                    <MetricChart 
                                        type="stress" 
                                        selectedTitle={selectedMetrics[0]} 
                                        onMetricsSelect={handleMetricsSelect}
                                        selectedMetrics={selectedMetrics}
                                    />
                                </div>
                                <div className='w-1/3'>
                                    <MetricChart 
                                        type="soc" 
                                        selectedTitle={selectedMetrics[1]} 
                                        onMetricsSelect={handleMetricsSelect}
                                        selectedMetrics={selectedMetrics}
                                    />
                                </div>
                                <div className='w-1/3'>
                                    <MetricChart 
                                        type="efficiency" 
                                        selectedTitle={selectedMetrics[2]} 
                                        onMetricsSelect={handleMetricsSelect}
                                        selectedMetrics={selectedMetrics}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 세 번째 행 */}
                <div className='flex h-1/3 space-x-1'>
                    <div className='w-[22.2%]'>
                        <UnusedVehicleList />
                    </div>
                    <div className='w-[36.1%]'>
                        <ChargingSummary />
                    </div>
                    <div className='w-[41.7%]'>
                        <ChargingDetail />
                    </div>
                </div>
            </div>
        </div>
    );
}