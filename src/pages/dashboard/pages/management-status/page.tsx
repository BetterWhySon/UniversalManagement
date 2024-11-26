import { useState, useMemo, useEffect } from 'react';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import { TableColumn } from '@/types/table.type';

type ManagementStatus = {
    id: number;
    실시간상태정보: string;
    차량번호: string;
    차종: string;
    동호수: string;
    차주: string;
    연락처: string;
    최근이상알람: string;
    조치내용: string;
    제조사점검결과: string;
    관리정책1준수율: string;
    관리정책2준수율: string;
};

const pagination = {
    total: 0,
    pageSize: 12,
};

export default function ManagementStatusPage() {
    const [data, setData] = useState<ManagementStatus[]>([]);
    const { t: trans } = useTranslation('translation');

    useEffect(() => {
        const dummyData = [
            { id: 1, 실시간상태정보: '단지이동', 차량번호: '72자7996', 차종: 'EV6', 동호수: '101동 2208호', 차주: '홍길동', 연락처: '010-1234-567X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '93%', 관리정책2준수율: '81%' },
            { id: 2, 실시간상태정보: '단지이동', 차량번호: '70바1559', 차종: 'G80', 동호수: '108동 1102호', 차주: '김서현', 연락처: '010-2345-678X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '95%', 관리정책2준수율: '83%' },
            { id: 3, 실시간상태정보: '충전중', 차량번호: '17도5374', 차종: 'EV6', 동호수: '102동 404호', 차주: '이지훈', 연락처: '010-3456-789X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '94%', 관리정책2준수율: '80%' },
            { id: 4, 실시간상태정보: '충전중', 차량번호: '13호8714', 차종: 'EV9', 동호수: '115동 406호', 차주: '박지민', 연락처: '010-4567-890X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '96%', 관리정책2준수율: '82%' },
            { id: 5, 실시간상태정보: '충전중', 차량번호: '14모2850', 차종: 'G80', 동호수: '114동 508호', 차주: '최민서', 연락처: '010-5678-901X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '92%', 관리정책2준수율: '84%' },
            { id: 6, 실시간상태정보: '충전중', 차량번호: '6자1672', 차종: 'IONIQ5', 동호수: '107동 203호', 차주: '정수민', 연락처: '010-6789-012X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '94%', 관리정책2준수율: '79%' },
            { id: 7, 실시간상태정보: '충전중', 차량번호: '4조9389', 차종: 'IONIQ5', 동호수: '106동 1803호', 차주: '한도현', 연락처: '010-7890-123X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '95%', 관리정책2준수율: '83%' },
            { id: 8, 실시간상태정보: '충전중', 차량번호: '53조8377', 차종: 'IONIQ5', 동호수: '108동 1002호', 차주: '윤지우', 연락처: '010-8901-234X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '93%', 관리정책2준수율: '80%' },
            { id: 9, 실시간상태정보: '충전중', 차량번호: '73러1973', 차종: 'KONA', 동호수: '118동 2104호', 차주: '장유진', 연락처: '010-9012-345X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '96%', 관리정책2준수율: '82%' },
            { id: 10, 실시간상태정보: '주차중', 차량번호: '79루2801', 차종: 'BONGO', 동호수: '117동 1809호', 차주: '오수아', 연락처: '010-1122-334X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '94%', 관리정책2준수율: '84%' },
            { id: 11, 실시간상태정보: '주차중', 차량번호: '90하2538', 차종: 'EV6', 동호수: '114동 1004호', 차주: '신태윤', 연락처: '010-2233-445X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '92%', 관리정책2준수율: '81%' },
            { id: 12, 실시간상태정보: '주차중', 차량번호: '62거1619', 차종: 'EV6', 동호수: '104동 2008호', 차주: '조지안', 연락처: '010-3344-556X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '96%', 관리정책2준수율: '83%' },
            { id: 13, 실시간상태정보: '주차중', 차량번호: '68로8447', 차종: 'EV6', 동호수: '105동 2009호', 차주: '황민재', 연락처: '010-4455-667X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '94%', 관리정책2준수율: '80%' },
            { id: 14, 실시간상태정보: '주차중', 차량번호: '50조9963', 차종: 'IONIQ 19', 동호수: '105동 2307호', 차주: '문서연', 연락처: '010-5566-778X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '93%', 관리정책2준수율: '82%' },
            { id: 15, 실시간상태정보: '주차중', 차량번호: '13너2645', 차종: 'IONIQ5', 동호수: '112동 104호', 차주: '임우원', 연락처: '010-6677-889X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '95%', 관리정책2준수율: '84%' },
            { id: 16, 실시간상태정보: '주차중', 차량번호: '09수8987', 차종: 'IONIQ5', 동호수: '113동 304호', 차주: '홍태희', 연락처: '010-7788-990X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '94%', 관리정책2준수율: '79%' },
            { id: 17, 실시간상태정보: '주차중', 차량번호: '36바7539', 차종: 'IONIQ5', 동호수: '114동 509호', 차주: '강윤아', 연락처: '010-8899-001X', 최근이상알람: '24.09.03 08:32:47', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '92%', 관리정책2준수율: '82%' },
            { id: 18, 실시간상태정보: '주차중', 차량번호: '65마9203', 차종: 'IONIQ5', 동호수: '111동 507호', 차주: '권지후', 연락처: '010-9900-112X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '96%', 관리정책2준수율: '81%' },
            { id: 19, 실시간상태정보: '주차중', 차량번호: '14두4960', 차종: 'IONIQ5', 동호수: '102동 605호', 차주: '배시우', 연락처: '010-1010-121X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '94%', 관리정책2준수율: '83%' },
            { id: 20, 실시간상태정보: '주차중', 차량번호: '5파3718', 차종: 'IONIQ7', 동호수: '102동 2209호', 차주: '송하율', 연락처: '010-2020-232X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '93%', 관리정책2준수율: '80%' },
            { id: 21, 실시간상태정보: '외부이동', 차량번호: '68보2379', 차종: 'SOUL', 동호수: '103동 1103호', 차주: '서하영', 연락처: '010-3030-343X', 최근이상알람: '24.09.02 14:28:55', 조치내용: '-', 제조사점검결과: '-', 관리정책1준수율: '95%', 관리정책2준수율: '82%' },
            { id: 22, 실시간상태정보: '외부이동', 차량번호: '06자5601', 차종: 'EV6', 동호수: '102동 405호', 차주: '허준혁', 연락처: '010-4040-454X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '94%', 관리정책2준수율: '84%' },
            { id: 23, 실시간상태정보: '외부이동', 차량번호: '67호1145', 차종: 'EV6', 동호수: '109동 407호', 차주: '남태민', 연락처: '010-5050-565X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '96%', 관리정책2준수율: '79%' },
            { id: 24, 실시간상태정보: '외부이동', 차량번호: '54로1707', 차종: 'EV6', 동호수: '103동 509호', 차주: '유다빈', 연락처: '010-6060-676X', 최근이상알람: '24.09.01 19:11:08', 조치내용: '-', 제조사점검결과: '-', 관리정책1준수율: '92%', 관리정책2준수율: '83%' },
            { id: 25, 실시간상태정보: '외부이동', 차량번호: '43바6646', 차종: 'EV6', 동호수: '116동 204호', 차주: '노지성', 연락처: '010-7070-787X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '94%', 관리정책2준수율: '80%' },
            { id: 26, 실시간상태정보: '외부이동', 차량번호: '81수6017', 차종: 'EV6', 동호수: '115동 1804호', 차주: '안유나', 연락처: '010-8080-898X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '93%', 관리정책2준수율: '82%' },
            { id: 27, 실시간상태정보: '외부이동', 차량번호: '11하4546', 차종: 'EV6', 동호수: '108동 1003호', 차주: '조성훈', 연락처: '010-9090-909X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '95%', 관리정책2준수율: '84%' },
            { id: 28, 실시간상태정보: '외부이동', 차량번호: '44하9135', 차종: 'EV9', 동호수: '107동 2105호', 차주: '고태양', 연락처: '010-1111-223X', 최근이상알람: '', 조치내용: '', 제조사점검결과: '', 관리정책1준수율: '96%', 관리정책2준수율: '81%' }
        ];
        setData(dummyData);
        pagination.total = dummyData.length;
    }, []);

    const columns = useMemo(
        (): TableColumn<ManagementStatus>[] => [
            {
                name: '실시간 상태정보',
                dataIndex: '실시간상태정보',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '차량번호',
                dataIndex: '차량번호',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '차종',
                dataIndex: '차종',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '동/호수',
                dataIndex: '동호수',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '차주',
                dataIndex: '차주',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '연락처',
                dataIndex: '연락처',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '최근 이상알람',
                dataIndex: '최근이상알람',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '조치내용',
                dataIndex: '조치내용',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '제조사 점검 결과',
                dataIndex: '제조사점검결과',
                paddingInline: '24px',
                align: TEXT_ALIGN.LEFT,
            },
            {
                name: '관리정책1 준수율',
                dataIndex: '관리정책1준수율',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
            },
            {
                name: '관리정책2 준수율',
                dataIndex: '관리정책2준수율',
                paddingInline: '24px',
                align: TEXT_ALIGN.RIGHT,
            },
        ],
        []
    );

    return (
        <div className="flex flex-col h-full bg-hw-dark-1">
            <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-5 lg:pt-10 pb-6">
                <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5'>
                    <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
                        {trans('전기차 관리 현황')}
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