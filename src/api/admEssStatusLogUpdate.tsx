import { create } from 'zustand';
import { api } from './api';
import { backendURL } from './URLs';

interface AdmEssStatus {
    storeLogUpdate: ( bms_id: number,  trans: (key: string) => string) => void;
}

const useAdmEssStatusLogUpdate = create<AdmEssStatus>((set) => ({
 
    storeLogUpdate: async ( bms_id: number,  trans) => {

        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'log_update/', {                                
                'id': 'log_update',
                "bms_id": bms_id,
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {      
                if( response.data.result )             
                    alert(trans("logUpdateMsg"));        
                else 
                    alert(trans('logUpdateRequestFailed'));
            } else {
                alert(trans('logUpdateRequestFailed'));    //'로그를 업데이트 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('logUpdateRequestFailed'));    //'로그를 업데이트 할 수 없습니다.'
        }
    },


}));


export default useAdmEssStatusLogUpdate;

