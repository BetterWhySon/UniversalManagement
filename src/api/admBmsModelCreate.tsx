import { create } from 'zustand';
import { api, api_formData } from './api';
import { backendURL } from './URLs';

interface AdmBmsModelCreate {    
    errorMsg_bmsModelCreat: rtnMsg | null;    
    storeBmsModelCreate: ( model_name: string, model_type: number, imageFile: any, trans: (key: string) => string) => void;    
}

interface rtnMsg {
    errorMsg: string;    
}

const useAdmBmsModelCreate = create<AdmBmsModelCreate>((set) => ({
    errorMsg_bmsModelCreat: null,
    storeBmsModelCreate: async ( model_name: string, model_type: number, imageFile: any, trans) => {    
        try {
            const token = localStorage.getItem("token");
            var formData = new FormData();
            const da = {
                'action': 'create',    
                'model_name': model_name,    
                'model_type': model_type    
            }
            formData.append('image', imageFile[0]);
            console.log(imageFile[0]);
            formData.append('json_data', JSON.stringify(da));

            console.log(formData);
            const response = await api_formData.post(backendURL + 'adm_bms_model/',formData, 
            {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_bmsModelCreat: errorMsg });            
                alert(trans('essModelHasBeenCreated'));    //ESS모델을 생성했습니다.
                
            } else {
                alert(trans('essModelCannotBeCreated'));    //ESS모델을 생성 할 수 없습니다.
            }
        } catch (error) {
            console.log(error);
            alert(trans('essModelCannotBeCreated'));    //ESS모델을 생성 할 수 없습니다.
        }
    },
}));

export default useAdmBmsModelCreate;

