import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from "./URLs";
import { Diagnostics2 } from "@/types/diagnostics.type"

interface SystemInfoDiagnostics2 {
    // diagnostics2Data: Diagnostics2 | null;
    diagnostics2Data: Array<Diagnostics2> | null;    
    storeDiagnostics2Data: (bms_id: number, trans: (key: string) => string) => void;
}

const useSystemInfoDiagnostics2 = create<SystemInfoDiagnostics2>((set) => ({
    diagnostics2Data: null,

    storeDiagnostics2Data: async (bms_id: number, trans) => {

        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'diagnostics_2/', {
                "bms_id": bms_id,
                // "rack_num": rack_num
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {                
                const dataList: Array<Diagnostics2> = response.data.dataList
                set({ diagnostics2Data: dataList });
            } else {
                alert(trans('diagnosis2CannotBeRetrieve'));  // 진단2를 조회 할 수 없습니다
            }
        } catch (error) {
            console.log(error);
            alert(trans('diagnosis2CannotBeRetrieve'));  //진단2를 조회 할 수 없습니다.            
        }
    },
}));

export default useSystemInfoDiagnostics2;

