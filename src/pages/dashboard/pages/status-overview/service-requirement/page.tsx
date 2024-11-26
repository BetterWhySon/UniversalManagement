import { useState, useMemo, useEffect } from 'react';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import { cn } from '@/helpers/class-name.helper';
import { TableColumn } from '@/types/table.type';

type ServiceRequirementData = {
    id: number;
    vehicleNumber: string;
    unitNumber: string;
    cumulativeMileage: string;
    dataLinkageRate: string;
    unlinkPeriod: string;
    fulfillmentStatus: string;
};

const pagination = {
    total: 0,
    pageSize: 10,
};

export default function ServiceRequirementPage() {
    const [data, setData] = useState<ServiceRequirementData[]>([]);
    const { t: trans } = useTranslation('translation');

    useEffect(() => {
        const dummyData = [
            { id: 1, vehicleNumber: '72자7996', unitNumber: '101동 2208호', cumulativeMileage: '2,410km', dataLinkageRate: '98%', unlinkPeriod: '0일', fulfillmentStatus: '미충족' },
            { id: 2, vehicleNumber: '70허1559', unitNumber: '108동 1102호', cumulativeMileage: '8,200 km', dataLinkageRate: '62%', unlinkPeriod: '2일', fulfillmentStatus: '미충족' },
            { id: 3, vehicleNumber: '17도5374', unitNumber: '102동 404호', cumulativeMileage: '15,300 km', dataLinkageRate: '78%', unlinkPeriod: '7일', fulfillmentStatus: '미충족' },
            { id: 4, vehicleNumber: '13호8714', unitNumber: '115동 406호', cumulativeMileage: '12,700 km', dataLinkageRate: '48%', unlinkPeriod: '9일', fulfillmentStatus: '미충족' },
            { id: 5, vehicleNumber: '14모2850', unitNumber: '114동 508호', cumulativeMileage: '6,400 km', dataLinkageRate: '95%', unlinkPeriod: '1일', fulfillmentStatus: '충족' },
            { id: 6, vehicleNumber: '6자1672', unitNumber: '107동 203호', cumulativeMileage: '19,500 km', dataLinkageRate: '96%', unlinkPeriod: '0일', fulfillmentStatus: '충족' },
            { id: 7, vehicleNumber: '4조9389', unitNumber: '106동 1803호', cumulativeMileage: '7,100 km', dataLinkageRate: '97%', unlinkPeriod: '2일', fulfillmentStatus: '충족' },
            { id: 8, vehicleNumber: '53조8377', unitNumber: '108동 1002호', cumulativeMileage: '10,500 km', dataLinkageRate: '98%', unlinkPeriod: '3일', fulfillmentStatus: '충족' },
            { id: 9, vehicleNumber: '73러1973', unitNumber: '118동 2104호', cumulativeMileage: '9,900 km', dataLinkageRate: '100%', unlinkPeriod: '2일', fulfillmentStatus: '충족' },
            { id: 10, vehicleNumber: '79루2801', unitNumber: '117동 1809호', cumulativeMileage: '14,300 km', dataLinkageRate: '100%', unlinkPeriod: '2일', fulfillmentStatus: '충족' },
            { id: 11, vehicleNumber: '90하2538', unitNumber: '114동 1004호', cumulativeMileage: '9,000 km', dataLinkageRate: '96%', unlinkPeriod: '0일', fulfillmentStatus: '충족' },
            { id: 12, vehicleNumber: '62거1619', unitNumber: '104동 2008호', cumulativeMileage: '11,600 km', dataLinkageRate: '97%', unlinkPeriod: '3일', fulfillmentStatus: '충족' },
            { id: 13, vehicleNumber: '68로8447', unitNumber: '105동 2009호', cumulativeMileage: '13,900 km', dataLinkageRate: '98%', unlinkPeriod: '2일', fulfillmentStatus: '충족' },
            { id: 14, vehicleNumber: '50조9963', unitNumber: '105동 2307호', cumulativeMileage: '20,000 km', dataLinkageRate: '99%', unlinkPeriod: '1일', fulfillmentStatus: '충족' },
            { id: 15, vehicleNumber: '13너2645', unitNumber: '112동 104호', cumulativeMileage: '10,400 km', dataLinkageRate: '100%', unlinkPeriod: '0일', fulfillmentStatus: '충족' },
            { id: 16, vehicleNumber: '09수8987', unitNumber: '113동 304호', cumulativeMileage: '8,700 km', dataLinkageRate: '95%', unlinkPeriod: '3일', fulfillmentStatus: '충족' },
            { id: 17, vehicleNumber: '36바7539', unitNumber: '114동 509호', cumulativeMileage: '17,500 km', dataLinkageRate: '96%', unlinkPeriod: '2일', fulfillmentStatus: '충족' },
            { id: 18, vehicleNumber: '65마9203', unitNumber: '111동 507호', cumulativeMileage: '6,800 km', dataLinkageRate: '97%', unlinkPeriod: '1일', fulfillmentStatus: '충족' },
            { id: 19, vehicleNumber: '14두4960', unitNumber: '102동 605호', cumulativeMileage: '15,600 km', dataLinkageRate: '98%', unlinkPeriod: '0일', fulfillmentStatus: '충족' },
            { id: 20, vehicleNumber: '5파3718', unitNumber: '102동 2209호', cumulativeMileage: '4,700 km', dataLinkageRate: '99%', unlinkPeriod: '2일', fulfillmentStatus: '충족' },
            { id: 21, vehicleNumber: '68보2379', unitNumber: '103동 1103호', cumulativeMileage: '18,900 km', dataLinkageRate: '100%', unlinkPeriod: '3일', fulfillmentStatus: '충족' },
            { id: 22, vehicleNumber: '06자5601', unitNumber: '102동 405호', cumulativeMileage: '12,300 km', dataLinkageRate: '95%', unlinkPeriod: '1일', fulfillmentStatus: '충족' },
            { id: 23, vehicleNumber: '67호1145', unitNumber: '109동 407호', cumulativeMileage: '9,500 km', dataLinkageRate: '96%', unlinkPeriod: '0일', fulfillmentStatus: '충족' },
            { id: 24, vehicleNumber: '54로1707', unitNumber: '103동 509호', cumulativeMileage: '14,700 km', dataLinkageRate: '97%', unlinkPeriod: '2일', fulfillmentStatus: '충족' },
            { id: 25, vehicleNumber: '43바6646', unitNumber: '116동 204호', cumulativeMileage: '7,800 km', dataLinkageRate: '98%', unlinkPeriod: '3일', fulfillmentStatus: '충족' },
            { id: 26, vehicleNumber: '81수6017', unitNumber: '115동 1804호', cumulativeMileage: '19,200 km', dataLinkageRate: '99%', unlinkPeriod: '1일', fulfillmentStatus: '충족' },
            { id: 27, vehicleNumber: '11하4546', unitNumber: '108동 1003호', cumulativeMileage: '5,000 km', dataLinkageRate: '100%', unlinkPeriod: '0일', fulfillmentStatus: '충족' },
            { id: 28, vehicleNumber: '44하9135', unitNumber: '107동 2105호', cumulativeMileage: '16,100 km', dataLinkageRate: '95%', unlinkPeriod: '3일', fulfillmentStatus: '충족' }
        ];
        setData(dummyData);
        pagination.total = dummyData.length;
    }, []);

    const columns = useMemo(
        (): TableColumn<ServiceRequirementData>[] => [
            {
                name: '차량번호',
                dataIndex: 'vehicleNumber',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
                fixedWidth: '130px',
            },
            {
                name: '동/호수',
                dataIndex: 'unitNumber',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
                fixedWidth: '130px',
            },
            {
                name: '누적 주행거리',
                dataIndex: 'cumulativeMileage',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
                fixedWidth: '130px',
            },
            {
                name: '데이터 연동률',
                dataIndex: 'dataLinkageRate',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
                fixedWidth: '130px',
            },
            {
                name: '미연동 기간',
                dataIndex: 'unlinkPeriod',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
                fixedWidth: '130px',
            },
            {
                name: '충족여부',
                dataIndex: 'fulfillmentStatus',
                paddingInline: '24px',
                align: TEXT_ALIGN.CENTER,
                fixedWidth: '130px',
                render: (row: ServiceRequirementData) => (
                    <span className={cn(
                        'font-bold',
                        row.fulfillmentStatus === '충족' ? 'text-green-500' : 'text-red-500'
                    )}>
                        {row.fulfillmentStatus}
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
                        {trans('공동관제 보장서비스 요건 충족')}
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