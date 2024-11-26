import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';
import { SystemMessageType } from '@/types/systemMessage.type';

interface AdmEssManagement {
    dataList: Array<SystemMessageType> | null;
    storeDataList: (bms_id: number, rack_num: number, trans: (key: string) => string) => void;
    sortAsc: () => void;
    sortDesc: () => void;
}

interface RequestBody {
    bms_id: number;
    rack_num?: number;
}

const useSystemMessage = create<AdmEssManagement>((set) => ({
    dataList: null,
    storeDataList: async (bms_id: number, rack_num: number, trans) => {
        try {
            const requestBody: RequestBody = {
                "bms_id": bms_id
            };
            // rack_num이 존재하면 요청 본문 객체에 추가
            if (rack_num) {
                requestBody.rack_num = rack_num;
            }

            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'user_alarm_info/', requestBody, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            if (response.status === 200) {
                const dataList: Array<SystemMessageType> = response.data.dataList
                set({ dataList: dataList });
            } else {
                alert(trans('messageCannotBeRetrieve'));   //메세지를 조회 할 수 없습니다.
            }
        } catch (error) {
            console.log(error);
            alert(trans('messageCannotBeRetrieve'));   //메세지를 조회 할 수 없습니다.
        }
    },
    sortAsc: () => {
        set((state) => ({
            dataList: state.dataList?.sort((a, b) => a.timestamp.localeCompare(b.timestamp)) ?? null,
        }));
    },
    
    sortDesc: () => {
        set((state) => ({
            dataList: state.dataList?.sort((a, b) => b.timestamp.localeCompare(a.timestamp)) ?? null,
        }));
    },
}));

export default useSystemMessage;

