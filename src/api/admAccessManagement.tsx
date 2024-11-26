import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from '@/api/URLs';
import dayjs, { Dayjs } from 'dayjs';

interface AdmAccessManagement {
    // dataList: Array<IAccess_admAccessManagement> | null;    
    dataList: Array<[]> | null;
    storeDataList: (startTime: Dayjs, endTime: Dayjs, userID: string, trans: (key: string) => string) => void;
}

interface IAccess_admAccessManagement {
    id: number;
    accessTime: string;
    ip: string;
    userID: string;
    name: string;
}
const useAdmAccessManagement = create<AdmAccessManagement>((set) => ({
    dataList: null,

    storeDataList: async (startTime: Dayjs, endTime: Dayjs, userID: string, trans) => {
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_access_info/', {
                'from_time': startTime.format('YYYY-MM-DD HH:mm:ss'),       //2024-02-20 19:54:20
                'to_time': endTime.format('YYYY-MM-DD HH:mm:ss'),
                'user_id': userID,
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                // const dataList: Array<IAccess_admAccessManagement> = response.data.dataList
                const dataList: Array<[]> = response.data.dataList
                set({ dataList: dataList });
            } else {
                alert(trans('unableToLookupUser'));//'사용자를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('unableToLookupUser'));//'사용자를 조회 할 수 없습니다.'
        }
    },
}));

export default useAdmAccessManagement;

