import { useState, useMemo, useEffect } from 'react';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import { cn } from '@/helpers/class-name.helper';
import { TableColumn } from '@/types/table.type';

type StatisticalData = {
    id: number;
    관리항목: string;
    차량번호: string;
    동호수: string;
    From: string;
    To: string;
    권장충전율초과: number | string;
};

const pagination = {
    total: 0,
    pageSize: 10,
};

export default function StatisticalDataPage() {
    const [data, setData] = useState<StatisticalData[]>([]);
    const { t: trans } = useTranslation('translation');

    useEffect(() => {
        const dummyData = [
            { id: 1, 관리항목: 'Soc 출입제한 준수', 차량번호: '72차7996', 동호수: '101동 2208호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 15 },
            { id: 2, 관리항목: 'Soc 출입제한 준수', 차량번호: '70희1559', 동호수: '108동 1102호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 11 },
            { id: 3, 관리항목: 'Soc 출입제한 준수', 차량번호: '17도5374', 동호수: '102동 404호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 8 },
            { id: 4, 관리항목: 'Soc 출입제한 준수', 차량번호: '13호8714', 동호수: '115동 406호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 6 },
            { id: 5, 관리항목: 'Soc 출입제한 준수', 차량번호: '14모2850', 동호수: '114동 508호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 4 },
            { id: 6, 관리항목: 'Soc 출입제한 준수', 차량번호: '16차1672', 동호수: '107동 203호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 4 },
            { id: 7, 관리항목: 'Soc 출입제한 준수', 차량번호: '24수9389', 동호수: '106동 1803호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 3 },
            { id: 8, 관리항목: 'Soc 출입제한 준수', 차량번호: '53조8377', 동호수: '108동 1002호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 3 },
            { id: 9, 관리항목: 'Soc 출입제한 준수', 차량번호: '73더1973', 동호수: '118동 2104호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 3 },
            { id: 10, 관리항목: 'Soc 출입제한 준수', 차량번호: '79루2801', 동호수: '117동 1809호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 3 },
            { id: 11, 관리항목: 'Soc 출입제한 준수', 차량번호: '90하2538', 동호수: '114동 1004호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 3 },
            { id: 12, 관리항목: 'Soc 출입제한 준수', 차량번호: '62기1619', 동호수: '104동 2008호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 3 },
            { id: 13, 관리항목: 'Soc 출입제한 준수', 차량번호: '68보8447', 동호수: '105동 2009호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 3 },
            { id: 14, 관리항목: 'Soc 출입제한 준수', 차량번호: '50조9963', 동호수: '105동 2307호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 15, 관리항목: 'Soc 출입제한 준수', 차량번호: '13나2645', 동호수: '112동 104호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 16, 관리항목: 'Soc 출입제한 준수', 차량번호: '09수8987', 동호수: '113동 304호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 17, 관리항목: 'Soc 출입제한 준수', 차량번호: '36바7539', 동호수: '114동 509호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 18, 관리항목: 'Soc 출입제한 준수', 차량번호: '65모9203', 동호수: '111동 507호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 19, 관리항목: 'Soc 출입제한 준수', 차량번호: '14두4960', 동호수: '102동 605호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 20, 관리항목: 'Soc 출입제한 준수', 차량번호: '15파3718', 동호수: '102동 2209호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 21, 관리항목: 'Soc 출입제한 준수', 차량번호: '68보2379', 동호수: '103동 1103호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 22, 관리항목: 'Soc 출입제한 준수', 차량번호: '06치5601', 동호수: '102동 405호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 23, 관리항목: 'Soc 출입제한 준수', 차량번호: '67호1145', 동호수: '109동 407호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 24, 관리항목: 'Soc 출입제한 준수', 차량번호: '54모1707', 동호수: '103동 509호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 2 },
            { id: 25, 관리항목: 'Soc 출입제한 준수', 차량번호: '43마6646', 동호수: '116동 204호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 1 },
            { id: 26, 관리항목: 'Soc 출입제한 준수', 차량번호: '81수6017', 동호수: '115동 1804호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 1 },
            { id: 27, 관리항목: 'Soc 출입제한 준수', 차량번호: '11하4546', 동호수: '108동 1003호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 0 },
            { id: 28, 관리항목: 'Soc 출입제한 준수', 차량번호: '44하9135', 동호수: '107동 2105호', From: '2024.10.01', To: '2024.10.31', 권장충전율초과: 0 },
        ];
        setData(dummyData);
        pagination.total = dummyData.length;
    }, []);

    const columns = useMemo(
        (): TableColumn<StatisticalData>[] => [
            {
                name: '관리항목',
                dataIndex: '관리항목',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
                fixedWidth: '180px',
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
                dataIndex: 'From',
                paddingInline: '24px',
                align: TEXT_ALIGN.CENTER,
                fixedWidth: '130px',
            },
            {
                name: 'To',
                dataIndex: 'To',
                paddingInline: '24px',
                align: TEXT_ALIGN.CENTER,
                fixedWidth: '130px',
            },
            {
                name: '권장 충전율 초과',
                dataIndex: '권장충전율초과',
                paddingInline: '24px',
                align: TEXT_ALIGN.CENTER,
                fixedWidth: '150px',
                render: (row: StatisticalData) => (
                    <span className={cn(
                        'font-bold',
                        typeof row.권장충전율초과 === 'number' ? 'text-red-500' : 'text-gray-500'
                    )}>
                        {row.권장충전율초과}
                    </span>
                ),
            },
        ],
        []
    );

    return (
        <div className="flex flex-col h-full bg-hw-dark-1">
            <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-5 lg:pt-10 pb-6">
                <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5'>
                    <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
                        {trans('통계 자료')}
                    </h1>
                </div>
            </div>

            <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
                <TableData
                    data={data}
                    columns={columns}
                    isPagination
                    pagination={pagination}
                    paginationMarginTop='32px'
                    emptyMessage={trans('데이터가 없습니다.')}
                />
            </div>
        </div>
    );
}