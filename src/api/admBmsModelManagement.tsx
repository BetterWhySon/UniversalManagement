import { create } from 'zustand';
// import axios from "axios";
import { api, api_formData } from './api';
import { backendURL } from './URLs';

interface AdmBmsModelManagement {
    recvData: IAccess_admBmsModelManagement | null;    
    // dataList: Array<[]> | null;    
    storeRecvData: (trans: (key: string) => string) => void;    
}

interface IAccess_admBmsModelManagemen_data {
    model_id: number;
    model_name: string;
    model_type: string;
    image_path: string;
}
interface IAccess_admBmsModelManagement_type {
    id: number;
    name: string;
}
interface IAccess_admBmsModelManagement {
    bms_model: Array<IAccess_admBmsModelManagemen_data>;
    model_type: Array<IAccess_admBmsModelManagement_type>;
    
}


const useAdmBmsModelManagement = create<AdmBmsModelManagement>((set) => ({
    recvData: null,
    
    storeRecvData: async (trans) => {    
        try {
            const token = localStorage.getItem("token");
            var formData = new FormData();
            const da = {
                'action': 'init',                    
            }            
            formData.append('json_data', JSON.stringify(da));

            console.log(formData);
            const response = await api_formData.post(backendURL + 'adm_bms_model/',formData, 
            {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });

            if (response.status === 200) {
                const dataList: IAccess_admBmsModelManagement = response.data.dataList
                // const dataList: Array<[]> = response.data.dataList
                set({ recvData: dataList });                
            } else {
                alert(trans('essModelCannotBeRetrieve'));    // 'ESS모델을 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('essModelCannotBeRetrieve'));    // 'ESS모델을 조회 할 수 없습니다.'
        }
    },
}));

export default useAdmBmsModelManagement;

