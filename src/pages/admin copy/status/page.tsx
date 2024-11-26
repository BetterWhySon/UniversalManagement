import { Arrow, Filter, Refresh } from '@/components/icons';
import FilterDropdown from './components/FilterDropdown';
import { SITE_FILTERS, SHIP_FILTERS, BMS_FILTERS, DROPDOWN_FILTERS } from '@/constants/ship-status.constant';
import { FilterDropdownType } from '@/types/dropdown-filter.type';
import { useState, useEffect, useCallback } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import TableData from '@/components/table/TableData';
import { cn } from '@/helpers/class-name.helper';
import useAdmEssStatus from '@/api/admEssStatus';
import useAdmEssStatusLogUpdate from '@/api/admEssStatusLogUpdate';
import { useTranslation } from 'react-i18next';


const pagination = {
    total: 0,
    pageSize: 12,
};

type ShipStatusData = {
    id: number;
    site: string;
    siteNameForeign: string;
    siteID: number;
    name: string;   // shipName
    shipNameForeign: string,
    bmsName: string;
    bmsID: number;
    numbersOfRack: number;
    modbusUpdateTime: string;
    canUpdateTime: string;
    logUpdateTime: string;
    numbersOfError: number;
    delaydTime: string;
    delayedDate: string;
    networkStatus: string;
    nullStatus: string;
};

export default function StatusPage() {
    const [data, setData] = useState<ShipStatusData[]>([]);
    const { dataList, dataList_ship, dataList_bms, dataList_search, storeDataList, storeDataList_ship, storeDataList_bms, storeDataList_bms_search, storeResetErrorCount } = useAdmEssStatus();
    const { storeLogUpdate } = useAdmEssStatusLogUpdate();
    const [openFilter, setOpenFilter] = useState<boolean>(true);
    const [selectSite, setSelectSite] = useState("전체");
    const [selectShip, setSelectShip] = useState("전체");  
    const [selectBMS, setSelectBMS] = useState("전체");
    const { t: trans, i18n } = useTranslation('translation');
    const [paginationTotal, setPaginationTotal] = useState(0);
    // const [currentPage, setCurrentPage] = useState(0); 
    const currentLanguage = i18n.language;

    const columns = [
        {
            name: 'site',
            dataIndex: currentLanguage == 'kr' ? 'site' : 'siteNameForeign',
            paddingInline: '24px',
        },
        {
            name: 'name',
            dataIndex: currentLanguage == 'kr' ? 'name' : 'shipNameForeign',
            paddingInline: '24px',
        },
        {
            name: 'essName',
            dataIndex: 'bmsName',
            paddingInline: '24px',
        },
        // {
        //   name: 'rackInfoCount',
        //   dataIndex: 'numbersOfRack',
        //   align: TEXT_ALIGN.CENTER,
        //   width: '1%',
        //   paddingInline: '0',
        // },
        {
            name: 'modbusDataUpdateTime',
            dataIndex: 'modbusUpdateTime',
            align: TEXT_ALIGN.CENTER,
            paddingInline: '20px',
        },
        {
            name: 'canDataUpdateTime',
            dataIndex: 'canUpdateTime',
            align: TEXT_ALIGN.CENTER,
            paddingInline: '20px',
        },
        {
            name: 'logDataUpdateTime',
            dataIndex: 'logUpdateTime',
            align: TEXT_ALIGN.CENTER,
            paddingInline: '30px',
            render: (row: ShipStatusData, dataIndex: string) => {
                return (
                    <div className='flex items-center justify-between w-full px-4'>
                        {row[dataIndex as keyof ShipStatusData]}

                        <button key={1} onClick={() => onClickRefresh(row)}
                            className='leading-[128.57%] px-4 text-hw-white-1 items-center text-left h-8'>
                            <Refresh width={20} height={20} stroke='#CACCCE' />
                        </button>
                    </div>
                );
            },
        },
        {
            // name: '111',
            name: 'errorCnt',
            dataIndex: 'numbersOfError',
            align: TEXT_ALIGN.CENTER,
            paddingInline: '1px',
            render: (row: ShipStatusData, dataIndex: string) => {
                return (
                    <div className='flex items-center justify-between w-full px-4'>
                        {row[dataIndex as keyof ShipStatusData]}

                        {/* <Refresh width={20} height={20} stroke='#CACCCE' /> */}
                        <button key={2} onClick={() => onClickRefreshErrorCount(row)}
                            className='leading-[128.57%] px-4 text-hw-white-1 items-center text-left h-8'>
                            <Refresh width={20} height={20} stroke='#CACCCE' />
                        </button>
                    </div>
                );
            },
        },
        // {
        //   name: 'delayedTime',
        //   dataIndex: 'delaydTime',
        //   align: TEXT_ALIGN.CENTER,
        //   paddingInline: '5px',
        // },
        {
            name: 'delayedTime',
            dataIndex: 'delayedDate',
            align: TEXT_ALIGN.CENTER,
            paddingInline: '5px',
        },
        {
            name: 'networkStatus',
            dataIndex: 'networkStatus',
            align: TEXT_ALIGN.CENTER,
            paddingInline: '10px',
        },
        {
            name: 'nullTable',
            dataIndex: 'nullStatus',
            align: TEXT_ALIGN.CENTER,
            paddingInline: '10px',
        },
    ];

    const onClickRefresh = (data: ShipStatusData) => {
        console.log(data);
        storeLogUpdate(data.bmsID, trans)
    }

    const onClickRefreshErrorCount = (data: ShipStatusData) => {
        console.log(data);
        storeResetErrorCount(data.bmsID, trans)
    }
    useEffect(() => {
        storeDataList(trans);
        SITE_FILTERS.selected = "전체"
        setSelectSite("전체")
        // 타이머 설정: 5초 후에 onSearch 함수 실행
        // const timer = setInterval(onSearch, 10000);

        // 컴포넌트가 언마운트될 때 타이머 정리
        // return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        storeDataList(trans);
        SITE_FILTERS.selected = "전체"
        setSelectSite("전체")        
    }, [currentLanguage]);

    // useEffect(() => {
    //   pagination.total = data.length
    // }, [data]);

    useEffect(() => {
        setPaginationTotal(data.length);
    }, [data]);

    const onSearch = useCallback(() => {
        var siteID: any = null;
        var shipID: any = null;
        var bmsID: any = null;
        // var  = selectShip=="전체"&&"all";
        // var bmsID = selectBMS=="전체"&&"all";

        if (selectSite == "전체" || selectSite == '') {
            siteID = "all";
        } else {
            dataList?.map((item) => {
                var itemSiteName = currentLanguage == 'kr' ? item.site_name : item.site_name_foreign;
                if (itemSiteName == selectSite) {
                    siteID = item.site_id;
                }
            });
        }

        if (selectShip == "전체" || selectShip == '') {
            shipID = "all";
        } else {
            dataList_ship?.map((item) => {
                var itemShipName = currentLanguage == 'kr' ? item.ship_name : item.ship_name_foreign;
                if (itemShipName == selectShip) {
                    shipID = item.ship_id;
                }
            });
        }

        if (selectBMS == "전체" || selectBMS == '') {
            bmsID = "all";
        } else {
            dataList_bms?.map((item) => {
                if (item.bms_name == selectBMS) {
                    bmsID = item.bms_id;
                }
            });
        }

        // bms조회
        storeDataList_bms_search(siteID, shipID, bmsID, trans)
    }, [selectSite, selectBMS, selectShip]);

    useEffect(() => {
        // 초기 로딩 및 타이머 설정
        onSearch(); // 컴포넌트 마운트 시 바로 호출

        const timer = setInterval(() => {
            onSearch(); // `setInterval` 내부에서도 같은 함수 참조
        }, 10000);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearInterval(timer);
    }, [onSearch]); // `onSearch`를 의존성 배열에 추가


    // 사이트 콤보박스에 지역셋팅
    useEffect(() => {
        // setFilterData();
        let _filters: Array<string> = [];
        _filters.push("전체")
        {
            dataList ? dataList.map((item) => {
                if (currentLanguage == 'kr') {
                    _filters.push(item.site_name);
                } else {
                    _filters.push(item.site_name_foreign);
                }
            }) : null
        };
        SITE_FILTERS.values = [];
        SITE_FILTERS.values = _filters;
    }, [dataList, currentLanguage]);

    // 사이트 콤보박스 선택시
    useEffect(() => {
        if (selectSite == "전체") {
            SHIP_FILTERS.values = [];
            BMS_FILTERS.values = [];
            setSelectShip("전체")
            setSelectBMS("전체")
        } else {
            dataList?.map((item) => {
                var itemSiteName = currentLanguage == 'kr' ? item.site_name : item.site_name_foreign;
                if (itemSiteName == selectSite) {
                    storeDataList_ship(item.site_id, trans)
                }
            });
        }
    }, [selectSite]);

    useEffect(() => {
        // 사이트 선택 시, 관련 선박과 BMS 선택 옵션을 "전체"로 초기화
        SHIP_FILTERS.values = [];
        BMS_FILTERS.values = [];
        SHIP_FILTERS.selected = "전체";
        BMS_FILTERS.selected = "전체";

        if (selectSite !== "전체") {
            const selectedSite = dataList?.find(site => site.site_name === selectSite);
            if (selectedSite) {
                storeDataList_ship(selectedSite.site_id, trans);
            }
        }
    }, [selectSite, dataList, storeDataList_ship]);

    useEffect(() => {
        BMS_FILTERS.values = [];
        BMS_FILTERS.selected = "전체";
        dataList_ship?.map((item) => {
            var itemShipName = currentLanguage == 'kr' ? item.ship_name : item.ship_name_foreign;
            if (itemShipName == selectShip) {
                storeDataList_bms(item.ship_id, trans)
            }
        });
        // setSelectBMS("전체")

    }, [selectShip]);

    // 선박 콤보박스에 선박셋팅
    useEffect(() => {
        let _filters: Array<string> = [];
        _filters.push("전체")
        {
            dataList_ship ? dataList_ship.map((item) => {
                if (currentLanguage == 'kr') {
                    _filters.push(item.ship_name);
                } else {
                    _filters.push(item.ship_name_foreign);
                }

            }) : null!
        };
        SHIP_FILTERS.values = [];
        SHIP_FILTERS.values = _filters;
    }, [dataList_ship, currentLanguage]);

    

    // bms 콤보박스에 bms셋팅
    useEffect(() => {
        let _filters: Array<string> = [];
        _filters.push("전체")
        {
            dataList_bms ? dataList_bms.map((item) => {
                if (currentLanguage == 'kr') {
                    _filters.push(item.bms_name);
                } else {
                    _filters.push(item.bms_name_foreign);
                }
            }) : null
        };
        BMS_FILTERS.values = [];
        BMS_FILTERS.values = _filters;
    }, [dataList_bms, currentLanguage]);

    useEffect(() => {
        console.log(selectBMS);
        if (selectBMS) {
            BMS_FILTERS.selected = selectBMS;
        }

        // setFilterData()
    }, [selectBMS]);

    useEffect(() => {
        console.log(dataList_search);
        let _data: Array<ShipStatusData> = [];
        var nId: number = 0
        dataList_search?.map((bms) => {
            const delaydT = Math.floor(bms.delayed_time)
            _data.push({
                id: nId,
                site: bms.site_name,
                siteNameForeign: bms.site_name_foreign,
                siteID: bms.site_id,
                name: bms.ship_name,
                shipNameForeign: bms.ship_name_foreign,
                bmsName: bms.bms_name,
                bmsID: bms.bms_id,
                numbersOfRack: bms.rack_count ?? "-",
                // modbusUpdateTime: bms.modbus_rawdata_updated ? "실시간 "+bms.modbus_rawdata_updated : "-",
                modbusUpdateTime: trans("realtime") + (bms.modbus_rawdata_updated ?? "-") + "\n" + trans("cache") + (bms.modbus_rawdata_updated_cached ?? "-"),
                // modbusUpdateTimeCached: bms.modbus_rawdata_updated_cached ? "캐시 "+bms.modbus_rawdata_updated_cached :"-",
                // canUpdateTime: bms.can_rawdata_updated ? "실시간 "+bms.can_rawdata_updated : "-",
                canUpdateTime: trans("realtime") + (bms.can_rawdata_updated ?? "-") + "\n" + trans("cache") + (bms.can_rawdata_updated_cached ?? "-"),
                // canUpdateTimeCached: bms.can_rawdata_updated_cached ? "캐시 "+bms.can_rawdata_updated : "-" ,
                logUpdateTime: bms.last_log_updated ?? "-",
                numbersOfError: bms.error_count ?? "-",
                delaydTime: `${delaydT} (s)`,
                delayedDate: humanReadable(delaydT),
                networkStatus: bms.network_status ?? "-",
                nullStatus: bms.null_status == null ? "-" : bms.null_status == true ? "True" : "False"
            })
            nId++
        })
        setData(_data);
    }, [dataList_search, trans]);

    // 시간계산
    function humanReadable(seconds: number) {
        if (seconds < 61) {
            return '00m ' + addZero(seconds)
        }
        // sec    
        var days = Math.floor(seconds / (3600 * 24))
        var hours = Math.floor((seconds % (3600 * 24)) / 3600)
        var mins = Math.floor((seconds % 3600) / 60)
        var secs = seconds % 60
        return addZero(days) + 'd ' + addZero(hours) + 'h ' + addZero(mins) + 'm ' + addZero(secs) + 's'
        function addZero(num: number) {
            return ((num < 10) ? '0' : '') + num
        }
    }



    return (
        <main className='flex flex-col items-center w-full px-[18px] py-5 lg:px-[55px] lg:pt-10 lg:pb-[74px] ship-status__wrapper'>
            <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none mb-6'>
                {trans('shipEssStatus')}
            </h1>
            <div className='flex flex-col md:flex-row items-center gap-4 w-full mb-8 md:mb-6 flex-1'>
                <div className='w-full md:w-fit flex items-center justify-between'>
                    <Filter />
                    <div
                        onClick={() => setOpenFilter((prev) => !prev)}
                        className={cn('block md:hidden transition-all rotate-0', openFilter && 'rotate-180')}>
                        <Arrow className='stroke-hw-white-1' />
                    </div>
                </div>
                <div
                    className={cn(
                        'w-full md:w-fit flex md:!flex flex-col md:flex-row items-center md:flex-wrap gap-2 md:gap-x-6 md:gap-y-2',
                        !openFilter && 'hidden',
                    )}>
                    {DROPDOWN_FILTERS.map((item: FilterDropdownType, index: number) => (
                        <FilterDropdown key={index} title={trans(item.title)} filter={item.filter} callback_Site={setSelectSite} callback_Ship={setSelectShip} callback_BMS={setSelectBMS} callback={setSelectBMS} />
                    ))}
                    {/* <button className='w-full md:w-fit mt-[16px] md:mt-0 px-6 py-[6px] rounded-lg bg-hw-orange-1 text-hw-white-1 text-base font-light leading-[125%]'
            onClick={onSearch}>
            {trans('search')}
          </button> */}
                </div>
            </div>
            {/* {data.length > 0 ? <TableData data={data} columns={columns} isPagination pagination={pagination} paginationMarginTop='32px' /> : ""} */}
            {data.length > 0 ? <TableData data={data} columns={columns} isPagination pagination={{ ...pagination, total: paginationTotal }} paginationMarginTop='32px' /> : ""}
        </main>
    );
}
