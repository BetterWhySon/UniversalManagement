import { create } from 'zustand';
import axios, { AxiosError } from "axios";
import { api } from './api';
import { backendURL } from './URLs';
import { admServerManagement } from '@/types/server-management.type';


interface AdmServerManagement {
    dataList: Array<admServerManagement> | null;
    // errorMsg_essServer: rtnMsg | null;
    storeDataList: (trans: (key: string) => string) => void;
}
interface rtnMsg {
    error: string;
}
const useAdmServerManagement = create<AdmServerManagement>((set) => ({
    dataList: null,
    // errorMsg_essServer: null,
    storeDataList: async (trans) => {
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ds_status/', {
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                const dataList: Array<admServerManagement> = response.data.dataList
                set({ dataList: dataList });
            } else {
                alert(trans('serverStatusCannotBeRetrieve'));   //'통계를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('serverStatusCannotBeRetrieve'));   //'통계를 조회 할 수 없습니다.'
        }
    },

    
}));

export default useAdmServerManagement;

