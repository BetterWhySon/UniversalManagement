import React, { useState, useMemo, useEffect } from 'react';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import { cn } from '@/helpers/class-name.helper';

type VehicleData = {
    id: number;
    차주명: string;
    동: string;
    호수: string;
    연락처: string;
    제조사: string;
    차종: string;
    차량번호: string;
    지원여부: string;
    서비스ID: string;
    서비스차종: string;
    배터리용량: string;
};

type TableDataProps = React.ComponentProps<typeof TableData>;
type ColumnType = TableDataProps['columns'][number];

const pagination = {
    total: 0,
    pageSize: 10,
};

export default function EVehicleRegistrationPage() {
    const [data, setData] = useState<VehicleData[]>([]);
    const [searchCondition, setSearchCondition] = useState('');
    const [detailConditions, setDetailConditions] = useState<string[]>([]);
    const { t: trans } = useTranslation('translation');

    useEffect(() => {
        const dummyData = [
            { id: 1, 차주명: '홍길동', 동: '101', 호수: '2208', 연락처: '010-1234-567X', 제조사: '기아차', 차종: 'EV6', 차량번호: '72자7996', 지원여부: '지원가능', 서비스ID: 'EVcheck01', 서비스차종: 'EV6', 배터리용량: 'Standard' },
            { id: 2, 차주명: '김서현', 동: '108', 호수: '1102', 연락처: '010-2345-678X', 제조사: '현대차', 차종: 'G80', 차량번호: '70바1559', 지원여부: '지원가능', 서비스ID: 'EVcheck02', 서비스차종: 'G80', 배터리용량: 'Standard' },
            { id: 3, 차주명: '이지훈', 동: '102', 호수: '404', 연락처: '010-3456-789X', 제조사: '기아차', 차종: 'EV6', 차량번호: '17도574', 지원여부: '지원가능', 서비스ID: 'EVcheck03', 서비스차종: 'EV6', 배터리용량: 'Long Range' },
            { id: 4, 차주명: '박지민', 동: '115', 호수: '406', 연락처: '010-4567-890X', 제조사: '기아차', 차종: 'EV9', 차량번호: '13호8714', 지원여부: '지원가능', 서비스ID: 'EVcheck04', 서비스차종: 'EV9', 배터리용량: 'Standard' },
            { id: 5, 차주명: '최민서', 동: '114', 호수: '508', 연락처: '010-5678-901X', 제조사: '현대차', 차종: 'G80', 차량번호: '14모2850', 지원여부: '지원가능', 서비스ID: 'EVcheck05', 서비스차종: 'G80', 배터리용량: 'Long Range' },
            { id: 6, 차주명: '정수민', 동: '107', 호수: '203', 연락처: '010-6789-012X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '69너672', 지원여부: '지원가능', 서비스ID: 'EVcheck06', 서비스차종: 'IONIQ5', 배터리용량: 'Standard' },
            { id: 7, 차주명: '한도현', 동: '106', 호수: '1803', 연락처: '010-7890-123X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '4조9389', 지원여부: '지원가능', 서비스ID: 'EVcheck07', 서비스차종: 'IONIQ5', 배터리용량: 'Standard' },
            { id: 8, 차주명: '윤지우', 동: '108', 호수: '1002', 연락처: '010-8901-234X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '53조8377', 지원여부: '지원가능', 서비스ID: 'EVcheck08', 서비스차종: 'IONIQ5', 배터리용량: 'Standard' },
            { id: 9, 차주명: '장유진', 동: '118', 호수: '2104', 연락처: '010-9012-345X', 제조사: '현대차', 차종: 'KONA', 차량번호: '73러1973', 지원여부: '지원가능', 서비스ID: 'EVcheck09', 서비스차종: 'KONA', 배터리용량: 'Standard' },
            { id: 10, 차주명: '오수아', 동: '117', 호수: '1809', 연락처: '010-1122-334X', 제조사: '기아차', 차종: 'BONGO', 차량번호: '79라2801', 지원여부: '지원가능', 서비스ID: 'EVcheck10', 서비스차종: 'BONGO', 배터리용량: 'Standard' },
            { id: 11, 차주명: '신태윤', 동: '114', 호수: '1004', 연락처: '010-2233-445X', 제조사: '기아차', 차종: 'EV6', 차량번호: '90하2538', 지원여부: '지원가능', 서비스ID: 'EVcheck11', 서비스차종: 'EV6', 배터리용량: 'Long Range' },
            { id: 12, 차주명: '조지안', 동: '104', 호수: '2008', 연락처: '010-3344-556X', 제조사: '기아차', 차종: 'EV6', 차량번호: '62거1619', 지원여부: '지원가능', 서비스ID: 'EVcheck12', 서비스차종: 'EV6', 배터리용량: 'Standard' },
            { id: 13, 차주명: '하민재', 동: '105', 호수: '2009', 연락처: '010-4455-667X', 제조사: '기아차', 차종: 'EV6', 차량번호: '68로8447', 지원여부: '지원가능', 서비스ID: 'EVcheck13', 서비스차종: 'EV6', 배터리용량: 'Standard' },
            { id: 14, 차주명: '문서연', 동: '105', 호수: '2307', 연락처: '010-5566-778X', 제조사: '현대차', 차종: 'IONIQ 19', 차량번호: '50조9963', 지원여부: '지원가능', 서비스ID: 'EVcheck14', 서비스차종: 'IONIQ 19', 배터리용량: 'Standard' },
            { id: 15, 차주명: '임우원', 동: '112', 호수: '104', 연락처: '010-6677-889X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '13너2645', 지원여부: '지원가능', 서비스ID: 'EVcheck15', 서비스차종: 'IONIQ5', 배터리용량: 'Standard' },
            { id: 16, 차주명: '홍태희', 동: '113', 호수: '304', 연락처: '010-7788-990X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '09수8987', 지원여부: '지원가능', 서비스ID: 'EVcheck16', 서비스차종: 'IONIQ5', 배터리용량: 'Long Range' },
            { id: 17, 차주명: '김영아', 동: '114', 호수: '509', 연락처: '010-8899-001X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '36바7539', 지원여부: '지원가능', 서비스ID: 'EVcheck17', 서비스차종: 'IONIQ5', 배터리용량: 'Standard' },
            { id: 18, 차주명: '권지후', 동: '111', 호수: '507', 연락처: '010-9900-112X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '65마0203', 지원여부: '지원가능', 서비스ID: 'EVcheck18', 서비스차종: 'IONIQ5', 배터리용량: 'Standard' },
            { id: 19, 차주명: '배시우', 동: '102', 호수: '605', 연락처: '010-1010-121X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '14두4960', 지원여부: '지원가능', 서비스ID: 'EVcheck19', 서비스차종: 'IONIQ5', 배터리용량: 'Long Range' },
            { id: 20, 차주명: '송하율', 동: '102', 호수: '2209', 연락처: '010-2020-232X', 제조사: '현대차', 차종: 'IONIQ7', 차량번호: '5마3718', 지원여부: '지원가능', 서비스ID: 'EVcheck20', 서비스차종: 'IONIQ7', 배터리용량: 'Standard' },
            { id: 21, 차주명: '서하영', 동: '103', 호수: '1103', 연락처: '010-3030-343X', 제조사: '기아차', 차종: 'SOUL', 차량번호: '68조2379', 지원여부: '지원가능', 서비스ID: 'EVcheck21', 서비스차종: 'SOUL', 배터리용량: 'Standard' },
            { id: 22, 차주명: '허준혁', 동: '102', 호수: '405', 연락처: '010-4040-454X', 제조사: '기아차', 차종: 'EV6', 차량번호: '06자5601', 지원여부: '지원가능', 서비스ID: 'EVcheck22', 서비스차종: 'EV6', 배터리용량: 'Standard' },
            { id: 23, 차주명: '남태민', 동: '109', 호수: '407', 연락처: '010-5050-565X', 제조사: '기아차', 차종: 'EV6', 차량번호: '67호1145', 지원여부: '지원가능', 서비스ID: 'EVcheck23', 서비스차종: 'EV6', 배터리용량: 'Long Range' },
            { id: 24, 차주명: '유다빈', 동: '103', 호수: '509', 연락처: '010-6060-676X', 제조사: '기아차', 차종: 'EV6', 차량번호: '54로1707', 지원여부: '지원가능', 서비스ID: 'EVcheck24', 서비스차종: 'EV6', 배터리용량: 'Standard' },
            { id: 25, 차주명: '노지성', 동: '116', 호수: '204', 연락처: '010-7070-787X', 제조사: '기아차', 차종: 'EV6', 차량번호: '43마8646', 지원여부: '지원가능', 서비스ID: 'EVcheck25', 서비스차종: 'EV6', 배터리용량: 'Standard' },
            { id: 26, 차주명: '안유나', 동: '115', 호수: '1804', 연락처: '010-8080-898X', 제조사: '기아차', 차종: 'EV6', 차량번호: '81수6017', 지원여부: '지원가능', 서비스ID: 'EVcheck26', 서비스차종: 'EV6', 배터리용량: 'Long Range' },
            { id: 27, 차주명: '조성훈', 동: '108', 호수: '1003', 연락처: '010-9090-909X', 제조사: '기아차', 차종: 'EV6', 차량번호: '11하4546', 지원여부: '지원가능', 서비스ID: 'EVcheck27', 서비스차종: 'EV6', 배터리용량: 'Long Range' },
            { id: 28, 차주명: '고태양', 동: '107', 호수: '2105', 연락처: '010-1111-223X', 제조사: '기아차', 차종: 'EV9', 차량번호: '44하9135', 지원여부: '지원가능', 서비스ID: 'EVcheck28', 서비스차종: 'EV9', 배터리용량: 'Standard' },
            { id: 29, 차주명: '손다연', 동: '109', 호수: '1810', 연락처: '010-2222-334X', 제조사: '현대차', 차종: 'G80', 차량번호: '47너4696', 지원여부: '지원가능', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 30, 차주명: '김승현', 동: '119', 호수: '1005', 연락처: '010-3333-445X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '03하1258', 지원여부: '지원가능', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 31, 차주명: '이소율', 동: '118', 호수: '2009', 연락처: '010-4444-556X', 제조사: '기아차', 차종: 'EV6', 차량번호: '31바6828', 지원여부: '지원가능', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 32, 차주명: '백도현', 동: '115', 호수: '2010', 연락처: '010-5555-667X', 제조사: '기아차', 차종: 'EV6', 차량번호: '29하8064', 지원여부: '지원가능', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 33, 차주명: '한나윤', 동: '105', 호수: '2308', 연락처: '010-6666-778X', 제조사: '현대차', 차종: 'IONIQ5', 차량번호: '33도7125', 지원여부: '지원가능', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 34, 차주명: '강민정', 동: '106', 호수: '105', 연락처: '010-7777-889X', 제조사: '기아차', 차종: 'EV6', 차량번호: '84수6431', 지원여부: '지원가능', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 35, 차주명: '정은재', 동: '106', 호수: '305', 연락처: '010-8888-990X', 제조사: '볼보코리아', 차종: 'C40', 차량번호: '47자9549', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 36, 차주명: '김수빈', 동: '113', 호수: '510', 연락처: '010-9999-001X', 제조사: '아우디', 차종: 'E-TRON 50', 차량번호: '50마5110', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 37, 차주명: '박서윤', 동: '114', 호수: '508', 연락처: '010-1212-131X', 제조사: '아우디', 차종: 'E-TRON 55', 차량번호: '31바4360', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 38, 차주명: '이주안', 동: '115', 호수: '606', 연락처: '010-2323-242X', 제조사: '아우디', 차종: 'Q4', 차량번호: '09수8977', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 39, 차주명: '차영서', 동: '112', 호수: '2210', 연락처: '010-3434-353X', 제조사: '아우디', 차종: 'Q8', 차량번호: '51바1293', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 40, 차주명: '우하진', 동: '103', 호수: '1104', 연락처: '010-4545-464X', 제조사: '테슬라', 차종: '모델3', 차량번호: '66마1468', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 41, 차주명: '최준서', 동: '103', 호수: '406', 연락처: '010-5656-575X', 제조사: '테슬라', 차종: 'MODEL3', 차량번호: '76러2387', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 42, 차주명: '최지훈', 동: '104', 호수: '408', 연락처: '010-6767-686X', 제조사: '테슬라', 차종: 'MODEL5', 차량번호: '69사7582', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 43, 차주명: '강도윤', 동: '103', 호수: '510', 연락처: '010-7878-797X', 제조사: '테슬라', 차종: 'MODEL5', 차량번호: '21거8047', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 44, 차주명: '심성준', 동: '110', 호수: '205', 연락처: '010-8989-808X', 제조사: '테슬라', 차종: 'MODEL Y', 차량번호: '06거1919', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 45, 차주명: '진하은', 동: '104', 호수: '1805', 연락처: '010-9090-919X', 제조사: '테슬라', 차종: 'MODEL 3', 차량번호: '18모2249', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 46, 차주명: '류예진', 동: '117', 호수: '1004', 연락처: '010-1123-334X', 제조사: '테슬라', 차종: 'MODEL 5', 차량번호: '56타5791', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' },
            { id: 47, 차주명: '이채영', 동: '112', 호수: '808', 연락처: '010-2234-445X', 제조사: '벤츠', 차종: 'EQE', 차량번호: '33도7125', 지원여부: '지원불가', 서비스ID: '', 서비스차종: '', 배터리용량: '' }
        ];
        setData(dummyData);
        pagination.total = dummyData.length;
    }, []);

    useEffect(() => {
        switch (searchCondition) {
            case '동':
                setDetailConditions(['101동', '102동', '103동', '104동', '105동', '106동', '107동', '108동']);
                break;
            case '제조사':
                setDetailConditions(['현대', '기아', '테슬라', '기타']);
                break;
            case '차종':
                setDetailConditions(['니로EV', '아이오닉5', '아이오닉6', '기타']);
                break;
            case '지원여부':
                setDetailConditions(['지원가능', '지원불가']);
                break;
            case '서비스등록':
                setDetailConditions(['등록', '미등록']);
                break;
            default:
                setDetailConditions([]);
        }
    }, [searchCondition]);

    const handleSearchConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchCondition(e.target.value);
    };

    const columns: ColumnType[] = useMemo(
        () => [
            { name: '차주명', dataIndex: '차주명', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '동', dataIndex: '동', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '호수', dataIndex: '호수', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '연락처', dataIndex: '연락처', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '제조사', dataIndex: '제조사', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '차종', dataIndex: '차종', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '차량번호', dataIndex: '차량번호', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '지원여부', dataIndex: '지원여부', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '서비스 ID', dataIndex: '서비스ID', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '서비스 차종', dataIndex: '서비스차종', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
            { name: '배터리 용량', dataIndex: '배터리용량', paddingInline: '24px', align: TEXT_ALIGN.LEFT },
        ],
        []
    );

    return (
        <div className="flex flex-col h-full bg-hw-dark-1">
            <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-5 lg:pt-10 pb-6">
                <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-4 md:mb-6 h-fit md:h-5'>
                    <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
                        {trans('기준정보 조회')}
                    </h1>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <select 
                            className='bg-hw-dark-2 text-hw-white-1 py-[6px] px-4 rounded-lg'
                            onChange={handleSearchConditionChange}
                            value={searchCondition}
                        >
                            <option value="">{trans('검색조건')}</option>
                            <option value="동">{trans('동')}</option>
                            <option value="제조사">{trans('제조사')}</option>
                            <option value="차종">{trans('차종')}</option>
                            <option value="지원여부">{trans('지원여부')}</option>
                            <option value="서비스등록">{trans('서비스 등록')}</option>
                        </select>
                        <select className='bg-hw-dark-2 text-hw-white-1 py-[6px] px-4 rounded-lg'>
                            <option value="">{trans('세부조건')}</option>
                            {detailConditions.map((condition, index) => (
                                <option key={index} value={condition}>{trans(condition)}</option>
                            ))}
                        </select>
                        <button className='py-[6px] px-4 rounded-lg bg-hw-orange-1 text-hw-white-1'>
                            {trans('조회')}
                        </button>
                    </div>
                    <div className='flex gap-2'>
                        <button className='py-[6px] px-4 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
                            <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('신규')}</span>
                        </button>
                        <button className='py-[6px] px-4 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
                            <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('삭제')}</span>
                        </button>
                        <button className='py-[6px] px-4 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
                            <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('취소')}</span>
                        </button>
                        <button className='py-[6px] px-4 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
                            <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('저장')}</span>
                        </button>
                    </div>
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
