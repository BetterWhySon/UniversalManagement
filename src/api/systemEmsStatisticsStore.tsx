import { create } from 'zustand';
import { api } from './api';
import { backendURL } from './URLs';
import { PeriodType_StatisticsDataFilter, PeriodType_StatisticsDataFilterBasic, PeriodType_StatisticsTab, StatisticsData, StatisticsData2 } from '@/enums/statistics';


interface EmsGraphState {
    periodType: PeriodType_StatisticsTab;
    periodType_filter: PeriodType_StatisticsDataFilter;
    periodType_filter_basic: PeriodType_StatisticsDataFilterBasic;
    statisticsList: StatisticsData | null;
    statisticsList2: StatisticsData2 | null;
    
    setPeriodType: (type: PeriodType_StatisticsTab) => void;
    setPeriodType_filter: (type: PeriodType_StatisticsDataFilter) => void;
    setPeriodType_filter_basic: (type: PeriodType_StatisticsDataFilterBasic) => void;    

    storeStatisticsList: (bms_id: string, rack_num: string, statistics_category: string, graph_category: string, trans: (key: string) => string) => void;    
}

const systemEmsStatisticsStore = create<EmsGraphState>((set, get) => ({
    periodType: PeriodType_StatisticsTab.BASIC,
    periodType_filter: PeriodType_StatisticsDataFilter.DAILY,
    periodType_filter_basic: PeriodType_StatisticsDataFilterBasic.SOCCHANGE,
    statisticsList: null,
    statisticsList2: null,
    
    setPeriodType: (type: PeriodType_StatisticsTab) => set({ periodType: type }),
    setPeriodType_filter: (type: PeriodType_StatisticsDataFilter) => set({ periodType_filter: type }),
    setPeriodType_filter_basic: (type: PeriodType_StatisticsDataFilterBasic) => set({ periodType_filter_basic: type }),
    
    storeStatisticsList: async (bms_id: string, rack_num: string, statistics_category: string, graph_category: string, trans) => {    
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'statistics/', {
                bms_id: bms_id,
                rack_num: rack_num,
                statistics_category: statistics_category,
                graph_category: graph_category
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },            
            });
            
            if (response.status === 200) {
                if (statistics_category === "basic") {
                    const dataList: StatisticsData = response.data.dataList;
                    const reversedDataList = {
                        ...dataList,
                        timestamp: dataList.timestamp.slice().reverse(),
                        last_soc: dataList.last_soc.slice().reverse(),
                        avg_temp: dataList.avg_temp.slice().reverse(),
                        avg_stress: dataList.avg_stress.slice().reverse(),
                        chg_power_rate: dataList.chg_power_rate.slice().reverse(),
                        dchg_power_rate: dataList.dchg_power_rate.slice().reverse(),
                    };
                    set({ statisticsList: reversedDataList });
                } else {
                    const dataList: StatisticsData2 = response.data.dataList;
                    set({ statisticsList2: dataList });
                }
            } else {
                alert(trans('statisticsCannotBeRetrieve'));   //'통계를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('statisticsCannotBeRetrieve'));   //'사용자를 조회 할 수 없습니다.'
        }
    }
    

}));

export default systemEmsStatisticsStore;
