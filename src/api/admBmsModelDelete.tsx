import { create } from 'zustand';
// import axios from "axios";
import { api, api_formData } from './api';
import { backendURL } from './URLs';



interface AdmBmsModelDelete {    
    errorMsg_bmsModelDelete: rtnMsg | null;    
    storeBmsModelDelete: (id: number,  trans: (key: string) => string) => void;    
}

interface rtnMsg {
    error: string;    

}

// const { storeEssReload } = useNeedAdmEssReload();

const useAdmBmsModelDelete = create<AdmBmsModelDelete>((set) => ({
    errorMsg_bmsModelDelete: null,
    storeBmsModelDelete: async (id: number, trans) => {    
        try {            
            // const token = localStorage.getItem("token");
            // const response = await api.post(backendURL + 'adm_bms_model/',{
            //     "action": "delete",
            //     "model_id": id,
            // }, {
            // headers:{
            //     Authorization: "Bearer " + token ,
            // },            
            // });

            const token = localStorage.getItem("token");
            var formData = new FormData();
            const da = {
                'action': 'delete',                    
                "model_id": id,
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
                const errorMsg: rtnMsg = response.data
                if( errorMsg.error === '23503') {
                    alert(trans('essModelCannotBeDeletedAlready'));   //'이미 ESS에 등록(사용)된 모델입니다. 삭제 할 수 없습니다.'
                }
                set({ errorMsg_bmsModelDelete: errorMsg });
                alert(trans('essModelHasBeenDeleted'));   //ESS모델을 삭제했습니다.
            } else {
                alert(trans('essModelCannotBeDeleted'));   //ESS모델을 삭제 할 수 없습니다.
            }
        } catch (error) {
            console.log(error);
            alert(trans('essModelCannotBeDeleted'));   //ESS모델을 삭제 할 수 없습니다.
        }
    },
}));

export default useAdmBmsModelDelete;

