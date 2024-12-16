import React, { useMemo, useState, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import BatteryInfoModal from '../components/subComponents/BatteryInfoModal';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';

interface ChargingStatus {
    id: number;
    deviceId: string;
    status: string;
    condition: 'Bad' | 'Normal' | 'Good';
    soc: string;
    temperature: string;
    voltage: string;
    current: string;
    chargingTime: string;
    remainingTime: string;
}

const ChargingDetailPage: React.FC = () => {
    const { t: trans } = useTranslation('translation');
    const [showBatteryInfo, setShowBatteryInfo] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string>('');
    const [sortConfig, setSortConfig] = useState<{ key: string; order: 'asc' | 'desc' }>();

    const data = useMemo(() => [
        { id: 1, deviceId: '배터리1호', status: '충전중', condition: 'Bad' as const, soc: '35%', temperature: '38 °C', voltage: '4.31V', current: '55.2Ah', chargingTime: '18분', remainingTime: '48분' },
        { id: 2, deviceId: '배터리2호', status: '충전중', condition: 'Normal' as const, soc: '48%', temperature: '31 °C', voltage: '4.21V', current: '8.1Ah', chargingTime: '2시간 14분', remainingTime: '4시간 22분' },
        { id: 3, deviceId: '배터리3호', status: '충전중', condition: 'Good' as const, soc: '62%', temperature: '29 °C', voltage: '4.18V', current: '6.8Ah', chargingTime: '3시간 47분', remainingTime: '2시간 29분' },
        { id: 4, deviceId: '배터리4호', status: '충전중', condition: 'Normal' as const, soc: '28%', temperature: '37 °C', voltage: '4.25V', current: '7.2Ah', chargingTime: '55분', remainingTime: '6시간 22분' },
        { id: 5, deviceId: '배터리5호', status: '충전완료', condition: 'Normal' as const, soc: '88%', temperature: '42 °C', voltage: '4.32V', current: '-', chargingTime: '8시간 22분', remainingTime: '42분' },
        { id: 6, deviceId: '배터리6호', status: '충전완료', condition: 'Normal' as const, soc: '89%', temperature: '26 °C', voltage: '4.31V', current: '-', chargingTime: '7시간 58분', remainingTime: '48분' },
        { id: 7, deviceId: '배터리7호', status: '충전중', condition: 'Normal' as const, soc: '55%', temperature: '33 °C', voltage: '4.28V', current: '12.3Ah', chargingTime: '1시간 30분', remainingTime: '3시간 15분' },
        { id: 8, deviceId: '배터리8호', status: '충전완료', condition: 'Good' as const, soc: '92%', temperature: '27 °C', voltage: '4.35V', current: '-', chargingTime: '6시간 45분', remainingTime: '15분' },
        { id: 9, deviceId: '배터���9호', status: '충전중', condition: 'Normal' as const, soc: '42%', temperature: '35 °C', voltage: '4.22V', current: '15.7Ah', chargingTime: '45분', remainingTime: '4시간 30분' },
        { id: 10, deviceId: '배터리10호', status: '충전중', condition: 'Bad' as const, soc: '25%', temperature: '39 °C', voltage: '4.15V', current: '18.2Ah', chargingTime: '25분', remainingTime: '5시간 40분' },
        { id: 11, deviceId: '배터리11호', status: '충전중', condition: 'Normal' as const, soc: '58%', temperature: '34 °C', voltage: '4.27V', current: '11.5Ah', chargingTime: '2시간 10분', remainingTime: '3시간 45분' },
        { id: 12, deviceId: '배터리12호', status: '충전완료', condition: 'Good' as const, soc: '94%', temperature: '28 °C', voltage: '4.34V', current: '-', chargingTime: '7시간 15분', remainingTime: '20분' },
        { id: 13, deviceId: '배터리13호', status: '충전중', condition: 'Normal' as const, soc: '45%', temperature: '36 °C', voltage: '4.23V', current: '14.8Ah', chargingTime: '50분', remainingTime: '4시간 15분' },
        { id: 14, deviceId: '배터리14호', status: '충전중', condition: 'Bad' as const, soc: '22%', temperature: '40 °C', voltage: '4.14V', current: '19.1Ah', chargingTime: '20분', remainingTime: '5시간 50분' },
        { id: 15, deviceId: '배터리15호', status: '충전중', condition: 'Normal' as const, soc: '52%', temperature: '32 °C', voltage: '4.26V', current: '13.4Ah', chargingTime: '1시간 45분', remainingTime: '3시간 30분' },
        { id: 16, deviceId: '배터리16호', status: '충전완료', condition: 'Good' as const, soc: '91%', temperature: '29 °C', voltage: '4.33V', current: '-', chargingTime: '6시간 30분', remainingTime: '25분' },
        { id: 17, deviceId: '배터리17호', status: '충전중', condition: 'Normal' as const, soc: '48%', temperature: '35 °C', voltage: '4.24V', current: '14.2Ah', chargingTime: '55분', remainingTime: '4시간' },
        { id: 18, deviceId: '배터리18호', status: '충전중', condition: 'Bad' as const, soc: '28%', temperature: '38 °C', voltage: '4.16V', current: '17.5Ah', chargingTime: '30분', remainingTime: '5시간 20분' },
        { id: 19, deviceId: '배터리19호', status: '충전중', condition: 'Normal' as const, soc: '56%', temperature: '33 °C', voltage: '4.25V', current: '12.8Ah', chargingTime: '2시간', remainingTime: '3시간' },
        { id: 20, deviceId: '배터리20호', status: '충전완료', condition: 'Good' as const, soc: '93%', temperature: '27 °C', voltage: '4.32V', current: '-', chargingTime: '7시간', remainingTime: '18분' },
        { id: 21, deviceId: '배터리21호', status: '충전중', condition: 'Normal' as const, soc: '51%', temperature: '34 °C', voltage: '4.23V', current: '13.9Ah', chargingTime: '1시간 40분', remainingTime: '3시간 40분' },
        { id: 22, deviceId: '배터리22호', status: '충전완료', condition: 'Good' as const, soc: '90%', temperature: '28 °C', voltage: '4.31V', current: '-', chargingTime: '6시간 15분', remainingTime: '30분' },
        { id: 23, deviceId: '배터리23호', status: '충전중', condition: 'Normal' as const, soc: '44%', temperature: '36 °C', voltage: '4.22V', current: '15.1Ah', chargingTime: '48분', remainingTime: '4시간 20분' },
        { id: 24, deviceId: '배터리24호', status: '충전중', condition: 'Bad' as const, soc: '26%', temperature: '39 °C', voltage: '4.15V', current: '18.4Ah', chargingTime: '22분', remainingTime: '5시간 45분' },
        { id: 25, deviceId: '배터리25호', status: '충전중', condition: 'Normal' as const, soc: '54%', temperature: '32 °C', voltage: '4.24V', current: '13.2Ah', chargingTime: '1시간 55분', remainingTime: '3시간 20분' },
        { id: 26, deviceId: '배터리26호', status: '충전완료', condition: 'Good' as const, soc: '92%', temperature: '29 °C', voltage: '4.33V', current: '-', chargingTime: '6시간 40분', remainingTime: '22분' },
        { id: 27, deviceId: '배터리27호', status: '충전중', condition: 'Normal' as const, soc: '47%', temperature: '35 °C', voltage: '4.21V', current: '14.5Ah', chargingTime: '52분', remainingTime: '4시간 10분' },
        { id: 28, deviceId: '배터리28호', status: '충전중', condition: 'Bad' as const, soc: '24%', temperature: '38 °C', voltage: '4.14V', current: '17.8Ah', chargingTime: '28분', remainingTime: '5시간 30분' },
        { id: 29, deviceId: '배터리29호', status: '충전중', condition: 'Normal' as const, soc: '53%', temperature: '33 °C', voltage: '4.25V', current: '12.6Ah', chargingTime: '1시간 50분', remainingTime: '3시간 25분' },
        { id: 30, deviceId: '배터리30호', status: '충전완료', condition: 'Good' as const, soc: '95%', temperature: '28 °C', voltage: '4.33V', current: '-', chargingTime: '7시간 30분', remainingTime: '10분' },
        { id: 31, deviceId: '배터리29호', status: '충전중', condition: 'Normal' as const, soc: '53%', temperature: '33 °C', voltage: '4.25V', current: '12.6Ah', chargingTime: '1시간 50분', remainingTime: '3시간 25분' },
        { id: 32, deviceId: '배터리30호', status: '충전완료', condition: 'Good' as const, soc: '95%', temperature: '28 °C', voltage: '4.33V', current: '-', chargingTime: '7시간 30분', remainingTime: '10분' }
    ], []);

    const columns = useMemo(() => [
        { 
            name: '기기명', 
            dataIndex: 'deviceId', 
            align: TEXT_ALIGN.CENTER,
            paddingInline: '24px',
            fixedWidth: '150px',
        },
        { 
            name: '충전진행', 
            dataIndex: 'status', 
            align: TEXT_ALIGN.CENTER,
            paddingInline: '24px',
            fixedWidth: '130px',
        },
        { 
            name: '상태정보', 
            dataIndex: 'condition', 
            align: TEXT_ALIGN.CENTER,
            paddingInline: '24px',
            fixedWidth: '130px',
            render: (row: ChargingStatus) => (
                <span className={getConditionColor(row.condition)}>
                    {row.condition}
                </span>
            ),
        },
        { 
            name: 'SOC', 
            dataIndex: 'soc', 
            align: TEXT_ALIGN.CENTER,
            paddingInline: '24px',
            fixedWidth: '100px',
        },
        { 
            name: '온도', 
            dataIndex: 'temperature', 
            align: TEXT_ALIGN.CENTER,
            paddingInline: '24px',
            fixedWidth: '100px',
        },
        { 
            name: '전압', 
            dataIndex: 'voltage', 
            align: TEXT_ALIGN.CENTER,
            paddingInline: '24px',
            fixedWidth: '100px',
        },
        { 
            name: '충전전류', 
            dataIndex: 'current', 
            align: TEXT_ALIGN.CENTER,
            paddingInline: '24px',
            fixedWidth: '130px',
        },
        { 
            name: '충전진행시간', 
            dataIndex: 'chargingTime', 
            align: TEXT_ALIGN.CENTER,
            paddingInline: '24px',
            fixedWidth: '150px',
        },
        { 
            name: '충전 완료후 경과시간', 
            dataIndex: 'remainingTime', 
            align: TEXT_ALIGN.CENTER,
            paddingInline: '24px',
            fixedWidth: '180px',
        },
    ], []);

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'Bad':
                return 'text-red-500';
            case 'Good':
                return 'text-blue-500';
            default:
                return 'text-green-500';
        }
    };

    const handleDeviceClick = (deviceId: string) => {
        setSelectedDevice(deviceId);
        setShowBatteryInfo(true);
    };

    const pagination = {
        total: 0,
        pageSize: 15,
    };

    useEffect(() => {
        pagination.total = data.length;
    }, [data]);

    return (
        <div className="flex flex-col h-full bg-hw-dark-1">
            <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
                <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-3 h-fit md:h-5'>
                    <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
                        충전 현황 세부
                    </h1>
                </div>
            </div>

            <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
                <div className='w-full hidden xs:block'>
                    <TableData<ChargingStatus>
                        data={data}
                        columns={columns}
                        isPagination
                        pagination={{
                            total: data.length,
                            pageSize: 15,
                        }}
                        paginationMarginTop='32px'
                        emptyMessage={trans('데이터가 없습니다.')}
                    />
                </div>

                <div className='w-full block xs:hidden'>
                    {/* 모바일 테이블 구현 */}
                </div>
            </div>

            {showBatteryInfo && (
                <BatteryInfoModal 
                    deviceId={selectedDevice}
                    onClose={() => setShowBatteryInfo(false)}
                />
            )}
        </div>
    );
};

export default ChargingDetailPage; 