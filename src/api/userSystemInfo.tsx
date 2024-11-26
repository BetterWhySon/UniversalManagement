import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';
import { ISite_userSystemInfo } from '@/types/sidebar-menu.type';

interface UserSystemInfo {
    dataList: Array<ISite_userSystemInfo> | null;    
    storeDataList: (trans: (key: string) => string) => void;
}


const useUserSystemInfo = create<UserSystemInfo>((set) => ({
    dataList: null,

    storeDataList: async (trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'user_system_info/', {
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                const dataList: Array<ISite_userSystemInfo> = response.data.dataList
                set({ dataList: dataList });                
            } else {
                alert(trans('unableToRetrieveTheSidebarInformation'));    //)'사이드메뉴 정보를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('unableToRetrieveTheSidebarInformation'));    //)'사이드메뉴 정보를 조회 할 수 없습니다.'
        }
    },
}));

export default useUserSystemInfo;

