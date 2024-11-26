import { create } from 'zustand';
import axios, { AxiosError } from "axios";
import { api } from './api';
import { backendURL } from './URLs';
import { admEssStatisticsManagement } from '@/types/ess-statistics-management.type';


interface AdmEssStatisticsManagement {
    dataList: Array<admEssStatisticsManagement> | null;
    errorMsg_essStatistics: rtnMsg | null;
    storeDataList: (trans: (key: string) => string) => void;
    storeEssReset: (trans: (key: string) => string) => void;
}
interface rtnMsg {
    error: string;
}
const useAdmEssStatisticsManagement = create<AdmEssStatisticsManagement>((set) => ({
    dataList: null,
    errorMsg_essStatistics: null,
    storeDataList: async (trans) => {
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_statistics_management/', {
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                const dataList: Array<admEssStatisticsManagement> = response.data.dataList
                set({ dataList: dataList });
            } else {
                alert(trans('statisticsCannotBeRetrieve'));   //'통계를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('statisticsCannotBeRetrieve'));   //'통계를 조회 할 수 없습니다.'
        }
    },

    storeEssReset: async (trans) => {
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_reset/', {
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                if (response.data == 'True') {
                    const rtnMsg: rtnMsg = {
                        error: 'True'
                    }
                    set({ errorMsg_essStatistics: rtnMsg });
                } else {
                    alert(trans('statisticsCannotBeRetrieve'));   //'통계를 조회 할 수 없습니다.'    
                }
            } else {
                alert(trans('statisticsCannotBeRetrieve'));   //'통계를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('statisticsCannotBeRetrieve'));   //'통계를 조회 할 수 없습니다.'
        }
    },
}));

export default useAdmEssStatisticsManagement;

