import { create } from 'zustand';
import { api } from './api';
import { backendURL } from './URLs';

interface AdmBmsModelEdit {    
    errorMsg_bmsModelEdit: rtnMsg | null;    
    storeBmsModelEdit: (  model_name: string, model_type: number, model_id: number, imageFile: any, trans: (key: string) => string ) => void;    
}

interface rtnMsg {
    errorMsg: string;    
}

const useAdmBmsModelEdit = create<AdmBmsModelEdit>((set) => ({
    errorMsg_bmsModelEdit: null,
    storeBmsModelEdit: async ( model_name: string, model_type: number, model_id: number, imageFile: any, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            var formData = new FormData();
            const da = {
                'action': 'modify',    
                'model_name': model_name,    
                'model_type': model_type,
                'model_id': model_id,    
            }
            if(imageFile.length > 0 ) { // 이미지 수정이 없으면 key value 모두 추가하지 않는다
                formData.append('image', imageFile[0]);
            }
            formData.append('json_data', JSON.stringify(da));

            const response = await api.post(backendURL + 'adm_bms_model/',formData, 
            {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_bmsModelEdit: errorMsg });                         
                alert(trans('essModelHasBeenModified'));   //ESS모델을 수정했습니다.
            } else {
                alert(trans('essModelCannotBeModified'));    //'ESS모델을 수정 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('essModelCannotBeModified'));    //'ESS모델을 수정 할 수 없습니다.'
        }
    },
}));

export default useAdmBmsModelEdit;

