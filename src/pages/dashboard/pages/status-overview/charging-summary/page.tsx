import { useState, useMemo, useEffect } from 'react';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import { cn } from '@/helpers/class-name.helper';

type ChargingSummaryData = {
    id: number;
    차량번호: string;
    충전진행: string;
    상태정보: string;
    원인: string;
    현재온도: string;
    정상온도: string;
    조치내용: string;
};

const pagination = {
    total: 0,
    pageSize: 10,
};

export default function ChargingSummaryPage() {
    const [data, setData] = useState<ChargingSummaryData[]>([]);
    const { t: trans } = useTranslation('translation');

    useEffect(() => {
        const dummyData = [
            { id: 1, 차량번호: '17도5374', 충전진행: '충전중', 상태정보: 'Bad', 원인: '모듈온도 고온', 현재온도: '62°C', 정상온도: '20~60°C', 조치내용: '충전 중, 특정 모듈의 온도가 너무 높습니다. 충전을 잠시 멈춰주세요.' },
            { id: 2, 차량번호: '79루2801', 충전진행: '충전중', 상태정보: 'Normal', 원인: '-', 현재온도: '-', 정상온도: '-', 조치내용: '-' },
            { id: 3, 차량번호: '62카1619', 충전진행: '충전완료', 상태정보: 'Good', 원인: '-', 현재온도: '-', 정상온도: '-', 조치내용: '-' },
            { id: 4, 차량번호: '36바7539', 충전진행: '충전완료', 상태정보: 'Normal', 원인: '-', 현재온도: '-', 정상온도: '-', 조치내용: '-' },
            { id: 5, 차량번호: '67호1145', 충전진행: '충전완료', 상태정보: 'Normal', 원인: '-', 현재온도: '-', 정상온도: '-', 조치내용: '-' },
            { id: 6, 차량번호: '81수6017', 충전진행: '충전완료', 상태정보: 'Normal', 원인: '-', 현재온도: '-', 정상온도: '-', 조치내용: '-' }
        ];
        setData(dummyData);
        pagination.total = dummyData.length;
    }, []);

    const columns = useMemo(
        () => [
            {
                name: '차량번호',
                dataIndex: '차량번호',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
                fixedWidth: '130px',
            },
            {
                name: '충전진행',
                dataIndex: '충전진행',
                paddingInline: '24px',
                align: TEXT_ALIGN.CENTER,
                fixedWidth: '130px',
            },
            {
                name: '상태정보',
                dataIndex: '상태정보',
                paddingInline: '24px',
                align: TEXT_ALIGN.CENTER,
                fixedWidth: '130px',
                render: (row: ChargingSummaryData) => (
                    <span className={cn(
                        'font-bold',
                        row.상태정보 === 'Good' ? 'text-blue-500' : 
                        row.상태정보 === 'Normal' ? 'text-green-500' : 
                        'text-red-500'
                    )}>
                        {row.상태정보}
                    </span>
                ),
            },
            {
                name: '원인',
                dataIndex: '원인',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '현재온도',
                dataIndex: '현재온도',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
                fixedWidth: '130px',
            },
            {
                name: '정상온도',
                dataIndex: '정상온도',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
                fixedWidth: '130px',
            },
            {
                name: '조치내용',
                dataIndex: '조치내용',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
        ],
        []
    );

    return (
        <div className="flex flex-col h-full bg-hw-dark-1">
            <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-5 lg:pt-10 pb-6">
                <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5'>
                    <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
                        {trans('충전 상태 정보')}
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