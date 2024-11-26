import React, { useState, useMemo, useEffect } from 'react';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import { cn } from '@/helpers/class-name.helper';

type PolicyComplianceData = {
    id: number;
    관리정책: string;
    차량번호: string;
    동호수: string;
    from: string;
    to: string;
    미준수횟수: number;
    준수횟수: number;
    준수율: string;
};

// TableData의 props 타입에서 columns의 타입을 추출
type TableDataProps = React.ComponentProps<typeof TableData>;
type ColumnType = TableDataProps['columns'][number];

const pagination = {
    total: 0,
    pageSize: 10,
};

export default function PolicyCompliancePage() {
    const [selectedFilter, setSelectedFilter] = useState<string>('전체');
    const [data, setData] = useState<PolicyComplianceData[]>([]);
    const { t: trans } = useTranslation('translation');

    useEffect(() => {
        const dummyData = [
            { id: 1, 관리정책: 'SoC 출입제한 준수', 차량번호: '72자7996', 동호수: '101동 2208호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 22, 준수율: '93%' },
            { id: 2, 관리정책: 'SoC 출입제한 준수', 차량번호: '70허1559', 동호수: '108동 1102호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 21, 준수율: '95%' },
            { id: 3, 관리정책: 'SoC 출입제한 준수', 차량번호: '17도5374', 동호수: '102동 404호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 26, 준수율: '94%' },
            { id: 4, 관리정책: 'SoC 출입제한 준수', 차량번호: '13호8714', 동호수: '115동 406호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 29, 준수율: '96%' },
            { id: 5, 관리정책: 'SoC 출입제한 준수', 차량번호: '14모2850', 동호수: '114동 508호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 23, 준수율: '92%' },
            { id: 6, 관리정책: 'SoC 출입제한 준수', 차량번호: '6자1672', 동호수: '107동 203호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 19, 준수율: '94%' },
            { id: 7, 관리정책: 'SoC 출입제한 준수', 차량번호: '4조9389', 동호수: '106동 1803호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 30, 준수율: '95%' },
            { id: 8, 관리정책: 'SoC 출입제한 준수', 차량번호: '53조8377', 동호수: '108동 1002호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 25, 준수율: '93%' },
            { id: 9, 관리정책: 'SoC 출입제한 준수', 차량번호: '73러1973', 동호수: '118동 2104호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 22, 준수율: '96%' },
            { id: 10, 관리정책: 'SoC 출입제한 준수', 차량번호: '79루2801', 동호수: '117동 1809호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 24, 준수율: '94%' },
            { id: 11, 관리정책: 'SoC 출입제한 준수', 차량번호: '90하2538', 동호수: '114동 1004호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 19, 준수율: '92%' },
            { id: 12, 관리정책: 'SoC 출입제한 준수', 차량번호: '62거1619', 동호수: '104동 2008호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 28, 준수율: '96%' },
            { id: 13, 관리정책: 'SoC 출입제한 준수', 차량번호: '68로8447', 동호수: '105동 2009호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 29, 준수율: '94%' },
            { id: 14, 관리정책: 'SoC 출입제한 준수', 차량번호: '50조9963', 동호수: '105동 2307호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 22, 준수율: '93%' },
            { id: 15, 관리정책: 'SoC 출입제한 준수', 차량번호: '13너2645', 동호수: '112동 104호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 21, 준수율: '95%' },
            { id: 16, 관리정책: 'SoC 출입제한 준수', 차량번호: '09수8987', 동호수: '113동 304호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 26, 준수율: '94%' },
            { id: 17, 관리정책: 'SoC 출입제한 준수', 차량번호: '36바7539', 동호수: '114동 509호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 28, 준수율: '92%' },
            { id: 18, 관리정책: 'SoC 출입제한 준수', 차량번호: '65마9203', 동호수: '111동 507호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 24, 준수율: '96%' },
            { id: 19, 관리정책: 'SoC 출입제한 준수', 차량번호: '14두4960', 동호수: '102동 605호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 19, 준수율: '94%' },
            { id: 20, 관리정책: 'SoC 출입제한 준수', 차량번호: '5파3718', 동호수: '102동 2209호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 25, 준수율: '93%' },
            { id: 21, 관리정책: 'SoC 출입제한 준수', 차량번호: '68보2379', 동호수: '103동 1103호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 22, 준수율: '95%' },
            { id: 22, 관리정책: 'SoC 출입제한 준수', 차량번호: '06자5601', 동호수: '102동 405호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 24, 준수율: '94%' },
            { id: 23, 관리정책: 'SoC 출입제한 준수', 차량번호: '67호1145', 동호수: '109동 407호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 20, 준수율: '96%' },
            { id: 24, 관리정책: 'SoC 출입제한 준수', 차량번호: '54로1707', 동호수: '103동 509호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 27, 준수율: '92%' },
            { id: 25, 관리정책: 'SoC 출입제한 준수', 차량번호: '43바6646', 동호수: '116동 204호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 29, 준수율: '94%' },
            { id: 26, 관리정책: 'SoC 출입제한 준수', 차량번호: '81수6017', 동호수: '115동 1804호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 2, 준수횟수: 22, 준수율: '93%' },
            { id: 27, 관리정책: 'SoC 출입제한 준수', 차량번호: '11하4546', 동호수: '108동 1003호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 21, 준수율: '95%' },
            { id: 28, 관리정책: 'SoC 출입제한 준수', 차량번호: '44하9135', 동호수: '107동 2105호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 1, 준수횟수: 27, 준수율: '96%' },
            { id: 29, 관리정책: '단지내, 충전율 제한', 차량번호: '72자7996', 동호수: '101동 2208호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 19, 준수율: '81%' },
            { id: 30, 관리정책: '단지내, 충전율 제한', 차량번호: '70허1559', 동호수: '108동 1102호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 18, 준수율: '83%' },
            { id: 31, 관리정책: '단지내, 충전율 제한', 차량번호: '17도5374', 동호수: '102동 404호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 6, 준수횟수: 22, 준수율: '80%' },
            { id: 32, 관리정책: '단지내, 충전율 제한', 차량번호: '13호8714', 동호수: '115동 406호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 25, 준수율: '82%' },
            { id: 33, 관리정책: '단지내, 충전율 제한', 차량번호: '14모2850', 동호수: '114동 508호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 21, 준수율: '84%' },
            { id: 34, 관리정책: '단지내, 충전율 제한', 차량번호: '6자1672', 동호수: '107동 203호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 16, 준수율: '79%' },
            { id: 35, 관리정책: '단지내, 충전율 제한', 차량번호: '4조9389', 동호수: '106동 1803호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 27, 준수율: '83%' },
            { id: 36, 관리정책: '단지내, 충전율 제한', 차량번호: '53조8377', 동호수: '108동 1002호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 22, 준수율: '80%' },
            { id: 37, 관리정책: '단지내, 충전율 제한', 차량번호: '73러1973', 동호수: '118동 2104호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 19, 준수율: '82%' },
            { id: 38, 관리정책: '단지내, 충전율 제한', 차량번호: '79루2801', 동호수: '117동 1809호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 22, 준수율: '84%' },
            { id: 39, 관리정책: '단지내, 충전율 제한', 차량번호: '90하2538', 동호수: '114동 1004호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 17, 준수율: '81%' },
            { id: 40, 관리정책: '단지내, 충전율 제한', 차량번호: '62거1619', 동호수: '104동 2008호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 24, 준수율: '83%' },
            { id: 41, 관리정책: '단지내, 충전율 제한', 차량번호: '68로8447', 동호수: '105동 2009호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 6, 준수횟수: 25, 준수율: '80%' },
            { id: 42, 관리정책: '단지내, 충전율 제한', 차량번호: '50조9963', 동호수: '105동 2307호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 20, 준수율: '82%' },
            { id: 43, 관리정책: '단지내, 충전율 제한', 차량번호: '13너2645', 동호수: '112동 104호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 18, 준수율: '84%' },
            { id: 44, 관리정책: '단지내, 충전율 제한', 차량번호: '09수8987', 동호수: '113동 304호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 6, 준수횟수: 22, 준수율: '79%' },
            { id: 45, 관리정책: '단지내, 충전율 제한', 차량번호: '36바7539', 동호수: '114동 509호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 25, 준수율: '82%' },
            { id: 46, 관리정책: '단지내, 충전율 제한', 차량번호: '65마9203', 동호수: '111동 507호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 20, 준수율: '81%' },
            { id: 47, 관리정책: '단지내, 충전율 제한', 차량번호: '14두4960', 동호수: '102동 605호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 3, 준수횟수: 17, 준수율: '83%' },
            { id: 48, 관리정책: '단지내, 충전율 제한', 차량번호: '5파3718', 동호수: '102동 2209호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 22, 준수율: '80%' },
            { id: 49, 관리정책: '단지내, 충전율 제한', 차량번호: '68보2379', 동호수: '103동 1103호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 19, 준수율: '82%' },
            { id: 50, 관리정책: '단지내, 충전율 제한', 차량번호: '06자5601', 동호수: '102동 405호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 22, 준수율: '84%' },
            { id: 51, 관리정책: '단지내, 충전율 제한', 차량번호: '67호1145', 동호수: '109동 407호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 17, 준수율: '79%' },
            { id: 52, 관리정책: '단지내, 충전율 제한', 차량번호: '54로1707', 동호수: '103동 509호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 24, 준수율: '83%' },
            { id: 53, 관리정책: '단지내, 충전율 제한', 차량번호: '43바6646', 동호수: '116동 204호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 6, 준수횟수: 25, 준수율: '80%' },
            { id: 54, 관리정책: '단지내, 충전율 제한', 차량번호: '81수6017', 동호수: '115동 1804호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 20, 준수율: '82%' },
            { id: 55, 관리정책: '단지내, 충전율 제한', 차량번호: '11하4546', 동호수: '108동 1003호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 4, 준수횟수: 18, 준수율: '84%' },
            { id: 56, 관리정책: '단지내, 충전율 제한', 차량번호: '44하9135', 동호수: '107동 2105호', from: '2024.10.01', to: '2024.10.31', 미준수횟수: 5, 준수횟수: 23, 준수율: '81%' }
        ];
        setData(dummyData);
        pagination.total = dummyData.length;
    }, []);

    const columns: ColumnType[] = useMemo(
        () => [
            {
                name: '관리정책',
                dataIndex: '관리정책',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
                fixedWidth: '200px',
            },
            {
                name: '차량번호',
                dataIndex: '차량번호',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
                fixedWidth: '130px',
            },
            {
                name: '동/호수',
                dataIndex: '동호수',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
                fixedWidth: '130px',
            },
            {
                name: 'From',
                dataIndex: 'from',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
                fixedWidth: '130px',
            },
            {
                name: 'To',
                dataIndex: 'to',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
                fixedWidth: '130px',
            },
            {
                name: '미준수 횟수',
                dataIndex: '미준수횟수',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
                fixedWidth: '130px',
            },
            {
                name: '준수 횟수',
                dataIndex: '준수횟수',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
                fixedWidth: '130px',
            },
            {
                name: '준수율',
                dataIndex: '준수율',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
                fixedWidth: '130px',
            },
        ],
        []
    );

    return (
        <div className="flex flex-col h-full bg-hw-dark-1">
            <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-5 lg:pt-10 pb-6">
                <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5'>
                    <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
                        {trans('관리정책 준수율')}
                    </h1>
                    <button className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
                        <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('조회')}</span>
                    </button>
                </div>

                <div className='w-full bg-hw-dark-2 p-4 rounded-lg text-hw-white-1'>
                    <div className='flex flex-col md:flex-row justify-between items-start'>
                        <div className='w-full md:w-1/2 pr-2 mb-4 md:mb-0'>
                            <h3 className='mb-2'>{trans('조회 조건')}</h3>
                            <div className='flex flex-wrap space-x-4 h-10 items-center'>
                                <div className='flex items-center space-x-2'>
                                    <input type='radio' id='all' name='filter' checked={selectedFilter === '전체'} onChange={() => setSelectedFilter('전체')} />
                                    <label htmlFor='all'>{trans('전체')}</label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <input type='radio' id='soc' name='filter' checked={selectedFilter === 'SoC 출입제한 준수'} onChange={() => setSelectedFilter('SoC 출입제한 준수')} />
                                    <label htmlFor='soc'>{trans('SoC 출입제한 준수')}</label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <input type='radio' id='charge' name='filter' checked={selectedFilter === '충전시, 충전율 제한'} onChange={() => setSelectedFilter('충전시, 충전율 제한')} />
                                    <label htmlFor='charge'>{trans('충전시, 충전율 제한')}</label>
                                </div>
                            </div>
                        </div>

                        <PeriodSelector />
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
                {/* PC DATA TABLE */}
                <div className='w-full hidden xs:block'>
                    <TableData
                        data={data}
                        columns={columns}
                        isPagination
                        pagination={pagination}
                        paginationMarginTop='32px'
                        emptyMessage={trans('데이터가 없습니다.')}
                    />
                </div>

                {/* MOBILE DATA TABLE */}
                <div className='w-full block xs:hidden relative'>
                    <div className='sticky top-0 z-10 py-2 bg-hw-dark-2 flex flex-wrap border-b border-hw-gray-5'>
                        {columns.map((item, index) => (
                            <span
                                key={index}
                                style={{ width: `${item.fixedWidth}`, textAlign: item.align }}
                                className='py-[6px] px-8 text-[16px] font-light leading-5 text-hw-white-2'>
                                {item.name}
                            </span>
                        ))}
                    </div>
                    <ul className='w-full'>
                        {data.map((row: PolicyComplianceData) => (
                            <li key={row.id} className='w-full py-2 transition-colors odd:bg-[#363E4B] flex flex-wrap'>
                                {columns.map((item, index) => (
                                    <span
                                        key={index}
                                        style={{ width: `${item.fixedWidth}`, textAlign: item.align }}
                                        className={cn(
                                            'py-[6px] px-[18px] text-[14px] font-light leading-5 text-hw-white-2',
                                            item.render && 'px-6',
                                        )}>
                                        {item.render ? item.render(row, item.dataIndex) : row[item.dataIndex as keyof PolicyComplianceData]}
                                    </span>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const PeriodSelector = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('이번달');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const { t: trans } = useTranslation('translation');

    const periods = ['오늘', '이번주', '이번달', '이번분기', '직접입력'];

    useEffect(() => {
        const today = new Date();
        let from = new Date(today);
        let to = new Date(today);

        switch (selectedPeriod) {
            case '오늘':
                break;
            case '이번주':
                from.setDate(today.getDate() - today.getDay());
                to.setDate(from.getDate() + 6);
                break;
            case '이번달':
                from.setDate(1);
                to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case '이번분기':
                const quarter = Math.floor(today.getMonth() / 3);
                from = new Date(today.getFullYear(), quarter * 3, 1);
                to = new Date(today.getFullYear(), quarter * 3 + 3, 0);
                break;
            case '직���입력':
                // 직접입력의 경우 기존 날짜 유지
                return;
            default:
                break;
        }

        setDateRange({
            from: from.toISOString().split('T')[0],
            to: to.toISOString().split('T')[0]
        });
    }, [selectedPeriod]);

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriod(e.target.value);
    };

    return (
        <div className='w-full md:w-1/2 md:pl-2'>
            <h3 className='mb-2'>{trans('기간 설정')}</h3>
            <div className='flex flex-wrap space-x-4 h-10 items-center'>
                <select
                    className='bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full appearance-none border-none outline-none'
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                >
                    {periods.map(period => (
                        <option key={period} value={period}>{trans(period)}</option>
                    ))}
                </select>
                <input
                    type='date'
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    className={`bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full [color-scheme:dark] appearance-none border-none outline-none ${selectedPeriod !== '직접입력' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={selectedPeriod !== '직접입력'}
                />
                <span className='text-hw-white-1'>~</span>
                <input
                    type='date'
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    className={`bg-hw-dark-3 text-hw-white-1 p-2 rounded h-full [color-scheme:dark] appearance-none border-none outline-none ${selectedPeriod !== '직접입력' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={selectedPeriod !== '직접입력'}
                />
            </div>
        </div>
    );
};