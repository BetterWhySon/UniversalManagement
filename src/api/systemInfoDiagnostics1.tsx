import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from "./URLs";
import { Diagnostics1 } from '@/types/diagnostics.type';

interface SystemInfoDiagnostics1 {
    diagnostics1Data: Diagnostics1 | null;

    storeDiagnostics1Data: (bms_id: number, rack_num: number, trans: (key: string) => string) => void;
}

const useSystemInfoDiagnostics1 = create<SystemInfoDiagnostics1>((set) => ({
    diagnostics1Data: null,

    storeDiagnostics1Data: async (bms_id: number, rack_num: number, trans) => {

        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'diagnostics_1/', {
                "bms_id": bms_id,
                "rack_num": rack_num
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                const dataList: Diagnostics1 = response.data.dataList

                set({ diagnostics1Data: dataList });
            } else {
                alert(trans('diagnosis1CannotBeRetrieve'));  // 진단1을 조회 할 수 없습니다
            }
        } catch (error) {
            console.log(error);
            alert(trans('diagnosis1CannotBeRetrieve'));  //진단1을 조회 할 수 없습니다.            
        }
    },
}));

export default useSystemInfoDiagnostics1;

