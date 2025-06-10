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
import FilterPopup from './components/subComponents/FilterPopup';

export default function DashboardPage() {
    const navigate = useNavigate(); 
    
    useEffect(() => {
        localStorage.removeItem('selectedMetrics'); // 초기화
    }, []);

    const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        if (items.length !== 3) {
            return;
        }
        console.log('Selected items:', items);
        setSelectedMetrics([...items]);
        localStorage.setItem('selectedMetrics', JSON.stringify(items));
        setIsFilterOpen(false);
    };

    return (
        <div className='dashboard-content bg-[#232931] p-2 h-[calc(100vh-65px)]'>
            <div className='flex flex-col h-full gap-0'>
                {/* 첫 번째 & 두 번째 행 통합 */}
                <div className='flex h-[66%] gap-2 mb-2'>
                    {/* 왼쪽 지도 영역 (2행 차지) */}
                    <div className='w-[22.2%] bg-[#2B313B] rounded-lg p-0'>
                        <MapArea />
                    </div>

                    {/* 오른쪽 영역 flex-col로 구성 */}
                    <div className='w-[77.8%] flex flex-col gap-2'>
                        {/* 첫 번째 행 */}
                        <div className='flex h-1/2 gap-2'>
                            <div className='w-[46.4%] flex gap-2'>
                                <div className='w-3/4'>
                                    <BatteryAbnormalAlarm />
                                </div>
                                <div className='w-1/4'>
                                    <EVPolicyComplianceRate />
                                </div>
                            </div>
                            <div className='w-[53.6%]'>
                                <BatteryAlarmDetail />
                            </div>
                        </div>
                        {/* 두 번째 행 */}
                        <div className='flex h-1/2 gap-2'>
                            <div className='w-[46.4%] bg-[#2B313B] rounded-lg h-full'>
                                <OperationSummary />
                            </div>
                            <div className='w-[53.6%] bg-[#2B313B] rounded-lg'>
                                <div className="p-2">
                                    <h3 
                                        className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white/20 inline-block"
                                        onClick={() => setIsFilterOpen(true)}
                                    >
                                        관리항목
                                    </h3>
                                    <div className='flex gap-2'>
                                        <div className='w-1/3'>
                                            <MetricChart 
                                                type="stress" 
                                                selectedTitle={selectedMetrics[0]} 
                                                onMetricsSelect={handleMetricsSelect}
                                                selectedMetrics={selectedMetrics}
                                                showPopupOnClick={false}
                                            />
                                        </div>
                                        <div className='w-1/3'>
                                            <MetricChart 
                                                type="soc" 
                                                selectedTitle={selectedMetrics[1]} 
                                                onMetricsSelect={handleMetricsSelect}
                                                selectedMetrics={selectedMetrics}
                                                showPopupOnClick={false}
                                            />
                                        </div>
                                        <div className='w-1/3'>
                                            <MetricChart 
                                                type="efficiency" 
                                                selectedTitle={selectedMetrics[2]} 
                                                onMetricsSelect={handleMetricsSelect}
                                                selectedMetrics={selectedMetrics}
                                                showPopupOnClick={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 세 번째 행 */}
                <div className='flex h-[32%] gap-2'>
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
            <FilterPopup 
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                maxChecked={3}
                exactCount={true}
                onApply={handleMetricsSelect}
                selectedItems={selectedMetrics}
            />
        </div>
    );
}